const express= require('express');
const app = express();
const bodyParser =require('body-parser');
const morgan =require('morgan');
const mongoose = require('mongoose');
const cors=require('cors');
const authJwt=require('./helpers/jwt');
//const errorHandler=require('./helpers/error-handler');


require('dotenv/config');



app.use(cors());
app.options('*',cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));


//app.use(errorHandler());


//Routers
const productsRoutes=require('./routers/products');
const categoriesRoutes=require('./routers/categories');
const usersRoutes =require('./routers/users');
const ordersRoutes =require('./routers/orders');


const api= process.env.API_URL;

app.use(`${api}/products`,productsRoutes);
app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/users`,usersRoutes);
app.use(`${api}/orders`,ordersRoutes);


mongoose.connect('mongodb+srv://eshop-user:livemealone@cluster0.qkcjg.mongodb.net/eshop-database?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'eshop-database'
})
.then(()=>{
    console.log('database connction is ready')
})
.catch((err)=>{
    console.log(err);
});

const PORT =process.env.PORT || 3000;

//server
app.listen(PORT, ()=>{
    console.log(api);
    console.log('server is running http://localhost:3000');
})
