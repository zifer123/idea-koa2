const Sequelize = require('sequelize');
const seq = require('../seq');
const users = require('./users');

// 模型定义
const blogs = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// 关联设置, 默认关联id
// blogs.belongsTo(users, {
//   foreignKey: 'userId'
// });
users.hasMany(blogs, {
  foreignKey: 'userId'
});

module.exports = blogs;
