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
