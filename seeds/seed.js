const sequelize = require('../config/connection');
const { User } = require('../models');
const { Item } = require('../models');

const userData = require('./userData.json');
const itemData = require('./item.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const items = Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });
};

 seedDatabase();
