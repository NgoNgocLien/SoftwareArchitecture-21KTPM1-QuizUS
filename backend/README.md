# QuizUS Backend

## Triển khai Microservices và Load Balancer bằng NGINX với Docker
### Yêu cầu trước khi bắt đầu:
* Cài đặt Docker [tại đây](https://www.docker.com/)
### Cách chạy:
1. Mở terminal và điều hướng đến thư mục dự án:
```shell
cd F:/21KTPM1-SoftwareArchitecture-QuizUS/backend/
```
2. Chạy các service bằng Docker Compose:
* Để mỗi service chạy trên một server:
```shell
docker compose up
```
* Để scale lên nhiều server cho mỗi service:
```shell
docker compose up --scale user=2 --scale game=2 --scale campaign=2
```
3. Gọi API thông qua API Gateway:
* Base URL của API Gateway: `http://localhost:8000/`
* Gọi API của các service cụ thể:
  * User service: `http://localhost:8000/user/api`
  * Game service: `http://localhost:8000/game/api`
  * Campaign service: `http://localhost:8000/campaign/api`

## Chạy độc lập từng service (nếu không sử dụng Docker):
1. Mở terminal và điều hướng đến thư mục của service:
```shell
cd F:/21KTPM1-SoftwareArchitecture-QuizUS/backend/<tên-service>
```
3. Chạy service bằng lệnh:
```shell
npm start
```
