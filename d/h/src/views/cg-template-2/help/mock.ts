const contentList: any = [
  {
    cont1: [
      {
        title: `1. LÀM THẾ NÀO ĐỂ ĐĂNG KÝ TÀI KHOẢN?`,
        item: [
          { item1: `Nhấp chọn nút “ĐĂNG KÝ” ở góc trên bên phải màn hình trang chủ.`, nbsp: 2, kong: 'kong' },
          { item2: `Tạo tài khoản từ 5 - 14 ký tự, bắt buộc viết thường không dấu, mật khẩu có độ dài từ 8 - 20 ký tự, không kèm ký tự đặc biệt hoặc dấu.`, num: 1 },
          { item3: `Vui lòng đọc kỹ điều khoản cũng như bảo đảm bạn đã trên 18 tuổi trước khi tiến hành đăng ký.`, num: 2 }
        ]
      },
      {
        title: `2. LÀM GÌ KHI QUÊN TÀI KHOẢN ĐĂNG NHẬP?`,
        item: [
          { item1: `Trong trường hợp bạn đã quên tài khoản đăng nhập, vui lòng liên hệ CSKH 24/7 để được hỗ trợ.`, nbsp: 2 }
        ]
      },
      {
        title: `3. LÀM GÌ KHI QUÊN MẬT KHẨU?`,
        item: [
          { item1: `Nhấp chọn nút “QUÊN MẬT KHẨU” ở mục đăng nhập, nhập tài khoản đăng nhập và số điện thoại xác thực, cài đặt mật khẩu mới và hoàn tất.`, nbsp: 2 }
        ]
      },
      {
        title: `4. LÀM THẾ NÀO ĐỂ THAY ĐỔI THÔNG TIN CÁ NHÂN?`,
        item: [
          { item1: `Sau khi đăng ký hoàn tất, bạn có thể chọn “THÔNG TIN” > tại trang giao diện thông tin cá nhân điền hoàn tất thông tin. Lưu ý: thông tin đã đăng ký không thể thay đổi. Nếu muốn sửa đổi, vui lòng liên hệ CSKH 24/7 để được hỗ trợ.`, nbsp: 2 }
        ]
      },
      {
        title: `5. TÔI CÓ THỂ THAM GIA CÁ CƯỢC Ở P3BET KHÔNG?`,
        item: [
          { item1: `Trước khi đăng nhập và trải nghiệm trang web, vui lòng đảm bảo quý khách đã trên 18 tuổi, cũng như đồng ý với các điều khoản, quy định của chúng tôi, luật pháp của các quốc gia là không đồng nhất. Luôn tôn trọng luật pháp bản địa về quy định cá cược. Chúng tôi không chịu trách nhiệm mọi hành vi vi phạm với pháp luật quốc gia sở tại bởi các nguyên nhân được nêu trên.`, nbsp: 2 }
        ]
      }
    ],
    cont2: [
      {
        title: `1. LÀM THẾ NÀO ĐỂ NẠP?`,
        item: [
          { item1: `Đăng nhập tài khoản P3 > “NẠP TIỀN” > Chọn phương thức nạp.`, nbsp: 2 }
        ]
      },
      {
        title: `2. CHUYỂN KHOẢN THẺ NGÂN HÀNG`,
        item: [
          { item1: `Đăng nhập tài khoản P3 > “Nạp Tiền” > “Chuyển Khoản Ngân Hàng”.`, num: 1 },
          { item2: `Đăng nhập ứng dụng ngân hàng > Chọn chuyển khoản ngân hàng > Dán thông tin người nhận > Nhập số tiền – PS: Nhập nội dung chuyển khoản – Chuyển thành công.`, num: 2 }
        ]
      },
      {
        title: `3. NHỮNG VẤN ĐỀ KHI NẠP TIỀN`,
        item: [
          { item1: `Nếu không có thẻ ngân hàng có nạp được không?`, kong: 'kong', num: 1 },
          { item2: `Có thể lựa chọn nạp qua ViettelPay, ZALO hoặc Thẻ Cào thực hiện quét mã, lập tức lên điểm vào tài khoản khi thành công.`, kong: 'kong', hang: 'l' },
          { item3: `PS là gì? Vì sao phải nhập nội dung chuyển khoản?`, kong: 'kong', num: 2 },
          { item4: `Khi đang thao tác chuyển khoản, bạn buộc phải nhập nội dung chuyển khoản, để tránh điểm không được lên thành công vào tài khoản.`, kong: 'kong', hang: 'l' },
          { item5: `Khách hàng cũ nạp tiền cần lưu ý:`, kong: 'kong', num: 3 },
          { item6: `Mỗi khi tiến hành nạp tiền, vui lòng lấy số tài khoản mới nhất tại trang chủ, không lưu số tài khoản cũ tránh chuyển tiền thất bại hoặc tổn thất. Khách hàng sẽ phải tự chịu trách nhiệm.`, kong: 'kong', hang: 'l' },
          { item7: `Thời gian nạp trung bình mất bao lâu?`, kong: 'kong', num: 4 },
          { item8: `Khi đã điền chính xác nội dung chuyển khoản, vui lòng chọn chuyển nhanh 24/7, điểm sẽ được lên ngay lập tức khi chuyển thành công.`, kong: 'kong', hang: 'l' },
        ]
      }
    ],
    cont3: [
      {
        title: `1. LÀM THẾ NÀO ĐỂ RÚT TIỀN?`,
        item: [
          { item1: `Vui lòng liên kết thông tin rút tiền trước khi rút tiền lần đầu. Các bước liên kết như sau: Đăng nhập tài khoản P3 > Chọn "Liên Kết Rút Tiền" > Thêm Thẻ Ngân Hàng / Địa Chỉ USDT, sau khi liên kết thành công có thể lập tức tiến hành rút tiền.`, num: 1 }
        ]
      },
      {
        title: `2. CÓ THỂ DÙNG THẺ NGÂN HÀNG/ĐỊA CHỈ USDT CỦA NGƯỜI KHÁC RÚT TIỀN KHÔNG?`,
        item: [
          {
            item1: `Nhằm đảm bảo an toàn thông tin tài khoản khách hàng, vui lòng sử dụng thông tin chính chủ để liên kết rút tiền, tên chủ thẻ/địa chỉ phải đồng nhất với đên đã đăng ký trong tài khoản.`, nbsp: 2
          }
        ]
      },
      {
        title: `3. LIÊN KẾT RÚT TIỀN CẦN CHÚ Ý ĐIỀU GÌ?`,
        item: [
          { item1: `Tên chủ thẻ/địa chỉ cần đồng nhất với tên đăng ký trong tài khoản, bắt buộc sử dụng thông tin chính chủ.`, num: 1 },
          { item2: `Thông tin thẻ/địa chỉ phải chính xác, tối đa chỉ được liên kết với 5 thẻ ngân hàng/5 địa chỉ USDT.`, num: 2 },
          { item3: `Cổng rút tiền đa dạng, thời gian xử lý nhanh, hỗ trợ rút tiền 24/7.`, num: 3 }
        ]
      },
      {
        title: `4. TÔI CÓ THỂ SỬ DỤNG NHIỀU THẺ/ĐỊA CHỈ RÚT TIỀN KHÔNG?`,
        item: [
          { item1: `Hội viên chỉ được liên kết tối đa 5 thẻ ngân hàng/5 địa chỉ USDT, vui lòng chọn mục "LIÊN KẾT RÚT TIỀN" để tiến hành liên kết.`, nbsp: 2 }
        ]
      },
      {
        title: `5. NGÂN HÀNG HỖ TRỢ RÚT TIỀN`,
        item: [
          { item1: `Hiện tại chúng tôi hỗ trợ rút tiền với 54 ngân hàng, bao gồm: Vietcombank, VietinBank, Techcombank, BIDV, VPBank, MB Bank, Agribank, ACB, TPBank, HDBank, Sacombank, VIB, SHB, OCB, MSB là các ngân hàng uy tín lớn, cũng như hệ thống không ngừng cập nhật sửa đổi. Vui lòng sử dụng tài khoản chính xác khi liên kết.`, nbsp: 2 }
        ]
      },
      {
        title: `6. TÀI KHOẢN TRÒ CHƠI CỦA TÔI CÓ TIỀN, VÌ SAO KHÔNG THỂ RÚT?`,
        item: [
          { item1: `Quý khách vui lòng chuyển tiền từ ví tiền sảnh về ví tiền chính trước khi rút tiền.`, num: 1 },
          { item2: `Nếu hiển thị “BẠN ĐANG CÓ 1 ĐƠN RÚT CHƯA XÁC THỰC THÀNH CÔNG”, hoặc có vấn đề về rút tiền, vui lòng liên hệ CSKH để được hỗ trợ.`, num: 2 }
        ]
      },
      {
        title: `7. VÌ SAO RÚT TIỀN CẦN XÁC THỰC?`,
        item: [
          {
            item1: `Xác thực rút tiền là quy trình kiểm tra đơn giản trước khi thực hiện chuyển tiền cho khách hàng, nhằm đảm bảo an toàn tài sản khách hàng, bắt buộc tiến hành đối chiếu xác thực thông tin.`, nbsp: 2
          }
        ]
      },
      {
        title: `8. GIỚI HẠN VÒNG CƯỢC KHI RÚT TIỀN`,
        item: [
          { item1: `Chỉ cần thoả mãn điều kiện 1 vòng cược mỗi khi nạp, có thể tuỳ lúc rút tiền.`, nbsp: 2 },
          { item2: `Ví dụ: Nếu quý khách nạp 100k VND, chỉ cần hoàn thành 100k VND đặt cược hợp lệ lập tức có thể rút tiền. Nếu bạn đã đăng ký qua hoạt động khuyến mãi khác, bạn cần hoàn thành điều kiện vòng cược của từng hoạt động trước khi rút tiền!` }
        ]
      },
      {
        title: `9. TIỀN CHƯA VỀ TÀI KHOẢN SAU KHI RÚT?`,
        item: [
          { item1: `Sau khi đăng ký rút tiền, thông thường trong 5 phút tài khoản sẽ nhận được tiền, chậm về tài khoản chủ yếu vì nguyên nhân kết nối mạng không ổn định, hoặc nguyên nhân kiểm soát rủi ro. Quý khách vui lòng chờ trong chốc lát. Nếu sau 30 phút vẫn chưa nhận được tiền, vui lòng liên hệ CSKH cung cấp những thông tin sau để được hỗ trợ:`, nbsp: 2, kong: 'kong' },
          { item2: `(1) Tài khoản hội viên` },
          { item3: `(2) Thời gian rút tiền` },
          { item4: `(3) Số tiền rút` }
        ]
      },
      {
        title: `10. LÀM CÁCH NÀO ĐỂ KIỂM TRA VÒNG CƯỢC CÒN THIẾU?`,
        item: [
          {
            item1: `Nếu bạn có đăng ký hoạt động khuyến mãi, tìm mục khuyến mãi đã đăng ký để kiểm tra điều kiện vòng cược, sau đó chọn “TÀI KHOẢN” > “LỊCH SỬ ĐẶT CƯỢC” để kiểm tra số tiền cược hợp lệ đã đặt. Nếu không đăng ký nhận khuyến mãi, chỉ cần đạt đủ điều kiện 1 vòng cược lập tức có thể rút tiền.`, nbsp: 2
          }
        ]
      }
    ],
    cont4: [
      {
        title: `1. CHUYỂN TIỀN GIỮA CÁC VÍ NHƯ THẾ NÀO?`,
        item: [
          {
            item1: `Đăng nhập tài khoản P3 > "CHUYỂN KHOẢN". Tính năng "CHUYỂN VÀO" chuyển nhanh tiền từ ví tiền chính vào ví tiền sảnh. Tính năng "CHUYỂN RA" rút nhanh tiền từ ví tiền sảnh về ví tiền chính.`, nbsp: 2
          }
        ]
      },
      {
        title: `2. VẤN ĐỀ BẤT THƯỜNG KHI CHUYỂN KHOẢN`,
        item: [
          { item1: `Tại sao tài khoản trò chơi có tiền mà không thể rút? Quý khách vui lòng thực hiện thao tác chuyển tiền từ ví tiền sảnh về ví tiền chính trước khi thực hiện rút tiền.`, num: 1 },
          { item2: `Chuyển khoản thất bại phải làm sao? Trước khi chuyển khoản vui lòng thoát hẳn trò chơi, nếu vẫn không thể chuyển khoản vui lòng liên hệ CSKH để được hỗ trợ.`, num: 2 }
        ]
      },
      {
        title: `3. HƯỚNG DẪN TỰ ĐỘNG CHUYỂN KHOẢN`,
        item: [
          { item1: `Giao diện chuyển khoản thêm mới tính năng tự động chuyển khoản.`, nbsp: 2, kong: 'kong' },
          { item2: `Khi bạn đăng nhập vào sảnh trò chơi, tiền từ ví tiền chính sẽ được chuyển tự động vào ví tiền sảnh. Bạn có thể trực tiếp thực hiện rút tiền. Nếu đường truyền không ổn định dẫn tới chuyển tiền về ví tiền chính thất bại, quý khách vui lòng làm mới trang. Nếu gặp vấn đề vui lòng liên hệ CSKH để được hỗ trợ.`, nbsp: 2 }
        ]
      }
    ],
    cont5: [
      {
        title: `1. LÀM SAO ĐỂ ĐĂNG KÝ THAM GIA KHUYẾN MÃI?`,
        item: [
          {
            item1: `Chỉ cần quý khách đủ điểu kiện để tham gia hoạt động, chọn mục khuyến mãi lựa chọn hoạt động tương ứng, kéo xuống phần cuối cùng của trang, chọn “NHẬN NGAY” để lập tức tham gia hoạt động khuyến mãi.`, nbsp: 2
          }
        ]
      },
      {
        title: `2. HOÀN TRẢ, HOA HỒNG BAO GIỜ THÌ PHÁT?`,
        item: [
          { item1: `Hoàn trả và hoa hồng sẽ không cần đăng ký, sẽ được tự động phát tặng vào tài khoản.`, nbsp: 2 },
          { item2: `Hoa hồng được phát thưởng vào 12h trưa ngày kế tiếp, tiền hoàn trả sẽ được hoàn trả ngay vào tài khoản của bạn.`, nbsp: 2 },
          { item3: `Không cần vòng cược vẫn có thế rút tiền (không giới hạn Trò Chơi). Vui lòng kiểm tra ở trang Đại Lý hoặc liên hệ CSKH để được hỗ trợ.`, nbsp: 2 }
        ]
      }
    ],
    cont6: [
      {
        title: `1. CHỌN TRÌNH DUYỆT NÀO ĐỂ CHƠI MƯỢT MÀ TRÊN P3?`,
        item: [
          { item1: `WEB: Hỗ trợ Chrome, Cốc cốc, FireFox (sử dụng Chrome có hỗ trợ chuyển tiền ngân hàng trong nước).`, nbsp: 2 },
          { item2: `H5: Hỗ trợ Chrome, Safari, trình duyệt có sẵn trên điện thoai (sử dụng Chrome có hỗ trợ chuyển tiền ngân hàng trong nước).`, nbsp: 2 },
          { item3: `Nếu quý khách đang sử dụng trình duyệt không có trong danh sách trên và gặp phải vấn đề, khuyến nghị quý khách nên sử dụng các trình duyệt khuyên dùng, và cập nhật lên phiên bản mới nhất. Nếu gặp phải vấn đề về trình duyệt khi sử dụng, vui lòng liên hệ CSKH để được hỗ trợ.`, nbsp: 2 }
        ]
      },
      {
        title: `2. VÌ SAO SỬ DỤNG TRÌNH DUYỆT PHIÊN BẢN CŨ SẼ ẢNH HƯỞNG ĐẾN TRẢI NGHIỆM VÀ AN TOÀN TÀI KHOẢN?`,
        item: [
          { item1: `Đầu tiên, phiên bản cũ hiệu năng thấp, khả năng truyền tải dữ liệu kém, ảnh hưởng rất lớn tới khả năng đọc dữ liệu cũng như hiệu quả không cao.`, nbsp: 2 },
          { item2: `Tiếp đến, tính an toàn của phiên bản cũ không đảm bảo, hacker có thể lợi dụng các lỗ hổng về bảo mật để cài mã độc vào trình duyệt, điều này rất nguy hiểm, vì có thể gây mất an toàn về tài sản cũng như ảnh hưởng tới trải nghiệm người dùng.`, nbsp: 2 },
          { item3: `Bởi những lý do trên, cũng như để đảm bảo an toàn cho hội viên, chúng tôi đặc biệt lưu ý khách hàng nên nâng cấp phiên bản trình duyệt mới nhất, để P3 có thể mang lại cho bạn chất lượng dịch vụ tối ưu của sản phẩm.`, nbsp: 2 }
        ]
      },
      {
        title: `3. TÔI CÓ CẦN BẤT CỨ PHẦN MỀM HỖ TRỢ HOẶC ỨNG DỤNG BỔ TRỢ ĐỂ MỞ TRANG CHỦ KHÔNG?`,
        item: [
          { item1: `Trang web của chúng tôi không cần các phần mềm bổ trợ. Nhưng có một bộ phận trò chơi có thể sẽ yêu cầu ứng dụng hỗ trợ để chạy. Ví dụ: truyền phát video CASINO trực tuyến, có thể sẽ yêu cầu cài đặt Flash mới có thể hiển thị. Trình duyệt sẽ tích hợp trong quá trình tải giao diện.`, nbsp: 2 },
          { item2: `Các ứng dụng bổ trợ sử dụng thường xuyên thông thường là Java, Flash Player, Adobe Acrobat, QuickTime và Microsoft Silverlight.`, nbsp: 2 }
        ]
      }
    ],
    cont7: [
      {
        title: ``,
        item: [
          { item1: `Tại giao diện đăng nhập chọn “QUÊN MẬT KHẨU”.`, nbsp: 2 },
          { item2: `Điền tài khoản đăng nhập, số điện thoại xác thực danh tính, cài đặt mật khẩu mới hoàn tất.` },
        ]
      }
    ],
    cont8: [
      {
        title: ``,
        item: [
          {
            item1: `Nếu quý khách gặp vấn đề khi đăng nhập trang web, có thể thay đổi đường truyền kết nối sang Wifi, cài đặt lại DNS là có thể xử lý.`, nbsp: 2
          }
        ]
      },
      {
        title: `THAO TÁC TRÊN MÁY TÍNH`,
        item: [
          { item1: `(1) Chọn “BẮT ĐẦU”, lựa chọn “CÀI ĐẶT”` },
          { item2: `(2) Chọn “CÀI ĐẶT INTERNET”` },
          { item3: `Nhấp để xem trạng thái mạng và nhiệm vụ cho các mục mạng và trung tâm chia sẻ`, num: 3 },
          { item4: `(4) Nhấp vào địa chỉ liên kết` },
          { item5: `(5) Chọn thuộc tính` },
          { item6: `(6) Chọn cài đặt IPV4 hoặc IPV6, nhấp vào thuộc tính` },
          { item7: `(7) Chọn cài đặt thay đổi địa chỉ dịch vụ DNS` },
          { item8: `Địa chỉ dịch vụ DNS - IPV4 : 8.8.8.8 hoặc 8.8.8.4`, nbsp: 2 },
          { item9: `Địa chỉ dịch vụ - IPV6 : 2001:4860:4860::8888 hoặc`, nbsp: 2 },
          { item10: `2001:4860:4860::8844`, nbsp: 2 },
          { item11: `(8) Chọn xác nhận hoàn thành cài đặt` }
        ]
      },
      {
        title: `THAO TÁC TRÊN ĐIỆN THOẠI`,
        item: [
          { item1: `(1) Chọn liên kết mạng Wifi chọn cài đặt DNS` },
          { item2: `(2) Chọn thay đổi địa chỉ sử dụng dịch vụ DNS` },
          { item3: `Địa chỉ dịch vụ DNS - IPV4 : 8.8.8.8 hoặc 8.8.8.4`, nbsp: 2 },
          { item4: `Địa chỉ dịch vụ - IPV6 : 2001:4860:4860::8888 hoặc`, nbsp: 2 },
          { item5: `2001:4860:4860::8844`, nbsp: 2 },
          { item6: `(3) Chọn hoàn thành cài đặt DNS` }
        ]
      }
    ]
  },
  {
    cont1: [
      {
        title: ``,
        item: [
          { item1: `P3 phát triển và phát hành Lô Đề CG bao gồm Lô Đề Nhanh và Lô Đề Truyền Thống. Lô Đề Nhanh sở hữu đa dạng hình thức chơi lô đề Việt Nam, ví dụ: Bao Lô, Lô Xiên, Đánh Đề, Đầu Đuôi, 3 Càng, Lô Trượt, cùng các hình thức chơi mới như Tài Xỉu - Chẵn Lẻ, Thú Vị. Tất cả những hình thức đặt cược bạn thích chúng tôi đều có!`, num_null: 1, kong: 'kong' },
          { item2: `Có thể xem luật chơi của từng thể loại cược lô đề tại góc trên bên phải màn hình. Mọi thắc mắc về phương thức chơi, vui lòng liên hệ CSKH để được hỗ trợ.`, num_null: 2, kong: 'kong' },
          { item3: `Sau khi hoàn thành đặt cược, nhấp chọn “LỊCH SỬ ĐẶT CƯỢC” của phiên bản H5, phiên bản PC tại giao diện đặt cược tại góc dưới bên trái màn hình “LỊCH SỬ ĐẶT CƯỢC” để kiểm tra đơn cược có trúng thưởng hay không?`, num_null: 3, kong: 'kong' },
          { item4: `Sau khi đặt cược thành công, hệ thống sẽ tự động trừ số tiền tương ứng với đơn cược, nếu trúng thưởng, tiền thắng cược sẽ được thêm tự động vào tài khoản của bạn. Có thể vào mục “Tài Khoản” — “Lịch Sử Giao Dịch”, để xem chi tiết về lịch sử giao dịch của bạn.`, num_null: 4 }
        ]
      }
    ],
    cont2: [
      {
        title: `1. P3 CÓ NHỮNG THỂ LOẠI TRÒ CHƠI NÀO?`,
        item: [
          {
            item1: `Trò chơi của P3 rất đa dạng, bao gồm Lô Đề CG do chúng tôi phát triển, ngoài ra còn có Live Casino, Thể Thao, Game Bài, Nổ Hũ, Bắn Cá, Đá Gà, E-Sports với hàng ngàn trò chơi đặc sắc cho quý khách chọn lựa.`, nbsp: 2
          }
        ]
      },
      {
        title: `2. LÀM THỂ NÀO ĐỂ XEM CÁCH CHƠI CỦA MỖI TRÒ?`,
        item: [
          {
            item1: `Đối với từng trò chơi sẽ có mục hiển thị riêng cách chơi. Nếu gặp phải vấn đề về cách chơi, vui lòng liên hệ CSKH để được hỗ trợ.`, nbsp: 2
          }
        ]
      },
      {
        title: `3. NẾU GẶP PHẢI VẤN ĐỀ SAI SÓT CỦA TRÒ CHƠI HOẶC TRANH CHẤP PHẢI LÀM THẾ NÀO?`,
        item: [
          { item1: `Nếu gặp phải vấn đề khi chơi, quý khách vui lòng liên hệ CSKH để được hỗ trợ, cung cấp một số thông tin như sau:`, nbsp: 2, kong: 'kong' },
          { item2: `Tài khoản đăng nhập P3 của quý khách.`, num: 1 },
          { item3: `Giải thích lỗi trò chơi, gồm: Tên trò chơi, mã đơn cược, nội dung cược, số tiền và thời gian cược.`, num: 2 }
        ]
      }
    ]
  },
  {
    cont1: [
      {
        title: ``,
        item: [
          {
            item1: `P3 thành lập và phát triển với hơn 10 năm, bản thân mang vị thế của nhà cái đứng đầu, đội ngũ chăm sóc khách hàng 2000 nhân viên, sở hữu gần như tuyệt đối các trò chơi trên thị trường. Công ty sở hữu giấy phép hoạt động, cũng như chứng chỉ kinh doanh của các tổ chức cá cược uy tín, đề cao nguyên tắc uy tín làm hàng đầu.`,
            nbsp: 2,
            icon: [
              { icon1: 'i_mock1', cont1: 'Giấy Phép', cont2: 'Game Cá Cược', cont3: 'Philippines (PAGCOR)' },
              { icon2: 'i_mock2', cont1: 'Giấy Phép Cá', cont2: 'Cược Malta', cont3: '(MGA)' },
              { icon3: 'i_mock3', cont1: 'Giấy Phép', cont2: 'Quần Đảo', cont3: 'Virgin Anh (BVI)' },
              { icon4: 'i_mock4', cont1: 'Ủy Ban GC', cont2: 'Supervisory', cont3: 'Của Anh' },
            ]
          },
          { item2: `Chúng tôi toàn lực quảng bá thương hiệu “LÔ ĐỀ CG” do chúng tôi tự phát triển, mang lại cho bạn mức hoàn trả cao nhất toàn thị trường! Tích hợp tính năng phòng trò chuyện “LÔ ĐỀ CG”, giúp bạn bắt kịp mọi khoảnh khắc, tham gia trò chuyện cùng nhau kiếm tiền! Ngoài ra chúng tôi cũng tích cực quảng bá các sản phẩm khác bao gồm: Live Casino, Thể Thao, Đá Gà cùng vô số thể loại trò chơi hiện hành, tất cả các trò chơi đều mang lại cho bạn mức hoàn trả cao nhất!`, nbsp: 2, kong: 'kong' },
          { item3: `Chúng tôi cũng đã chuẩn bị các hoạt động phong phú, thiết kế bố cục giao diện tinh tế, nhằm mang lại những trải nghiệm cho khách hàng khi chơi game một cách chất lượng nhất, an toàn nhất, chân thực nhất, công bằng nhất và đầy đủ nhất về dịch vụ trò chơi cá cược.`, nbsp: 2, kong: 'kong' },
          { item4: `Nhằm đảm bảo tính thanh khoản 100% cho mỗi người chơi, Nhà cái đã ký hiệp định cam kết trị giá 100 triệu USD bảo hiểm cùng hiệp hội ngân hàng thế giới. P3 đã thông qua ký kết hiệp định với các ngân hàng lớn đang hoạt động tại Việt Nam. Bất kể quý khách là nạp hay rút, thời gian xử lý trung bình chỉ gói gọn trong 5 phút sẽ hoàn tất, với cổng thanh toán nạp rút hoạt động liên tục 24/7, cam kết hoàn gấp 3 nếu có chậm trễ.`, nbsp: 2, kong: 'kong' },
          { item5: `Nhà cái chúng tôi luôn luôn đặt sự an toàn tài chính của khách hàng lên hàng đầu, bảo vệ an toàn cho tài sản của khách hàng. Đồng thời máy chủ nhà cái được đặt ở nước ngoài, được bảo hộ bởi pháp luật sở tại, đảm bảo an toàn thông tin cá nhân quý vị!`, nbsp: 2, },
        ]
      },
      {
        title: `TỔNG ĐÀI CSKH`,
        item: [
          {
            item1: ``,
            img: [
              { icon1: 'i_mock5', cont1: '+63 9382333333' },
            ]
          },
          { item2: `Nếu gặp phải bất cứ vấn đề gì trong quá trình tham gia giải trí, xin quý khách vui lòng liên hệ đội ngũ CSKH trực tuyến để được nhận sự hỗ trợ 1 vs 1 từ chúng tôi.`, nbsp: 2, kong: 'kong' },
          { item3: `Tổng hợp những ưu điểm trên, P3BET là sự lựa chọn duy nhất và đúng đắn nhất của quý vị. Còn chờ đợi gì? Hãy tham gia trải nghiệm ngay thôi nào!`, nbsp: 2 },
        ]
      },
    ],
    cont2: [
      {
        title: `1. TRÁCH NHIỆM CÁ CƯỢC`,
        item: [
          { item1: `P3 là nhà cung cấp dịch vụ chuyên nghiệp về cá cược lô đề cùng các thể loại trò chơi khác, nhằm mang đến cho người dùng một trải nghiệm trọn vẹn cùng môi trường chơi lành mạnh. Chúng tôi hy vọng tất cả người chơi trong quá trình tham gia chơi hãy luôn tự điều chỉnh tâm trạng, đừng để trò chơi chi phối cuộc sống của bạn. Chúng tôi cung cấp đa dạng phương diện giúp đỡ vì người chơi kiểm soát bản thân, nghiêm cấm người chơi chưa đủ tuổi vị thành niên tham gia cá cược tại trang web chúng tôi.`, nbsp: 2 },
        ]
      },
      {
        title: ``,
        item: [
          { item1: `P3 nhấn mạnh lưu ý tới quý khách:`, bold: true },
        ]
      },
      {
        title: ``,
        article: ``,
        item: [
          { item1: `Khi đăng nhập vào hệ thống của chúng tôi, không cho phép trẻ vị thành niên xem hoặc ở trong phạm vi hiển thị của màn hình.`, num: 1 },
          { item2: `Nếu người dùng cần rời khỏi phạm vi hoạt động của hệ thống, vui lòng nhớ khóa máy tính / điện thoại di động bằng mật khẩu.`, num: 2 },
          { item3: `Mỗi người dùng phải giữ tài khoản và mật khẩu trò chơi ở một nơi an toàn.`, num: 3 },
          { item4: `Không bao giờ chia sẻ thông tin liên quan đến thẻ ngân hàng hoặc tài khoản với trẻ vị thành niên.`, num: 4 },
          { item5: `Bạn phải từ 18 tuổi trở lên để truy cập trang web P3 để đăng ký hoặc đặt cược. Chúng tôi sẽ thu hồi toàn bộ tiền thắng cược và có quyền chấm dứt hoạt động tài khoản cá cược của khách hàng ngay lập tức khi phát hiện người dùng sử dụng trang web này dưới 18 tuổi.`, num: 5 },
          { item6: `Nếu bạn nghiện cờ bạc, kinh tế cá nhân, sự nghiệp, gia đình, vv của bạn sẽ bị ảnh hưởng. Về vấn đề này, chúng tôi thực sự khuyên bạn nên kiểm tra lại hành vi của mình, làm rõ và điều chỉnh tâm lý giải trí, trở lại cuộc sống và công việc bình thường.`, num: 6 },
        ]
      },
      {
        title: `2. DỊCH VỤ CÔNG TÂM`,
        item: [
          { item1: `Cá cược chỉ nên xem là hoạt động giải trí, không nên coi là phương thức kiếm tiền, hãy luôn đặt giải trí làm chủ. P3 cam kết nâng cao mức độ dịch vụ và đảm bảo hoàn thành trách nhiệm của mình đối với khách hàng ở mức độ cao nhất, bao gồm tính chính trực, minh bạch, hợp pháp và các khía cạnh khác. Sẵn lòng phục vụ, hỗ trợ 24/7, giải đáp các vấn đề thắc mắc liên quan của quý khách.`, nbsp: 2 }
        ]
      }
    ],
    cont3: [
      {
        title: ``,
        item: [
          { item1: `P3 nhắc nhở bạn rằng trước khi sử dụng các dịch vụ do P3 cung cấp, vui lòng đọc và hiểu kỹ các điều khoản dịch vụ này. Nếu bạn sử dụng các dịch vụ do P3 cung cấp, nó sẽ được coi là sự chấp nhận toàn bộ nội dung của điều khoản dịch vụ này.`, nbsp: 2 }
        ]
      },
      {
        title: `1. ĐIỀU KHOẢN SỬ DỤNG`,
        item: [
          { item1: `Khách hàng có nghĩa vụ phải tự bảo quản thông tin riêng tư cá nhân, thông tin tài khoản, nếu các thông tin bảo mật bị mất vui lòng liên hệ ngay CSKH trực tuyến để được hỗ trợ. Không cho phép sử dụng hình thức liên kết từ bên thứ 3, sử dụng tài khoản trên nền tảng để đăng nhập trò chơi, tham gia cá cược. Nếu phát sinh tổn thất, khách hàng phải tự chịu trách nhiệm về tổn thất đó.`, num: 1 },
          { item2: `Nền tảng có quyền từ chối mọi hình thức đăng nhập không chính thức lên trang web hoặc tham gia trò chơi trên nền tảng, cũng như người chơi không được phép sử dụng các tài sản có nguồn gốc bất chính, phi pháp để tham gia nền tảng.`, num: 2 },
          { item3: `Bởi các nguyên nhân của con người hoặc hệ thống dẫn tới các sai sót, công ty chúng tôi có quyền bảo lưu kết quả sau cùng.`, num: 3 },
          { item4: `Nhằm phòng ngừa sai sót, nếu phát hiện tài khoản gặp tình trạng bất thường, vui lòng liên hệ ngay CSKH hoặc đại lý cấp trên để kiểm tra, nếu không sẽ coi như khách hàng chấp nhận với các dữ liệu hiện tại hoặc dữ liệu được lưu trữ sau cùng, dựa trên dữ liệu được lưu trữ từ tổng kho dữ liệu làm chuẩn, khách hàng sẽ không được phép kháng nghị.`, num: 4 },
          { item5: `Vui lòng không bảo lưu bất cứ tệp tin nhận được từ người chơi khác hoặc đường dẫn khi tham gia phòng trò chuyện trò chơi, hoặc bất kỳ nội dung bất hợp pháp, quấy rối, đe dọa, nói xấu, khiêu dâm, kích động, phân biệt chủng tộc hoặc thô tục và thư rác không xác định hoặc nhắn tin hàng loạt không được chấp nhận khác sẽ được coi là vi phạm pháp luật.`, num: 5 },
          { item6: `Người dùng bắt buộc phải đủ điều kiện chịu trách nhiệm năng lực hành vi và đủ tuổi để chịu trách nhiệm năng lực hành vi theo quy định pháp luật sở tại.`, num: 6 },
          { item7: `Người dùng phải nắm rõ về rủi ro mất tiền khi tham gia cá cược.`, num: 7 },
          { item8: `Trong mọi trường hợp công ty có quyền thay đổi cuối cùng với các quy định và điều khoản.`, num: 8 },
        ]
      },
      {
        title: `2. ĐIỀU CẦN BIẾT KHI ĐĂNG KÝ`,
        item: [
          { item1: `Trước khi tham gia cá cược, quý khách vui lòng đọc kỹ điều khoản và quy định khi đăng ký tài khoản. Khách hàng phải đảm bảo số điện thoại đăng ký là chính chủ. Ngoài ra các thông tin cá nhân cung cấp khi đăng ký phải xác nhận là chính chủ, chính xác và đầy đủ bao gồm: họ tên, thông tin ngân hàng, ZALO, email, địa chỉ nhận quà và ngày sinh nhật.`, num: 1 },
          { item2: `P3 có trách nhiệm và nghĩa vụ bảo vệ tất cả thông tin khách hàng cung cấp, cũng như có quyền từ chối cung cấp dữ liệu khách hàng cho các bên thứ 3, đồng thời bảo quản thông tin cá nhân khách hàng hoàn toàn được bảo mật.`, num: 2 },
          { item3: `Nhằm đảm bảo thông tin khách hàng cung cấp là minh bạch, P3 có toàn quyền áp dụng các phương pháp xác thực tính minh bạch của thông tin cũng như khách hàng khi đã đồng ý với các điều khoản cũng như điều lệ cần phối hợp để xác nhận thông tin cung cấp là chính xác.`, num: 3 },
          { item4: `Chúng tôi chịu hoàn toàn trách nhiệm đối với các thông báo trên trang chủ của P3, quý khách vui lòng chỉ đăng nhập tài khoản và sử dụng các thông tin được P3 cung cấp tại địa chỉ duy nhất: “P3.com” làm chuẩn. Mọi tổn thất khi khách hàng đăng nhập vào liên kết khác ngoài địa chỉ trên sẽ bị từ chối xử lý. Nếu có vấn đề thắc mắc vui lòng liên hệ CSKH để được hỗ trợ.`, num: 4 },
          { item5: `Mỗi khách hàng chỉ được phép sử dụng 1 tài khoản tại P3. Nếu chúng tôi phát hiện khách hàng có hành vi tạo nhiều tài khoản tại P3, P3 có quyền đóng băng vĩnh viễn tài khoản cũng như tài sản nằm trong tài khoản, cũng như từ chối kháng nghị từ khách hàng.`, num: 5 },
          { item6: `Chúng tôi có quyền bảo lưu hoặc từ chối khách hàng đăng ký tài khoản thành viên vì bất cứ lý do gì không hợp lệ.`, num: 6 },
        ]
      },
      {
        title: `3. QUY TẮC CÁ CƯỢC`,
        item: [
          { item1: `Người dùng phải tuân theo luật chơi và các quy định tại điều khoản này khi đặt cược. Nếu có lỗi hiển thị trong quá trình chơi trò chơi của người dùng, tất cả các cược đặt tại sảnh trò chơi sẽ bị vô hiệu. P3 cũng có quyền tuyên bố bất kỳ khoản cược nào bị hủy trong trường hợp hệ thống P3 bị lỗi.`, num: 1 },
          { item2: `Chúng tôi chỉ chấp nhận cược từ người dùng thông qua kết nối do trang web P3 cung cấp. Các hình thức cá cược khác (chẳng hạn như thư, email, fax, v.v.) không được chấp nhận, bất kể kết quả cuối cùng của trò chơi, nó sẽ bị coi là vô hiệu. P3 có quyền hủy bỏ hoặc từ chối sử dụng bất kỳ phương pháp gian lận nào bị nghi ngờ (chẳng hạn như hack, thao túng, phần mềm trí tuệ nhân tạo (bot), v.v.) nhằm vượt qua hệ điều hành để tham gia đặt cược. Bất kỳ nỗ lực hoặc sử dụng phương pháp này sẽ bị huỷ và tài khoản liên quan sẽ bị đóng băng ngay lập tức mà không cần thông báo.`, num: 2 },
          { item3: `Theo các quy định khác của điều khoản này, nếu người dùng đăng nhập đúng tài khoản và mật khẩu của mình và số dư tài khoản đủ thì sẽ có thể đặt cược. Người dùng hoàn toàn chịu trách nhiệm về tính chính xác của các chi tiết cá cược của họ. Khi người dùng đặt cược và chúng tôi xác nhận chấp nhận đặt cược của người dùng, đó là xác nhận cuối cùng về đặt cược của người dùng; người dùng không thể hủy, rút ​​tiền đặt cược hoặc thay đổi chi tiết đặt cược. Tất cả các cược được ghi lại trong cơ sở dữ liệu nhật ký giao dịch. Hồ sơ giao dịch P3 là xác nhận cuối cùng của tất cả các giao dịch và thông tin liên quan đến cá cược.`, num: 3 },
          { item4: `Không được phép đặt cược khi trận đấu bắt đầu hoặc người dùng đã biết kết quả của trò chơi khi đặt cược. Nếu trò chơi bắt đầu hoặc người dùng đã biết kết quả của trò chơi tại thời điểm đặt cược và P3 vô tình chấp nhận đặt cược sai của người dùng vì bất kỳ lý do gì, P3 có quyền từ chối đặt cược của người dùng và tuyên bố đặt cược là vô hiệu. Quy tắc này không áp dụng cho các cược đặt cho "trong trận" hoặc "hiệp một" của trò chơi.`, num: 4 },
          { item5: `Thời gian bắt đầu trận đấu, giải đấu được thông báo trên trang web của P3 chỉ mang tính chất tham khảo. Trừ khi có quy định khác trong luật chơi, thời gian đặt cược của trò chơi và thời gian bắt đầu và kết thúc trò chơi sẽ dựa trên thông báo thực tế. P3 không thừa nhận bất kỳ yêu cầu nào tiếp theo có thể dẫn đến việc đảo ngược kết quả đặt cược, nhưng đặt cược ban đầu vẫn có hiệu lực.`, num: 5 },
          { item6: `Nếu địa điểm tổ chức sự kiện thể thao thay đổi, tất cả các cược dựa trên địa điểm ban đầu sẽ bị vô hiệu.`, num: 6 },
          { item7: `Kết quả cuối cùng của một giải đấu, trận đấu hoặc trò chơi sẽ được xác định sau thời gian kết thúc thực sự của trận hoặc trò chơi đó. Để tránh tranh cãi, P3 không công nhận bất kỳ trò chơi bị hoãn, tranh chấp hoặc huỷ bỏ từ ban tổ chức hoặc ban điều hành giải, trò chơi.`, num: 7 },
          { item8: `Nếu cược tích lũy của người dùng bao gồm tùy chọn trả lại hoặc hủy, số tiền thắng cược sẽ được thanh toán dựa trên các cược hợp lệ còn lại.`, num: 8 },
          { item9: `Đối với tất cả đơn cược, P3 có toàn quyền đưa ra phán quyết cuối cùng.`, num: 9 },
        ]
      },
      {
        title: `4. QUY TẮC NẠP TIỀN`,
        item: [
          { item1: `Khách hàng sử dụng bất kỳ phương thức thanh toán nào (chuyển khoản ngân hàng, chuyển tiền qua ví thanh toán, phương thức thẻ cào …), nếu tên xác thực của chủ thẻ hoặc ví thanh toán không trùng với tên đã dùng khi đăng ký tài khoản game, P3 có quyền từ chối xử lý các giao dịch có liên quan.`, num: 1 },
          { item2: `Người dùng đồng ý không nạp tiền hoặc yêu cầu hoàn lại tiền. Trong trường hợp xảy ra tổn thất, người dùng đồng ý tự chịu trách nhiệm và bồi thường cho P3 đối với tất cả các khoản hoàn trả hoặc thu hồi cũng như mọi tổn thất và chi phí phát sinh từ đó. P3 có quyền chấm dứt dịch vụ hoặc thanh toán cho những người dùng vi phạm.`, hang: 'l' },
        ]
      },
      {
        title: `5. QUY TẮC RÚT TIỀN`,
        item: [
          { item1: `Tên tài khoản ngân hàng phải giống với tên thật đã liên kết khi bạn đăng ký.`, num: 1 },
          { item2: `Để đảm bảo an toàn cho số tiền của bạn, chúng tôi sẽ tiến hành xác minh thông tin rút tiền bằng hình thức SMS.`, num: 2 },
          { item3: `Quý khách có thể thực hiện rút tiền sau khi hoàn thành 1 vòng cược số tiền đã nạp.`, num: 3, kong: 'kong' },
          { item4: `Trong trường hợp khách hàng đã đăng ký tham gia hoạt động khuyến mãi, quý khách cần đạt đủ yêu cầu vòng cược quy định đối với hoạt động trước khi tiến hành rút tiền.`, nbsp: 2 },
        ]
      },
      {
        title: `6. QUY TẮC HOẠT ĐỘNG`,
        item: [
          { item1: `P3 có quyền bảo lưu, tạm dừng, huỷ bỏ hoặc thay đổi nội dung điều khoản đối với tất cả hoạt động khuyến mãi.`, num: 1 },
          { item2: `Nếu P3 phát hiện bất cứ tổ chức, cá nhân sử dụng các biện pháp gian lận, trục lợi bất chính từ hoạt động khuyến mãi, P3 có toàn quyền xử lý bảo lưu hoặc huỷ bỏ tư cách thành viên tham gia hoạt động cũng như tiền trong tài khoản.`, num: 2 },
        ]
      },
      {
        title: `7. QUYỀN SỞ HỮU TRÍ TUỆ`,
        item: [
          { item1: `Đối với bất kỳ nội dung nào trong nền tảng P3, nếu không có sự đồng ý trước bằng văn bản của chúng tôi hoặc chủ sở hữu dữ liệu bên thứ ba, người dùng sẽ không được phép:`, nbsp: 2, kong: 'kong' },
          { item2: `Bằng bất cứ hình thức nào sao chép, thay đổi, lưu trữ, phát tán hoặc phát hành công khai nội dung.`, num: 1 },
          { item3: `Nghiêm cấm các hình thức cho thuê, bán, cho mượn các sản phẩm phát hành.`, num: 2 },
          { item4: `Cung cấp các ấn phẩm, nội dung sản phẩm hoặc các nội dung liên quan cho các cá nhân, tổ chức hoặc trang web khác.`, num: 3 },
          { item5: `Cấm sử dụng các phầm mềm bẻ khoá, chỉnh sửa, biên dịch phần mềm kỹ thuật hoặc mã nguồn hệ thống để phát hành sản phẩm tương tự.`, num: 4 },
          { item6: `Người dùng theo đó đã thừa nhận và đồng ý rằng dịch vụ trò chơi hoặc bất kỳ hình thức dịch vụ nào khác (như bố cục, viết sao chép, dịch vụ kỹ thuật, v.v.) được truy cập thông qua liên kết trên trang web P3 thuộc sở hữu của P3 và tuân theo bản quyền, quyền thương hiệu và các quyền sở hữu trí tuệ khác và bảo vệ các quyền bằng sáng chế. Kiến trúc và mã nguồn của phần mềm kỹ thuật là bí mật thương mại có giá trị của P3 và các nhà cấp phép của P3. Người dùng không được hưởng bất kỳ quyền nào khác ngoài quyền sử dụng được cấp.`, hang: 'l' },
          { item7: `Nếu thỏa thuận này bị chấm dứt vì bất kỳ lý do gì, quyền sử dụng được cấp cho người dùng sẽ tự động trở nên vô hiệu và người dùng phải ngừng sử dụng dịch vụ phần mềm ngay lập tức và gỡ cài đặt phần mềm có liên quan khỏi thiết bị.`, hang: 'l' },
        ]
      },
      {
        title: `8. CHẤM DỨT DỊCH VỤ`,
        item: [
          { item1: `Nếu P3 có đủ lý do để chứng minh bất kỳ trường hợp nào sau đây, P3 có quyền tuyên bố mọi khoản tiền thắng cược và tiền thưởng không hợp lệ, tịch thu số dư trong tài khoản của người dùng, chấm dứt thỏa thuận và dịch vụ này, đồng thời đóng băng tài khoản của người dùng:`, nbsp: 2, kong: 'kong' },
          { item2: `Người dùng có nhiều tài khoản đang hoạt động trong P3.`, num: 1 },
          { item3: `Người dùng nạp tiền hoặc rút tiền, thông tin khách hàng hoặc ví thanh toán đăng ký thân phận phải hoàn toàn trùng khớp với thông tin đã cung cấp, liên kết trước đó.`, num: 2 },
          { item4: `Người dùng quyết định rút khỏi hoạt động trước khi đáp ứng yêu cầu về doanh thu cược.`, num: 3 },
          { item5: `Người dùng cung cấp thông tin cá nhân không chính xác khi đăng ký.`, num: 4 },
          { item6: `Khách hàng không thể cung cấp, đáp ứng được yêu cầu cung cấp thông tin của P3.`, num: 5 },
          { item7: `Người dùng chưa đủ tuổi vị thành niên khi tham gia.`, num: 6 },
          { item8: `Người dùng thay mặt người dùng khác gửi yêu cầu hoàn tiền, hoặc đại diện cho người dùng khác từ chối giao dịch hoặc nạp tiền trên nền tảng.`, num: 7 },
          { item9: `Người dùng nạp tiền bằng nguồn tiền bất hợp pháp, phạm pháp có được, hoặc hoạt động vi phạm pháp luật khác.`, num: 8 },
          { item10: `Bị phát hiện các hành vi gian lận, hoặc lừa đảo đối với người dùng khác, hoặc cấu kết với cá nhân, tổ chức khác nhằm lừa đảo P3 hoặc người dùng của P3.`, num: 9 },
          { item11: `Phát hiện sử dụng phần mềm gửi tin nhắn, hoặc các phần mềm can thiệp sâu vào hệ thống nhằm khai thác lỗ hổng hoặc phá huỷ thông tin hệ thống dữ liệu.`, num: 10 },
          { item12: `Khách hàng cho phép (Bất kể vô ý hoặc cố ý) người khác sử dụng tài khoản của mình.`, num: 11 },
          { item13: `Bị phát hiện sử dụng IP nước ngoài tham gia cá cược hoặc sử dụng VPN để thay đổi thành IP nước ngoài.`, num: 12 },
          { item14: `Người dùng không tuân thủ các điều khoản, quy định trên.`, num: 13 },
        ]
      },
      {
        title: `9. BÊN NGOÀI TRANG WEB`,
        item: [
          { item1: `P3 không đại diện và không chịu trách nhiệm về tính chính xác, kịp thời hoặc duy trì nội dung của các nhà điều hành trang web bên ngoài.`, num: 1 },
          { item2: `P3 không liên quan đến bất kỳ tuyên bố, quảng cáo, ý kiến, sản phẩm, dịch vụ, nhãn hiệu hoặc thiết kế khác trên các trang web bên ngoài.`, num: 2 },
          { item3: `P3 không chịu bất kỳ hợp đồng, vi phạm hợp đồng, sơ suất hoặc trách nhiệm khác đối với bất kỳ tổn thất nào gây ra bởi việc người dùng sử dụng liên kết được cung cấp trong bất kỳ trang web của bên thứ ba nào.`, num: 3 },
          { item4: `Người dùng không được phép thiết lập bất kỳ liên kết nào trực tiếp đến các trang web cá cược hoặc dịch vụ cá cược của bên thứ ba.`, num: 4 },
          { item5: `Chúng tôi có quyền thêm các loại hoặc tính năng trò chơi mới, hoặc bắt đầu, dừng, tạm dừng, giới hạn kết nối hoặc sửa đổi bất kỳ loại hoặc tính năng nào của trò chơi bất kỳ lúc nào mà không cần thông báo cho người dùng, và sẽ không chịu trách nhiệm về việc này.`, num: 5 },
        ]
      },
      {
        title: `10. VI PHẠM NGUYÊN TẮC`,
        item: [
          { item1: `P3 sẽ sử dụng bất kỳ phương pháp nào (bao gồm tấn công, chiếm quyền điều khiển và các công nghệ khác) vào bất kỳ lúc nào để ngăn chặn hoặc hạn chế bất kỳ ai truy cập vào trang web của nền tảng, lấy thông tin và dịch vụ nền tảng thông qua trang web cụ thể của P3 hoặc thiết bị tải xuống ỨNG DỤNG P3. P3 có quyền tìm kiếm các giải pháp pháp lý cho hành vi này.`, nbsp: 2 },
        ]
      },
      {
        title: `11. GIẤY PHÉP ĐĂNG KÝ KINH DOANH HỢP PHÁP`,
        item: [
          { item1: `     P3 có giấy phép pháp lý tiêu chuẩn quốc tế được cấp bởi Ủy ban đánh giá của Chính phủ Philippines (PAGCOR), Cơ quan quản lý trò chơi Malta của Châu Âu (MGA), Quần đảo Virgin thuộc Anh (BVI) và Uỷ ban giám sát nhà cái (GAMBLING COMMISSION), và được công nhận bởi các nhà cái hợp pháp của Hiệp hội Trò chơi Quốc tế.`, nbsp: 2 },
        ]
      }
    ],
    cont4: [
      {
        title: `1. THÔNG TIN CÁ NHÂN`,
        item: [
          { item1: `Khi bạn đăng ký và sử dụng các dịch vụ của trang web này, với sự đồng ý của bạn, chúng tôi thu thập thông tin liên quan đến danh tính cá nhân của bạn và chúng tôi sẽ xử lý thông tin cá nhân của bạn một cách chuyên nghiệp, thận trọng và có trách nhiệm; nếu bạn không thể cung cấp thông tin tương ứng, bạn có thể không thể sử dụng dịch vụ tương ứng. Chúng tôi cũng thu thập thông tin liên quan khác nhằm mục đích tối ưu hóa trải nghiệm người dùng nhằm tối ưu hóa các dịch vụ trang web của chúng tôi. Chúng tôi yêu cầu bạn đọc kỹ chính sách bảo mật sau:`, nbsp: 2 },
        ]
      },
      {
        title: ``,
        item: [
          { item1: `An toàn tài khoản`, black: true },
          { item2: `P3 tôn trọng và coi trọng quyền riêng tư của thành viên, chúng tôi sẽ cố gắng hết sức để đảm bảo an toàn cho thông tin và dữ liệu của bạn, để khách hàng không phải lo lắng. Đây là mục đích của Chính sách Bảo mật của chúng tôi.`, num: 1 },
          { item3: `P3 sẽ không bao giờ tiết lộ bất kỳ thông tin cá nhân nào cho bất kỳ bên thứ ba nào, ngoại trừ có quyền cung cấp thông tin cá nhân cần thiết cho các nhà cung cấp dịch vụ thanh toán liên quan và các tổ chức bảo hiểm tài chính để hoàn thành các yêu cầu thanh toán thông qua trang web.`, num: 2 },
          { item4: `Tất cả thông tin cá nhân của thành viên cung cấp được truyền qua cổng bảo mật mã hóa SSL 128-bit và được lưu trữ trong môi trường bí mật mà công chúng không thể truy cập được. Tất cả quyền truy cập nội bộ vào dữ liệu sẽ bị giới hạn nghiêm ngặt và được giám sát chặt chẽ.`, num: 3 }
        ]
      },
      {
        title: ``,
        item: [
          { item1: `Về chúng tôi`, black: true },
          { item2: `Nhằm đảm bảo chất lượng trải nghiệm dịch vụ của người dùng trên P3, đôi khi chúng tôi có thể yêu cầu người dùng cung cấp thông tin cá nhân (chẳng hạn như tên, địa chỉ gửi thư, email, số tài khoản thành viên, ZALO hoặc số điện thoại di động, ngày sinh hoặc thẻ ngân hàng số, thông tin thanh toán, v.v.). Khi sử dụng thông tin cá nhân của khách hàng, chúng tôi cam kết bảo mật cũng như lưu trữ thông tin cá nhân của khách hàng.`, nbsp: 2 },
        ]
      },
      {
        title: ``,
        item: [
          { item1: `Thông tin truy cập`, black: true },
          { item2: `Khi quý khách truy cập nền tảng của chúng tôi, P3 sẽ bảo lưu thông tin đăng nhập của khách hàng bao gồm địa chỉ đăng nhập cùng địa chỉ IP. Những dữ liệu trên nhằm hỗ trợ chúng tôi cập nhật cũng như bảo đảm quá trình phục vụ, tính ổn định, hỗ trợ quá trình hoàn thành cập nhật thông tin khách hàng.`, nbsp: 2 },
        ]
      },
      {
        title: `2. BẢO VỆ QUYỀN RIÊNG TƯ`,
        item: [
          { item1: `Bảo vệ quyền riêng tư của người dùng là một chính sách cơ bản của nền tảng. P3 sẽ không công bố hoặc rò rỉ bất kỳ thông tin nào bạn đã đăng ký trên P3, ngoại trừ các trường hợp sau:`, nbsp: 2, kong: 'kong' },
          { item2: `Nhận được ủy quyền rõ ràng từ người dùng;`, num: 1 },
          { item3: `Người sử dụng đã bảo mật thông tin của chính mình không đúng cách dẫn đến việc lộ thông tin không công khai của người sử dụng;`, num: 2 },
          { item4: `Rò rỉ, mất mát, đánh cắp hoặc giả mạo dữ liệu do đường truyền mạng, sự tấn công của hacker, virus máy tính, các quy định của chính phủ, v.v.;`, num: 3 },
          { item5: `Theo yêu cầu của các luật và quy định liên quan, các cơ quan chính phủ có liên quan và các thủ tục tư pháp khác;`, num: 4 },
          { item6: `Bạn có thể sửa đổi thông tin cá nhân của mình mọi lúc và mọi nơi để bảo mật và hiệu quả hơn. Bạn là người duy nhất có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Trong mọi trường hợp, xin vui lòng lưu giữ cẩn thận và đúng cách;`, num: 5 },
          { item7: `Bất cứ khi nào bạn tự ý tiết lộ thông tin cá nhân của mình trước công chúng, những thông tin đó có thể bị người khác thu thập và sử dụng dẫn đến việc lộ thông tin cá nhân của bạn, P3 không chịu trách nhiệm.`, num: 6 },
        ]
      },
      {
        title: `3. NHỮNG LƯU Ý QUAN TRỌNG`,
        item: [
          { item1: `Công ty chúng tôi sẽ sửa đổi và cải thiện chính sách bảo mật theo thời gian và nội dung sửa đổi sẽ được phản ánh trong bản công bố này. Bất kỳ bản sửa đổi nào của chúng tôi cũng luôn đặt quyền lợi và sự hài lòng của khách hàng lên hàng đầu. Người dùng sử dụng dịch vụ được coi là chấp nhận sự thay đổi của các điều khoản dịch vụ.`, nbsp: 2 },
        ]
      },
    ],
    cont5: [
      {
        title: `1. NHẬN THÔNG TIN THIẾT BỊ`,
        item: [
          { item1: `Nếu gặp bất kỳ sự cố nào, bạn có thể lấy ảnh chụp màn hình thông tin thiết bị “Thông Tin Thiết Bị” và cung cấp cho CSKH hoặc tải ảnh chụp màn hình lên trang phản hồi “Ý Kiến Phản Hồi” và mô tả chi tiết tình huống bạn gặp phải để được phản hồi cũng như hỗ trợ nhanh hơn. Cổng PC có thể lấy thông tin thiết bị trong “Tài Khoản” > “Thông Tin Thiết Bị”.`, nbsp: 2 },
          { item2: `Đối với cổng App, bạn có thể vào mục “Tài Khoản” > bấm vào nút cài đặt ở góc trên bên phải > nhập “Thông Tin Thiết Bị”, bấm vào nút camera ở góc trên bên phải để chụp ảnh màn hình.`, nbsp: 2 }
        ]
      },
      {
        title: `2. QUAN TRỌNG! PHÒNG TRÁNH THÔNG TIN RÒ RỈ`,
        item: [
          { item1: `Tránh mở hoặc trả lời email từ các nguồn không xác định và không nhấp vào tệp đính kèm và liên kết trong văn bản. Đảm bảo rằng đó là địa chỉ email thật trước khi mở để tránh thiết bị nhiễm phải các phần mềm chứa mã độc hoặc virus.`, num: 1 },
          { item2: `Cài đặt phần mềm diệt virus và cập nhật chương trình thường xuyên để virus không thể phát hiện ra dữ liệu cá nhân trên máy tính của bạn. Cài đặt tường lửa là rất quan trọng để đảm bảo rằng dữ liệu máy tính của bạn không bị virus phá hoại.`, num: 2 },
          { item3: `Thông tin cá nhân phải được bảo mật và không được tự ý tiết lộ cho bất kỳ ai.`, num: 3 },
          { item4: `Đảm bảo đăng xuất khỏi tài khoản trò chơi của bạn sau khi hoàn thành đặt cược hoặc giao dịch quỹ trên nền tảng. Cố gắng không rời khỏi máy tính khi đăng nhập, dù bạn rời khỏi máy tính trong thời gian ngắn, bạn cũng phải sử dụng Win + L để khóa màn hình máy tính.`, num: 4 },
          { item5: `Xóa lịch sử trình duyệt web thường xuyên. Để ngăn không cho hacker tìm thấy các trang web bạn đã truy cập, bạn nên xóa lịch sử duyệt web của mình theo định kỳ.`, num: 5 },
          { item6: `A) Sử dụng trình duyệt Google Chrome mới nhất.`, hang: 'l' },
          { item7: `B) Lựa chọn “Công Cụ” sau đó chọn “Internet”.`, hang: 'l' },
          { item8: `C) Chọn vào “Xoá Cookie”.`, hang: 'l' },
          { item9: `D) Chú ý khi chọn “Xác Nhận”: Nếu quý khách không “Xoá Cookie”, toàn bộ lịch sử đăng nhập, sử dụng trình duyệt web sẽ được lưu trữ tại bộ nhớ “Cookie”. Sau khi lựa chọn “Xoá Cookie” vui lòng chọn xác nhận ở phần khung lựa chọn tiếp theo.`, hang: 'l' },
          { item10: `Tránh sử dụng máy tính công cộng hoặc máy tính của người khác để giao dịch hoặc giải trí. Nếu bắt buộc phải sử dụng, hãy đảm bảo máy tính không có virus và xóa hồ sơ cũng như xóa lịch sử duyệt web của bạn sau giao dịch.`, num: 6 },
        ]
      }
    ],
    cont6: [
      {
        title: `CSKH TRỰC TUYẾN`,
        item: [
          {
            imgs: [
              { kf_type: 4, type: 'facebook', icon1: 'i_mock6', cont1: 'Facebook', cont2: 'HỖ TRỢ 24/7', underline: 'underline' },
              { kf_type: 1, type: 'telegram', icon2: 'i_mock7', cont1: 'Telegram', cont2: '@P3cskh01', underline: 'underline' },
              { kf_type: 2, type: 'call', icon3: 'i_mock5', cont1: 'CSKH CALL', cont2: '+63 9382333333' },
            ]
          }
        ],
      },
      {
        title: ``,
        article: `CSKH trực tuyến 24/7`,
        item: [
          { item1: `Đội ngũ nhân viên chăm sóc khách hàng tận tâm của chúng tôi sẽ tư vấn hỗ trợ bạn 24/7.` }
        ]
      },
    ]
  }
];
export { contentList };
