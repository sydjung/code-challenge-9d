// =======================
// Env Configuration =====
// =======================
require('./config/config');

// =======================
// Library imports =======
// =======================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// =======================
// Set up express app ====
// =======================
var app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function validateRequest(req, res, next) {
    res.set('content-type', 'application/json');
    if (req.headers["content-type"] === 'application/json') {
        // try {
        //     // if (!req.body.hasOwnProperty('payload')) {
        //     //     return res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
        //     // }

        //     const payload = JSON.parse(req.body.payload);            

            
        // } catch (e) {
        //     res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
        // }
        next();
    } else {
        return res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
    }
}

// =======================
// Routes ================
// =======================
// root path for deployment
app.post('/', validateRequest, (req, res) => { 
    
    try {
        if (!req.body.hasOwnProperty('payload')) {
            return res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
        }

        const payload = req.body.payload;
        const result = { response: [] };

        // filter data with drm: true and episodeCount > 0
        for (let i = 0; i < payload.length; i++) {
            if (payload[i].drm === true && payload[i].episodeCount > 0) {
                result.response.push({
                    image: payload[i].image.showImage,
                    slug: payload[i].slug,
                    title: payload[i].title
                });
            }
        }

        res.json(result);
    } catch (e) {
        res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
    }








    // console.log(req.body)
    // var jsonStr = req.body;
    // try {
    //     jsonObj = JSON.parse(jsonStr)
    //     res.send('success')
    // } catch(e) {
    //     res.status(400).send('Invald')
    // }





    // try {
    //     if (!req.body.hasOwnProperty('payload')) {
    //         return res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
    //     }

    //     const payload = req.body.payload;
    //     const result = { response: [] };

    //     // filter data with drm: true and episodeCount > 0
    //     for (let i = 0; i < payload.length; i++) {
    //         if (payload[i].drm === true && payload[i].episodeCount > 0) {
    //             result.response.push({
    //                 image: payload[i].image.showImage,
    //                 slug: payload[i].slug,
    //                 title: payload[i].title
    //             });
    //         }
    //     }

    //     res.json(result);
    // } catch (e) {
    //     res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
    // }




    // if (req.is('application/json') && (req.body.hasOwnProperty('payload'))) {
    //     console.log('Content/type: ' , res.header)
    //     const payload = req.body.payload;
    //     const result = { response: [] };

    //     // filter data with drm: true and episodeCount > 0
    //     for (let i = 0; i < payload.length; i++) {
    //         if (payload[i].drm === true && payload[i].episodeCount > 0) {
    //             result.response.push({
    //                 image: payload[i].image.showImage,
    //                 slug: payload[i].slug,
    //                 title: payload[i].title
    //             });
    //         }
    //     }

    //     if (!result) {
    //         return res.status(404).send({ "response": "Not found" });
    //     }

    //     res.send(result);
    // } else {
    //     res.status(400).send({ "error": "Could not decode request: JSON parsing failed" });
    // }
});

// Send response 400 status for the rest routes
app.use('/*', function(req, res) { res.status(400).send({ "error": "Unable to handle request" }); });

// =======================
// start the server ======
// =======================
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};