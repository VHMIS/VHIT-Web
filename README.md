# Viethanit Website

## Kế hoạch

- 0.1 : Phát thảo
- 0.5 : Trình bày nội dung, họp thống nhất
- 1.0 : Hoàn thành

## Build website

VHIT-Web sử dụng Grunt để build các file CSS và JS, và Jekyll để xây dựng website. CSS được viết dưới ngôn ngữ SASS.

### Cài đặt công cụ

Nhóm công cụ của Grunt

- Cài đặt Nodejs (https://nodejs.org/download)
- Cài đặt grunt-cli: ``npm install -g grunt-cli``
- Ở thư mục gốc mã nguồn, thực hiện lệnh ``npm install`` để cài đặt các thành phần cần thiết.

Nhóm công cụ của Jekyll

- Cài đặt Ruby (https://www.ruby-lang.org/en/documentation/installation/)
- Cài đặt Jekyll ``gem install jekyll``

### Build

Tại thư mục gốc mã nguồn, chạy các lệnh grunt sau

- ``Grunt`` : Build file CSS và Javascript
- ``Grunt clear`` : Xóa các file CSS và Javascript đã build
- ``Grunt css`` : Chỉ build mỗi file CSS
- ``Grunt js`` : Chỉ build mỗi file JS

Để build hoặc xem trang web có thể chạy các lệnh sau

- ``Grunt build-web`` hoặc ``jekyll build`` : Build trang web hoàn chỉnh
- ``Grunt serve-web`` hoặc ``jekyll serve`` : Dựng server tại địa chỉ http://localhost:8080

## Các bản Build dựng sẵn

Nếu chỉ muốn xem kết quả hoặc lấy phiên bản web hoàn chỉnh, có thể tải các bản build trang web được dựng sẵn tại tab Release ở trang Github (https://github.com/VHMIS/VHIT-Web/releases).

Copy các file vào webserver để xem hoặc chạy trực tiếp file index.html ở thư mục tải về để duyệt web ở local (một số tính năng có thể bị hạn chế).
