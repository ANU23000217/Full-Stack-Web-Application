const express = require('express')
const router = express.Router()

const {getAllData, getDataById, addNewData, updateData, deleteData} = require('../controllers/dataController')

router.get('/getAllData', getAllData);

router.get('/getDataById/:id', getDataById);

router.post('/addNewData', addNewData);

router.put('/updateData/', updateData);

router.delete('/deleteData/:id', deleteData);

module.exports = router