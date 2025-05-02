import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SignalingService } from './signaling.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/socket.io/chat',
})
export class SignalingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor
    (
      private readonly signalingService: SignalingService) { }

  handleConnection(socket: Socket) {
    console.log(`[WS] Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`[WS] Client disconnected: ${socket.id}`);
    this.signalingService.leaveRoom(socket);
  }

  @SubscribeMessage('join')
  async handleJoin(@MessageBody() roomId: string, @ConnectedSocket() socket: Socket) {
    console.log(`[WS] ${socket.id} joining room: ${roomId}`);
    this.signalingService.joinRoom(roomId, socket);

    socket.join(roomId);


    const clients = await this.server.in(roomId).fetchSockets();
    const numClients = clients.length;

    socket.emit('room-info', { initiator: numClients === 1 });

    socket.to(roomId).emit('user-joined', { userId: socket.id });
  }

  @SubscribeMessage('signal')
  async handleSignal(@MessageBody() payload: any, @ConnectedSocket() socket: Socket) {
    const { roomId, signal, from } = payload;

    const clients = await this.server.in(roomId).fetchSockets();
    const ids = clients.map(c => c.id);
    console.log(`[WS] Clients in room ${roomId}:`, ids);

    console.log(`[WS] Signal from ${from} to room ${roomId}:`, signal.type);
    if (clients.length > 0) {
      clients.forEach(client => {
        if (client.id !== socket.id) {
          console.log('signal 보냄', client.id)
          client.emit('signal', { signal, from });
        }
      });
    }
  }
}
