import * as vscode from "vscode"
import * as fs from "fs"
import exp from "constants"
function validate(name: string): string | null {
      if (/^[a-zA-Z-_,]+$/.test(name)) {
            return null
      }
      return "名称只能包含字母、中划线、下划线"
}

export const create = async () => {
      const input = await vscode.window.showInputBox({
            prompt: "请输入目录名称",
            placeHolder: "如：index或者 index,user,role,permission",
            validateInput: validate,
      })
      return input
}

// 获取文件路径下所有目录
export const getDirs = (path: string, result?: string) => {
      const dirs = fs.readdirSync(path).filter((file) => {
            return fs.statSync(path + "/" + file).isDirectory()
      })
      if (result === "no") {
            return dirs.filter((dir) => {
                  return dir !== "authentication"
            })
      }
      return dirs
}

/**
 * 查找路由文件
 * @param viewDir 视图目录
 * @param routerFiles 路由文件
 * @param routerExport 路由导出
 */
export const findRouterFiles = (viewDir: string, routerFiles: string[] = [], routerExport: string[] = [], fileType: string, result?: string) => {
      // 获取文件夹下的所有文件夹
      const dirs = getDirs(viewDir, result)
      dirs.forEach((dir) => {
            // 路由文件
            if (fileType == "router") {
                  const dirPathRouter = viewDir + "/" + dir + "/" + fileType + "/index.ts"
                  if (fs.existsSync(dirPathRouter)) {
                        const dirFromPath = viewDir + "/" + dir + "/" + fileType + "/index"
                        const _formPath = "@/views" + dirFromPath.split("views")[1]

                        let dirFromPath1 = viewDir + "/" + dir + "/index/router"

                        const resultName = dirFromPath1.split("views")[1].split("/")
                        // 删除第一个数组
                        resultName.shift()

                        if (fileType == "router") {
                              routerFiles.push(`import { ${camelCase(resultName)} } from "${_formPath}"`)
                              routerExport.push(`...${camelCase(resultName)}`)
                        }
                  } else {
                        // 存在子目录
                        findRouterFiles(viewDir + "/" + dir, routerFiles, routerExport, fileType)
                  }
            }

            if (fileType == "controller") {
                  const mule = viewDir + "/" + dir + "/" + fileType
                  // 判断目录是否存在
                  if (fs.existsSync(mule)) {
                        // 获取当前目录下所有文件
                        const files = fs.readdirSync(mule)

                        files.map((file) => {
                              const dirFromPath = viewDir + "/" + dir + "/" + fileType + "/" + file
                              const _formPath = "@/views" + dirFromPath.split("views")[1]
                              let dirFromPath1 = dirFromPath.replace(".ts", "")
                              const resultName = dirFromPath1.split("views")[1].split("/")
                              // 删除第一个数组
                              resultName.shift()
                              routerFiles.push(`import  ${camelCase(resultName)}  from "${_formPath}"`)
                              routerExport.push(`${camelCase(resultName)}`)
                        })
                  } else {
                        // 不纯
                        findRouterFiles(viewDir + "/" + dir, routerFiles, routerExport, fileType)
                  }
            }
      })
}

// 创建路由文件
export const createRouters = async (_path: string) => {
      const folderPath = _path.split("/").pop()
      if (folderPath !== "views") {
            vscode.window.showErrorMessage("当前目录不是views目录")
            throw new Error("当前目录不是views目录")
      }

      // 判断views是否存在pageRouters.ts 没有则创建
      const routersPath = _path + "/" + "pageRouters.ts"
      const pageController = _path + "/" + "pageController.ts"
      // 创建路由引入文件
      if (!fs.existsSync(routersPath)) {
            fs.writeFileSync(routersPath, "")
      }
      // 创建控制器文件
      if (!fs.existsSync(pageController)) {
            fs.writeFileSync(pageController, "")
      }

      // 路由引入数据
      const routers: string[] = []
      // 路由导出数据
      const routerExport: string[] = []

      // controller引入数据
      const controllers: string[] = []
      // controller引入数据导出数据
      const controllerExport: string[] = []

      findRouterFiles(_path, routers, routerExport, "router", "no")
      findRouterFiles(_path, controllers, controllerExport, "controller", "no")

      const routerBody = "// 路由配置文件\n" + routers.join("\n") + "\n" + `export default [${routerExport}]`
      const controllerBody = "// 全局控制器\n" + controllers.join("\n") + "\n" + `export default {${controllerExport}}`

      // routersPath 文件中append router
      fs.writeFileSync(routersPath, routerBody)
      fs.writeFileSync(pageController, controllerBody)

      vscode.window.showInformationMessage("路由,控制器文件已创建")
}

export const camelCase = (arr: Array<string>) => {
      let result = arr[0]
      for (let i = 1; i < arr.length; i++) {
            result += arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      }
      return result
}
