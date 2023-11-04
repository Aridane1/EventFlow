module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.DATE,
    },
    numTickets: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.FLOAT,
    },
  });

  return Event;
};
