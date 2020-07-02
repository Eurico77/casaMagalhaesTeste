const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    //const { page = 1 } = req.query;

    const company_id = req.headers.authorization;


    const [count] = await connection("stores").count();

    //console.log(count);

    const stores = await connection("stores")
    .where('company_id', company_id)
  

    //.join("companys", "companys.id", "=", "stores.company_id")
    //.limit(5)
    //.offset((page - 1) * 5)
    //.select(["stores.*", "companys.name"]);

    //res.header("X-Total-Count", count["count"]);

    return res.json(stores);
  },

  async create(req, res) {
    const { name, description } = req.body;

    const company_id = req.headers.authorization;

    await connection("stores").insert({
      name,
      description,
      company_id,
    });

    return res.json({ store: "Cadastrada" });
  },

  async delete(req, res) {
    const { id } = req.params;
    const company_id = req.headers.authorization;

    const stores = await connection("stores")
      .where("id", id)
      .select("company_id")
      .first();

    if (stores.company_id != company_id) {
      return res.status(401).json({ error: "Operation not permited" });
    }

    await connection("stores").where("id", id).delete();
    return res.status(204).send();
  },

  async update(req, res) {
    const { nome, description } = req.body;
    const { id } = req.params;

    const company_id = req.headers.authorization;

    const stores = await connection("stores")
      .where("id", id)
      .select("company_id")
      .first();

    if (stores.company_id != company_id) {
      return res.status(401).json({ error: "Operation not permited" });
    }

    await connection("stores")
      .where("id", id)
      .update({ nome, description })
      .where({ id });

    return res.status(204).send({});
  },
};
