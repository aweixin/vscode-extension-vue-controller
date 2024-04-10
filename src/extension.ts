import * as vscode from "vscode"
import * as fs from "fs"
import { viewTemplate } from "./templates/view"
import { controllerTemplate } from "./templates/controller"
import { configTemplate } from "./templates/config"
import { requestTemplate } from "./templates/request"
import { routerTemplate } from "./templates/router"
import { create } from "./utils"
import { componentTemplate } from "./templates/component"

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
                  components
                        index.vue 组件文件
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
                        const component = folderPath + "/components/index.vue"
                        // view
                        vscode.workspace.fs.writeFile(vscode.Uri.file(view), Buffer.from(viewTemplate(input)))
                        // controller
                        vscode.workspace.fs.writeFile(vscode.Uri.file(controller), Buffer.from(controllerTemplate(input)))
                        // request
                        vscode.workspace.fs.writeFile(vscode.Uri.file(request), Buffer.from(requestTemplate(input)))
                        // config
                        vscode.workspace.fs.writeFile(vscode.Uri.file(config), Buffer.from(configTemplate(input)))
                        // router
                        vscode.workspace.fs.writeFile(vscode.Uri.file(router), Buffer.from(routerTemplate(input)))
                        // component
                        vscode.workspace.fs.writeFile(vscode.Uri.file(component), Buffer.from(componentTemplate()))

                        vscode.window.showInformationMessage("文件夹和文件已创建")
                  }
            }
      })

      let copyRouters = vscode.commands.registerCommand("extension.createRouters", async (e) => {
            const folderPath = e.path.split("/").pop()
            //  当前目录下所有文件夹
            const folders = fs.readdirSync(e.path)
            const routers: string[] = []
            folders.forEach((item) => {
                  const _path = e.path + "/" + item
                  if (fs.statSync(_path).isDirectory()) {
                        routers.push(`import { ${item}Routes } from "../${folderPath}/${item}/router/router"`)
                  }
            })

            // 复制到剪切板
            vscode.env.clipboard.writeText(routers.join("\n"))
            vscode.window.showInformationMessage("路由已复制到剪切板")
      })

      context.subscriptions.push(disposable)
      context.subscriptions.push(copyRouters)
}

export function deactivate() {}
