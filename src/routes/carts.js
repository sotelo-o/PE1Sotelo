const express = require('express');
const router = express.Router();
const cartsData = require('../models/cartsData.js');

// Ruta raíz para crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = cartsData.createCart();
  res.json(newCart);
});

// Ruta para obtener productos de un carrito por ID
router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartsData.getCartById(cartId);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  const updatedCart = cartsData.addProductToCart(cartId, productId, quantity);

  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
