const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

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
const orderRoute = require('./routes/orderRoute');

const port = process.env.PORT || 5000;

// Need to create an http to be able to use socket.io
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser());
app.use(cors());

// Socket IO connection
const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET","POST"]
    }
})
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_chat", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
    })
})

// connect to the database
db.sequelize.sync().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${5000}`);
    })
})

// returns a page for my backend
app.get('/', (req,res) => {
    return res.sendFile(__dirname + '/public/index.html');
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
app.use('/api', orderRoute);
