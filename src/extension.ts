import * as vscode from "vscode"
import * as fs from "fs"
import { viewTemplate } from "./templates/view"
import { controllerTemplate } from "./templates/controller"
import { configTemplate } from "./templates/config"
import { requestTemplate } from "./templates/request"
import { routerTemplate } from "./templates/router"

function validate(name: string): string | null {
      if (/^[a-zA-Z-_]+$/.test(name)) {
            return null
      }
      return "名称只能包含字母、中划线、下划线"
}

export function activate(context: vscode.ExtensionContext) {
      let disposable = vscode.commands.registerCommand("extension.createFolderAndFile", async (e) => {
            const input = await vscode.window.showInputBox({
                  prompt: "请输入目录名称",
                  placeHolder: "请输入页面名称，如：index",
                  validateInput: validate,
            })

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
                        const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath + "/" + input

                        if (fs.existsSync(folderPath)) {
                              throw new Error(folderPath + " 已存在")
                        }

                        vscode.workspace.fs.createDirectory(vscode.Uri.file(folderPath))
                        const view = folderPath + "/view/index.vue"
                        const controller = folderPath + "/controller/index.ts"
                        const request = folderPath + "/request/request.ts"
                        const router = folderPath + "/router/router.ts"
                        const config = folderPath + "/config/config.ts"
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

                        vscode.window.showInformationMessage("文件夹和文件已创建")
                  }
            }
      })

      context.subscriptions.push(disposable)
}

export function deactivate() {}
