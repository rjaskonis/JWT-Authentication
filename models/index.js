"use strict";

var DbContext  = {};
var fs       = require("fs");
var path     = require("path");
var env      = process.env.NODE_ENV || "development";

DbContext.Sequelize = require('sequelize');
DbContext.sequelize = new DbContext.Sequelize('dev1', 'sa', '****', { host: "172.16.100.109", dialect: "mssql", port: "1433",  timezone: "-02:00" });

// add all models to DbContext (folder)
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = DbContext.sequelize.import(path.join(__dirname, file));
    DbContext[model.name] = model;
  });

// Object.keys(DbContext).forEach(function(modelName) {
// 	console.log(modelName);
//   if ("associate" in DbContext[modelName]) {
//     DbContext[modelName].associate(DbContext);
//   }
// });

module.exports = DbContext;
