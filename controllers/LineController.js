const config = require('../config/db');
const mongoose = require('mongoose');
const express = require('express');
const moment = require('moment');

const dbc = mongoose.connect(config.db);

const LineUser = require('../models/LineUser');

const webhook = (req, res) => {
    res.status(200);
};

const log = (req, res) => {
    res.send(req.body);
};

const getAllLineUser = (req, res) => {
    LineUser.find({}, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
};

const createLineUser = (req, res) => {
    const dt = moment().format();
    const adduser = new LineUser({
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
            res.json({ message: 'Create LineUser Success' });
        }
    });
};

const updateLineUser = (req, res) => {
    const edituser = {};
    edituser.username = req.body.username;
    edituser.userpassword = req.body.userpassword;
    edituser.email = req.body.email;
    const query = { _id: req.params.id };
    LineUser.update(query, edituser, function (err) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.json({ message: 'Update LineUser Succ' });
        }
    });
};

const deleteLineUser = (req, res) => {
    const edituser = {};
    const query_user = { _id: req.params.id };
    LineUser.remove(query_user, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: 'Delete LineUser Succ' });
        }
    });
};

module.exports = { getAllLineUser, createLineUser, updateLineUser, deleteLineUser, webhook, log };
