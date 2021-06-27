module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accommodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.STRING,
      },
      features: {
        type: Sequelize.STRING,
      },
      is3Stars: {
        type: Sequelize.INTEGER,
      },
      is4Stars: {
        type: Sequelize.INTEGER,
      },
      is5Stars: {
        type: Sequelize.INTEGER,
      },
      isHomestay: {
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
    await queryInterface.dropTable('Accommodations');
  },
};
