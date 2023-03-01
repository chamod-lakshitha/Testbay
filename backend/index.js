const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routs/userRoutes');
const itemRoutes = require('./routs/itemRoutes');
const orderRoutes = require('./routs/orderRoutes');

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/order', orderRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log('listening');
});
