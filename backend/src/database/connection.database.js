const mongosee = require("mongoose");

const connectionDatabaseTestJLTECH = async (CONNECTION_TRING) => {
  try {
    await mongosee.connect(CONNECTION_TRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
      throw new Error("Failed dataBase Connection" + error.message)
  }
};

module.exports = {
    connectionDatabaseTestJLTECH
}
