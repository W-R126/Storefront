require('dotenv').config();

const CONFIG = {};

CONFIG.GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY || '';

module.exports = CONFIG;
