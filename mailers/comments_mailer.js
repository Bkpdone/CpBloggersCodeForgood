const nodemailer = require('../config/nodemailer');


// define the email options
const new_Comments = (comment) => {


    console.log('Email => Comment in new Comment : ', comment);
    let htmlString = nodemailer.renderTemplate({ comment: comment }, "/comments/new_comments.ejs")

    let mailOptions = {
        from: 'cpbloggersforgoodcode@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
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

module.exports.new_Comments = new_Comments;


const Comment_alert=(value)=>{

    console.log('Email => Comment in new Post : ', value.post);
    let htmlString = nodemailer.renderTemplate({ value: value }, "/comments/new_comment_alert.ejs")

    let mailOptions = {
        from: 'cpbloggersforgoodcode@gmail.com',
        to: value.post.user.email,
        subject: 'New Comment Alert',
        html:htmlString
    };


    nodemailer.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error in comment Mailer x xx xxx xxxxx xxxxxxxxxx: ',error);
        } else {

            console.log('Email sent:............. ' + info.response);
        }
    });
      
}
module.exports.Comment_alert=Comment_alert