require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
console.log('====> check node env : ', process.env.NODE_ENV);
const config = require(__dirname + "/../config/config.json")[env];
const crypto = require("crypto");
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const {
    Product,
    Product_Categories,
    Product_Attachment,
    Task,
    Project,
    request,
    request_file,
    user
} = db;

Product_Categories.hasMany(Product, {
    onDelete: 'cascade',
    foreignKey: 'categoryId',
});
Product.belongsTo(Product_Categories, {
    foreignKey: 'categoryId',
});


Product.hasMany(Product_Attachment, {
    foreignKey: 'productId',
    onDelete: 'cascade'
});
Product_Attachment.belongsTo(Product, {
    foreignKey: 'productId',

});

Project.hasMany(Task, {
    onDelete: 'cascade'
});
Task.belongsTo(Project, {
});

request.hasMany(request_file, {
    onDelete: 'cascade',
    foreignKey: 'requestId',
});

request_file.belongsTo(request, {
    foreignKey: 'requestId',
});

user.hasMany(request, {
    foreignKey: 'userId',
})

request.belongsTo(user, {
    foreignKey: 'userId',
})

module.exports = db;