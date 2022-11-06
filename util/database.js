const Sequelize=require("sequelize")
const sequelize=new Sequelize("bankdb","root","",
{
    dialect:"mysql",
    host:"localhost"
});
module.exports=sequelize;