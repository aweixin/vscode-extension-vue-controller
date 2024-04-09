export const viewTemplate = (folderPath: string) => {
      return `<template>
      <div>

      </div>
</template>

<script setup>
      import { ${folderPath}Config } from "../config/config"
      import { ${folderPath}Controller } from "../controller/index"
      import { ${folderPath}Request } from "../request/request"

</script>

<style lang="scss" scoped>

</style>`
}
