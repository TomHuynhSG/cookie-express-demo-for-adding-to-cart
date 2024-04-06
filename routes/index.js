var express = require('express');
var router = express.Router();
const { getProducts, addToCart, getCart, removeProduct } = require("../controllers/index")

router.get('/', getProducts)

router.get('/add/:id',addToCart)

router.get('/cart', getCart)

router.get('/remove/:id', removeProduct)

module.exports = router;
