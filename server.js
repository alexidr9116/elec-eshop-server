const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const { appendFile } = require('fs');
require('dotenv').config();

const app = express();

// api
const AuthAPI = require('./routes/api/AuthRouter');
const CategoryAPI = require('./routes/api/CategoryRouter');
const ProductAPI = require('./routes/api/ProductRouter');
const CommonAPI = require('./routes/api/CommonRouter');
const UserAPI = require('./routes/api/UserRouter');
const ChatAPI = require('./routes/api/ChatRouter');

const HookAPI = require('./routes/api/HookRouter');
const ReviewAPI = require('./routes/api/ReviewRouter');

const TransactionAPI = require('./routes/api/TransactionRouter');

// install middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.raw());

// install passport
app.use(passport.initialize());
require('./config/passport.config')(passport);

// install routers
app.use('/api/e-shop/auth/', AuthAPI);
app.use('/api/e-shop/category/', CategoryAPI);
app.use('/api/e-shop/product/', ProductAPI);
app.use('/api/e-shop/common/', CommonAPI);
app.use('/api/e-shop/user/', UserAPI);
app.use('/api/e-shop/review/', ReviewAPI);
app.use('/api/e-shop/transaction/', TransactionAPI);
app.use('/api/e-shop/chat/',ChatAPI);

app.use('/hook/', HookAPI);
// static folders
const assetFolder = path.resolve(__dirname, './build/');
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('uploads/images'));
app.use('/videos', express.static('uploads/videos'));
app.use('/products', express.static('uploads/products'));

app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder));

// database
const db = require("./models");
const { initServerSocket } = require('./utils/SocketServer');
db.sequelize.sync().then(() => {
    console.log("MYSQL Database synchronized");

});
// run server
const port = process.env.PORT || 5700;
const server = app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`)
    initServerSocket(server)
});