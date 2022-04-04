const dotenv = require('dotenv');

dotenv.config();

module.exports = {
     BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
     CLIENT_ID: process.env.CLIENT_ID,
     REDIRECT: process.env.REDIRECT,
}

