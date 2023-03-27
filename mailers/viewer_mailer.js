const nodemailer=require('../config/nodemailer');

const Friend=(value)=>{

    console.log('Email => Viewers : ', value);
    let htmlString = nodemailer.renderTemplate({ value: value }, "/viewers/new_viewer.ejs")

    let mailOptions = {
        from: 'cpbloggersforgoodcode@gmail.com',
        to: value.user.email,
        subject: 'Notification of Profile View',
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
module.exports.Friend=Friend;