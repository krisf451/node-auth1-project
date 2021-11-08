const db = require("../../data/db-config.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
};

function find() {
  return db("users").select("user_id", "username").orderBy("user_id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("user_id");
}

function findById(user_id) {
  return db("users").where("user_id", user_id).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
