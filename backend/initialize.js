const bcrypt = require("bcryptjs");
const db = require("./models"); // Asegúrate de que esta ruta sea correcta

async function initializeDatabase() {
  try {
    const hashedPasswordAdmin = bcrypt.hashSync(
      "test1234",
      process.env.JWT_SECRET
    );

    await db.User.create({
      username: "manager",
      email: "manager@manager.com",
      password: hashedPasswordAdmin,
      rol: "manager",
    });
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}

module.exports = initializeDatabase;
