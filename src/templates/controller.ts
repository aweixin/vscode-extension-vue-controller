export const controllerTemplate = (path: string, folderPath: string) => {
      const _name = folderPath + "Controller"
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsAfter = routerPath.slice(routerPath.indexOf("views"))
      const viewsName = "@/" + viewsAfter.join("/")

      return `import * as yup from "yup";
import ${folderPath}Request from "${viewsName}/${folderPath}/request/index"
class ${_name} {
      constructor() {
            console.log('hello world!');
      }
}
export default new ${_name}()`
}
