import * as vscode from "vscode"
import * as fs from "fs"
import { viewTemplate } from "./templates/view"
import { controllerTemplate } from "./templates/controller"
import { configTemplate } from "./templates/config"
import { requestTemplate } from "./templates/request"
import { routerTemplate } from "./templates/router"
import { create, findRouterFiles } from "./utils"

export function activate(context: vscode.ExtensionContext) {
      let disposable = vscode.commands.registerCommand("extension.createFolderAndFile", async (e) => {
            const input = await create()
            /** 
		 index
		 	view
			  	index.vue 	视图文件
			controller
				index.ts	控制器文件
			request
				request.ts	请求文件
			router
				router.ts	路由文件
			config
				config.ts	配置文件
		*/

            if (input) {
                  if (vscode.workspace.workspaceFolders) {
                        const folderPath = e.path + "/" + input

                        if (fs.existsSync(folderPath)) {
                              vscode.window.showErrorMessage(folderPath + " 已存在")
                              throw new Error(folderPath + " 已存在")
                        }

                        vscode.workspace.fs.createDirectory(vscode.Uri.file(folderPath))
                        const view = folderPath + "/view/index.vue"
                        const controller = folderPath + "/controller/index.ts"
                        const request = folderPath + "/request/request.ts"
                        const router = folderPath + "/router/router.ts"
                        const config = folderPath + "/config/config.ts"
                        const _interface = folderPath + "/interface/interface.ts"

                        // view
                        vscode.workspace.fs.writeFile(vscode.Uri.file(view), Buffer.from(viewTemplate(input)))
                        // controller
                        vscode.workspace.fs.writeFile(vscode.Uri.file(controller), Buffer.from(controllerTemplate(input)))
                        // request
                        vscode.workspace.fs.writeFile(vscode.Uri.file(request), Buffer.from(requestTemplate(input)))
                        // config
                        vscode.workspace.fs.writeFile(vscode.Uri.file(config), Buffer.from(configTemplate()))
                        // router
                        vscode.workspace.fs.writeFile(vscode.Uri.file(router), Buffer.from(routerTemplate(e.path, input)))
                        // interface
                        vscode.workspace.fs.writeFile(vscode.Uri.file(_interface), Buffer.from(""))

                        vscode.window.showInformationMessage("文件夹和文件已创建")
                  }
            }
      })

      let copyRouters = vscode.commands.registerCommand("extension.createRouters", async (e) => {
            const folderPath = e.path.split("/").pop()
            if (folderPath !== "views") {
                  vscode.window.showErrorMessage("当前目录不是views目录")
                  throw new Error("当前目录不是views目录")
            }

            // 判断views是否存在pageRouters.ts 没有则创建
            const routersPath = e.path + "/" + "pageRouters.ts"
            if (!fs.existsSync(routersPath)) {
                  fs.writeFileSync(routersPath, "")
            }

            // 询问是否覆盖
            const result = await vscode.window.showInformationMessage("是否获取所有Router文件", "yes", "no")

            // 路由引入数据
            const routers: string[] = []
            // 路由导出数据
            const routerExport: string[] = []

            findRouterFiles(e.path, routers, routerExport, result)

            const body = "// 路由配置文件\n" + routers.join("\n") + "\n" + `export default [${routerExport}]`

            // routersPath 文件中append router
            fs.writeFileSync(routersPath, body)

            vscode.window.showInformationMessage("路由文件已创建")
      })

      context.subscriptions.push(disposable)
      context.subscriptions.push(copyRouters)
}

export function deactivate() {}
