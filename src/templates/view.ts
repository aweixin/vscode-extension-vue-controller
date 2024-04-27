export const viewTemplate = (path: string, folderPath: string) => {
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter = routerPath.slice(routerPath.indexOf("views"))
      const viewsName = "@/" + viewsAfter.join("/")

      return `<template>
      <div>

      </div>
</template>



<script setup lang="ts" name="${viewsAfter.join("").replace("views", "")}-${folderPath}-index">
      import ${folderPath}Config from "${viewsName}/${folderPath}/config/index"
      import ${folderPath}Controller from "${viewsName}/${folderPath}/controller/index"

      const route = useRoute();
      onMounted(() => {
      });

      // 监听路由变化
      watch(() => route.fullPath,() => {
            if(route.name == "${viewsAfter.join("").replace("views", "")}-${folderPath}-index"){
            }
      }
    )



</script>

<style lang="scss" scoped>

</style>`
}
