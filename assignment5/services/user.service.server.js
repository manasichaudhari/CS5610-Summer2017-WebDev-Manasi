    var app = require('../../express');
    var userModel = require('../model/user/user.model.server');

    app.get ('/api/assignment5/user/:userId', findUserById);
    app.get ('/api/assignment5/user', findAllUsers);
    // app.get ('/api/assignment5/user?username=username&password=password', findUserByCredentials);
    app.post('/api/assignment5/user', createUser);
    app.put ('/api/assignment5/user/:userId', updateUser);
    app.delete ('/api/assignment5/user/:userId', deleteUser);

    // function findUserByCredentials(req,res) {
    //     var username = req.query['username'];
    //     var password = req.query['password'];
    //     for(var u in users) {
    //         var user = users[u];
    //         if( user.username === username &&
    //             user.password === password) {
    //             res.json(user);
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
    //     return;
    // }

    function createUser(req, res) {
        var user = req.body;
        return userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function (user) {
                if(user != null) {
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }
            });
    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(
                    function (user) {
                        if(user) {
                            res.json(user);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                );
        } else if (username) {
            userModel
                .findUserByUsername(username)
                .then(
                    function (user) {
                        if(user) {
                            res.json(user);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                );
        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                })
        }
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
        userModel
            .deleteUser(userId)
            .then(
                function () {
                    res.sendStatus(200);
                    return;
                });
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        userModel.updateUser(userId,user)
            .then(function () {
                res.sendStatus(200);
                return;
            });
    }

