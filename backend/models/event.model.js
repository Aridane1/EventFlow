module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    numTickets: {
      type: Sequelize.INTEGER,
    },
  });

  return Event;
};
