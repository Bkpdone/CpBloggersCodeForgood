const development={
    name:'development',
    assets_path:'./assets',
    session_cookie_key:'BhaveshPharateSir',
    db:'CpBlogersDB',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'cpbloggerstsec@gmail.com',
            pass: 'pasnsaymdoqhqvkk'
        }
    }
}


const production={
      name:'production',
      assets_path:process.env.CODEIAL_ASSETS_PATH,
      session_cookie_key:process.env.CODEIAL_COOKIE_KEY,
      db:process.env.CODEIAL_DB,
      smtp:{
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: process.env.CODEIAL_EMAIL_USER,
              pass: process.env.CODEIAL_EMAIL_PASS
          }
      }
}

//module.exports=development;
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);