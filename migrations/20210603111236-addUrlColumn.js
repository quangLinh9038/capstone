'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      
      queryInterface.addColumn(
        'Places',
        "url", {
          type: Sequelize.STRING
    
      })
    ])
  },
      
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Places', "url"),
    ])
  }
};
