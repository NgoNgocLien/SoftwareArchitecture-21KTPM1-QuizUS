import { io, Socket } from 'socket.io-client';
import eventEmitter from './EventEmitter'; // Đảm bảo EventEmitter đã được cài đặt và import đúng cách

class NotificationSocket {
  private socket: Socket | null = null;

  // Kết nối tới socket chỉ khi chưa có kết nối
  public connect(id_player: string) {
    if (!this.socket) {
      console.log("abc")
      this.socket = io('http://192.168.2.177:8004', { transports: ['websocket'] }); // Đảm bảo URL server đúng
      this.init(id_player);
    }
  }

  private init(id_player: string) {
    // gửi id_player
    this.socket?.emit('newUser', id_player);

    // Lắng nghe sự kiện từ socket khi có thông báo mới
    this.socket?.on('notification', (data) => {
      console.log('Received notification from server:', data); // Debug thông báo
      eventEmitter.emit('notification', data); // Phát sự kiện 'notification' cho tất cả listener
    });

    // Thêm lắng nghe cho kết nối thành công và lỗi
    this.socket?.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket?.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
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
