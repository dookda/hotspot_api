const express = require('express');
const app = express.Router();

const request = require('request');
const csv = require('csvtojson');
const turf = require('@turf/turf');

// const con = require('./conn');
// const db = con.th;

const json = require('./th_geojson');

// pl ud pr st extent
var poly_pl = turf.polygon(json.pl.features[0].geometry.coordinates[0]);
var poly_pr = turf.polygon(json.pr.features[0].geometry.coordinates[0]);
var poly_ud = turf.polygon(json.ud.features[0].geometry.coordinates[0]);
var poly_st = turf.polygon(json.st.features[0].geometry.coordinates[0]);
var poly_th = turf.polygon(json.th.features[0].geometry.coordinates[0]);

var poly = turf.polygon([
    [
        [99.36734051792395, 16.320423380302735],
        [101.19256380509475, 16.320423380302735],
        [101.19256380509475, 18.834396175460839],
        [99.36734051792395, 18.834396175460839],
        [99.36734051792395, 16.320423380302735]
    ]
]);

app.get('/hp_api/test', (req, res, next) => {
    const sql = "select ST_AsGeoJSON(ST_LineMerge(geom))::jsonb from province where prov_code='53'";

    db.query(sql).then((data) => {
        // console.log(data);
        res.send(JSON.stringify(data))
    }).catch((error) => {
        return next(error)
    })

})

var b = []
const da = function () {
    request('http://www.cgi.uru.ac.th/geoserver/th/ows?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeName=th%3Aprovince_4326' +
        '&CQL_FILTER=pro_code=%2753%27&outputFormat=application%2Fjson', {
        json: true
    }, async (err, res, body) => {
        await b.push(body.features[0].geometry.coordinates[0][0]);
        // console.log(d)
        // return d;
    })
}



app.get("/hp_api/hp_modis", async function (req, res, next) {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let jsonFeatures = [];
            let pl = 0;
            let pr = 0;
            let ud = 0;
            let st = 0;
            data.forEach(function (point) {
                let lat = Number(point.latitude);
                let lon = Number(point.longitude);
                let pt = turf.point([lon, lat]);
                if (turf.booleanPointInPolygon(pt, poly_pl) == true) pl += 1;
                if (turf.booleanPointInPolygon(pt, poly_pr) == true) pr += 1;
                if (turf.booleanPointInPolygon(pt, poly_ud) == true) ud += 1;
                if (turf.booleanPointInPolygon(pt, poly_st) == true) st += 1;
                if (turf.booleanPointInPolygon(pt, poly) == true) {
                    let feature = {
                        type: 'Feature',
                        properties: point,
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        }
                    };
                    jsonFeatures.push(feature);
                }
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            await res.status(200).json({
                status: 'success',
                pl: pl,
                pr: pr,
                st: st,
                ud: ud,
                data: geoJson,
                message: 'retrived survey data'
            })
        }).catch((error) => {
            return next(error)
        })
});

app.get("/hp_api/hp_viirs", async function (req, res, next) {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let jsonFeatures = [];
            let pl = 0;
            let pr = 0;
            let ud = 0;
            let st = 0;

            data.forEach(function (point) {
                let lat = Number(point.latitude);
                let lon = Number(point.longitude);
                let pt = turf.point([lon, lat]);
                if (turf.booleanPointInPolygon(pt, poly_pl) == true) pl += 1;
                if (turf.booleanPointInPolygon(pt, poly_pr) == true) pr += 1;
                if (turf.booleanPointInPolygon(pt, poly_ud) == true) ud += 1;
                if (turf.booleanPointInPolygon(pt, poly_st) == true) st += 1;
                if (turf.booleanPointInPolygon(pt, poly) == true) {
                    let feature = {
                        type: 'Feature',
                        properties: point,
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        }
                    };
                    jsonFeatures.push(feature);
                }
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            await res.status(200).json({
                status: 'success',
                pl: pl,
                pr: pr,
                st: st,
                ud: ud,
                data: geoJson,
                message: 'retrived survey data'
            });

        }).catch((error) => {
            return next(error)
        })
});

app.get("/hp_api/hp_modis_th", async function (req, res, next) {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let jsonFeatures = [];
            let th = 0;

            data.forEach(function (point) {
                let lat = Number(point.latitude);
                let lon = Number(point.longitude);
                let pt = turf.point([lon, lat]);
                if (turf.booleanPointInPolygon(pt, poly_th) == true) th += 1;
                if (turf.booleanPointInPolygon(pt, poly_th) == true) {
                    let feature = {
                        type: 'Feature',
                        properties: point,
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        }
                    };
                    jsonFeatures.push(feature);
                }
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            await res.status(200).json({
                status: 'success',
                th: th,
                data: geoJson,
                message: 'retrived survey data'
            });
        }).catch((error) => {
            return next(error)
        })
});

app.get("/hp_api/hp_viirs_th", (req, res, next) => {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let jsonFeatures = [];
            let th = 0;

            data.forEach(async (dat) => {
                let lat = Number(dat.latitude);
                let lon = Number(dat.longitude);
                let pt = turf.point([lon, lat]);
                if (turf.booleanPointInPolygon(pt, poly_th) == true) th += 1;
                if (turf.booleanPointInPolygon(pt, poly_th) == true) {
                    let feature = {
                        type: 'Feature',
                        properties: dat,
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        }
                    };
                    jsonFeatures.push(feature);
                }
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            await res.status(200).json({
                status: 'success',
                th: th,
                data: geoJson,
                message: 'retrived survey data'
            });
        }).catch((error) => {
            return next(error)
        })
});

app.get('/hp_api/hex', (req, res, next) => {
    var bbox = [97.046984, 4.9, 106.331699, 21.2];
    var cellSide = 20;
    var options = { units: 'kilometers' };

    var hexgrid = turf.hexGrid(bbox, cellSide, options);

    var c = json.th.features[0].geometry.coordinates[0];
    var b = turf.polygon(c);

    var e = hexgrid.features.filter(i => {
        var a = turf.booleanDisjoint(i, b)
        if (a == false) {
            return i
        }
    })

    res.status(200).json({
        status: 'success',
        data: {
            type: 'FeatureCollection',
            features: e
        },
        message: 'retrived survey data'
    });
})

app.get("/hp_api/hex_viirs_th", (req, res, next) => {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let pnts = [];

            data.forEach(async (dat) => {
                let lat = Number(dat.latitude);
                let lon = Number(dat.longitude);
                let pt = turf.point([lon, lat]);

                if (turf.booleanPointInPolygon(pt, poly_th) == true) {
                    pnts.push([lon, lat])
                }
            });
            console.log(pnts)

            var hp = turf.points(pnts);
            // create hexagon
            var bbox = [97.046984, 4.9, 106.331699, 21.2];
            var cellSide = 20;
            var options = { units: 'kilometers' };

            var hexgrid = turf.hexGrid(bbox, cellSide, options);

            var jsonTh = json.th.features[0].geometry.coordinates[0];
            var polyTh = turf.polygon(jsonTh);

            var hex = hexgrid.features.filter(i => {
                var a = turf.booleanDisjoint(i, polyTh)
                if (a == false) {
                    var ptsWithin = turf.within(hp, i);
                    i.properties = { cnt: ptsWithin.features.length }
                    return i
                }
            })

            await res.status(200).json({
                data: {
                    type: 'FeatureCollection',
                    features: hex
                }
            });
        }).catch((error) => {
            return next(error)
        })
});

module.exports = app;