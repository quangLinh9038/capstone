'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cuisines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.TEXT
      },
      district: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.STRING
      },
      features: {
        type: Sequelize.STRING
      },
      is3Stars: {
        type: Sequelize.NUMBER
      },
      is4Stars: {
        type: Sequelize.NUMBER
      },
      is5Stars: {
        type: Sequelize.NUMBER
      },
      isHomestay: {
        type: Sequelize.NUMBER
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cuisines');
  }
};