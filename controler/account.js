
const { validationResult } = require('express-validator')

const Post = require('../models/post')
const { default: mongoose } = require('mongoose')
const User = require("../models/user")
const { post } = require('../routes/account')


exports.createaccount = (req, res, next) => {

    Post.findOne({where:{ phoneno:req.body.phoneno}}).then(userdoc => {
        if (userdoc) {
            res.status(422).json({
                message: 'phone no is already exits!',
            });
            return
        }

    })
    const name = req.body.name;
    const phoneno = req.body.phoneno;
    const initialbalance = req.body.initialbalance;
    Post.create({
        name: name,
        phoneno: phoneno,
        initialbalance: initialbalance,
        creator: req.userId

    })
        .then(result => {
            console.log('account is created')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getPost = (req, res, next) => {
    //const Acno=req.params.acno;
      Post.findAll({where:{delete:false}})
      .then(post=>{
        if(!post){
        const err=new Error("account doesn't Exist!");
        err.statusCode=401;
        throw err;
      }
        res.status(200).json({
          post:post
        });
      })
      .catch(err=>{
        if(!err.statusCode){
          err.statusCode=500;
        }
        next(err);
      });
    };
exports.updatePost = (req, res, next) => {
    const Acno = req.params.acno;
    // if (Acno === undefined || Acno === null) {
    //     const err = new Error("Enter Account number correctly");
    //     err.statusCode = 401;
    //     throw err;
    // }

    const updatedname = req.body.name;
    const updatedphoneno = req.body.phoneno;
    const updatedinitialbalance = req.body.initialbalance;

    Post.findByPk(Acno)
         .then(post => {
            if (!post) {
                const err = new Error("Account doesn't Exist!!");
                err.statusCode = 401;
                throw err;
            }
      
            post.name = updatedname
            post.phoneno = updatedphoneno
            post.initialbalance = updatedinitialbalance
            return post.save();
})
        .then(result => {
            console.log("Updated Successfully");
            res.status(200);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};
exports.deletePost = (req, res, next) => {
        const Acno=req.params.acno;
          Post.findOne(Acno)
          .then (post=>{
            if(!post.delete){
              post.delete=true
            }
            return post.save();
          })
          .then(result=>{
              console.log("Deleted Successfully");
          })
          .catch(err=>
              console.log(err));
      };
    
