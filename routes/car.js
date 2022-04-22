var express = require('express');

var router = express.Router();
const CarController = require('../controller/car');
/* GET users listing. */

router.get('/', CarController.getAllCar);
router.get('/filter', CarController.getCar);
router.get('/size', CarController.UkuranCar);
router.post('/create', CarController.addCar);
router.get('/tambah', CarController.addcars);
router.post('/update/:id', CarController.updateCar);
router.get('/edit/:id', CarController.editCar);
router.post('/:id', CarController.hapusCar);


module.exports = router;
