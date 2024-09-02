import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import { RowDataPacket, OkPacket } from 'mysql2';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [movies] = await db.query('SELECT * FROM movies');
        res.status(200).send(movies);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('Unknown error occurred');
        }
    }
});

router.post('/', async (req, res) => {
    const { title, year } = req.body;
    const id = uuidv4();
    
    try {
        await db.query('INSERT INTO movies (id, title, year) VALUES (?, ?, ?)', [id, title, year]);
        res.status(201).send(`Movie with the title ${title} added to the database!`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('Unknown error occurred');
        }
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [movies] = await db.query<RowDataPacket[]>('SELECT * FROM movies WHERE id = ?', [id]);
        if (movies.length > 0) {
            res.status(200).send(movies[0]);
        } else {
            res.status(404).send('Movie not found!');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('Unknown error occurred');
        }
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await db.query<OkPacket>('DELETE FROM movies WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).send(`Movie with the id ${id} deleted from the database!`);
        } else {
            res.status(404).send('Movie not found!');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('Unknown error occurred');
        }
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, year } = req.body;
    
    try {
        const [result] = await db.query<OkPacket>('UPDATE movies SET title = ?, year = ? WHERE id = ?', [title, year, id]);
        if (result.affectedRows > 0) {
            res.status(200).send(`Movie with the id ${id} has been updated`);
        } else {
            res.status(404).send('Movie not found!');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('Unknown error occurred');
        }
    }
});

export default router;
