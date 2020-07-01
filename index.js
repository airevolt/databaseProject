const express = require('express')
const app = express();
//const port = process.env.PORT || 4000;
const modelRoute = require('./routes/modelRoutes');
const customerModel = require('./models/customers');
const itemModel = require('./models/items');
const manufacturerModel = require('./models/manufacturers');
const purchaseModel = require('./models/purchaseOrder');
const salesModel = require('./models/salesorder');
const userModel = require('./models/users');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const config = {
    name: 'ecommerce-app',
    port: 4000,
    host: '127.0.0.1',
};

const logger = log({ console: true, file: false, label: config.name });

const pg = require('pg');
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

const Pool = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'galvanize',
    password: 'galvanize',
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

// app.listen(port, (error) => {
//     console.log("Container is running!")
// })

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});