const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("products").count();

    const incidents = await connection("products")
      .join("companys", "companys.id", "=", "products.company_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select(["products.*", "companys.name"]);

    res.header("X-Total-Count", count["count"]);

    return res.json(incidents);
  },

  async create(req, res) {
    const { name, description, value } = req.body;

    const company_id = req.headers.authorization;

    await connection("products").insert({
      name,
      description,
      value,
      company_id,
    });

    return res.json({ company: "Cadastrou com sucesso" });
  },

  async delete(req, res) {
    const { id } = req.params;
    const company_id = req.headers.authorization;

    const products = await connection("products")
      .where("id", id)
      .select("company_id")
      .first();

    if (products.company_id != company_id) {
      return res.status(401).json({ error: "Operation not permited" });
    }
    await connection("products").where("id", id).delete();

    return res.status(204).send();
  },

  

  async update(req, res) {
    const { name, description, value } = req.body;
    const { id } = req.params;
    const company_id = req.headers.authorization;

    const products = await connection("products")
      .where("id", id)
      .select("company_id")
      .first();

    if (products.company_id != company_id) {
      return res.status(401).json({ error: "Operation not permited" });
    }
    await connection("products")
      .where("id", id)
      .update({ name, description, value })
      .where({ id });

    return res.status(204).send({});
  },
};
