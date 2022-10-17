const { DataTypes } = require('sequelize')

const SEASONS = ['Summer', 'Aurumn', 'Spring', 'Winter']

module.exports = (sequelize) => {
  sequelize.define(
    'activity',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 24,
        },
      },
      season: {
        type: DataTypes.ENUM(...SEASONS),
        allowNull: false,
        validate: {
          isIn: [SEASONS],
        },
      },
    },
    {
      timestamps: false,
    }
  )
}
