const express = require('express');
const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'checkInflux',
    username: "kaizen",

    password: "influx@123",
});
const app = express();


influx.writePoints([

    {

        measurement: "sensorData",

        tags: {tag: 'home'},

        fields: {temp: 20, hum: 40},

        timestamp: Date.now(),

    },

])

    .then(() => {

        console.log("Data saved to InfluxDB");

    })

    .catch((err) => {

        console.error("Error writing data to InfluxDB:", err);

    });

const dataInflux = influx.query(`SELECT * FROM sensorData`).then((res)=>console.log(res)).catch((err)=>console.log(err))
console.log(dataInflux)

app.listen('8000', () => {
    console.log('listening to port 8000');
})

