import { camelCase } from "../utils"

export const routerTemplate = (path: string, folderPath: string) => {
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter1 = routerPath.slice(routerPath.indexOf("views"))
      const viewsAfter = routerPath.slice(routerPath.indexOf("views")).filter((c) => c != "views")

      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      const path_name = viewsAfter.length ? `${viewsAfter.join("-")}-${folderPath}-index` : `${folderPath}-index`

      const _name = camelCase([...path_name.split("-"), "router"])
      return `import type { RouteRecordRaw } from "vue-router"
// ${folderPath} 自定义路由 
export const ${_name} : Array<RouteRecordRaw> = [
      {
            path: "${viewsAfter1.join("/").replace("views", "")}/${folderPath}/index",
            name: "${path_name}",
            component: () => import("${viewsName}/${folderPath}/view/index.vue"),
            meta: {
                  index: 1,
                  pageTitle: "${folderPath}",
                  breadcrumbs: ["${path_name}"],
            },
      },
]`
}
