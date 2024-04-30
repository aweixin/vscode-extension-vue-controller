export const viewTemplate = (path: string, folderPath: string) => {
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter = routerPath.slice(routerPath.indexOf("views")).filter((c) => c != "views")
      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      const _name = viewsAfter.length ? `${viewsAfter.join("-")}-${folderPath}-index` : `${folderPath}-index`

      return `<template>
<KTShow value="" :show="true">
      <toolbar />
</KTShow>
</template>



<script setup lang="ts" name="${_name}">
      import ${folderPath}Config from "${viewsName}/${folderPath}/config/index"
      import ${folderPath}ControllerInstance from "${viewsName}/${folderPath}/controller/index"
      // 筛选
      import Filter from "../components/Filter.vue";
      // 更新or创建
      import Action from "../components/index.vue";

      const route = useRoute();
      // 创建控制器 实例
      const ${folderPath}Controller = new ${folderPath}ControllerInstance();

      onMounted(() => {
            ${folderPath}Controller.query(route.query.page)
      });

      // 监听路由变化
      watch(() => route.fullPath,() => {
            if(route.name == "${_name}"){
                  ${folderPath}Controller.query(route.query.page)
            }
      }
    )



</script>

<style lang="scss" scoped>

</style>`
}
