'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

   return await queryInterface.bulkInsert("Places",
   [{
     name: "Church",
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
    name: "House",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ]
  )},

  
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Places", null, {});
  }

}
