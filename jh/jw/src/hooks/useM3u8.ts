/**
 * @description 播放m3u8视频
 * @param {string} url
 */
function useM3u8(url: string) {
  const videoRef = ref<HTMLMediaElement>()
  onMounted(async () => {
    // @ts-expect-error 使用hls.light版本，减小打包体积
    import('hls.js/dist/hls.light').then(({ default: Hls }) => {
      if (videoRef.value?.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.value.src = url
      }
      else if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(url)
        hls.attachMedia(videoRef.value!)
        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          throw new Error(`${data.type}: ${data.details} 加载失败`)
        })
      }
    })
  })

  return { videoRef }
}
export default useM3u8
