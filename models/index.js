const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;

db.category = require("./Category.model")(sequelize);
db.product = require('./Product.model')(sequelize);
db.user = require('./User.model')(sequelize);
db.currencyRate = require('./CurrencyRate.model')(sequelize);
db.review = require('./Review.model')(sequelize);
db.billing =require('./BillingAddress.model')(sequelize);
db.pair = require('./Pair.model')(sequelize);
db.transaction = require('./Transactions.model')(sequelize);
db.delivery=  require('./Delivery.model')(sequelize);
db.bannerImages = require('./BannerSlider.model')(sequelize);
db.feedback = require('./Feedback.model')(sequelize);
db.siteFeedback  = require('./SiteFeedback.model')(sequelize);
db.order = require('./Order.model')(sequelize);
db.chat = require('./ChatHistory.model')(sequelize);

module.exports = db;