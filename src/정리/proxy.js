//Proxy setup to solve CORS issue
const express = require('express');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin : "*"
    })
    );

app.listen(1234);