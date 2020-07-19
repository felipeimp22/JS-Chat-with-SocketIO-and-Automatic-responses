const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
// const send = require('./config/conifg.js')

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');

});
let messages = [];
// let mail = send({
//     from: 'felipeimperio.dev@gmail.com',
//     to: 'felipeimperio.dev@gmail.com',
//     subject: `chatbot`,
//     html: `<p>email</p>`
// })

io.on('connection', socket => {
    console.log(`Socket Conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });

    // socket.on('help', data => {
    //     // return send({
    //     //     from: 'felipeimperio.dev@gmail.com',
    //     //     to: 'felipeimperio.dev@gmail.com',
    //     //     subject: `chatbot`,
    //     //     html: `<p>email</p>`
    //     // }), console.log(data)
    //     return console.log('oi')


    // }
    // )
});

server.listen(3000);




