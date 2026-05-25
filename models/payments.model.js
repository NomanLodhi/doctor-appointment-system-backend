const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payments = sequelize.define('payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    payable_type: {
        type: DataTypes.ENUM('order', 'appointment'),
        allowNull: false
    },
    payable_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    method: {
        type: DataTypes.ENUM('card', 'easypaisa', 'jazzcash', 'bank_transfer', 'cod'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
        defaultValue: 'pending',
        allowNull: false
    },
    transaction_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    gateway_response: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Payments;