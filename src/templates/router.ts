export const routerTemplate = (folderPath: string) => {
      const _name = folderPath + "Routes"
      return `import type { RouteRecordRaw } from "vue-router"
// ${folderPath} 自定义路由 
export const ${_name} : Array<RouteRecordRaw> = [
      {
            path: "/${folderPath}/index",
            name: "${folderPath}",
            component: () => import("@/views/${folderPath}/view/index.vue"),
            meta: {
                  index: 1,
                  pageTitle: "${folderPath}",
                  breadcrumbs: ["${folderPath}-index"],
            },
      },
]`
}
