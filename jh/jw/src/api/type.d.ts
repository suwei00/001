// 时间类型 1今天2昨天3本月4上月5三天6七天
import type { F } from 'ts-toolbelt'
type DateFlag = '1' | '2' | '3' | '4' | '5' | '6'
//  nav接口返回的游戏类型
export interface L {
  id: string
  name: string
  wallet_id: string
  wallet_name: string
  game_type: number
  maintained: number
  flags: number
  state: number
  seq: number
  share_wallet: number
  path?: string
}
// 游戏场馆类型
export type GameType = 2 | 3 | 4 | 5 | 6 | 7 | 8

// 获取数组类型中的元素类型
export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never

export interface ApiType<T> {
  data: ArrElement<Awaited<F.Return<T>>>
}

// 投注记录接口返回类型
export type BetRecordReturnType = Awaited<F.Return<typeof getBetRecord>>

// 盈利榜单接口返回类型
export type ProfitRankReturnType = Awaited<F.Return<typeof getRankList>>['p']

// nav接口返回场馆Item类型
export type NavReturnItemType<T = L> = {
  id: number
  level: string
  name: string
  sort: number
  prefix: string
  l: Array<T>
}
// nav接口返回场馆list类型
export type NavReturnListType<T = L> = Array<NavReturnItemType<T>>
