// const useIn8 = require(`@/language/${sessionStorage.getItem('lang') || 'zh'}`);
interface CodeMsg {
  [name: string]: string;
}

const codeMsg: CodeMsg = {
  token: 'Vui Lòng Đăng Nhập Lại'
};

export default codeMsg;
