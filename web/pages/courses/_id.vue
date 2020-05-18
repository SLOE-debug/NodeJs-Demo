<template>
  <div class="pa-3" style="overflow: hidden;">
    <h3>{{ course.title }}</h3>
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((m, i) => ({ text: m.name, value: i }))"
    ></v-select>
    <video width="100%" height="700px" :src="episode.file" controls></video>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  asyncData: async ({ $axios, params }: any) => {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })
    return {
      id,
      course
    }
  }
})
export default class CoursesDetailed extends Vue {
  currentIndex = 0
  course = {
    episodes: []
  }

  get episode() {
    return this.course.episodes[this.currentIndex]
  }
}
</script>

<style></style>
