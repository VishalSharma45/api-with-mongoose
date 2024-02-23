const express = require('express');
const app = express();
require('./config');
const Products = require('./product');

// Jab bhi data aata hai tab woh string me hota hai, express.json() se hum string to json me convert karte hai
app.use(express.json());

// Insert record
app.post("/create", async (req, res) => {
    let data = new Products(req.body);
    // is save() function ki madad se database me hum data save karenge
    let result = await data.save();
    res.send(result);
    console.log(result);
});

//  Get records
app.get("/list", async (req, res) => {
    let data = await Products.find();
    res.send(data);
});

// Delete record
app.delete("/delete/:_id", async (req, res) => {
    console.log(req.params);
    let data = await Products.deleteOne(req.params);
    res.send(data);
});

// Update record
app.put("/update/:_id", async (req, res) => {
    console.log(req.params);
    let data = await Products.updateOne(
        req.params,
        { $set: req.body });

    console.log(data);
});

// Search records
app.get("/search/:key", async (req, res)=>{
    // This console will prints object like 
    // { key: 'samsung' }
    console.log(req.params);
    let data = await Products.find(
        {
        "$or":[ // this "$or" means results are from multiple fields
            {name: {$regex:req.params.key}},
            {brand: {$regex:req.params.key}}
        ]
    })
    res.send(data);
});

app.listen(5500);
