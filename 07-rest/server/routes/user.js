
const express = require('express')

const app = express()
const User = require('../models/user')

app.get('/user', function (req, res) {
    res.json('getUser')
  })

  app.post('/user', function (req, res) {

      let body = req.body;

      console.log(req.body.email);

      let user = new User({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role:  body.role
      })

      user.save((err,userDB)=>{

            if(err){
                return res.status(400).json({
                    ok:false,
                    message: "Error creando usuario",
                    err
                });
            }

            //userDB.password=null;

            res.json({
                ok:true,
                user: userDB
            });

      });


    })

  app.put('/user/:id', function (req, res) {
      let id = req.params.id;

      let body = req.body;

      console.log(id);
      console.log(body);

      var query = { _id : id };

      console.log(query);

      User.findOneAndUpdate(query,body,(err,userDB)=>{

          if(err){
            return res.status(400).json({
                ok:false,
                message: "Error update usuario",
                err
            });
        }


          res.json({
            ok:true,
            user: userDB
          });

      });
    })

  app.delete('/user', function (req, res) {
    res.json('delete User')
  })

  module.exports = app;
