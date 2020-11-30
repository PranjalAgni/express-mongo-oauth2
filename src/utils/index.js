const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const getPublicKey = () => {
  const publicKeyPath = path.join(
    __dirname,
    '../',
    '../',
    'encryptionkeys',
    'public.pem',
  );

  return fs.readFileSync(publicKeyPath, 'utf8');
};

const getPrivateKey = () => {
  const privateKeyPath = path.join(
    __dirname,
    '../',
    '../',
    'encryptionkeys',
    'private.pem',
  );

  return fs.readFileSync(privateKeyPath, 'utf8');
};

const generateToken = (data, opts) => {
  const privateKey = getPrivateKey();
  const token = jwt.sign(data, privateKey, opts);
  return token;
};

const generateAccessToken = (data) => {
  const opts = {
    expiresIn: config.jwt.expiresIN,
    issuer: 'oauth2:service',
    audience: 'oauth2:client',
    subject: 'authentication',
    algorithm: 'RS256',
  };
  const token = generateToken(data, opts);
  return token;
};

const generateRefreshToken = (data) => {
  const opts = {
    expiresIn: config.refreshToken.expiresIN,
    issuer: 'oauth2:service',
    audience: 'oauth2:client',
    subject: 'authentication',
    algorithm: 'RS256',
  };
  const token = generateToken(data, opts);
  return token;
};

const verifyToken = (token) => {
  const publicKey = getPublicKey();
  return jwt.verify(token, publicKey, (err, decoded) => {
    if (err) throw err;
    return decoded;
  });
};

const regenerateAccessToken = (refreshToken) => {
  const decoded = verifyToken(refreshToken);
  const { _id, fullName, email, googleId } = decoded;
  const userData = {
    _id,
    fullName,
    email,
    googleId,
  };

  const token = generateAccessToken(userData);
  return [decoded, token];
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  regenerateAccessToken,
};
