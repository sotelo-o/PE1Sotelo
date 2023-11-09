const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../carts.json');

// Función para agregar un nuevo carrito
const addCart = (cart) => {
  const carts = getAllCarts();
  
  // Generar un ID único basado en la longitud actual del array de carritos
  cart.id = carts.length + 1;

  carts.push(cart);
  saveCarts(carts);
};

// Función para guardar carritos en el archivo
const saveCarts = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

// Función para obtener todos los carritos
const getAllCarts = () => {
  const cartsData = fs.readFileSync(cartsFilePath, 'utf-8');
  console.log('Carts Data:', cartsData);

  return JSON.parse(cartsData);
};

// Función para obtener un carrito por ID
const getCartById = (cartId) => {
  const cartsData = getAllCarts();
  console.log('All Carts:', cartsData);
  return cartsData.find((cart) => cart.id === cartId);
};



// Función para agregar un producto a un carrito
const addProductToCart = (cartId, productId, quantity) => {
  const cartsData = getAllCarts();
  const cartIndex = cartsData.findIndex((cart) => cart.id === cartId);

  if (cartIndex !== -1) {
    const productIndex = cartsData[cartIndex].products.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      // El producto ya existe en el carrito, incrementar la cantidad
      cartsData[cartIndex].products[productIndex].quantity += quantity;
    } else {
      // El producto no existe en el carrito, agregarlo
      cartsData[cartIndex].products.push({ id: productId, quantity });
    }

    saveCartsData(cartsData);
    return cartsData[cartIndex];
  }

  return null; // Carrito no encontrado
};

// Función para guardar datos de carritos en el archivo
const saveCartsData = (data) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
  getAllCarts,
  getCartById,
  addCart,
  addProductToCart,
};
