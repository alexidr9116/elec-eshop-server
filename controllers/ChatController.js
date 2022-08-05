const { validationResult } = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Model = require('../models');
const { sendMessageToClient, broadcastToClient } = require('../utils/SocketServer');
const ChatLogModel = Model.chat;
const UserModel = Model.user;

const sendMessage = async (data) => {
    try {
        console.log(data)
        if(data.receiver == 'all'){
            await ChatLogModel.create({
                ...data,
                receiver:0,
            });
            
            return broadcastToClient(data);
        }
        else{
            const to = await UserModel.findOne({id:data.receiver});
            if(to!=null){
                await ChatLogModel.create({
                    ...data
                });
                return sendMessageToClient(data, to);
            }
            else {
                return false;
            }
        }
        
    }
    catch (err) {
        console.log(err)
        return false;
    }

}
const getChatLogs = async (req, res) => {
    try {
        
        const logs = await ChatLogModel.findAll({
            // where: { createdAt:{} },
            order: [['createdAt', 'asc']],

        });
        ResponseData.ok(res, '', logs);
    }
    catch (err) {
        console.log(err)
        ResponseData.error(res, '', err)
    }
}

module.exports = {
    sendMessage,
    getChatLogs
}