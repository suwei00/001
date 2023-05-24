import { connect, StringCodec } from 'nats.ws';

import event from '../event';

import { store } from '@/store';

import bus from '@/utils/bus';

// 全局 mitt 事件名称
const config = {
  prod: {
    url: 'wss://ws.td22t5f.com:8848',
    user: '1A1hWrDmcKDP',
    pass: 'vFlg6hQzD#uu'
  },

  test: {
    url: 'ws://ws.p3nu.com:8848',
    user: '1A1hWrDmcKDP',
    pass: 'vFlg6hQzD#uu'
  }
};

// 链接scoket服务器
export async function natsConnect(uid, prefix) {
  const { url, user, pass } = globalConfig.MQTT_CONFIG;
  const nc = await connect({
    reconnect: true,
    user,
    pass,
    servers: url,
    pingInterval: 10000, // 心跳间隔
    reconnectTimeWait: 10000,
    timeout: 20000
  });

  event.on('natsLogin', async () => {
    const done = nc.closed();
    await nc.close();
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    } else {
      console.log('登录失效，关闭nats链接成功');
    }
  });

  const sc = StringCodec();

  nc.subscribe(uid, {
    callback: (err, msg) => {
      if (err) {
        console.log('subscribe ' + uid + 'err', err);
      } else {
        const { subject, data } = msg;
        const result = sc.decode(data);
        console.log(`${subject}:`, result);
        event.emit(uid, result);
      }
    }
  });

  // 监听存取款
  nc.subscribe(`${prefix}_${uid}_finance`, {
    callback: (err, msg) => {
      const { subject, data } = msg;
      const result = sc.decode(data);
      const { ty, status } = JSON.parse(result);
      if (ty === '1') {
        bus.emit('deposit', status);
      }
      if (ty === '2') {
        bus.emit('withdrawals', status);
      }
    }
  });
}

// onMounted(() => {
//   bus.on('withdrawals', handleNatsWithdrawals);
// });
// onUnmounted(() => {
//   bus.off('withdrawals', handleNatsWithdrawals);
// });
