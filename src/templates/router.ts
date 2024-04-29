export const routerTemplate = (path: string, folderPath: string) => {
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter = routerPath.slice(routerPath.indexOf("views")).filter((c) => c != "views")

      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      const _name = folderPath + "Routes"
      return `import type { RouteRecordRaw } from "vue-router"
// ${folderPath} 自定义路由 
export const ${_name} : Array<RouteRecordRaw> = [
      {
            path: "${viewsAfter.join("/").replace("views", "")}/${folderPath}/index",
            name: "${viewsAfter.join("-")}-${folderPath}-index",
            component: () => import("${viewsName}/${folderPath}/view/index.vue"),
            meta: {
                  index: 1,
                  pageTitle: "${folderPath}",
                  breadcrumbs: ["${viewsAfter.join("-")}-${folderPath}-index"],
            },
      },
]`
}
