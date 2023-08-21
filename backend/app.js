import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import http from 'http';
import { Server } from 'socket.io';
// import expressValidator from 'express-validator';

import cors from 'cors';
const db = require("./models");
import nodemailer from 'nodemailer';
// const cors = require('cors');


dotenv.config();// required for running process.env.PORT
let app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/product-images', express.static('uploads/products'));
app.use('/request-files', express.static('uploads/requests'));
app.use('/category-logo', express.static('uploads/categoryLogos'));

// app.use(cors({ origin: true }));
// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
//config app
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(expressValidator());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 3005;
app.listen(port, () => {
    // console.log('Limit file size: ' + limit);
    console.log('backend is running : ' + port);
});

const server = http.createServer(app);
// Add this
app.get('/', (req, res) => {
    res.send('Hello world');
});

console.log('check FRONTEND_URL : ', process.env.FRONTEND_URL);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3011',
        methods: ['GET', 'POST'],
    },
});

const CHAT_BOT = 'ChatBot'; // Add this
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // We can write our socket event listeners in here...
    socket.on('join_room', (data) => {
        const { username, room } = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room

        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        console.log('check room : ', room);
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room ${room}`,
            username: CHAT_BOT,
            __createdtime__,
        });

        socket.emit('receive_message', {
            message: `Welcome ${username}  room ${room}`,
            username: CHAT_BOT,
            __createdtime__,
        });
        // Save the new user to the room
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        let chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);

    });




});

server.listen(4000, () => 'Server is running on port 4000');




