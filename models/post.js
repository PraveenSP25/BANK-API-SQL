const Sequelize=require("sequelize")
const sequelize=require("../util/database")
const Post=sequelize.define('post',{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:false

    },
    phoneno:{
        type:Sequelize.BIGINT,
        primaryKey:false,
        allowNull:false

    },
    acno:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    initialbalance:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:false
    },
    delete:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: true
        
      }

})
module.exports=Post;