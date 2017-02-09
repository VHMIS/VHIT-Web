# Trang web ViethanIT mới (2016)

## Về dự án

Nhằm thay đổi website cũ, dự án xây dựng website mới được bắt đầu từ tháng 1.2016, chính thức bắt đầu thiết kế và code từ tháng giữa tháng 2.

Dự án sẽ kế thừa từ trang tuyển sinh 2015.

### Thành viên

### Các mục và trang con
- [ ] Tuyển sinh http://viethanit.edu.vn/tuyensinh
- [x] ACIIDS 2016 http://viethanit.edu.vn/aciids-2016
- [ ] CEST 2017 http://viethanit.edu.vn/cest-2017
- [ ] ICIST 2017 http://viethanit.edu.vn/icist-2017
- [ ] Quan hệ doanh nghiệp và hỗ trợ việc làm
- [ ] Trang thư viện
- [ ] Trang tài liệu ISO

#### Trang thư viện

Trang thư viện là trang con thuộc website mới, trang này sẽ thay thế trang public của KOHA, sử dụng các API của KOHA để truy cập danh mục sách. Dự kiến trang thư viện phải đạt được các mục đích sau

- [ ] Hiển thị được danh mục sách
- [ ] Hiển thị danh sách sách theo các tiêu chí, gồm mới nhất, đọc nhiều, ...
- [ ] Tìm kiếm
- [ ] Duyệt toàn bộ sách

#### Quan hệ doanh nghiệp và hỗ trợ việc làm

Website của trung tâm Quan hệ doanh nghiệp và hỗ trợ việc làm, gồm 2 trang chính:

Cựu sinh viên

- [ ] Form khảo sát dành cho cựu sinh viên
- [ ] Thông tin cựu sinh viên
- [ ] Trang việc làm dành cho sinh viên và cựu sinh viên

Doanh nghiệp

- [ ] Giới thiệu
- [ ] Form dành cho doanh nghiệp gửi tin tuyển dụng

## Kế hoạch

- [x] 02.20 : Xong phát thảo (v0.0.1)
- [x] 02.24 : Hoàn thiện cấu trúc, các nội dung chính, thống nhất phương án thiết kế cuối cùng. (v0.1.0)
- [x] 03.02 : Thử nghiệm trang con ACIIDS (http://viethanit.edu.vn/aciids-2016/)
- [x] 03.07 : Thử nghiệm trang con TUYỂN SINH 2016 (http://viethanit.edu.vn/tuyensinh/)
- [x] 03.15 : Hoàn thành chạy thử nghiệm (v.1.0.0)
- [ ] 04.__ : Xây dựng hoàn chỉnh, có phương án xây dựng trang tiếng Anh, tiếng Hàn dựa theo trang tiếng Việt. (v1.x.0)
- [ ] 08.15 : Thử nghiệm trang cựu sinh viên & Quan hệ doanh nghiệp
- [ ] 09.01 : Hoàn thiện trang thư viện

## Phát triển

### Commit tag

Do có nhiều trang con cùng phát triển, nên việc sử dụng tag khi commit là bắt buộc.
Quy tắt "[TAG] Nội dung commit"

Không cần tag:

- Những nội dung chung

2016:

- TS: Trang tuyển sinh

2017:

- CEST: Trang hội thảo khoa học 3 trường 2017
- ICIST: Trang hội thảo ICIST 2017 tại Đà Nẵng
- TS: Trang tuyển sinh
- TV: Trang thư viện + trung tâm tư liệu
- DN: Trang doanh nghiệp + trung tâm quan hệ doanh nghiệp
- CSV: Trang cựu sinh viên + trung tâm quan hệ doanh nghiệp
- NCKH: Trang thông tin NCKH + phòng HTQT NCKH
- HTQT: Trang thông tin HTQT + phòng HTQT NCKH

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
