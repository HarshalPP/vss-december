const AddStock = require("../models/addStockSchema");
// import { createClient } from 'redis';
const redis = require('redis');

// const client = createClient();
const client = redis.createClient();

exports.create = async (req, res) => {
    // Rest of the code will go here
    const user = new AddStock({
        item: req.body.item,
        company: req.body.company,
        length: req.body.length,
        width: req.body.width,
        topColor: req.body.topColor,
        thickness: req.body.thickness,
        temper: req.body.temper,
        coating: req.body.coating,
        grade: req.body.grade,
        guardFilm: req.body.guardFilm,
        batchNumber: req.body.batchNumber,
        purchaseNumber: req.body.purchaseNumber
    });

    try {
        const newUser = await user.save()
        res.status(200).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis server');
});

//admin also get the stock by this api......
exports.get = async (req, res) => {
    console.log('faching data')
    const stock = await AddStock.findOne({ purchaseNumber: req.params.purchaseNumber });

    client.SETEX(req.params.purchaseNumber, 60, JSON.stringify(stock), (err, result) => {
        if (err) {
            console.error('Redis command error:', err);
            res.status(500).json({ error: err.message });
        } else {
            console.log('Redis command result:', result);
            res.json({ result: result });
        }
        
    });
    // Return the stock object
    res.json({ res: stock });
}

exports.edit = async (req, res) => {
    try {
        const updatedAddStock = await AddStock.findOneAndUpdate({ purchaseNumber: req.params.purchaseNumber }).exec();
        updatedAddStock.set(req.body);
        var result = await updatedAddStock.save();
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.delete = async (req, res) => {
    try {
        await AddStock.findOneAndDelete({ purchaseNumber: req.params.purchaseNumber }).deleteOne();
        res.json({ message: "stock has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
