const users = [];

const addUser = ({ id, name, room }) => {
  const existingUser = users.find((user) => user.room === room && user.name.trim().toLowerCase() === name.trim().toLowerCase());

  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) {
    return { error: 'Username is taken.' };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
  const user = users.find((user) => user.id === id);

  if (!user) return { error: 'Người dùng không hợp lệ.' };

  return { user };
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };