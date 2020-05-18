<template>
  <div class="pa-3">
    <h3>
      课程管理
    </h3>
    <v-row>
      <v-col v-for="item in courses" :key="item._id" md="3">
        <template>
          <v-card :to="`courses/${item._id}`" class="mx-auto" max-width="344">
            <v-img :src="item.cover" height="200px"></v-img>
            <v-card-title>
              {{ item.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.createdAt }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text>Share</v-btn>
              <v-btn color="purple" text>
                Explore
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  asyncData: async ({ $axios }: any) => {
    const data = await $axios.$get('courses')
    return {
      courses: data.data
    }
  }
})
export default class Courses extends Vue {
  css = []
}
</script>

<style></style>
