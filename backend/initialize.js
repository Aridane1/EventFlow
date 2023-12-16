const bcrypt = require("bcryptjs");
const db = require("./models");
async function initializeDatabase() {
  try {
    const hashedPasswordAdmin = bcrypt.hashSync("test1234", 10);

    await db.User.create({
      name: "manager",
      email: "manager@manager.com",
      password: hashedPasswordAdmin,
      rol: "manager",
    });
  } catch (error) {
    console.error("Error al inicializar la base de datos");
  }
}

module.exports = initializeDatabase;
