
const { validationResult } = require('express-validator')
const Transaction = require('../models/transaction')
const Post = require("../models/post");
const { NUMBER } = require('sequelize');

exports.debitbalance = (req, res, next) => {
    const Acno = req.params.acno;

    const accountholdername = req.body.accountholdername;
    const acno = req.body.acno;
    const amount = req.body.amount;
    const type = req.body.type;
    const post = new Transaction({
        accountholdername: accountholdername,
        acno: acno,
        amount: amount,
        type: type,
    })
    post.save();
    Post.findOne({where:{ acno: Acno }})
        .then(post => {
            if (!post) {
                const error = new Error("could not find Account.")
                error.statusCode = 404;
                throw error;
            }
            post.initialbalance = Number(post.initialbalance) - Number(amount);
            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: `Amount ${amount} Debited successfully.`
                , post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.getbalance = (req, res, next) => {
    const Acno = req.params.acno;
    const amount = req.params.amount;
    Post.findOne({where:{acno:Acno}})
        .then(post => {

            res.status(200).json({ message: `current balance is ${amount}`, post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.creditbalance = (req, res, next) => {
    const Acno = req.params.acno
    const accountholdername = req.body.accountholdername;
    const acno = req.body.acno;
    const amount = req.body.amount;
    const type = req.body.type;
    const post = new Transaction({
        accountholdername: accountholdername,
        acno: acno,
        amount: amount,
        type: type,
    })
    post.save();
    Post.findOne({where:{acno:Acno}})
        .then(post => {
            if (!post) {
                const error = new Error("could not find Account.")
                error.statusCode = 404;
                throw error;
            }


            post.initialbalance = NUMBER(post.initialbalance) + NUMBER(amount);
            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: `Amount ${amount} credited successfully.`
                , post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}