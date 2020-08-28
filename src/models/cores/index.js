export { default as User } from './User';
export { default as ChatRoom } from './ChatRoom';
export { default as Message } from './Message';
export { default as UserRoom } from './UserRoom';

import { sequelize } from '../../connections';

// for(let m in sequelize.models){
//     sequelize.models[m].sync();
// }

for(let m in sequelize.models){
    sequelize.models[m].association();
}