module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('requests', 'status', {
                    type: Sequelize.DataTypes.INTEGER
                }, { transaction: t }),

            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('requests', 'status', { transaction: t }),
            ]);
        });
    }
};