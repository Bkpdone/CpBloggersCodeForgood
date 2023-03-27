const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const env=require('../config/environment');

//No Change in Codes
const transporter = nodemailer.createTransport(env.smtp);


let renderTemplate = (data, relativePath) => {

    let mailHTML;
    ejs.renderFile(path.join(__dirname, '../views/mailers', relativePath), data, function (err, template) {

        if (err) {
            console.log('Error in Render Ejs Email xxx xxxxxxxx xxxxxxxx', err);
            return;
        }
        console.log('HI Bhavesh Sir Template Email: ',template);
        mailHTML = template;
    });
    
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}

