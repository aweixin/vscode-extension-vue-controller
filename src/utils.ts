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
export const findRouterFiles = (viewDir: string, routerFiles: string[] = [], routerExport: string[] = [], result?: string) => {
      // 获取文件夹下的所有文件夹
      const dirs = getDirs(viewDir, result)
      dirs.forEach((dir) => {
            const dirPathRouter = viewDir + "/" + dir + "/router/index.ts"
            if (fs.existsSync(dirPathRouter)) {
                  const dirFromPath = viewDir + "/" + dir + "/router/index"
                  const _formPath = "@/views" + dirFromPath.split("views")[1]

                  const dirFromPath1 = viewDir + "/" + dir + "/index/router"
                  const resultName = dirFromPath1.split("views")[1].split("/")
                  // 删除第一个数组
                  resultName.shift()
                  console.log("%c [ resultName ]-50", "font-size:13px; background:pink; color:#bf2c9f;", resultName)

                  routerFiles.push(`import { ${camelCase(resultName)} } from "${_formPath}"`)
                  routerExport.push(`...${camelCase(resultName)}`)
            } else {
                  // 存在子目录
                  findRouterFiles(viewDir + "/" + dir, routerFiles, routerExport)
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
      if (!fs.existsSync(routersPath)) {
            fs.writeFileSync(routersPath, "")
      }

      // 路由引入数据
      const routers: string[] = []
      // 路由导出数据
      const routerExport: string[] = []

      findRouterFiles(_path, routers, routerExport, "no")

      const body = "// 路由配置文件\n" + routers.join("\n") + "\n" + `export default [${routerExport}]`

      // routersPath 文件中append router
      fs.writeFileSync(routersPath, body)

      vscode.window.showInformationMessage("路由文件已创建")
}

export const camelCase = (arr: Array<string>) => {
      let result = arr[0]
      for (let i = 1; i < arr.length; i++) {
            result += arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      }
      return result
}
