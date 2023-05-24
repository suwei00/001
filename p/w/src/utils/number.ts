class Compute {
  private val: number; // 构造时传入的数值
  private current: number; // 当前计算方法传入的数值
  private x: number; // 当前的10的倍数值

  /**
   * 构造函数
   * @param value 初始数值
   */
  constructor(value?: number) {
    this.val = value || 0;
    this.current = 0;
    this.x = 1;
  }

  /**
   * 计算前设置当前传入的数值和x的值
   * @param value 当前传入的数值
   */
  private setValidate(value: number) {
    this.current = validateNumber(value);
    this.x = getLength(this.val, this.current);
  }

  /**
   * done
   * 完成链式调用 返回计算后的值
   */
  public done(): number {
    return this.val;
  }

  /**
   * 加法
   */
  public add(value: number) {
    this.setValidate(value);

    this.val = (this.val * this.x + this.current * this.x) / this.x;
    return this;
  }

  /**
   * 减法
   */
  public minus(value: number) {
    this.setValidate(value);
    this.val = (this.val * this.x - this.current * this.x) / this.x;
    return this;
  }

  /**
   * 乘法
   */
  public multiply(value: number) {
    this.setValidate(value);
    this.val = (this.val * this.x * (this.current * this.x)) / Math.pow(this.x, 2);
    return this;
  }

  /**
   * 除法
   */
  public divide(value: number) {
    this.setValidate(value);
    this.val = (this.val * this.x) / (this.current * this.x);
    return this;
  }
}
export default Compute;

/**
 * 判断是否是科学计数法
 * @returns {Number} v
 */
const getOriNum = (num: number) => {
  if (/\d(?:\.(\d*))?e([+-]\d+)/.test(num.toString())) {
    let m: any = num.toString().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  }
  return Number(num);
};

/**
 * 获取到两个数间小数点长度的10的倍数
 * @param n1 数值1
 * @param n2 数值2
 * @returns {Number} x 10的倍数
 */
const getLength = (n1: number = 0, n2: number = 0): number => {
  let sn1: string = getOriNum(n1).toString().split('.')[1] || '';
  let sn2: string = getOriNum(n2).toString().split('.')[1] || '';
  let length: number = 0;
  if (sn1.length > sn2.length) {
    length = sn1.length;
  } else {
    length = sn2.length;
  }
  return Math.pow(10, length);
};
/**
 * 传入的是否为数值
 * 不是的话则转换
 * @returns {Number} v
 */
const validateNumber = (v: number): number => {
  if (!v) return 0;
  if (typeof v !== 'number') {
    let c: number = Number(v);
    if (isNaN(c)) {
      throw new Error('请传入数值');
    }
    return c;
  }
  return v;
};
