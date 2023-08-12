const router = require('./api')
const express = require('express')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.use(router)

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => console.log('Local app listening on port:', PORT))