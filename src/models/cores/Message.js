import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';
import { User } from '.';

export default class Message extends BaseModel {
    static association() {
        Message.belongsTo(User, { as: 'userInfo', foreignKey: 'userId' })
    }
}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10),
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true
    },
    roomId: {
        type: DataTypes.INTEGER(10),
        allowNULL: false
    },
    userId: {
        type: DataTypes.INTEGER(10),
        allowNULL: false
    },
    content: {
        type: DataTypes.STRING,
        allowNULL: true
    },
    type: {
        type: DataTypes.TINYINT(1),
        allowNULL: true,
        defaultValue: 0
    },
    source: {
        type: DataTypes.STRING,
        allowNULL: true
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNULL: true,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}

const options = {
    tableName: 'message'
}

Message.init(attributes, { ...options, sequelize });