import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const SavedRecipe = sequelize.define('SavedRecipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
});

User.hasMany(SavedRecipe);
SavedRecipe.belongsTo(User);

export default SavedRecipe;