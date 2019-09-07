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
