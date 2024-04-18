export const viewTemplate = (folderPath: string) => {
      return `<template>
      <div>

      </div>
</template>

<script lang="ts">
// 页面名称
export default {
  name: "cms_${folderPath}_index"
};
</script>

<script setup lang="ts">
      import ${folderPath}Config from "../config/config"
      import ${folderPath}Controller from "../controller/index"
      import ${folderPath}Request from "../request/request"

</script>

<style lang="scss" scoped>

</style>`
}
