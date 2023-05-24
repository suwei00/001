/*
     * 判断平年闰年
     * y:年份数字，四位
     * */
function isOrdinaryYear(y: any) {
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0)
    return false

  return true
}
/*
     * 判断是否18岁
     * time : 毫秒级时间戳，new Date("1993.1.1").getTime()
     * */
export default function checkBirth(time: any) {
  const nowDate = new Date() // 当前时间
  const mouth = nowDate.getMonth() + 1
  let day = nowDate.getDate()
  const year = nowDate.getFullYear() - 18
  if (mouth === 2 && day >= 28)
    day = isOrdinaryYear(year) ? 28 : 29

  const oldDate = new Date(`${year}-${mouth}-${day}`).getTime()
  return !(oldDate < time)
}
