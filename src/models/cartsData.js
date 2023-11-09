const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../carts.json');

// Función para obtener todos los carritos
const getAllCarts = () => {
  const cartsData = fs.readFileSync(cartsFilePath, 'utf-8');
  return JSON.parse(cartsData);
};

// Función para obtener un carrito por ID
const getCartById = (cartId) => {
  const cartsData = getAllCarts();
  return cartsData.find((cart) => cart.id === cartId);
};

// Función para crear un nuevo carrito
const createCart = () => {
  const cartsData = getAllCarts();
  const newCartId = generateUniqueId(); // Implementa la lógica para generar un ID único
  const newCart = { id: newCartId, products: [] };
  cartsData.push(newCart);
  saveCartsData(cartsData);
  return newCart;
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

// Función para generar un ID único (ejemplo simple)
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  addProductToCart,
};
