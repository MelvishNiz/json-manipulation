const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;
const path = require('path');
const fs = require("fs");

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/data.json`));
});

//find by placement name
app.get('/placement/:name', (req, res) => {
    var name = req.params.name;
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            res.send({
                "status": "error"
            })
            return;
        } else {
            var obj = JSON.parse(jsonString);
            var array = [];
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].placement.name.toLowerCase().includes(name.toLowerCase())) {
                    array.push(obj[i])
                }
            }
            res.send({
                "code": 200,
                "status": "success",
                "data": array
            });
        }
    });
});

// find by type
app.get('/type/:type', (req, res) => {
    var type = req.params.type;
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            res.send({
                "status": "error"
            })
            return;
        } else {
            var obj = JSON.parse(jsonString);
            var array = [];
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].type.toLowerCase().includes(type.toLowerCase())) {
                    array.push(obj[i])
                }
            }
            res.send({
                "code": 200,
                "status": "success",
                "data": array
            });
        }
    });
});

//find by timestamp
app.get('/time/:timestamp', (req, res) => {
    var timestamp = parseInt(req.params.timestamp);
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var timeString = `${year}${month}${day}`;

    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            res.send({
                "status": "error"
            })
            return;
        } else {
            var obj = JSON.parse(jsonString);
            var array = [];
            for (var i = 0; i < obj.length; i++) {
                var date2 = new Date(obj[i].purchased_at * 1000);
                var year2 = date2.getFullYear();
                var month2 = date2.getMonth() + 1;
                var day2 = date2.getDate();
                var timeString2 = `${year2}${month2}${day2}`;
                if (timeString === timeString2) {
                    array.push(obj[i])
                }
            }
            res.send({
                "code": 200,
                "status": "success",
                "data": array
            });
        }
    });
});

// find by tag
app.get('/tag/:tag', (req, res) => {
    var tag = req.params.tag;
    fs.readFile("./data.json", "utf8", (err, jsonString) => {
        if (err) {
            res.send({
                "status": "error"
            })
            return;
        } else {
            var obj = JSON.parse(jsonString);
            var array = [];
            for (var i = 0; i < obj.length; i++) {
                for (var b = 0; b < obj[i].tags.length; b++) {
                    if (obj[i].tags[b].toLowerCase().includes(tag.toLowerCase())) {
                        array.push(obj[i])
                    }
                }
            }
            res.send({
                "code": 200,
                "status": "success",
                "data": array
            });
        }
    });
});

app.listen(port, () => {
    console.log('listening on port http://localhost:' + port);
});