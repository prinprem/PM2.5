const config = require('../config/db');
const mongoose = require('mongoose');
const express = require('express');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const dbc = mongoose.connect(config.db);

const User = require('../models/User');

const maxAge = 1000 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, 'prin-todo', {
    expiresIn: maxAge,
  });
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { logout, signup, login };
