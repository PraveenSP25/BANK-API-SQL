const Sequelize=require("sequelize")
const sequelize=require("../util/database")
const Post=sequelize.define('Transaction',{
    accountholdername:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:false

    },
    amount:{
        type:Sequelize.INTEGER,
        primaryKey:false,
        allowNull:false

    },
    acno:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    type:{
        type:Sequelize.STRING,
        allowNull:false,
        enum:["Debit","Credit"],
        primaryKey:false
    },
})
module.exports=Post;
