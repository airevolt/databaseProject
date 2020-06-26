const express = require("express");
const bodyParser = require("body-parser")

module.exports = (model) => {
    const rtr = express.Router();

    rtr.get("/", (req, res, next) => {
        model.read().then(val => {
            res.send(val)
        }).catch((error) => {
            next(error)
        })
    })


    rtr.get("/:id", (req, res, next) => {
        model.read(req.params.id).then(val => {
            if (val.length === 0) {
                res.sendStatus(404)
            } else {
                res.send(val)
            }
        }).catch((error) => {
            next(error)
        });
    })

    rtr.post("/", bodyParser.json(), (req, res, next) => {
        model.create(req.body).then(id => {
            res.send({ message: "success", id })
        }).catch((error) => {
            next(error)
        });
    })


    rtr.patch("/:id", bodyParser.json(), (req, res, next) => {
        model.update(req.params.id, req.body).then(() => {
            res.send({ message: "success" })
        }).catch((error) => {
            next(error)
        });
    })

    rtr.delete("/:id", (req, res, next) => {
        model.delete(req.params.id).then(() => {
            res.send({ message: "success" })
        }).catch((error) => {
            next(error)
        });
    })
    return rtr
};