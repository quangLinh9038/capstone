const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const port = process.env.PORT; 
const placeRoutes = require('./routes/place.routes');
const db = require("./models");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/places', placeRoutes);

// //sequelize sync
// db.sequelize.sync({force: true})
//   .then(()=> {
//       console.log("Drop and re-sync database.")
//   })

//test server
app.get('/', (req, res) => {
    res.send("Hello");
})


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})

module.exports = app;

