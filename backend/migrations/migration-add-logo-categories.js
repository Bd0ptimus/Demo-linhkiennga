module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Product_Categories', 'logoPath', {
                    type: Sequelize.DataTypes.TEXT
                }, { transaction: t }),

            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Product_Categories', 'logoPath', { transaction: t }),
            ]);
        });
    }
};