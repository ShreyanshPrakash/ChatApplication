const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');


/*
    [INFO]: Inititalizing env vars
*/
const PORT = process.argv[3] || 4200;
const ENV = process.argv[5] || "dev";



/*
    [INFO] : Adding middlewares
*/

app.use(
    cors()
);

/*
    Socket
*/

let users = new Map();

io.on('connect', client => {


    console.log(client.id)
    users.set(client.id, client);

    client.on('message', msg => {
        console.log(msg);
        client.name = msg.name;
        console.log(client.name);
    });

    client.on('checkStatus', _ => {
        // let entries = users.entries();
        // entries = Array.from(entries);
        // console.log(entries);
        client.emit(
            'message',
            {
                type: 'checkStatus',
                name: client.name,
                id: client.id,
                // userList: entries,
            }
        )
    });

    client.on('listUsers', _ => {
        let clientIds = [];
        io.clients((error, clients) => {
            console.log(error);
            clientIds = clients;
            client.emit(
                'message',
                {
                    type: 'usersList',
                    data: clientIds,
                }
            )
        });
        
    });

    client.on('sendMessageTo', msg => {
        console.log(msg);
        users.get(msg.to).emit('message', {
            type: 'message',
            data: `from another user : ${client.id} ${client.name}`,
        })
    });

    client.on('sendImageTo', msg => {
        // console.log(msg);
        // users.get(msg.to).emit('message', {
        //     type: 'image',
        //     data: `from another user : ${client.id} ${client.name}`,
        //     image: msg.data
        // });

        io.sockets.emit('message', {
            type: 'image',
            data: `from another user : ${client.id} ${client.name}`,
            image: msg.data
        })
    });

});


/*
    [INFO] : Basic static server
*/


app.get("**", (req, res) => {

    if (ENV === "prod") {
        fs.createReadStream(
            path.join(
                __dirname, "..", "build"
            )
        ).pipe(res);

        return;
    }

    res.status(404).send("Not Found Message");

});


process.addListener("uncaughtException", handleUncaughtException);
process.addListener("unhandledRejection", handleUncaughtRejection);


function handleUncaughtException(event) {
    console.log(event);
}

function handleUncaughtRejection(event) {
    console.log(event);
}



http.listen(
    PORT,
    () => {
        console.log(`Listening at port : ${PORT}`);
    }
)