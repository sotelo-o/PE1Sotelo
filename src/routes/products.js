const express = require('express');
const router = express.Router();
const productsData = require('../models/productsData.js');

// Ruta raíz para listar todos los productos
router.get('/', (req, res) => {
  const limit = req.query.limit; // Obtener el valor del parámetro limit de la consulta
  const allProducts = productsData.getAllProducts();

  // Aplicar el límite si está presente
  const limitedProducts = limit ? allProducts.slice(0, parseInt(limit, 10)) : allProducts;

  res.json(limitedProducts);
});

// Ruta para obtener un producto por ID
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productsData.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const newProduct = req.body;
  if (newProduct) {
    const addedProduct = productsData.addProduct(newProduct);
    res.json(addedProduct);
  } else {
    res.status(400).json({ error: 'Datos del producto incompletos' });
  }
});

// Ruta para actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  const updatedProductInfo = productsData.updateProductById(productId, updatedProduct);
  if (updatedProductInfo) {
    res.json(updatedProductInfo);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  productsData.deleteProductById(productId);
  res.json({ message: 'Producto eliminado exitosamente' });
});

module.exports = router;
