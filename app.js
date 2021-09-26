const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
// Use sequelize to connect to database
const db = require('./models');
// routes
const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// connect to the database
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost/${5000}`);
    })
})

// middlware routes 
app.use('/api', userRoute);