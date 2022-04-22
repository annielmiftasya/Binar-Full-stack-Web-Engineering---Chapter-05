const { request } = require('../app');
const  {Cars} = require('../models')
const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = class {
   static addCar(req, res, next) {
       Cars.create({
           name: req.body.name,
           ukuran: req.body.ukuran,
           sewa: req.body.sewa,
           foto: req.body.foto,
       })
           .then((result) => {

            res.redirect('/car');
           })
           .catch((err) => {
               res.status(500).send(err)
            .render('pages/create')
          
           })

   } 

    static addcars(req, res) {
   
        res.render('pages/create')
   }

//    static notif(req, res) {
//     const alertMessage = req.flash("AlertMessage");
//             const alertStatus = req.flash("AlertStatus");
//             const alert = { message: alertMessage, status: alertStatus }
//     res.render('pages/coba',{alert})
//    }

    static UkuranCar(req, res, next) {
        
     Cars.findAll({ where: req.query })
          .then((result) => {
           
            //   res.status(201).send({
            //       status: 200,
            //       message: 'Data Car ditemukan!',
            //       data: result,
            //   })

            res.render('pages/cars',{data:result});
          })
          .catch((err) => {
              res.status(500).send(err)
          })

        
        }

    static getAllCar(req, res, next) {
            Cars.findAll()
                .then((result) => {
                    res.render('pages/cars',{data:result})
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
        }
   
    static getCar(req, res, next) {
         const name = req.query.name;
         var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
         Cars.findAll({ where: condition })
            .then((result) => {
                res.render('pages/cars', {data:result});
                  })
               .catch((err) => {
                   res.status(500).send(err)
                   })
               }

    static editCar(req, res, next) {
        Cars.findByPk(req.params.id).then((result) => { 
            console.log(result)
            res.render('pages/update',{data:result})
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    
       }
   static updateCar(req, res, next) {
            Cars.update({
                ...req.body
            },{
                where: {
                    id: req.params.id
                },
                returning: true,
            })
                .then((result) => {
                console.log(result)
                res.redirect('/car');
            })
            .catch((err) => {
                res.status(500).send(err).render('pages/update')
            })

   }

   static hapusCar(req, res, next) {
    Cars.findByPk(req.params.id)
         .then((result) => {
         return result
         .destroy()
         .then((result) => {
            res.redirect('/car')
                    })
            .catch((error) => res.status(400).send(error));
                })
   .catch((err) => {
       res.status(500).send(err)
      })
              
   }
}