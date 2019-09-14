const errorHandler = require("../utils/errorHandler");
const Items = require("../models/CatalogItem");
const Users = require("../models/User");
const mongoose = require('mongoose')

module.exports.getAllItemsWithParams = async function(req, res) {
const filterDataGender = req.query.filterDataGender
const filterDataBrand = req.query.filterDataBrand
const filterDataType = req.query.filterDataType
const filterDataColor = req.query.filterDataColor
const filterDataSize = req.query.filterDataSize
const filterDataMaxPrice = req.query.filterDataMaxPrice

const paginatorDataPreviousPageIndex = req.query.paginatorDataPreviousPageIndex
const paginatorDataPageIndex = req.query.paginatorDataPageIndex
const paginatorDataPageSize = req.query.paginatorDataPageSize
const paginatorDataLength = req.query.paginatorDataLength

const skip = +paginatorDataPageIndex * +paginatorDataPageSize
console.log(paginatorDataPageSize)

let filterCond ={};
if(filterDataGender && filterDataGender !== 'All') {
   filterCond.gender = filterDataGender
}
if (filterDataBrand && filterDataBrand !== 'All') {
  filterCond.brand = filterDataBrand
}

if (filterDataSize && filterDataSize !== 'All') {
  filterCond.size = filterDataSize
}
if (filterDataColor && filterDataColor !== 'All') {
  filterCond.color = filterDataColor
}
if (filterDataType && filterDataType !== 'All') {
  filterCond.type = filterDataType
}
if (filterDataMaxPrice) {
  filterCond.price = {$lte: filterDataMaxPrice}
}


try {
  const filteredItems = await Items.find(filterCond)

  const items = await Items.find(filterCond).skip(skip).limit(+paginatorDataPageSize);
  res.status(200).json({
    itemArrayLength: filteredItems.length,
    items: items
  });
} catch (e) {
  errorHandler(res, e);
}
}


module.exports.getFilterProps = async function(req, res) {
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

/*module.exports.getFiltered = async function(req, res) {

  let filterCond ={};
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
};*/

module.exports.searchItem = async function(req, res) {
 let allBrands = []
 let allTypes = []
  let query = req.query.searchData
  console.log(query)
 try {
  



   let brand = await Items.find( {"brand": { "$regex": query, "$options": "i" } });
   brand.forEach(item => {
    return allBrands.push(item.brand);
  });
   const unicBrands = allBrands.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });
  let type = await Items.find( {"type": { "$regex": query, "$options": "i" } });
  type.forEach(item => {
    return allTypes.push(item.type);
  });
  
   const unicType = allTypes.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

    res.status(200).json({
      brand: unicBrands,
      type: unicType});
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getManyItemsWithId = async function(req, res) {

try {
   
  
  const catalogItems = await Items.find().where('_id').in(req.body.itemsArray);
  console.log(catalogItems)
  res.status(200).json(catalogItems);
  
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
      img: "http://nowdeem.com/img/products/1531567492.jpg",
      price: 16,
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
      img: "https://static.zara.net/photos///2019/V/0/2/p/3057/429/615/2/w/560/3057429615_1_1_1.jpg?ts=1552666222871",
      price: 25,
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
      img: "https://www.telegraph.co.uk/content/dam/men/2019/08/08/Zara-shirt-full-length_trans_NvBQzQNjv4BqImq0gSBkzcH_-jHFXstKOOPHi_e1tpOIk75CAYQiDp0.jpg?imwidth=450",
      price: 30,
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
      img: "http://nowdeem.com/img/products/1531568125.jpg",
      price: 45,
      availability: true
    },
    {
      id: "5",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Woman",
      color: ["Red"],
      size: ["W"],
      img: "http://picture-cdn.wheretoget.it/7baiut-i.jpg",
      price: 48,
      availability: true
    },
    {
      id: "6",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Woman",
      color: ["Red"],
      size: ["M"],
      img: "https://section.valleygirlcomau.testarc.com.au/pub/media/catalog/product/cache/image/1000x1500/e9c3970ab036de70892d86c6d221abfe/h/t/httpswww.valleygirl.com.aupubmediaimport320478_pny_2.jpg",
      price: 100,
      availability: true
    },
    {
      id: "7",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Woman",
      color: ["Red"],
      size: ["M"],
      img: "https://media1.popsugar-assets.com/files/thumbor/He0uRqGHWikGbvdqZNL02SFvfBw/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/01/10/007/n/1922564/4f8505065c37d0d49b2379.47942239_5584465251_1_1_1/i/Zara-You-Wish-Jellyfish-T-Shirt-Text.jpg",
      price: 125,
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
      img: "https://i.pinimg.com/originals/82/c6/c5/82c6c562a5a285c748e5c4b4a5fc77d4.jpg",
      price: 300,
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

      await newItem.save();
      res.status(201).json(newItem);
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

module.exports.getCartItems = async function(req, res) {
 
  try {
    const user = await Users.findById(req.query.userId);
    res.status(200).json(user.cartItems);
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
