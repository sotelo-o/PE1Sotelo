const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../products.json');

// Función para obtener todos los productos
const getAllProducts = () => {
  const productsData = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(productsData);
};

// Función para obtener un producto por ID
const getProductById = (productId) => {
  const productsData = getAllProducts();
  return productsData.find((product) => product.id === productId);
};

// Función para agregar un nuevo producto
const addProduct = (newProduct) => {
  const productsData = getAllProducts();
  newProduct.id = generateUniqueId(); // Implementa la lógica para generar un ID único
  productsData.push(newProduct);
  saveProductsData(productsData);
  return newProduct;
};

// Función para actualizar un producto por ID
const updateProduct = (productId, updatedProduct) => {
  const productsData = getAllProducts();
  const productIndex = productsData.findIndex((product) => product.id === productId);

  if (productIndex !== -1) {
    updatedProduct.id = productId; // Asegura que el ID no cambie
    productsData[productIndex] = updatedProduct;
    saveProductsData(productsData);
    return updatedProduct;
  }

  return null;
};

// Función para eliminar un producto por ID
const deleteProduct = (productId) => {
  const productsData = getAllProducts();
  const updatedProductsData = productsData.filter((product) => product.id !== productId);
  saveProductsData(updatedProductsData);
  return updatedProductsData;
};

// Función para guardar datos de productos en el archivo
const saveProductsData = (data) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Función para generar un ID único
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
}