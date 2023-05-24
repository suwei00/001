const url1 = import.meta.env.VITE_MQTT_URL.split('|')[0]
const url2 = import.meta.env.VITE_MQTT_URL.split('|')[1]
const port = import.meta.env.VITE_MQTT_PORT
const username = import.meta.env.VITE_MQTT_USERNAME
const password = import.meta.env.VITE_MQTT_PASSWORD
let client: any = null

/**
 * @description 处理存取款消息
 * @param {topicType} topic
 * @param {*} message
 * @param {*} packet
 */

export /**
 * @description 关闭mqtt
 */
const closeConnect = () => {
  client && client.end(true, null, () => {
    console.error('closeConnect mqtt关闭成功')
  })
}

export const mqttConnect = async (uid: string, prefix: string) => {
  const userStore = useUserStore()
  const { browser_type, system } = await getDeviceInfo()

  if (!uid || !prefix) {
    console.error('mqttConnect: uid or prefix is empty')
    throw new Error('mqttConnect: uid or prefix is empty')
  }
  if (client) {
    return client.end(true, null, () => {
      console.error(`mqtt连接已存在，即将关闭连接，并使用 uid:${uid} prefix: ${prefix} 重新连接！！！`)
      mqttConnect(uid, prefix)
    })
  }
  // 订阅的事件
  const topics = {
    FINANCE: `${prefix}/${uid}/finance`, // 存款取款事件
  }
  console.log(`链接topics地址：${prefix}/${uid}/finance`)

  const clientId = `${prefix}:${uid}-web-${new Date().getTime()}-${browser_type}-${system}`
  console.log(`clientId：${clientId}`)
  // 创建链接
  import('precompiled-mqtt').then(({ default: mqtt }) => {
    client = mqtt.connect({
      keepalive: 0,
      username,
      password,
      clientId,
      servers: [
        {
          host: url1,
          port,
          protocol: 'wss',
        }, {
          host: url2,
          port,
          protocol: 'wss',
        },
      ],
    })

    client.on('connect', () => {
      console.log('成功链接到')
    })
    // 订阅存款取款消息
    client.subscribe(
      topics.FINANCE,
      {
        qos: 1,
      },
      () => {
        console.log('存款取款订阅成功')
      },
    )

    client.on('message', (topic: string, message: any, packet: any) => {
      console.log('message=======>', topic, message.toString(), packet)
      switch (topic) {
        case topics.FINANCE:
          userStore.runGetUserBalance()
          break
        default:
          break
      }
    })
    client.on('close', () => {
      // 清空对象
      client = null
      console.log('🔐🔐🔐🔐🔐🔐🔐🔐 链接关闭')
    })
    client.on('error', () => {
      console.log('链接错误')
    })
  })
}

// 没用的注释
