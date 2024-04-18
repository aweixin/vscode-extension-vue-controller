import * as vscode from "vscode"
import * as fs from "fs"
function validate(name: string): string | null {
      if (/^[a-zA-Z-_]+$/.test(name)) {
            return null
      }
      return "名称只能包含字母、中划线、下划线"
}

export const create = async () => {
      const input = await vscode.window.showInputBox({
            prompt: "请输入目录名称",
            placeHolder: "请输入页面名称，如：index",
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
            const dirPathRouter = viewDir + "/" + dir + "/router/router.ts"
            if (fs.existsSync(dirPathRouter)) {
                  const dirFromPath = viewDir + "/" + dir + "/router/router"
                  const _formPath = "@/views" + dirFromPath.split("views")[1]
                  routerFiles.push(`import { ${dir}Routes } from "${_formPath}"`)
                  routerExport.push(`...${dir}Routes`)
            } else {
                  // 存在子目录
                  findRouterFiles(viewDir + "/" + dir, routerFiles, routerExport)
            }
      })
}
