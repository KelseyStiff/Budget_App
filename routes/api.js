//routing to match up requests to the server and returns response in .json format

//require express library
let express = require('express')

// imports index.js from models directory, which imports transaction model
let db = require('../models')

let BudgetTransaction = db.BudgetTransaction

//create router
let router = express.Router()

//get data
router.get('/budget_transactions', function(req, res, next){
    BudgetTransaction.findAll({order: ['date']}).then( budgetTransactions => {
        return res.json(budgetTransactions)
    }).catch( err => next(err) )
})

//add data
router.post('/budget_transactions', function(req, res, next) {
    console.log(req.body)
    BudgetTransaction.create(req.body).then( () => {
        res.status(201).send('ok')
    }).catch( err => next(err) )
})

//remove data
router.delete('/budget_transactions/:id', function(req, res, next){
    BudgetTransaction.destroy({where: {id: req.params.id}})
        .then( rowsModified => {
            return res.send('ok')
        }).catch( err => next(err) )
})


//export the router
module.exports = router