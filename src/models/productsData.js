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
const addProduct = (product) => {
  const products = getAllProducts();
  product.id = products.length + 1;
  products.push(product);
  saveProducts(products);
};


// Función para guardar productos en el archivo
const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Función para actualizar un producto por ID
const updateProductById = (productId, updatedProduct) => {
  const productsData = getAllProducts();
  const productIndex = productsData.findIndex((product) => product.id === productId);

  if (productIndex !== -1) {
    updatedProduct.id = productId;
    productsData[productIndex] = updatedProduct;
    saveProducts(productsData);
    return updatedProduct;
  }

  return null;
};

// Función para eliminar un producto por ID
const deleteProductById = (productId) => {
  const productsData = getAllProducts();
  const updatedProductsData = productsData.filter((product) => product.id !== productId);
  saveProducts(updatedProductsData);
  return updatedProductsData;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
}