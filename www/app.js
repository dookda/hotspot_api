var map = L.map('map').setView([14, 100.20], 6);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 19
});

const grod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const ghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const gter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/ows?", {
    layers: 'th:province_4326',
    format: 'image/png',
    transparent: true,
    zIndex: 5,
    // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
});

var baseMaps = {
    "Grayscale": Esri_WorldGrayCanvas.addTo(map),
    "osm": osm,
    "grod": grod,
    "ghyb": ghyb,
    "gter": gter
};

var overlayMaps = {
    "ขอบเขตจังหวัด": pro.addTo(map)
};

const lyrControl = L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

const iconfire = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBzdHlsZT0iZmlsbDojRkY2NTM2OyIgZD0iTTU0LjIxMSwyNDkuN2MwLDAsMjAuMjI4LDI5LjcxNyw2Mi42MjQsNTQuODcxYzAsMC0zMC43MDUtMjU5LjUwMiwxNjkuMzU4LTMwNC41NzEgIGMtNTEuMjU3LDE4OC4xMjEsNjUuMiwyNDEuMTc0LDEwNy42NTEsMTQxLjc4NmM3MC44OTMsOTQuNjUxLDE3LjA2NiwxNzcuMjI5LDE3LjA2NiwxNzcuMjI5ICBjMjkuMDY5LDQuMTg4LDUzLjQ4Ny0yNy41Nyw1My40ODctMjcuNTdjMC4yMTgsMy45MTIsMC4zNCw3Ljg1MSwwLjM0LDExLjgxOEM0NjQuNzM4LDQxOC41NDUsMzcxLjI4Myw1MTIsMjU2LDUxMiAgUzQ3LjI2Miw0MTguNTQ1LDQ3LjI2MiwzMDMuMjYyQzQ3LjI2MiwyODQuNzQ0LDQ5LjY4NiwyNjYuNzk0LDU0LjIxMSwyNDkuN3oiIGRhdGEtb3JpZ2luYWw9IiNGRjY1MzYiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojRkY0MjFEOyIgZD0iTTQ2NC4zOTgsMjkxLjQ0NWMwLDAtMjQuNDE4LDMxLjc1OC01My40ODcsMjcuNTdjMCwwLDUzLjgyNy04Mi41NzgtMTcuMDY2LTE3Ny4yMjkgIEMzNTEuMzk0LDI0MS4xNzQsMjM0LjkzNywxODguMTIxLDI4Ni4xOTQsMEMyNzUuNDc5LDIuNDE0LDI2NS40MzEsNS40NDcsMjU2LDkuMDE4VjUxMmMxMTUuMjgzLDAsMjA4LjczOC05My40NTUsMjA4LjczOC0yMDguNzM4ICBDNDY0LjczOCwyOTkuMjk1LDQ2NC42MTYsMjk1LjM1Nyw0NjQuMzk4LDI5MS40NDV6IiBkYXRhLW9yaWdpbmFsPSIjRkY0MjFEIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6I0ZCQkYwMDsiIGQ9Ik0xNjQuNDU2LDQyMC40NTZDMTY0LjQ1Niw0NzEuMDE0LDIwNS40NDIsNTEyLDI1Niw1MTJzOTEuNTQ0LTQwLjk4Niw5MS41NDQtOTEuNTQ0ICBjMC0yNy4wNjEtMTEuNzQxLTUxLjM3OS0zMC40MDgtNjguMTM4Yy0zNS4zOTQsNDguMDg1LTg1LjgzMi0yNC44NTYtNDYuNTI0LTc4LjEyMiAgQzI3MC42MTIsMjc0LjE5NiwxNjQuNDU2LDI4Ny40OTksMTY0LjQ1Niw0MjAuNDU2eiIgZGF0YS1vcmlnaW5hbD0iI0ZCQkYwMCIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHN0eWxlPSJmaWxsOiNGRkE5MDAiIGQ9Ik0zNDcuNTQ0LDQyMC40NTZjMC0yNy4wNjEtMTEuNzQxLTUxLjM3OS0zMC40MDgtNjguMTM4Yy0zNS4zOTQsNDguMDg1LTg1LjgzMi0yNC44NTYtNDYuNTI0LTc4LjEyMiAgYzAsMC01Ljc2OCwwLjcyNS0xNC42MTIsMy41MTZWNTEyQzMwNi41NTgsNTEyLDM0Ny41NDQsNDcxLjAxNCwzNDcuNTQ0LDQyMC40NTZ6IiBkYXRhLW9yaWdpbmFsPSIjRkZBOTAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiPjwvcGF0aD48L2c+IDwvc3ZnPg==`;
const iconfire2 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48Zz48cGF0aCBzdHlsZT0iZmlsbDojRkVCNDlFIiBkPSJNNTQuMjExLDI0OS43YzAsMCwyMC4yMjgsMjkuNzE3LDYyLjYyNCw1NC44NzFjMCwwLTMwLjcwNS0yNTkuNTAyLDE2OS4zNTgtMzA0LjU3MSAgYy01MS4yNTcsMTg4LjEyMSw2NS4yLDI0MS4xNzQsMTA3LjY1MSwxNDEuNzg2YzcwLjg5Myw5NC42NTEsMTcuMDY2LDE3Ny4yMjksMTcuMDY2LDE3Ny4yMjkgIGMyOS4wNjksNC4xODgsNTMuNDg3LTI3LjU3LDUzLjQ4Ny0yNy41N2MwLjIxOCwzLjkxMiwwLjM0LDcuODUxLDAuMzQsMTEuODE4QzQ2NC43MzgsNDE4LjU0NSwzNzEuMjgzLDUxMiwyNTYsNTEyICBTNDcuMjYyLDQxOC41NDUsNDcuMjYyLDMwMy4yNjJDNDcuMjYyLDI4NC43NDQsNDkuNjg2LDI2Ni43OTQsNTQuMjExLDI0OS43eiIgZGF0YS1vcmlnaW5hbD0iI0ZDOTU3NSIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iI0ZDOTU3NSI+PC9wYXRoPjxwYXRoIHN0eWxlPSJmaWxsOiNGQTg5NzMiIGQ9Ik00NjQuMzk4LDI5MS40NDVjMCwwLTI0LjQxOCwzMS43NTgtNTMuNDg3LDI3LjU3YzAsMCw1My44MjctODIuNTc4LTE3LjA2Ni0xNzcuMjI5ICBDMzUxLjM5NCwyNDEuMTc0LDIzNC45MzcsMTg4LjEyMSwyODYuMTk0LDBDMjc1LjQ3OSwyLjQxNCwyNjUuNDMxLDUuNDQ3LDI1Niw5LjAxOFY1MTJjMTE1LjI4MywwLDIwOC43MzgtOTMuNDU1LDIwOC43MzgtMjA4LjczOCAgQzQ2NC43MzgsMjk5LjI5NSw0NjQuNjE2LDI5NS4zNTcsNDY0LjM5OCwyOTEuNDQ1eiIgZGF0YS1vcmlnaW5hbD0iI0ZBNzI1NyIgY2xhc3M9IiIgZGF0YS1vbGRfY29sb3I9IiNGQTcyNTciPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojRkJCRjAwOyIgZD0iTTE2NC40NTYsNDIwLjQ1NkMxNjQuNDU2LDQ3MS4wMTQsMjA1LjQ0Miw1MTIsMjU2LDUxMnM5MS41NDQtNDAuOTg2LDkxLjU0NC05MS41NDQgIGMwLTI3LjA2MS0xMS43NDEtNTEuMzc5LTMwLjQwOC02OC4xMzhjLTM1LjM5NCw0OC4wODUtODUuODMyLTI0Ljg1Ni00Ni41MjQtNzguMTIyICBDMjcwLjYxMiwyNzQuMTk2LDE2NC40NTYsMjg3LjQ5OSwxNjQuNDU2LDQyMC40NTZ6IiBkYXRhLW9yaWdpbmFsPSIjRkJCRjAwIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6I0ZGQTkwMCIgZD0iTTM0Ny41NDQsNDIwLjQ1NmMwLTI3LjA2MS0xMS43NDEtNTEuMzc5LTMwLjQwOC02OC4xMzhjLTM1LjM5NCw0OC4wODUtODUuODMyLTI0Ljg1Ni00Ni41MjQtNzguMTIyICBjMCwwLTUuNzY4LDAuNzI1LTE0LjYxMiwzLjUxNlY1MTJDMzA2LjU1OCw1MTIsMzQ3LjU0NCw0NzEuMDE0LDM0Ny41NDQsNDIwLjQ1NnoiIGRhdGEtb3JpZ2luYWw9IiNGRkE5MDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPiA8L3N2Zz4=`;
const hp = L.icon({
    iconUrl: iconfire,
    iconSize: [32, 37],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

const hp2 = L.icon({
    iconUrl: iconfire2,
    iconSize: [32, 37],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

const url = "https://rti2dss.com:3600";

$.get(url + "/hp_api/hp_viirs_th").done(r => {
    const fs = r.data.features;
    const marker = L.geoJSON(fs, {
        pointToLayer: (feature, latlng) => {
            if (feature.properties.acq_date === this.now) {
                return L.marker(latlng, {
                    icon: hp,
                    properties: feature.properties.latitude,
                    iconName: 'da'
                });
            } else {
                return L.marker(latlng, {
                    icon: hp2,
                    properties: feature.properties.latitude,
                    iconName: 'da'
                });
            }
        },
        onEachFeature: (feature, layer) => {
            if (feature.properties) {
                const time = feature.properties.acq_time;
                const hr = Number(time.slice(0, 2));
                const mn = Number(time.slice(2, 4));
                layer.bindPopup(
                    'lat: ' + feature.properties.latitude +
                    '<br/>lon: ' + feature.properties.longitude +
                    '<br/>satellite: ' + feature.properties.satellite +
                    '<br/>วันที่: ' + feature.properties.acq_date +
                    '<br/>เวลา: ' + hr + ':' + mn
                );
            }
        }
    }).addTo(map);

    lyrControl.addOverlay(marker, "hotspot");
})

$.get(url + "/hp_api/hex_viirs_th").done(r => {
    const poly = r.data.features;
    const hex = L.geoJSON(poly, {
        style: (feature) => {
            return {
                fillColor: getColor(feature.properties.cnt),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.5
            };
        }
    }).addTo(map);

    lyrControl.addOverlay(hex, "hotspot density");
})


function getColor(d) {
    return d >= 100 ? '#800026' :
        d >= 50 ? '#BD0026' :
            d >= 20 ? '#E31A1C' :
                d >= 10 ? '#FC4E2A' :
                    d >= 5 ? '#FD8D3C' :
                        d >= 2 ? '#FEB24C' :
                            d >= 1 ? '#FED976' :
                                '#FFF';
}

function onEachFeature(e) {
    $.get(url + "/hp_api/hp_viirs_th").done(r => {
        // console.log(e)
        const fs = r.data.features;
        var ptsWithin = turf.pointsWithinPolygon(fs, e);
        console.log(ptsWithin)
    })
}

