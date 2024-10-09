import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Formulario para agregar una nueva categoría
router.get('/add', (req, res) => {
    res.render('categoria/add');
});

// Agregar una nueva categoría a la base de datos
router.post('/add', async (req, res) => {
    try {
        const { nombre } = req.body;
        const newCategoria = { nombre };
        await pool.query('INSERT INTO categoria SET ?', [newCategoria]);
        res.redirect('/categoria/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todas las categorías
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM categoria');
        res.render('categoria/list', { categorias: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para editar una categoría
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]);
        const categoriaEdit = categoria[0];
        res.render('categoria/edit', { categoria: categoriaEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Editar una categoría existente
router.post('/edit/:id', async (req, res) => {
    try {
        const { nombre } = req.body;
        const { id } = req.params;
        const editCategoria = { nombre };
        await pool.query('UPDATE categoria SET ? WHERE id_categoria = ?', [editCategoria, id]);
        res.redirect('/categoria/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una categoría
router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM categoria WHERE id_categoria = ?', [id]);
        res.redirect('/categoria/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
