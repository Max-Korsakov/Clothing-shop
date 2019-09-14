const errorHandler = require("../utils/errorHandler");
const Items = require("../models/CatalogItem");
const Users = require("../models/User");

module.exports.getAll = async function(req, res) {
  const userId = req.body.userId;
  try {
    const user = await Users.findById(userId);
    res.status(200).json(user.cartItems);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.addToCart = async function(req, res) {
  const userId = req.params.id;
  const item = req.body.item;

  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $push: { cartItems: item } },
      { upsert: true, new: true }
    );

    res.status(200).json(user.cartItems);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.deleteCartItem = async function(req, res) {
  const userId = req.params.id;
  const itemId = req.body.item;
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { $pull: { cartItems: itemId } },
      { upsert: true, new: true }
    );
    console.log(updatedUser.cartItems);
    res.status(200).json(updatedUser.cartItems);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getCartItems = async function(req, res) {
  const userId = req.params.id;
  try {
    const user = await Users.findById(userId);
    res.status(200).json(user.cartItems);
  } catch (e) {
    errorHandler(res, e);
  }
};
