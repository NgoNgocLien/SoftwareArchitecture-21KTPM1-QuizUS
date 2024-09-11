import { io, Socket } from 'socket.io-client';
import config from './../constants/config';

class GameSocket {
  private socket: Socket | null = null;

  public connect(id_player: string) {
    if (!this.socket) {
      console.log("Connecting to Game server...");
      this.socket = io(config.GAME_BE, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });
    }

    this.socket?.on('connect_error', (err) => {
      console.error('Connection error game:', err);
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket disconnected');
      this.socket = null;
    }
  }

  public on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

const gameSocket = new GameSocket();
export default gameSocket;
