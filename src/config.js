require('dotenv').config();

const CONFIG = {};

CONFIG.GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY || '';
CONFIG.API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

module.exports = CONFIG;
