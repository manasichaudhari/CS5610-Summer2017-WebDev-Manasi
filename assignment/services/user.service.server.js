    var app = require('../../express');
    var userModel = require('../model/user/user.model.server');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'displayName', 'name']
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    app.get ('/api/assignment/user/:userId', findUserById);
    app.get ('/api/assignment/user', findAllUsers);
    // app.post('/api/assignment/user', createUser);
    app.put ('/api/assignment/user/:userId', updateUser);
    // app.delete ('/api/assignment/user/:userId', deleteUser);
    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout', logout);
    app.post  ('/api/assignment/register', register);
    app.get  ('/api/assignment/loggedin', loggedin);
    app.delete('/api/assignment/unregister', unregister);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#!/profile',
            failureRedirect: '/assignment/index.html#!/login'
        }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#!/profile',
            failureRedirect: '/assignment/index.html#!/login'
        }));



    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user && bcrypt.compareSync(password,user.password)) {
                    done(null, user);
                } else {
                    done(null, false, {message: 'User not found!'});
                }
            }, function (error) {
                done(error, false);
            });
    }
    //
    // function createUser(req, res) {
    //
    //     var user = req.body;
    //     user.password = bcrypt.hashSync(user.password);
    //     return userModel.createUser(user)
    //         .then(function (doc) {
    //             res.json(doc);
    //             return;
    //         });
    //
    // }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel.findUserById(userId)
            .then(function (doc) {
                res.json(doc);
            });

    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            userModel.findUserByCredentials(username,password)
                .then(
                    function (user) {
                        if(user && bcrypt.compareSync(password, user.password)){
                            return done(null, user);
                        }
                        else{
                            return done(null, false);
                        }
                    }
                );
        } else if(username) {

          userModel.findUserByUsername(username)
              .then(
                  function (user) {
                      res.json(user);
                      return;
                  }
              );
        } else {
            res.json(users);
        }
    }

    // function deleteUser(req, res) {
    //     var userId = req.params['userId'];
    //     console.log(req.params._id);
    //     userModel
    //         .deleteUser(userId)
    //         .then(
    //             function () {
    //                 res.sendStatus(200);
    //                 return;
    //             });
    // }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        userModel.updateUser(userId,user)
            .then(function () {
                res.sendStatus(200);
                return;
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req,res) {
        res.json(req.user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    
    function loggedin(req,res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function unregister(req,res) {
        userModel
            .deleteUser(req.user._id)
            .then(function (status) {
                req.logout();
                res.sendStatus(200);

            });

    }

    //facebook strategy
    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username: emailParts[0] + '_facebook',
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    //google strategy
    function googleStrategy(token, refreshToken, profile, done) {
        // console.log(profile);
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }
