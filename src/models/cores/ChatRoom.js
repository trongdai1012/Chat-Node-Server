import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';
import { UserRoom, Message } from '.';

export default class ChatRoom extends BaseModel {
    static association() {
        ChatRoom.hasOne(UserRoom, {as: 'userRoom', foreignKey: 'roomId'});
        ChatRoom.hasMany(Message, {as: 'messages', foreignKey: 'roomId'});
    }
}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10),
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNULL: false
    },
    name: {
        type: DataTypes.STRING,
        allowNULL: false
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
    tableName: 'chat-room'
}

ChatRoom.init(attributes, { ...options, sequelize });