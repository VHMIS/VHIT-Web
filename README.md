# Trang web ViethanIT mới (2016)

``Cập nhật lần cuối 10:08 12/01/2018``

## Về dự án

Nhằm thay đổi website cũ, dự án xây dựng website mới được bắt đầu từ tháng 1.2016, chính thức bắt đầu thiết kế và code từ tháng giữa tháng 2. Dự án sẽ kế thừa từ trang tuyển sinh 2015.

**Đây không phải là dự án chính thức được phê duyệt từ Ban Truyền Thông hay Ban Giám Hiệu, dự án này chỉ dựa trên yêu cầu thiết kế các trang con, từ đó xây dựng lại một chuẩn thiết kế để làm lại trang chính và đề xuất sau khi hoàn thành.**

**Để đảm bảo tính đúng đắn của nội dung, nội dung website mới nên được lấy từ cuốn brochure chuẩn của trường và tham khảo thêm ở website hiện tại**

### Thành viên

- Lê Nhật Anh, TTCNTT

### Hướng xây dựng

Toàn bộ website public đều được xây dựng theo hướng static web, thuần HTML. Sử dụng API để lấy nội dung từ hệ thống quản lý nếu cần.

### Các mục và trang con
- [x] Tuyển sinh 2017 http://viethanit.edu.vn/tuyensinh
- [x] ACIIDS 2016 http://viethanit.edu.vn/aciids-2016
- [x] CEST 2017 http://viethanit.edu.vn/cest-2017
- [x] ICIST 2017 http://viethanit.edu.vn/icist-2017
- [x] Trang kỷ niệm 10 năm http://viethanit.edu.vn/10-nam
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

## Kế hoạch 2018

- [ ] 15.03 : Xây dựng trang TUYỂN SINH 2018 (http://viethanit.edu.vn/tuyensinh/)
- [ ] 20.01 : Thử nghiệm trang NKCH
- [ ] 20.02 : Thử nghiệm trang thông tin tư liệu

## Phát triển

Xem DEV.md

Kể  từ 2018, Website sử dụng một số component từ CSS Framework Bulma (Bulma.io)

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
- 10NAM: Trang 10 năm

## Build website

VHIT-Web sử dụng Grunt để build các file CSS và JS, và Jekyll để xây dựng website. CSS được viết dưới ngôn ngữ SASS.

### Cài đặt công cụ

Nhóm công cụ của Grunt

- Cài đặt Nodejs (https://nodejs.org/download)
- Cài đặt grunt-cli: ``npm install -g grunt-cli``
- Ở thư mục gốc mã nguồn, thực hiện lệnh ``npm install`` để cài đặt các thành phần cần thiết.

Nhóm công cụ của Jekyll

- Cài đặt Ruby (https://www.ruby-lang.org/en/documentation/installation/)
- Cài đặt Jekyll ``gem install jekyll`` hoặc thông qua Gemfile ``gem install bundler`` ``bundler install``

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
- Liquid : http://shopify.github.io/liquid/
