const express = require('express');
const router = express.Router();
const cartsData = require('../models/cartsData.js');

// Ruta raíz para crear un nuevo carrito
// Ruta raíz para crear un nuevo carrito
router.post('/', (req, res) => {
  try {
    // Crear un nuevo carrito con array de productos vacío
    const newCart = {
      products: [],
    };

    // Agregar el carrito a la persistencia de datos
    cartsData.addCart(newCart);

    res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta para obtener los productos de un carrito por ID
router.get('/:cid', (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = cartsData.getCartById(cartId);

    if (cart) {
      res.status(200).json({ products: cart.products });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = parseInt(req.body.quantity) || 1; // Asegurar que quantity sea un número, por defecto 1
    console.log('cid:', cid);
    // Verificar si el carrito existe
    const cart = cartsData.getCartById(cid);
    console.log('cart:', cart)
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Verificar si el producto ya existe en el carrito
    const existingProductIndex = cart.products.findIndex((product) => product.id === pid);

    if (existingProductIndex !== -1) {
      // El producto ya existe en el carrito, incrementar la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // El producto no existe en el carrito, agregarlo
      cart.products.push({ id: pid, quantity });
    }

    // Guardar la actualización del carrito
    cartsData.saveCartsData(cartsData.getAllCarts());

    res.status(200).json({ message: 'Producto agregado al carrito exitosamente', cart });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

module.exports = router;
