const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const port = process.env.PORT; 
const placeRoutes = require('./routes/place.routes');


const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1/places', placeRoutes);

//test server
app.get('/', (req, res) => {
    res.send("Hello");
})


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})

module.exports = app;

