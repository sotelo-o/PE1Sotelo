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
  try {
    const { id,title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!title || !description || !code || !price || !status || !stock || !category) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Resto de la lógica para agregar un nuevo producto
    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: thumbnails || [],
    };

    productsData.addProduct(newProduct);

    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  res.json({ message: 'Producto eliminado' });
});

module.exports = router;
