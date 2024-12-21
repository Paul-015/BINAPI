const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Element extends Model {}

Element.init(
  {
    name: DataTypes.STRING,
    race: {
      type: DataTypes.ENUM("mercure", "chrome", "argent"),
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Element;