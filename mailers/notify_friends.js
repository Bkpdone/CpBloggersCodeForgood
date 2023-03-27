const nodemailer = require('../config/nodemailer');


// define the email options
const NotifyFriends = (value) => {


    console.log('Emails Inf0: ',value);
   
    for(val of value.all_mailId){

        console.log("Imp Info====>>>>==>>>",val);

        if(val.from_user.id!=value.userId){
                 
            console.log("Hi 1 opppppppppppppppppppppppppppppppppppppppppppppppppppppp");
           
            // console.log('HI Bhavesh Sir Imp Inf0:  ',val);
            // console.log('Email => Viewers : ', val.from_user.email);
            
            const valData={
                user:val.to_user,
                Data:val.from_user,
            }

            console.log('Hi x5x5x5x=>=>+.====>>> ',valData)
            let htmlString = nodemailer.renderTemplate({ valData : valData}, "/posts/notify.ejs")
        
            let mailOptions = {
                from: 'cpbloggersforgoodcode@gmail.com',
                to: val.from_user.email,
                subject: 'Notification of Friend Post',
                html: htmlString
            };
        
        
            nodemailer.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error in comment Mailer x xx xxx xxxxx xxxxxxxxxx: ',error);
                } else {
        
                    console.log('Email sent:............. ' + info.response);
                }
            });

        }
        else{

            
            console.log("Hi 2 opppppppppppppppppppppppppppppppppppppppppppppppppppppp");
           
            // console.log('HI Bhavesh Sir Imp Inf0:  ',val);
            // console.log('Email => Viewers : ', val.to_user.email);

            const valData={
                user:val.from_user,
                Data:val.to_user,
            }


            console.log('Hi x5x5x5x=>=>+.====>>> ',valData)


            let htmlString = nodemailer.renderTemplate({ valData: valData }, "/posts/notify.ejs")
        
            let mailOptions = {
                from: 'cpbloggersforgoodcode@gmail.com',
                to: val.to_user.email,
                subject: 'Notification of Friend Post',
                html: htmlString
            };
        
        
            nodemailer.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error in comment Mailer x xx xxx xxxxx xxxxxxxxxx: ',error);
                } else {
        
                    console.log('Email sent:............. ' + info.response);
                }
            });

        }
    }
}

module.exports.NotifyFriends = NotifyFriends;

