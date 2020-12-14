module.exports = (sequelize, DataTypes) => {

    let BudgetTransaction = sequelize.define('BudgetTransaction', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        income: {
            type:DataTypes.BOOLEAN,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },

    })

    BudgetTransaction.sync({force: true}).then( () => {
        console.log('synced budget expenses table')
    })

    return BudgetTransaction
}