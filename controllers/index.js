let products = require('../products');

// Controller function to handle the '/products' route
exports.getProducts = (req, res) => {
  res.render("index", {products: products})
}

// Controller function to handle the '/add/:id' route
exports.addToCart = (req, res) => {
  // Find the product with the specified id
  const product = products.find(product => product.id == req.params.id);

  // Find the product with the specified id
  const cartCookie = req.cookies.cart || '[]';
  let cartItems = JSON.parse(decodeURIComponent(cartCookie));

  // Find the product with the specified id
  const checkedProductIndex = cartItems.findIndex(item => item.product.id == req.params.id);

  // If the product is not in the cart, add it with a quantity of 1
  if (checkedProductIndex === -1) {
    cartItems.push({product: product, quantity: 1})
  } else {
    // If the product is already in the cart, increment its quantity
    cartItems[checkedProductIndex].quantity += 1;
  }

  // If the product is already in the cart, increment its quantity
  const updatedCartString = JSON.stringify(cartItems);

  // If the product is already in the cart, increment its quantity
  res.cookie('cart', updatedCartString, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) , path: '/' });

  // If the product is already in the cart, increment its quantity
  res.redirect("/cart");
}

// Controller function to handle the '/cart' route
exports.getCart = (req, res) => {
  const cartCookie = req.cookies.cart || '[]';
  const cartItems = JSON.parse(decodeURIComponent(cartCookie));

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  // Calculate the total quantity of items in the cart
  const totalPrice = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.product.price), 0).toFixed(2);

  // Calculate the total price for each item in the cart and add it to the cartItems array
  for (var i = 0; i < cartItems.length; i++) {
    cartItems[i].totalPrice = (cartItems[i].product.price * cartItems[i].quantity).toFixed(2);
  }
  res.render("cart", {carts: cartItems, totalQuantity: totalQuantity, totalPrice: totalPrice})
}

// Controller function to handle the '/remove/:id' route
exports.removeProduct = (req, res) => {
  const cartCookie = req.cookies.cart || '[]';
  let cartItems = JSON.parse(decodeURIComponent(cartCookie));

  // Filter out the item with the specified id from the cart items
  cartItems = cartItems.filter(item => item.product.id != req.params.id);
  const updatedCartString = JSON.stringify(cartItems);

  // Set the 'cart' cookie with the updated cart items
  res.cookie('cart', updatedCartString, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) , path: '/' });
  res.redirect("/cart")
}