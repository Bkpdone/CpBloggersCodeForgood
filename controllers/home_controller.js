const fetch = require('node-fetch');
const Post = require('../models/post');
const { findById } = require('../models/user');
const User = require('../models/user');
const home = async (req, res) => {
     console.log('Hi Bhavesh Home Controller is Loaded SuccessFully....');
     try {

       
     

          const all_users_data = await User.find({});

          // console.log('Hi Bhavesh Sir All Ur ==>', all_users_data);

          let CF_Data = [{}];
          for (val of all_users_data) {

               const cfname = val.cfname;
               console.log('Hndale Name : ', cfname);

               if(cfname==''){
                    cfname='CpBloggerCodeForgood';
               }

               const apiUrl = 'https://codeforces.com/api/user.info?handles=' + cfname;

               if (cfname) {


                    fetchData();
                    function fetchData() {

                         fetch(apiUrl)
                              .then(response => response.json())
                              .then(data => {
                                   // do something with the data
                                   //   console.log(data.result[0]);

                                   User.find({ cfname: data.result[0].handle }, (err, value_data) => {
                                        if (err) {
                                             console.log('Error in Find Handle Data: ', err);
                                        }
                                        console.log('HI Bhavesh Sir Value Data: ');
                                        console.log(value_data);
                                        User.findByIdAndUpdate(value_data[0].id, {
                                             cfData: data.result[0],
                                             cfRating: data.result[0].rating
                                        }, (err, finalData) => {

                                             if (err) {
                                                  console.log('Error in Update Data: ', err);
                                             }
                                             console.log("Firnal Updated Data: ", finalData);
                                        });

                                   });


                              })
                              .catch(error => {
                                   console.error('Error:', error);
                              });


                    }

               }




          }


          for (val of CF_Data) {
               console.log('Data: ==>==> ',)
               console.log(val);
          }


          const post_val = await Post.find({})
          .sort({createdAt: -1 })
          .populate('user')
          .populate({
               path: 'comments',
               populate: {
                    path: 'user',
               },
          })
          .populate({
               path: 'likes',
               populate: {
                    path: 'user'
               }
          })
          .populate({
               path: 'comments',

               populate: {
                    path: 'likes',
                    populate: {
                         path: 'user'
                    }
               }
          });
    
          const all_user = await User.find({}).sort({ cfRating: -1 });
          

          return res.render('home', {
               title: 'home',
               posts: post_val,
               users: all_user,
          });
          
     }
     catch (err) {

          console.log('Error in Display Posts xxxxxxxx xxxxxxxxx xxxxxxxxxx ', err);
     }



};
module.exports.home = home;
