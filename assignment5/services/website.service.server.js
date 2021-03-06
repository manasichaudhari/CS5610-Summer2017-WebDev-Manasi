var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.get('/api/assignment5/user/:userId/website',findAllWebsitesForUser);
app.post('/api/assignment5/user/:userId/website',createWebsite);
app.get('/api/assignment5/website/:websiteId',findWebsiteById);
app.put('/api/assignment5/website/:websiteId',updateWebsite);
app.delete('/api/assignment5/user/:userId/website/:websiteId',deleteWebsite);

function findAllWebsitesForUser(req,res) {
    var userId = req.params['userId'];
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
            return;
        });
}

function createWebsite(req,res) {
    var userId = req.params['userId'];
    var website = req.body;
    return websiteModel
        .createWebsiteForUser(userId,website)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
            return;
        });
}

function updateWebsite(req,res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    return websiteModel
        .updateWebsite(websiteId,website)
        .then(function () {
            res.sendStatus(200);
            return;
        });

}

function deleteWebsite(req,res) {
    var websiteId = req.params['websiteId'];
    var userId = req.params['userId'];
    return websiteModel
        .deleteWebsite(userId,websiteId)
        .then(function () {
            res.sendStatus(200);
            return;
        } );
}