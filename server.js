const router = require('./netlify/functions/api')
const express = require('express')

const app = express();

const cors = require('cors');
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(router)

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => console.log('Local app listening on port:', PORT))