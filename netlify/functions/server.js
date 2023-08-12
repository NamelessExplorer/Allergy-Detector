const router = require('./api')
const express = require('express')

const app = express();


app.use(router)

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => console.log('Local app listening on port:', PORT))