import { io, Socket } from 'socket.io-client';
import eventEmitter from './EventEmitter'; // Đảm bảo EventEmitter đã được cài đặt và import đúng cách
import config from './../../constants/config'
import { showToast } from '@/components/ToastBar';
class NotificationSocket {
  private socket: Socket | null = null;

  // Kết nối tới socket chỉ khi chưa có kết nối
  public connect(id_player: string) {
    if (!this.socket) {
      console.log("Connecting to Socket.IO server...");
      this.socket = io(config.NOTIFICATION_BE, { 
        transports: ['websocket'], // Ensure websocket is used for transport
        query: { id_player: id_player },
        reconnection: true, // Enable automatic reconnection
        reconnectionAttempts: Infinity, // Unlimited reconnection attempts
        reconnectionDelay: 1000, // Delay in ms before attempting to reconnect
        reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
        timeout: 20000, // 20 seconds timeout for connection before failing
      });
      
    }
    this.init(id_player);
  }

  private init(id_player: string) {
    // gửi id_player
    this.socket?.emit('newUser', id_player);

    // Lắng nghe sự kiện từ socket khi có thông báo mới
    this.socket?.on('notification', (data) => {
      console.log('Received notification from server:', data); // Debug thông báo
      showToast('info', "Bạn có thông báo mới"); // Show toast with the notification message
      eventEmitter.emit('notification', data); // Phát sự kiện 'notification' cho tất cả listener
    });

    // Thêm lắng nghe cho kết nối thành công và lỗi
    this.socket?.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket?.on('connect_error', (err) => {
      console.error('Connection error:', err);
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
