'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Places',
        "url", {
          type: Sequelize.STRING
      }),

      queryInterface.addColumn(
        'Places',
        "img1", {
          type: Sequelize.STRING
    
      }),

      queryInterface.addColumn(
          'Places',
          "category", {
            type: Sequelize.STRING
    
      }),
        
      queryInterface.addColumn(
        'Places',
        "img2", {
            type: Sequelize.STRING
        }),    
      
      queryInterface.addColumn(
        'Places',
        "isHistorical", {
          type: Sequelize.STRING
        }),

      queryInterface.addColumn(
        'Places',
        "isUrban", {
          type: Sequelize.STRING
  
      }),

      queryInterface.addColumn(
        'Places',
        "isReligious", {
          type: Sequelize.STRING
      }),

      queryInterface.addColumn(
        "Places",
        "isMuseum", {
          type: Sequelize.STRING
  
      }),

      queryInterface.addColumn(
        "Places",
        "isShopping", {
          type: Sequelize.STRING
  
        }),

        queryInterface.addColumn(
        "Places",
        "isAdventure", {
          type: Sequelize.STRING
  
        }), 

        queryInterface.addColumn(
        "Places",
        "isNature", {
          type: Sequelize.STRING
  
        }), 

        queryInterface.addColumn(
        "Places",
        "isPark", {
          type: Sequelize.STRING
  
        }), 
    ])
  },
      
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Places', "url"),
      queryInterface.removeColumn('Places', "img1"),
      queryInterface.removeColumn('Places', "category"),
      queryInterface.removeColumn('Places', "img2"),
      queryInterface.removeColumn('Places', "isHistorical"),
      queryInterface.removeColumn('Places', "isUrban"),
      queryInterface.removeColumn('Places', "isReligious"),
      queryInterface.removeColumn('Places', "isMuseum"),
      queryInterface.removeColumn('Places', "isShopping"),
      queryInterface.removeColumn('Places', "isAdventure"),
      queryInterface.removeColumn('Places', "isNature"),
      queryInterface.removeColumn('Places', "isPark"),
    ])
  }
};
