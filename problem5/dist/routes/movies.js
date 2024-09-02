"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/movies.js
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
// Get all movies
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [movies] = yield db_1.default.query('SELECT * FROM movies');
        res.status(200).send(movies);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Unknown error occurred');
        }
    }
}));
// Add a new movie
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, year } = req.body;
    const id = (0, uuid_1.v4)();
    try {
        yield db_1.default.query('INSERT INTO movies (id, title, year) VALUES (?, ?, ?)', [id, title, year]);
        res.status(201).send(`Movie with the title ${title} added to the database!`);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Unknown error occurred');
        }
    }
}));
// Get a movie by ID
// Fix for Get Movie by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [movies] = yield db_1.default.query('SELECT * FROM movies WHERE id = ?', [id]);
        if (movies.length > 0) {
            res.status(200).send(movies[0]);
        }
        else {
            res.status(404).send('Movie not found!');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Unknown error occurred');
        }
    }
}));
// Delete a movie by ID
// Fix for Delete Movie by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query('DELETE FROM movies WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).send(`Movie with the id ${id} deleted from the database!`);
        }
        else {
            res.status(404).send('Movie not found!');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Unknown error occurred');
        }
    }
}));
// Update a movie by ID
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, year } = req.body;
    try {
        const [result] = yield db_1.default.query('UPDATE movies SET title = ?, year = ? WHERE id = ?', [title, year, id]);
        if (result.affectedRows > 0) {
            res.status(200).send(`Movie with the id ${id} has been updated`);
        }
        else {
            res.status(404).send('Movie not found!');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Unknown error occurred');
        }
    }
}));
exports.default = router;
