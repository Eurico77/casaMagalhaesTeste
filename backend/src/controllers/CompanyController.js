const crypto = require("crypto"); 
const connection = require("../database/connection");

module.exports = {
  
  async index(req, res) {
    const companys = await connection("companys").select("*");

    return res.json(companys);
  },

  async store(req, res) {

    const { name } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("companys").insert({
      id,
      name,
      
    });

    return res.json({ id });
  }
};
