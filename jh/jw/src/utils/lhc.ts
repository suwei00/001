// 红波
export const redList = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46']
// 蓝波
export const blueList = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
// 绿波
export const greenList = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49']
// 鼠
export const mouseList = ['03', '15', '27', '39']
// 牛
export const cowList = ['02', '14', '26', '38']
// 虎
export const tigerList = ['01', '13', '25', '37', '49']
// 兔
export const rabbitList = ['12', '24', '36', '48']
// 龙
export const dragonList = ['11', '23', '35', '47']
// 蛇
export const snakeList = ['10', '22', '34', '46']
// 马
export const horseList = ['09', '21', '33', '45']
// 羊
export const sheepList = ['08', '20', '32', '44']
// 猴
export const monkeyList = ['07', '19', '31', '43']
// 鸡
export const chickenList = ['06', '18', '30', '42']
// 狗
export const dogList = ['05', '17', '29', '41']
// 猪
export const pigList = ['04', '16', '28', '40']
// 获取生肖
export const getZodiac = (num: string) => {
  if (mouseList.includes(num))
    return '鼠'
  if (cowList.includes(num))
    return '牛'
  if (tigerList.includes(num))
    return '虎'
  if (rabbitList.includes(num))
    return '兔'
  if (dragonList.includes(num))
    return '龙'
  if (snakeList.includes(num))
    return '蛇'
  if (horseList.includes(num))
    return '马'
  if (sheepList.includes(num))
    return '羊'
  if (monkeyList.includes(num))
    return '猴'
  if (chickenList.includes(num))
    return '鸡'
  if (dogList.includes(num))
    return '狗'
  if (pigList.includes(num))
    return '猪'
  return ''
}

export const getLhcBall = (num: string) => {
  if (redList.includes(num))
    return 'red'
  if (blueList.includes(num))
    return 'blue'
  return 'green'
}

// 蓝波，红波，绿波
export const getLHCBallColor = (num: string) => {
  if (redList.includes(num))
    return '红波'
  if (blueList.includes(num))
    return '蓝波'
  return '绿波'
}

// 野兽，家禽
export const getAnimalType = (num: string) => {
  if ('羊马牛猪狗鸡'.includes(getZodiac(num)))
    return '家禽'
  return '野兽'
}
