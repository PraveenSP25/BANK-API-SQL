const Sequelize=require("sequelize")
const sequelize=require("../util/database")
const Post=sequelize.define('user',{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:false

    },
    email:{
        type:Sequelize.STRING,
        primaryKey:false,
        allowNull:false

    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },

})
module.exports=Post;