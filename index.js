const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const port = process.env.PORT; 
const placeRoutes = require('./routes/place.routes');
const accommodationRoutes = require('./routes/accommodation.route');

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/places', placeRoutes);
app.use('/api/v1/accommodations', accommodationRoutes)


// //sequelize sync
// db.sequelize.sync({force: true})
//   .then(()=> {
//       console.log("Drop and re-sync database.")
//   })

// testing database connection 
const db = require('./models');
db.sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

// testing server
app.get('/', (req, res) => {
    res.send("Server on air!!!");
})


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})

module.exports = app;

