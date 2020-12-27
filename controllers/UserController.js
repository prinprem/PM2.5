const config = require('../config/db');
const mongoose = require('mongoose');
const express = require('express');
const moment = require('moment');

const dbc = mongoose.connect(config.db);

const User = require('../models/User');

const getAllUser = (req, res) => {
    User.find({}, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
};

const createUser = (req, res) => {
    const dt = moment().format();
    const adduser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        created: dt,
    });
    adduser.save(function (err) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.json({ message: 'Create User Success' });
        }
    });
};

const updateUser = (req, res) => {
    const edituser = {};
    edituser.username = req.body.username;
    edituser.userpassword = req.body.userpassword;
    edituser.email = req.body.email;
    const query = { _id: req.params.id };
    User.update(query, edituser, function (err) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.json({ message: 'Update User Succ' });
        }
    });
};

const deleteUser = (req, res) => {
    const edituser = {};
    const query_user = { _id: req.params.id };
    User.remove(query_user, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: 'Delete User Succ' });
        }
    });
};

module.exports = { getAllUser, createUser, updateUser, deleteUser };
