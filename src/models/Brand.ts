import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Brand extends Model {
  id!: string;
  name!: string;
}

Brand.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Brand",
    tableName: "brands",
    updatedAt: false,
    timestamps: true,
  }
);

export default Brand;
