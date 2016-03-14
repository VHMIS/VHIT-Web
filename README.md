# Trang web ViethanIT mới (2016)

## Về dự án

Nhằm thay đổi website cũ, dự án xây dựng website mới được bắt đầu từ tháng 1.2016, chính thức bắt đầu thiết kế và code từ tháng giữa tháng 2.

Dự án sẽ kế thừa từ trang tuyển sinh 2015.

### Thành viên

## Kế hoạch

- [x] 02.20 : Xong phát thảo (v0.0.1)
- [ ] 02.24 : Hoàn thiện cấu trúc, các nội dung chính, thống nhất phương án thiết kế cuối cùng. (v0.1.0)
- [x] 03.02 : Thử nghiệm trang con ACIIDS (http://viethanit.edu.vn/aciids-2016/)
- [ ] 03.07 : Thử nghiệm trang con TUYỂN SINH 2016 (http://viethanit.edu.vn/tuyensinh/)
- [ ] 03.15 : Hoàn thành chạy thử nghiệm (v.1.0.0)
- [ ] 04.__ : Xây dựng hoàn chỉnh, có phương án xây dựng trang tiếng Anh, tiếng Hàn dựa theo trang tiếng Việt. (v1.x.0)

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
- ``Grunt production`` : Build file CSS và Javascript và tối ưu hóa (minified file)
- ``Grunt clear`` : Xóa các file CSS và Javascript đã build
- ``Grunt css`` : Chỉ build mỗi file CSS
- ``Grunt js`` : Chỉ build mỗi file JS
- ``Grunt min`` : Tối ưu hóa file CSS và JS
- ``Grunt watch`` : Tự động kiểm tra thay đổi các file js và scss để build lại

Để build hoặc xem trang web có thể chạy các lệnh sau

- ``Grunt build-web`` hoặc ``jekyll build`` : Build trang web hoàn chỉnh
- ``Grunt serve-web`` hoặc ``jekyll serve`` : Dựng server tại địa chỉ http://localhost:8080

## Các bản Build dựng sẵn

Nếu chỉ muốn xem kết quả hoặc lấy phiên bản web hoàn chỉnh, có thể tải các bản build trang web được dựng sẵn tại tab Release ở trang Github (https://github.com/VHMIS/VHIT-Web/releases).

Copy các file vào webserver để xem hoặc chạy trực tiếp file index.html ở thư mục tải về để duyệt web ở local (một số tính năng có thể bị hạn chế).

## Tham khảo

- SASS : http://sass-lang.com/documentation/file.SASS_REFERENCE.html
- Jekyll : http://jekyllrb.com/docs/home/
