module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },

      img1: {
        type: Sequelize.STRING,
      },

      category: {
        type: Sequelize.STRING,
      },

      img2: {
        type: Sequelize.STRING,
      },

      isHistorical: {
        type: Sequelize.INTEGER,
      },

      isUrban: {
        type: Sequelize.INTEGER,
      },

      isReligious: {
        type: Sequelize.INTEGER,
      },

      isMuseum: {
        type: Sequelize.INTEGER,
      },

      isShopping: {
        type: Sequelize.INTEGER,
      },

      isAdventure: {
        type: Sequelize.INTEGER,
      },

      isNature: {
        type: Sequelize.INTEGER,
      },

      isPark: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Places');
  },
};
