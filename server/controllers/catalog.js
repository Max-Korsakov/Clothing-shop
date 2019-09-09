const errorHandler = require("../utils/errorHandler");
const Items = require("../models/CatalogItem");
const Users = require("../models/User");

module.exports.getAll = async function(req, res) {
  let allGendersArray = [];
  let allBrandsArray = [];
  let allTypeArray = [];
  let allColorsArray = [];
  let allSizesArray = [];
  let allPricesArray = [];
  try {
    const items = await Items.find();
    items.forEach(item => {
      return allGendersArray.push(item.gender);
    });
    const unicGenders = allGendersArray.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    items.forEach(item => {
      return allBrandsArray.push(item.brand);
    });
    const unicBrands = allBrandsArray.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    items.forEach(item => {
      return allTypeArray.push(item.type);
    });
    const unicTypes = allTypeArray.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    items.forEach(item => {
      return (allColorsArray = [...allColorsArray, ...item.color]);
    });

    const unicColors = allColorsArray.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    items.forEach(item => {
      return (allSizesArray = [...allSizesArray, ...item.size]);
    });

    const unicSizes = allSizesArray.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });


    res.status(200).json({
      items: items,
      filterProps: {
        filterGender: unicGenders,
        filterBrands: unicBrands,
        filterTypes: unicTypes,
        filterColors: unicColors,
        filterSizes: unicSizes,
    
      }
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getFiltered = async function(req, res) {

  let filterCond ={};
  console.log(req.body.size)
  if(req.body.gender && req.body.gender !== 'All') {
     filterCond.gender = req.body.gender
  }
  if (req.body.size && req.body.size !== 'All') {
    filterCond.size = req.body.size
  }
  if (req.body.color && req.body.color !== 'All') {
    filterCond.color = req.body.color
  }
  if (req.body.type && req.body.type !== 'All') {
    filterCond.type = req.body.type
  }
  if (req.body.maxPrice) {
    filterCond.price = {$lte: req.body.maxPrice}
  }


  try {
    console.log(filterCond)
   let items = await Items.find(filterCond);

   console.log()
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
    arrayOfItems.forEach(async function(item) {
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
        availability: item.availability
      });
      console.log(newItem);
      await newItem.save();
      res.status(201).json(newItem);
    });
  } catch (e) {
    errorHandler(res, e);
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
