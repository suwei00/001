import mqtt from 'precompiled-mqtt'
import { noticeMqtt } from './mqttNotice'

const MODE = import.meta.env.PROD ? 'production' : 'development'

const config: any = {
  development: {
    urlList: [
      {
        // host: 'nass.jlcs002.com',
        port: '1888/mqtt',
        protocol: 'wss',
      },
      {
        // host: 'mqtt.jlcs002.com',
        port: '1888/mqtt',
        protocol: 'wss',
      },
    ].sort(() => Math.random() - 0.5),
    username: 'admin',
    // password: 'www.123.com',
  },
  production: {
    urlList: [
      {
        // host: 'sfgqwr.1jdh4188.com',
        port: '1888/mqtt',
        protocol: 'wss',
      },
      {
        // host: 'newss.1jdh4188.com',
        port: '1888/mqtt',
        protocol: 'wss',
      },
    ].sort(() => Math.random() - 0.5),
    username: 'superadmin',
    password: '@BbotPQo^v%oflH#',
  },
}
// 链接scoket服务器
class CreateConnect {
  client: any
  subscribeList: Array<string>
  constructor() {
    this.client = null
    this.subscribeList = []
  }

  mqttConnect = () => {
    const { urlList, username, password } = config[MODE]
    this.client = mqtt.connect({
      keepalive: 0,
      username,
      password,
      servers: urlList,
    })

    this.subscribeList = [`${import.meta.env.PROD ? 'jy8' : 'jl8'}/cnchat`]
    this.client.on('connect', () => {
      this.client.subscribe(this.subscribeList, { qos: 1 }, (err: any, granted: any) => {
        console.log('😀😀😀😀😀😀😀😀 订阅成功', err, granted)
      })
    })
    this.client.on('message', (topic: string, payload: string) => {
      console.log('mqtt_event', { topic, payload: payload.toString() })
      noticeMqtt(JSON.parse(payload.toString()))
    })
  }

  mqttDisconnect = () => {
    if (this.client) {
      this.client.end(() => {
        console.log('取消订阅')
      })
    }
  }
}

const CreateMqtt = new CreateConnect()

export default CreateMqtt
