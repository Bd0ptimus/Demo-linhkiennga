module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('requests', 'userId', {
                    type: Sequelize.DataTypes.INTEGER
                }, { transaction: t }),

            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('requests', 'userId', { transaction: t }),
            ]);
        });
    }
};