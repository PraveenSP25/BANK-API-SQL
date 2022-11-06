const express = require('express');
const bodyparser = require('body-parser')

const sequelize=require("./util/database")

const { config } = require('dotenv');

config();

const accountRoutes = require('./routes/account');
const authRoutes = require('./routes/auth');
const middleware = require("./middleware/is_user_account")
const transactionRoutes = require('./routes/transaction');

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "Control-Type,Authorization");
    next();
})
app.use(bodyparser.json())

app.use('/account', accountRoutes);
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);
app.use("/is_user_account", middleware)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message
    const data = error.data;
    res.status(status).json({ message: message, data: data })

})
sequelize.sync().then(result=>{
    //console.log(result)
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})





