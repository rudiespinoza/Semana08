import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Formulario para agregar una nueva marca
router.get('/add', (req, res) => {
    res.render('marca/add');
});

// Agregar una nueva marca a la base de datos
router.post('/add', async (req, res) => {
    try {
        const { nombre } = req.body;
        const newMarca = { nombre };
        await pool.query('INSERT INTO marca SET ?', [newMarca]);
        res.redirect('/marca/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todas las marcas
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM marca');
        res.render('marca/list', { marcas: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para editar una marca
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [marca] = await pool.query('SELECT * FROM marca WHERE id_marca = ?', [id]);
        const marcaEdit = marca[0];
        res.render('marca/edit', { marca: marcaEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Editar una marca existente
router.post('/edit/:id', async (req, res) => {
    try {
        const { nombre } = req.body;
        const { id } = req.params;
        const editMarca = { nombre };
        await pool.query('UPDATE marca SET ? WHERE id_marca = ?', [editMarca, id]);
        res.redirect('/marca/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una marca
router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM marca WHERE id_marca = ?', [id]);
        res.redirect('/marca/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
