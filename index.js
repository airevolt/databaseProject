const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const modelRoute = require('./routes/modelRoutes');
const customerModel = require('./models/customers');
const itemModel = require('./models/items');
const manufacturerModel = require('./models/manufacturers');
const purchaseModel = require('./models/purchaseOrder');
const salesModel = require('./models/salesorder');
const userModel = require('./models/users');

const pg = require('pg');

const Pool = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'galvanize',
    password: 'password',
    port: 5432,
})

app.use("/customers/", modelRoute(customerModel(pool)));
app.use("/items/", modelRoute(itemModel(pool)));
app.use("/manufacturers/", modelRoute(manufacturerModel(pool)));
app.use("/purchaseOrders/", modelRoute(purchaseModel(pool)));
app.use("/salesOrders/", modelRoute(salesModel(pool)));
app.use("/users/", modelRoute(userModel(pool)));

app.get((error, req, res, next) => {
    if (error) {
        console.error(error);
        res.sendStatus(500);
    } else {
        res.status(404).send("Page Not Found")
    }
})

app.listen(port, (error) => {
    console.log("started!")
})