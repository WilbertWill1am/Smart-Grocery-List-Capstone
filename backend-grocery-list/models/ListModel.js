import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Products from "./ProductModel.js";

const { DataTypes } = Sequelize;

const List = db.define(
  "list",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
List.belongsTo(User, { foreignKey: "userId" });
List.belongsTo(Products, { foreignKey: "product_id" });
User.hasMany(List, { foreignKey: "userId" });

export default List;

(async () => {
  await db.sync();
})();
