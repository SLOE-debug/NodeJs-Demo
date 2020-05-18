<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        mode="vertical"
        style="height:100vh"
        :default-active="$router.path"
        router
      >
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="String(index + 1)"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subitem, subIndex) in item.items"
            :key="`menu-item-${index}-${subIndex}`"
            :index="subitem.path"
            >{{ subitem.title }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="">
        balabala - 后台管理系统
      </el-header>
      <el-main height="">
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "课程",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/episodes/list" },
        ],
      },
      {
        title: "用户",
        items: [{ title: "用户管理", path: "/users/list" }],
      },
    ],
  };
}
</script>

<style></style>
