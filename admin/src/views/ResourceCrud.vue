s<template>
  <avue-crud
    v-if="option.column"
    :data="data"
    :option="option"
    @row-save="create"
    @row-update="update"
    @row-del="remove"
    :page="page"
    @on-load="changpage"
    @sort-change="sortChange"
    @search-change="searchChange"
  >
    ></avue-crud
  >
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!: string;

  page = {
    total: 0,
    pageSize: 2,
    pageSizes: [2, 5, 10, 20, 50],
    pagerCount: 5,
  };

  query: any = {
    limit: 2,
  };

  data = [];

  option: any = {};

  async fetchOption() {
    this.option = (await this.$http.get(`${this.resource}/option`)).data;
  }

  async fetch() {
    const res = (
      await this.$http.get(this.resource, {
        params: {
          query: this.query,
        },
      })
    ).data;
    this.data = res.data;
    this.page.total = res.total;
  }

  async changpage({ pageSize, currentPage }: any) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  async sortChange({ prop, order }: any) {
    this.query.sort = {
      [prop]: order ? (order === "ascending" ? 1 : -1) : 0,
    };
    this.fetch();
  }

  async searchChange(parmas: any, done: any) {
    this.query.where = {};
    Object.keys(parmas).forEach((e) => {
      if (this.option.column.find((m:any) => m.prop == e).regex) {
        this.query.where[e] = { $regex: parmas[e] };
      } else {
        this.query.where[e] = parmas[e];
      }
    });
    done();
    this.fetch();
  }

  async create(data: any, done: any) {
    this.$http.post(this.resource, data);
    done();
    this.$message.success("添加成功！");
    this.fetch();
  }

  async remove(data: any) {
    this.$confirm("确定要删除嘛？")
      .then(() => {
        // console.log("a" + data);
        this.$http.delete(`${this.resource}/${data.id}`);
        this.$message.success("删除成功！");
        this.fetch();
      })
      .catch(() => {});
  }

  async update(data: any, index: any, done: any) {
    const remove = JSON.parse(JSON.stringify(data));
    delete remove.$index;
    this.$http.put(`${this.resource}/${data._id}`, remove);
    done();
    this.$message.success("修改成功！");
    this.fetch();
  }

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style></style>
