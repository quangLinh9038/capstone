const config = require('../config/config')
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize (config.development.database,config.development.username, config.development.password, 
  {
  host: config.development.host,
  dialect: config.development.dialect,
  operatorAliases: false,
  });

const doQuery = async(sql,params) => {

  return await new Promise((resolve) => {

    sequelize.query(sql, params, (err, res) => {

      sequelize.end(); // end connection
      console.log(err, res)

      if (err) resolve(err);
      resolve(res);
    });
  })
}

module.exports = doQuery; 