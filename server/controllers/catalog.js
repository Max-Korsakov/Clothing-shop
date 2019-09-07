const errorHandler = require("../utils/errorHandler");
const Items = require("../models/CatalogItem");
const Users = require("../models/User");

module.exports.getAll = async function(req, res) {
  try {
    const items = await Items.find().sort({ brand: 1 });
    res.status(200).json(items);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.setItem = async function(req, res) {
    arrayOfItems = [
        {
          id: "1",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          gender: "Man",
          color: ["Red"],
          size: ["XS", "M", "L"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "2",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "3",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "4",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "5",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "6",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "7",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        },
        {
          id: "8",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
          price: 3,
          availability: true
        }
      ];

    try {
        arrayOfItems.forEach(  async function(item) {
            const newItem = new Items({
                section: item.section,
                type: item.type,
                brand: item.brand,
                name: item.name,
                discription: item.discription,
                color: item.color,
                gender: item.gender,
                size: item.size,
                img: item.img,
                price: item.price,
                availability: item.availability})
                console.log(newItem)
        await newItem.save()
        res.status(201).json(newItem)})
    }
    catch (e) {
        errorHandler(res, e)
    }
  };


module.exports.getItemById = async function(req, res) {
  try {
    const items = await Items.findById(req.params.id);
    res.status(200).json(items);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getFiltered = async function(req, res) {
  try {
    const items = await Items.find().sort({ brand: 1 });
    res.status(200).json(items);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.addToCart = async function(req, res) {
  try {
    const item = await Items.findById(req.params.id);
    const user = await Users.findById(req.body.userId);
    user.cartItems.push(item);
    res.status(200).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.addToFavorite = async function(req, res) {
  try {
    const item = await Items.findById(req.params.id);
    const user = await Users.findById(req.body.userId);
    user.favoriteItems.push(item);
    res.status(200).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};
