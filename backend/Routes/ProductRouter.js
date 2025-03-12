const ensureAuthenticated = require('../Middlewares/Auth');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { Vegetable, Fruit, Seasonal, Snack, Atta, Body } = require('../Models/itemSchema');

const getPaginatedData = async (Model, limit, skip) => {
    return await Model.find().limit(limit).skip(skip);
};
router.get('/ping',ensureAuthenticated, (req, res) => {
    res.send('PONG');
})
router.get('/vegetables', ensureAuthenticated , async (req, res) => {
    const { limit = 25, skip = 0 } = req.query;
    try {
        const vegetables = await getPaginatedData(Vegetable, parseInt(limit), parseInt(skip));
        res.json(vegetables);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching vegetables data' });
    }
});

router.get('/fruits', ensureAuthenticated,async (req, res) => {
    const { limit = 25, skip = 0 } = req.query;
    try {
        const fruits = await getPaginatedData(Fruit, parseInt(limit), parseInt(skip));
        res.json(fruits);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching fruits data' });
    }
});

router.get('/seasonal',ensureAuthenticated, async (req, res) => {
    const { limit = 25, skip = 0 } = req.query;
    try {
        const seasonalItems = await getPaginatedData(Seasonal, parseInt(limit), parseInt(skip));
        res.json(seasonalItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching seasonal items data' });
    }
});

router.get('/snacks',ensureAuthenticated, async (req, res) => {
    const { limit = 25, skip = 0 } = req.query;
    try {
        const snacks = await getPaginatedData(Snack, parseInt(limit), parseInt(skip));
        res.json(snacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching snacks data' });
    }
});

router.get('/atta',ensureAuthenticated, async (req, res) => {
    const { limit = 25, skip = 0 } = req.query;
    try {
        const snacks = await getPaginatedData(Atta, parseInt(limit), parseInt(skip));
        res.json(snacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching snacks data' });
    }
});

router.get('/body',ensureAuthenticated, async (req, res) => {
    const { limit = 25, skip = 0 } = req.query;
    try {
        const snacks = await getPaginatedData(Body, parseInt(limit), parseInt(skip));
        res.json(snacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching snacks data' });
    }
});

router.get('/search',ensureAuthenticated, async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    // Search in both collections
    const [vegetables, fruits, seasonals, snacks, attas, bodys] = await Promise.all([
        Vegetable.find({ title: { $regex: query, $options: 'i' } }),
        Fruit.find({ title: { $regex: query, $options: 'i' } }),
        Seasonal.find({ title: { $regex: query, $options: 'i' } }),
        Snack.find({ title: { $regex: query, $options: 'i' } }),
        Atta.find({ title: { $regex: query, $options: 'i' } }),
        Body.find({ title: { $regex: query, $options: 'i' } })
    ]);

    // Combine results
    const results = { vegetables, fruits, seasonals, snacks, attas, bodys };
    res.json(results);
});

module.exports = router;
