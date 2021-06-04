'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.changeColumn('Places','isNature',{
      type: 'INTEGER USING CAST("isNature" as INTEGER)'

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Places', "isNature");
  }
}
