const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const generateJti = (user_idx) => {
  const baseString = `${user_idx}-${uuidv4()}`;
  return crypto.createHash("sha256").update(baseString).digest("hex"); // SHA-256 해시 생성
};

module.exports = {
  generateJti,
};
