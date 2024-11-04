# QuizUS - Viral Marketing Campaign System

The QuizUS system provides brands with a robust, game-based platform for launching real-time marketing campaigns. Brands can create engaging events, games, and rewards that allow consumers to participate in branded games and earn rewards, similar to the viral promotions offered by Momo and Viettelpay.

---

## Main Features

### Admin Module (Web)
- **User Management**: Add, update, delete users (brands, players, and admins).
- **Game Management**: Configure game details such as name, image, type, item exchange, and play instructions.
- **Reporting**: Access statistics on partners, players, and games.

### Brand Module (Web)
- **Event Registration**: Register promotional events, create game-based rewards, and issue vouchers.
- **Reporting**: Track campaign budget, player participation, and voucher usage statistics.

### Player Module (Mobile)
- **Account Management**: Register and verify accounts via OTP for reward claiming.
- **Event Participation**: View, save, and join current and upcoming events. Play games to win rewards.
- **Item Collection & Exchange**: Collect items for voucher exchanges, send items to friends, and request extra play attempts.
- **Reward Redemption**: Redeem vouchers online or in-store via QR code scanning by brand staff.

---

## Technologies Used

### Frontend
- **Web**: ReactJS
- **Mobile**: React Native

### Backend
- **Databases**: 
  - PostgreSQL for user and game configurations.
  - MongoDB for real-time data and caching.

### Infrastructure
- **Microservices Architecture**: Independent services for each feature (user management, event management, real-time game management, notifications).
- **Real-time Communication**:
  - **RESTful API** for inter-service communication.
  - **WebSockets** for real-time gameplay interactions.
- **Containerization**: Docker for packaging services.
- **Load Balancing & Auto-Scaling**: NGINX for load distribution.

---
