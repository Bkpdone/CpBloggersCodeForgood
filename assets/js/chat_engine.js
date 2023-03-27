class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect(`http://13.50.240.82:3000`);
        console.log('Hello >>>>>>> ',this.socket);
        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        
        let self=this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
        });

        self.socket.emit('join_room',{
            user_email:self.userEmail,
            chatroom:'codeial'
        });

        self.socket.on('user_joined',function(data){

            console.log('A user Joined SuccessFully..... => ',data);
        });

          $('#send-message').on('click', function() {
              let msg=$('#chat-message-input').val();
              
              if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                })
              }

          });

          self.socket.on('receive_message',function(data){
               console.log('Message received=> ',data);

               let messageType='other-message';
               if(data.user_email==self.userEmail){
                   messageType='self-message';
               }
               let newMessage=$('<li>');

               newMessage.append($('<span>',{
                'html':data.message
               }));
               newMessage.append($('<br>',{
              
               }));
               newMessage.append($('<sub>',{
                'html':data.user_email
               }));

               newMessage.addClass(messageType);
               $('#chat-messages-list').append(newMessage);
          })
          
        

    }
}
