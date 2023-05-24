import type { F } from 'ts-toolbelt'
import { ImageAttrs } from 'vite-plugin-image-presets';
import { ArrElement, GameType } from '~/api/type';
// 默认nav配置类型
export type PlatConfigType = { label: string; path?: string; id?: number; key: string; sort: number }

// 获取nav列表接口返回类型
export type PlatReturnType = ArrElement<Awaited<F.Return<typeof getNav>>>
// 场馆钱包类型
export type WalletReturnType = ArrElement<Awaited<F.Return<typeof getPlatform>>>

// nav类型
export type PlatType = PlatConfigType & Partial<PlatReturnType>

// Nav下拉游戏本地配置
export type NavGameConfigType = {
  id: string;
  name: string;
  src: ImageAttrs[];
  thumbnail: string;
  game_type: GameType;
  width: string
}
