const errorHandler = require("../utils/errorHandler");
const Items = require("../models/CatalogItem");
const Users = require("../models/User");

module.exports.getFavoriteItems = async function(req, res) {
  const userId = req.params.id
  try {
    const user = await Users.findById(userId);
   
    res.status(200).json(user.favoriteItems);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.addFavoriteCart = async function(req, res) {
  const userId = req.params.id;
  const item = req.body.item;

  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $push: { favoriteItems: item } },
      { upsert: true, new: true }
    );

    res.status(200).json(user.favoriteItems);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.deleteFavoriteItem = async function(req, res) {
  const userId = req.params.id;
  const itemId = req.body.item;
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { $pull: { favoriteItems: itemId } },
      { upsert: true, new: true }
    );
   
    res.status(200).json(updatedUser.favoriteItems);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getFavoriteItemsObjects = async function(req, res) {
  console.log(req)
  try {
     
    
    const catalogItems = await Items.find().where('_id').in(req.body.itemsArray);
   
    res.status(200).json(catalogItems);
    
  } catch (e) {
    errorHandler(res, e);
  }
  };


