<template>
  <div>
    {{ message }}
    <p>详细信息</p>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      message: "awgawgagsrnfkaehgesfjahfduwabjhfkj!",
    };
  },
  methods: {
    show() {
      console.log(this.message);
    },
  },
  created() {
    console.log(this.message);
    this.show();
  },
};
</script>

<style></style>
