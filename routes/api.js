let express = require('express')
let db = require('../models')  // imports index.js from models directory, which imports record model
let BudgetTransaction = db.BudgetTransaction

let router = express.Router()

router.get('/budget_transactions', function(req, res, next){
    BudgetTransaction.findAll({order: ['category']}).then( budgetTransactions => {
        return res.json(budgetTransactions)
    }).catch( err => next(err) )
})

router.post('/budget_transactions', function(req, res, next) {
    console.log(req.body)
    BudgetTransaction.create(req.body).then( () => {
        res.status(201).send('ok')
    }).catch( err => next(err) )  // todo send more specific error message
})

router.delete('/budget_transactions/:id', function(req, res, next){
    BudgetTransaction.destroy({where: {id: req.params.id}})
        .then( rowsModified => {
            return res.send('ok')
        }).catch( err => next(err) )
})



module.exports = router