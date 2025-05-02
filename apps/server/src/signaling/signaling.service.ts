import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SignalingService {
  private rooms = new Map<string, Set<Socket>>();

  joinRoom(roomId: string, socket: Socket) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId)!.add(socket);
    console.log(`${socket.id} joined room: ${roomId}`);
  }

  leaveRoom(socket: Socket) {
    for (const [roomId, sockets] of this.rooms.entries()) {
      if (sockets.has(socket)) {
        sockets.delete(socket);
        console.log(`${socket.id} left room: ${roomId}`);
        if (sockets.size === 0) {
          this.rooms.delete(roomId);
        }
        break;
      }
    }
  }
}
