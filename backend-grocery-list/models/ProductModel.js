import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Category from "./CategoryModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "newproducts",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    productName: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
Products.belongsTo(Category, { foreignKey: "category" });
export default Products;

(async () => {
  await db.sync();
})();
