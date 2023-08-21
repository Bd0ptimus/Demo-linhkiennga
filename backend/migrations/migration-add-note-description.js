module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Products', 'des', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t }),

                queryInterface.addColumn('Products', 'note', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t })

            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Products', 'des', { transaction: t }),
                queryInterface.removeColumn('Products', 'note', { transaction: t }),
            ]);
        });
    }
};