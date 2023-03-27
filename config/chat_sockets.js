const { Socket } = require('socket.io');

const chatSockets=(socketServer)=>{ 
  

    let io = require('socket.io')(socketServer,{
        cors:{
            origin:"*"
        }
    });

    io.sockets.on('connection',function(socket){
        console.log('New Connection is Received ........YES...YEs.... ',socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });


        socket.on('join_room',function(data){
            console.log('Joining Requesest rec....====>>>> ',data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    })

}
module.exports.chatSockets=chatSockets;