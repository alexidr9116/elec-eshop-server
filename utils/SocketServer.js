const socketio = require('socket.io');
const activeUsers = new Set();

const broadcastToClient = (data)=>{
    if(activeUsers.size >0){
        activeUsers.forEach(async (client) => {
            console.log(client)

            client.socket.emit("data-to-client", { ...data });
        });    
    }
}
const sendMessageToClient = (data, to) => {
    let sent = false;
    activeUsers.forEach(async (client) => {

        if (client.phone == to.phone && client.socket.connected) {
            //console.log(data);
            user.socket.emit("data-to-client", { ...data });
            sent = true;
            
        } else {
            console.log("Connection is closed", client);
            sent = false;
        }

    })
    return sent;
}
const initServerSocket = (server) => {
    const { sendMessage } = require('../controllers/ChatController');

    try {
        const io = socketio(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            },
            transports: ['polling', 'websocket']
        });
        io.on("connection", (client) => {
            client.on("logined", data => {
                if (data != null || data) {
                    data.socket = client;
                    let find = false;
                    activeUsers.forEach(user => {
                        if (user.phone === data.phone) {
                            user.socket = client;
                            find = true;
                        }
                    });
                    if (!find)
                        activeUsers.add(data);
                }
            });
            client.on('client-to-server',data=>{
                sendMessage(data);
                console.log(data);
            });
            client.on("disconnect", (reason) => {
                console.log("disonnect ", reason);
                activeUsers.forEach((user) => {
                    if (user.socket != null && (user.socket.id == client.id)) {
                        console.log("delete user");
                        activeUsers.delete(user);
                    }
                })
            })
        });
    }
    catch (err) {
        console.log(err)
    }
};


module.exports = {
    initServerSocket,
    sendMessageToClient,
    broadcastToClient
}