const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
// Use sequelize to connect to database
const db = require('./models');
// routes
const customerRoute = require('./routes/customerRoute');
const adminRoute = require('./routes/adminRoute');
const bikeRoute = require('./routes/bikeRoute');
const partRoute = require('./routes/partRoute');
const cartRoute = require('./routes/cartRoute');
const accessoryRoute = require('./routes/accessoryRoute');
const colorsRoute = require('./routes/colorsRoute');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// connect to the database
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${5000}`);
    })
})

app.use(express.static('./public'));

// middlware routes 
app.use('/api', customerRoute);
app.use('/api', adminRoute);
app.use('/api', bikeRoute);
app.use('/api', partRoute);
app.use('/api', accessoryRoute);
app.use(cartRoute);
app.use('/api', colorsRoute);
