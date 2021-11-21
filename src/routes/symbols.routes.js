const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();


router.get('/', async (req,res) => {
    
    const fetch_response = await fetch('http://data.fixer.io/api/symbols?access_key=' + process.env.APIKEY);
    const data = await fetch_response.json();
    console.log(data)
    res.json(data);
})


module.exports = router;