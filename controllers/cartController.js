const Cart = require("../models/Cart");
const MenuItem = require("../models/menuItems/MenuItem");

exports.addToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  const userId = req.user._id;

  const menuItem = await MenuItem.findById(menuItemId);
  if (!menuItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (i) => i.menuItem.toString() === menuItemId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      menuItem: menuItemId,
      quantity,
      price: menuItem.price,
    });
  }

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();
  res.json(cart);
};
//  UPDATE CART ITEM 
exports.updateCartItem = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.menuItem.toString() === menuItemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.menuItem.toString() !== menuItemId
      );
    } else {
      item.quantity = quantity;
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REMOVE ITEM FROM CART
 * DELETE /api/cart/remove/:itemId
 */
exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => i.menuItem.toString() !== itemId
    );

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET CART
 * GET /api/cart
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.menuItem",
      "name price image"
    );

    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CLEAR CART
 * DELETE /api/cart/clear
 */
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

