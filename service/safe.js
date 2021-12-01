const express = require('express');
const app = express.Router();

const con = require("./db");
const db = con.safe;

app.post('/safe-api/insertmemo', (req, res, next) => {
    const { place, geom } = req.body;
    const sql = 'INSERT INTO memo (place,pdate,geom) ' +
        'VALUES ($1,now(),ST_SetSRID(ST_GeomFromGeoJson($2), 4326))';
    const val = [place, geom];
    db.query(sql, val).then((data) => {
        res.status(200).json({
            status: "insert success"
        });
    }).catch((err) => {
        return next(err);
    })
});

module.exports = app;