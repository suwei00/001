import bus from '@/utils/bus';
import useBus from '@/hooks/useBus';

// @ts-ignore
import mqtt from 'precompiled-mqtt';
import { useAppStore } from '@/store-pinia';

const { username, password, servers, pre } = globalConfig.MQTT_CONFIG;

let client: any = null;

export const mqttConnect = (prefix?: string, uid?: string) => {
  // 判断是否已经链接mqtt 判断链接的是否登录状态的链接或是未登录状态的链接
  if (client?.options?.clientId) {
    const str = client?.options?.clientId.includes('undefined:undefined');
    // 再次链接和上次链接是相同状态 直接返回不做重复链接
    if ((uid && !str) || (!uid && str)) {
      return;
    }
  }
  // 如果已经连接，则关闭后重新连接
  if (client) {
    return client.end(true, null, () => {
      console.error(
        `mqtt连接已存在，即将关闭连接，并使用 uid:${uid} prefix: ${prefix} 重新连接！！！`
      );
      mqttConnect(prefix, uid);
    });
  }
  // 订阅的事件
  const topics = {
    FINANCE: `${prefix}/${uid}/finance`, // 存款取款事件
    balance: `${prefix}/${uid}`, // 余额变化事件
    homeData: `${prefix ?? pre}/homeData`
  };

  const events = [];

  if (uid && prefix) {
    events.push(topics.FINANCE, topics.balance);
  }

  if (location.pathname === '/' || location.pathname === '/home') {
    events.push(topics.homeData);
  }
  console.log(`📶链接topics地址：${prefix}/${uid}/finance`);

  const clientId = `${prefix}:${uid}-h5-${new Date().getTime()}`;

  type topicType = keyof typeof topics;

  // 创建链接
  client = mqtt.connect({
    username,
    password,
    keepalive: 6, // 心跳时间
    clientId,
    servers
  });
  client.on('connect', () => {
    console.log('🔥🔥🔥 mqtt链接成功');
  });
  client.on('error', (error: any) => {
    console.log('😞😞😞 链接错误', error);
  });
  client.on('close', () => {
    // 清空对象
    client = null;
    console.log('❌ ❌ ❌ 链接关闭');
  });

  // 订阅存款取款消息
  client.subscribe(
    events,
    {
      qos: 1
    },
    () => {
      console.log(`😽😽😽 订阅成功`);
    }
  );

  // 收到消息
  client.on('message', (topic: topicType, message: any, packet: any) => {
    // console.log(topic, message.toString(), packet);
    // 根据不同的topic处理业务逻辑
    switch (topic) {
      case topics.FINANCE:
        handleFinance(topic, message, packet);
        break;
      case topics.homeData:
        handleHomeData(message);
      default:
        break;
    }
  });

  // 用户登出
  useBus('logout', async () => {
    client.end(true, null, () => {
      console.log('用户登出，立即关闭连接');
    });
  });

  /**
   * @description 处理存取款消息
   * @param {topicType} topic
   * @param {*} message
   * @param {*} packet
   */
  const handleFinance = (topic: topicType, message: any, packet: any) => {
    const { ty, status, amount, ts } = JSON.parse(message.toString());
    console.log('mqtt-message:', topic, message.toString(), packet);

    // 财务相关
    bus.emit('mqttQuickTips', { ty, status, amount, ts });
  };

  /**
   * @description 首页滚动条
   * @param {*} message
   */
  const handleHomeData = (message: any) => {
    const appStore = useAppStore();
    const data = JSON.parse(message.toString());
    appStore.setHomeData(data);
  };
};

/**
 * @description 关闭mqtt
 */
export const closeConnect = () => {
  client?.end(true, null, () => {
    console.error('closeConnect mqtt关闭成功');
  });
};

/**
 * @description 取消订阅
 */
export const connectUnsubscribe = (topic: string) => {
  client?.unsubscribe(topic, () => {
    console.error(`❌ 取消${topic}订阅成功`);
  });
};

/**
 * @description 开启订阅
 */
export const onSubscribe = (topic: string) => {
  client?.subscribe(
    [topic],
    {
      qos: 1
    },
    () => {
      console.log(`✅ 开启${topic}订阅成功`);
    }
  );
};
