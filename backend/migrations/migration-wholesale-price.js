module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Products', 'wholeSalePrice', {
                    type: Sequelize.DataTypes.BIGINT
                }, { transaction: t }),

            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Products', 'wholeSalePrice', { transaction: t }),
            ]);
        });
    }
};