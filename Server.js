const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open',()=>{
    console.log("connected to mongo");
});

const itemSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
  nextDelivery: { type: String, required: true },
  deliveryAmt: { type: Number, required: true },
  name: { type: String, required: true },
});


const Item = mongoose.model('Item', itemSchema);


const app = express();
app.use(express.json());

app.post('/items', async (req, res) => {
  try {
    const newItem = await Item.create({
     price: req.body.price,
     inventory:req.body.inventory,
     nextDelivery:req.body.nextDelivery,
     deliveryAmt:req.body.deliveryAmt,
     name:req.body.name
    });
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});