import liveAgImg from '@images/home/jl-nav/live-ag.png?preset=full'
import liveAgThumb from '@images/home/jl-nav/live-ag.png?preset=thumbnail&src'
import liveEvoImg from '@images/home/jl-nav/live-evo.png?preset=full'
import liveEvoThumb from '@images/home/jl-nav/live-evo.png?preset=thumbnail&src'
import liveWmImg from '@images/home/jl-nav/live-wm.png?preset=full'
import liveWmThumb from '@images/home/jl-nav/live-wm.png?preset=thumbnail&src'
import liveOgImg from '@images/home/jl-nav/live-og.png?preset=full'
import liveOgThumb from '@images/home/jl-nav/live-og.png?preset=thumbnail&src'
import liveEbetImg from '@images/home/jl-nav/live-ebet.png?preset=full'
import liveEbetThumb from '@images/home/jl-nav/live-ebet.png?preset=thumbnail&src'
import liveBbinImg from '@images/home/jl-nav/live-bbin.png?preset=full'
import liveBbinThumb from '@images/home/jl-nav/live-bbin.png?preset=thumbnail&src'
import liveDgImg from '@images/home/jl-nav/live-dg.png?preset=full'
import liveDgThumb from '@images/home/jl-nav/live-dg.png?preset=thumbnail&src'
import liveBgImg from '@images/home/jl-nav/live-bg.png?preset=full'
import liveBgThumb from '@images/home/jl-nav/live-bg.png?preset=thumbnail&src'
import egamePgImg from '@images/home/jl-nav/egame-pg.png?preset=full'
import egamePgThumb from '@images/home/jl-nav/egame-pg.png?preset=thumbnail&src'
import egameMgImg from '@images/home/jl-nav/egame-mg.png?preset=full'
import egameMgThumb from '@images/home/jl-nav/egame-mg.png?preset=thumbnail&src'
import egameBbinImg from '@images/home/jl-nav/egame-bbin.png?preset=full'
import egameBbinThumb from '@images/home/jl-nav/egame-bbin.png?preset=thumbnail&src'
import egameJdbImg from '@images/home/jl-nav/egame-jdb.png?preset=full'
import egameJdbThumb from '@images/home/jl-nav/egame-jdb.png?preset=thumbnail&src'
import egameCq9Img from '@images/home/jl-nav/egame-cq9.png?preset=full'
import egameCq9Thumb from '@images/home/jl-nav/egame-cq9.png?preset=thumbnail&src'
import sportImImg from '@images/home/jl-nav/sport-im.png?preset=full'
import sportImThumb from '@images/home/jl-nav/sport-im.png?preset=thumbnail&src'
import sportSabaImg from '@images/home/jl-nav/sport-saba.png?preset=full'
import sportSabaThumb from '@images/home/jl-nav/sport-saba.png?preset=thumbnail&src'
import sportFbImg from '@images/home/jl-nav/sport-fb.png?preset=full'
import sportFbThumb from '@images/home/jl-nav/sport-fb.png?preset=thumbnail&src'
import chessKyImg from '@images/home/jl-nav/chess-ky.png?preset=full'
import chessKyThumb from '@images/home/jl-nav/chess-ky.png?preset=thumbnail&src'
import chessSyImg from '@images/home/jl-nav/chess-sy.png?preset=full'
import chessSyThumb from '@images/home/jl-nav/chess-sy.png?preset=thumbnail&src'
import chessKxImg from '@images/home/jl-nav/chess-kx.png?preset=full'
import chessKxThumb from '@images/home/jl-nav/chess-kx.png?preset=thumbnail&src'
import esportImImg from '@images/home/jl-nav/esport-im.png?preset=full'
import esportImThumb from '@images/home/jl-nav/esport-im.png?preset=thumbnail&src'
import esportSabaImg from '@images/home/jl-nav/esport-saba.png?preset=full'
import esportSabaThumb from '@images/home/jl-nav/esport-saba.png?preset=thumbnail&src'
import fishJdbImg from '@images/home/jl-nav/fish-jdb.png?preset=full'
import fishJdbThumb from '@images/home/jl-nav/fish-jdb.png?preset=thumbnail&src'
import fishCq9Img from '@images/home/jl-nav/fish-cq9.png?preset=full'
import fishCq9Thumb from '@images/home/jl-nav/fish-cq9.png?preset=thumbnail&src'
import fishBgImg from '@images/home/jl-nav/fish-bg.png?preset=full'
import fishBgThumb from '@images/home/jl-nav/fish-bg.png?preset=thumbnail&src'
import lotteryLucky28Img from '@images/home/jl-nav/lottery-lucky28.png?preset=full'
import lotteryLucky28Thumb from '@images/home/jl-nav/lottery-lucky28.png?preset=thumbnail&src'
import lotteryLl5Img from '@images/home/jl-nav/lottery-ll5.png?preset=full'
import lotteryLl5Thumb from '@images/home/jl-nav/lottery-ll5.png?preset=thumbnail&src'
import lotteryK3Img from '@images/home/jl-nav/lottery-k3.png?preset=full'
import lotteryK3Thumb from '@images/home/jl-nav/lottery-k3.png?preset=thumbnail&src'
import lotteryPk10Img from '@images/home/jl-nav/lottery-pk10.png?preset=full'
import lotteryPk10Thumb from '@images/home/jl-nav/lottery-pk10.png?preset=thumbnail&src'
import lotterySscImg from '@images/home/jl-nav/lottery-ssc.png?preset=full'
import lotterySscThumb from '@images/home/jl-nav/lottery-ssc.png?preset=thumbnail&src'
import lotteryLhcImg from '@images/home/jl-nav/lottery-lhc.png?preset=full'
import lotteryLhcThumb from '@images/home/jl-nav/lottery-lhc.png?preset=thumbnail&src'
import type { NavGameConfigType } from '~/store/type'
// 真人
const live: NavGameConfigType[] = [{
  id: '16619202255312',
  name: 'EBET真人',
  src: liveEbetImg,
  thumbnail: liveEbetThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '16619506806735',
  name: 'OG真人',
  src: liveOgImg,
  thumbnail: liveOgThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '16620064156225',
  name: 'BBIN真人',
  src: liveBbinImg,
  thumbnail: liveBbinThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '16620065466911',
  name: 'BG真人',
  src: liveBgImg,
  thumbnail: liveBgThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '39636407564188',
  name: 'DG真人',
  src: liveDgImg,
  thumbnail: liveDgThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '1055235995899664907',
  name: '完美真人',
  src: liveWmImg,
  thumbnail: liveWmThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '2306856765348772637',
  name: 'EVO真人',
  src: liveEvoImg,
  thumbnail: liveEvoThumb,
  game_type: 2,
  width: '162px',
}, {
  id: '2658175169982643138',
  name: 'AG真人',
  src: liveAgImg,
  thumbnail: liveAgThumb,
  game_type: 2,
  width: '162px',
}]
// 电子
const egame: NavGameConfigType[] = [
  {
    id: '6861705028422769039',
    name: 'PG电子',
    src: egamePgImg,
    thumbnail: egamePgThumb,
    game_type: 4,
    width: '260px',
  },
  {
    id: '43495319576432',
    name: 'MG电子',
    src: egameMgImg,
    thumbnail: egameMgThumb,
    game_type: 4,
    width: '260px',
  }, {
    id: '16620989317215',
    name: 'BBIN电子',
    src: egameBbinImg,
    thumbnail: egameBbinThumb,
    game_type: 4,
    width: '260px',
  }, {
    id: '46814147030478',
    name: 'JDB电子',
    src: egameJdbImg,
    thumbnail: egameJdbThumb,
    game_type: 4,
    width: '260px',
  }, {
    id: '8318022162827355323',
    name: 'CQ9电子',
    src: egameCq9Img,
    thumbnail: egameCq9Thumb,
    game_type: 4,
    width: '260px',

  },
]
// 体育
const sport: NavGameConfigType[] = [{
  id: '362857114342923387',
  name: '沙巴体育',
  src: sportSabaImg,
  thumbnail: sportSabaThumb,
  game_type: 6,
  width: '420px',
}, {
  id: '16564048178345',
  name: 'IM体育',
  src: sportImImg,
  thumbnail: sportImThumb,
  game_type: 6,
  width: '420px',
}, {
  id: '16564045359195',
  name: 'FB体育',
  src: sportFbImg,
  thumbnail: sportFbThumb,
  game_type: 6,
  width: '420px',
}]
// 棋牌
const chess: NavGameConfigType[] = [{
  id: '16621850947387',
  name: '凯旋棋牌',
  src: chessKxImg,
  thumbnail: chessKxThumb,
  game_type: 7,
  width: '650px',
}, {
  id: '16622151295118',
  name: '双赢棋牌',
  src: chessSyImg,
  thumbnail: chessSyThumb,
  game_type: 7,
  width: '650px',
}, {
  id: '16622699564720',
  name: '开元棋牌',
  src: chessKyImg,
  thumbnail: chessKyThumb,
  game_type: 7,
  width: '650px',
}]
// 电竞
const esport: NavGameConfigType[] = [{
  id: '16564048344271',
  name: 'IM电竞',
  src: esportImImg,
  thumbnail: esportImThumb,
  game_type: 8,
  width: '650px',
}, {
  id: '45228933360695',
  name: '沙巴电竞',
  src: esportSabaImg,
  thumbnail: esportSabaThumb,
  game_type: 8,
  width: '650px',

}]
// 捕鱼
const fish: NavGameConfigType[] = [{
  id: '44196810703047',
  name: 'JDB捕鱼',
  src: fishJdbImg,
  thumbnail: fishJdbThumb,
  game_type: 3,
  width: '430px',
}, {
  id: '7426646715018523638',
  name: 'CQ9捕鱼',
  src: fishCq9Img,
  thumbnail: fishCq9Thumb,
  game_type: 3,
  width: '430px',
}, {
  id: '16620065993782',
  name: 'BG捕鱼',
  src: fishBgImg,
  thumbnail: fishBgThumb,
  game_type: 3,
  width: '430px',
}]
// 彩票
const lottery: NavGameConfigType[] = [{
  id: 'k3',
  name: '快3',
  src: lotteryK3Img,
  thumbnail: lotteryK3Thumb,
  game_type: 5,
  width: '216px',
}, {
  id: 'pk10',
  name: 'PK10',
  src: lotteryPk10Img,
  thumbnail: lotteryPk10Thumb,
  game_type: 5,
  width: '216px',
}, {
  id: 'ssc',
  name: '时时彩',
  src: lotterySscImg,
  thumbnail: lotterySscThumb,
  game_type: 5,
  width: '216px',
}, {
  id: 'lhc',
  name: '六合彩',
  src: lotteryLhcImg,
  thumbnail: lotteryLhcThumb,
  game_type: 5,
  width: '216px',
}, {
  id: 'll5',
  name: '11选5',
  src: lotteryLl5Img,
  thumbnail: lotteryLl5Thumb,
  game_type: 5,
  width: '216px',
}, {
  id: 'lucky28',
  name: '幸运28',
  src: lotteryLucky28Img,
  thumbnail: lotteryLucky28Thumb,
  game_type: 5,
  width: '216px',
}]
export default [...live, ...egame, ...sport, ...chess, ...esport, ...fish]
export { live, egame, sport, chess, esport, fish, lottery }
