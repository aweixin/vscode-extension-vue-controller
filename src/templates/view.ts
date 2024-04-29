export const viewTemplate = (path: string, folderPath: string) => {
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter = routerPath.slice(routerPath.indexOf("views")).filter((c) => c != "views")
      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      return `<template>
<KTShow value="" :show="true">
      <toolbar />
</KTShow>
</template>



<script setup lang="ts" name="${viewsAfter.join("-")}-${folderPath}-index">
      import ${folderPath}Config from "${viewsName}/${folderPath}/config/index"
      import ${folderPath}Controller from "${viewsName}/${folderPath}/controller/index"

      const route = useRoute();
      onMounted(() => {
      });

      // 监听路由变化
      watch(() => route.fullPath,() => {
            if(route.name == "${viewsAfter.join("-")}-${folderPath}-index"){
            }
      }
    )



</script>

<style lang="scss" scoped>

</style>`
}
