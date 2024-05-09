export const viewTemplate = (path: string, folderPath: string) => {
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter = routerPath.slice(routerPath.indexOf("views")).filter((c) => c != "views")
      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      const _name = viewsAfter.length ? `${viewsAfter.join("-")}-${folderPath}-index` : `${folderPath}-index`

      return `<template>
<KTShow value="" :show="true">
</KTShow>
</template>



<script setup lang="ts" name="${_name}">
      import ${folderPath}Config from "${viewsName}/${folderPath}/config/index"
      import ${folderPath}Controller from "${viewsName}/${folderPath}/controller/index"

      const route = useRoute();

      onMounted(() => {
            ${folderPath}Controller.query(route.query.page)
      });

      // 监听路由变化
      const fullPath = ref(route.fullPath);
      watch(() => route.fullPath,() => {
            if(route.name == "${_name}" && fullPath.value != route.fullPath){
                  ${folderPath}Controller.query(route.query.page)
                  fullPath.value = route.fullPath
            }
      }
    )


onUnmounted(() => {
});
</script>

<style lang="scss" scoped>

</style>`
}
