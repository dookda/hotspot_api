let userid;
$(document).ready(async function () {
    // await liff.init({ liffId: "1653987548-eakD174y" });
    loadMap();
});

let latlng = {
    lat: 16.820378,
    lng: 100.265787
};
let map = L.map("map", {
    center: latlng,
    zoom: 16
});
let marker, gps, dataurl;
// const url = 'http://localhost:3600';
const url = "https://rti2dss.com:3600";

function loadMap() {
    var mapbox = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
            maxZoom: 18,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/light-v9",
            tileSize: 512,
            zoomOffset: -1
        }
    );

    const ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
    });

    var pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: "th:province_4326",
        format: "image/png",
        transparent: true
    });

    var baseMap = {
        Mapbox: mapbox,
        "google Hybrid": ghyb.addTo(map)
    };

    var overlayMap = {
        "ขอบจังหวัด": pro
    };
    L.control.layers(baseMap, overlayMap).addTo(map);
}

function onLocationFound(e) {
    gps = L.marker(e.latlng)
}

function onLocationError(e) {
    console.log(e.message);
}

map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 19 });

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();

$(".place").click(function () {
    $(this).toggleClass("green");
});

// function insertData() {
//   const obj = {
//     sname: $("#sname").val(),
//     saqi: emoji,
//     img: dataurl,
//     geom: JSON.stringify(gps.toGeoJSON().geometry)
//   };
//   console.log(obj)
// }

function insertData() {
    const obj = {
        place: $("#place").val(),
        geom: JSON.stringify(gps.toGeoJSON().geometry)
    };

    console.log(obj);

    $.post(url + "/safe-api/insertmemo", obj).done(res => {
        console.log(obj)
        // getData();
        $("#place").val("");
        // window.close();
    });
    return false;
}
