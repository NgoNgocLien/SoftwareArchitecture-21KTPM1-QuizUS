import { io, Socket } from 'socket.io-client';
import eventEmitter from './EventEmitter'; 
import config from './../../constants/config'
import { showToast } from '@/components/ToastBar';
class NotificationSocket {
  private socket: Socket | null = null;


  public connect(id_player: string) {
    if (!this.socket) {
      console.log("Connecting to Socket.IO server...");
      this.socket = io(config.NOTIFICATION_BE, { 
        transports: ['websocket'],
        query: { id_player: id_player },
        reconnection: true, 
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000, 
        reconnectionDelayMax: 5000, 
        timeout: 20000,
        path: '/notification',
      });
      
    }
    this.init(id_player);
  }

  private init(id_player: string) {
    // gửi id_player
    this.socket?.emit('newUser', id_player);

    // Lắng nghe sự kiện từ socket khi có thông báo mới
    this.socket?.on('notification', (data) => {
      // console.log('Received notification from server:', data); // Debug thông báo
      showToast('info', "Bạn có thông báo mới"); // Show toast with the notification message
      eventEmitter.emit('notification', data); // Phát sự kiện 'notification' cho tất cả listener
    });

    // Thêm lắng nghe cho kết nối thành công và lỗi
    this.socket?.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket?.on('connect_error', (err) => {
      console.error('Connection error noti:', err);
    });
  }

  // Ngắt kết nối socket
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket disconnected');
      this.socket = null;
    }
  }
}

// Đảm bảo tên biến đúng là notificationSocket (trước đó có lỗi typo)
const notificationSocket = new NotificationSocket();
export default notificationSocket;
