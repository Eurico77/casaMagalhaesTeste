const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const company = await connection("companys")
      .where("id", id)
      .select("name")
      .first();

    if (!company) {
      return res.status(400).json({ error: "No Company found with this ID!" });
    }

    return res.json(company);
  },
};
