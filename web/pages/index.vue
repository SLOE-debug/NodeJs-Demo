<template>
  <div>
    <h3 align="center" justify="center">balabala</h3>
    <button @click="PlugFlow()">推流</button>
    <button @click="Stop()">停止推流</button>
    <br />
    <video ref="Show" src="" style="width:500px"></video>
    <video ref="play" src="" style="width:500px" controls></video>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class index extends Vue {
  recorderObj = {}
  bf = []
  PlugFlow() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((s) => {
        const Show = this.$refs.Show
        Show.srcObject = s
        Show.play()
        this.recorderObj = new MediaRecorder(s, {
          mimeType: 'video/webm'
        })
        this.recorderObj.ondataavailable = (e) => {
          this.bf.push(e.data)
        }
        this.recorderObj.start(200)
      })
  }

  async Stop() {
    this.recorderObj.stop()
    const f = new window.File(
      this.bf.slice(0, this.bf.length),
      `${Date.now()}.webm`,
      {
        type: 'video/webm'
      }
    )
    const formdata = new FormData()
    formdata.append('file', f)
    try {
      const res = await this.$axios.$post('courses/upload', formdata)
      const play = this.$refs.play
      play.src = res.url
      play.play()
    } catch (error) {}
  }
}
</script>
