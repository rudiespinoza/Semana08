import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Formulario para agregar un nuevo proveedor
router.get('/add', (req, res) => {
    res.render('proveedor/add');
});

// Agregar un nuevo proveedor a la base de datos
router.post('/add', async (req, res) => {
    try {
        const { nombre, telefono } = req.body;
        const newProveedor = { nombre, telefono };
        await pool.query('INSERT INTO proveedor SET ?', [newProveedor]);
        res.redirect('/proveedor/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todos los proveedores
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM proveedor');
        res.render('proveedor/list', { proveedores: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para editar un proveedor
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [proveedor] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [id]);
        const proveedorEdit = proveedor[0];
        res.render('proveedor/edit', { proveedor: proveedorEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Editar un proveedor existente
router.post('/edit/:id', async (req, res) => {
    try {
        const { nombre, telefono } = req.body;
        const { id } = req.params;
        const editProveedor = { nombre, telefono };
        await pool.query('UPDATE proveedor SET ? WHERE id_proveedor = ?', [editProveedor, id]);
        res.redirect('/proveedor/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar un proveedor
router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM proveedor WHERE id_proveedor = ?', [id]);
        res.redirect('/proveedor/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
