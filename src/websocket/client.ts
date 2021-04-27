import { io } from '../app';
import { ConnectionsServices } from '../services/ConnectionsServices';
import { UsersServices } from '../services/UsersServices';
import { MessagesServices } from '../services/MessagesServices';

interface IParams {
  email: string;
  text: string;
}

io.on('connect', (socket) => {
  const connectionsServices = new ConnectionsServices();
  const usersServices = new UsersServices();
  const messageServices = new MessagesServices();
  let user_id = null;

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    const userExist = await usersServices.findByEmail(email);

    if (!userExist) {
      const user = await usersServices.create(email);

      await connectionsServices.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user_id;
    } else {
      user_id = userExist.id;
      const connection = await connectionsServices.findByUserId(userExist.id);

      if (!connection) {
        await connectionsServices.create({
          socket_id,
          user_id: userExist.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsServices.create(connection);
      }

    }

    await messageServices.create({
      text,
      user_id
    });

    const allMessages = await messageServices.listByUser(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await connectionsServices.findAllWithoutAdmin();
    socket.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async params => {
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;

    const { user_id } = await connectionsServices.findBySocketId(socket_id)

    const message = await messageServices.create({ text, user_id })
    
    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id
    });
  })
});