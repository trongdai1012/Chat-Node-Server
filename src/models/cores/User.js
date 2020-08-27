import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
    static association() {
    }
}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10),
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNULL: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNULL: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNULL: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNULL: false
    },
    birthDay: {
        type: DataTypes.STRING,
        allowNULL: true
    },
    address: {
        type: DataTypes.STRING,
        allowNULL: true
    },
    status: {
        type: DataTypes.TINYINT(1),
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
    tableName: 'user'
}

User.init(attributes, { ...options, sequelize });