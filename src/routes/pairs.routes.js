const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Pair = require('../models/pair')

const APIKEY = "824e753b9d8f1bf170e5adf80e7788e9"
const rates_url = "http://data.fixer.io/api/latest"


router.get('/', async (req,res) => {
    const pairs = await Pair.find();

    var coins = new Set()
    pairs.forEach((x) => coins.add(x["coin1"]).add(x["coin2"]));
    const symbols = Array.from(coins).join(",")

    const fetch_response = await fetch(rates_url + "?access_key=" + APIKEY + "&symbols=" + symbols);
    const data = await fetch_response.json();

    const rates = data.rates
    console.log(rates)
    var newPairs = new Array

    pairs.forEach(function (item) {
        let i = new Object
        i._id = item._id
        i.pair = item.coin1 + "-" + item.coin2
        i.originalRate = (rates[item.coin2] / rates[item.coin1]).toFixed(4)
        i.fee = (item.fee == null) ? [0, " %"].join('') : [item.fee, " %"].join('');
        i.feeTotal = ((rates[item.coin2] / rates[item.coin1]) * (item.fee/100)).toFixed(4)
        i.rateWithFee = ((rates[item.coin2] / rates[item.coin1]).toFixed(4) * (1 - item.fee/100)).toFixed(4)
        newPairs.push(i)
    })
    console.log(newPairs)
    res.json(newPairs);
});


router.post('/', async (req,res) => {
    const pair = new Pair(req.body);
    await pair.save();
    res.json({status: 'Pair saved'});
})


router.delete('/:id', async (req,res) => {
    await Pair.findByIdAndRemove(req.params.id);
    
    res.json({status: 'Pair deleted'});
})


router.get('/:id', async (req,res) => {
    const pair = await Pair.findById(req.params.id);
    res.json(pair);
})


module.exports = router;