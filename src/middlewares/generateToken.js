const jsonwebtoken = require("jsonwebtoken");

const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JSONWEBTOKEN_KEY, {expiresIn: "30d"});
};

module.exports = generateToken;