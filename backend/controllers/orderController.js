// Order and Payment Controller
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Create order
exports.createOrder = async (req, res, next) => {
  try {
    const { products, shippingAddress } = req.body;
    const userId = req.user._id;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    // Calculate total and verify products exist
    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order
    const order = await Order.create({
      userId,
      products: orderProducts,
      totalPrice,
      shippingAddress,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    // Add order to user's order history
    await User.findByIdAndUpdate(userId, {
      $push: { orderHistory: order._id },
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

// Get user orders
exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// Get order by id
exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('userId')
      .populate('products.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this order' });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Create Stripe checkout session
exports.createCheckoutSession = async (req, res, next) => {
  try {
    const { products, shippingAddress } = req.body;
    const userId = req.user._id;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in cart' });
    }

    // Build line items for Stripe
    const lineItems = [];
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      customer_email: req.user.email,
      client_reference_id: userId.toString(),
      metadata: {
        userId: userId.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};

// Verify and complete payment
exports.verifyPayment = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Find pending order and update it
    const order = await Order.findOne({
      userId: session.client_reference_id,
      paymentStatus: 'pending',
    }).sort({ createdAt: -1 });

    if (order) {
      order.paymentStatus = 'completed';
      order.stripePaymentId = session.payment_intent;
      order.orderStatus = 'processing';
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};
