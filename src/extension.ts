import * as vscode from "vscode"
import * as fs from "fs"
import { viewTemplate } from "./templates/view"
import { controllerTemplate } from "./templates/controller"
import { configTemplate } from "./templates/config"
import { requestTemplate } from "./templates/request"
import { routerTemplate } from "./templates/router"
import { create, createRouters, findRouterFiles } from "./utils"
import { componentsTemplate } from "./templates/components"
import { filterTemplate } from "./templates/filter"

export function activate(context: vscode.ExtensionContext) {
      let disposable = vscode.commands.registerCommand("extension.createFolderAndFile", async (e) => {
            const inputs = await create()
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
                  interface
                        interface.ts 接口文件
                  // 组件
                  components
                        index.vue
                  
		*/

            if (inputs) {
                  // console.log("🚀 ~ disposable ~ inputs:", inputs, inputs.split(","))
                  inputs.split(",").map((input) => {
                        if (vscode.workspace.workspaceFolders) {
                              const folderPath = e.path + "/" + input

                              if (fs.existsSync(folderPath)) {
                                    vscode.window.showErrorMessage(folderPath + " 已存在")
                                    throw new Error(folderPath + " 已存在")
                              }

                              vscode.workspace.fs.createDirectory(vscode.Uri.file(folderPath))
                              const view = folderPath + "/view/index.vue"
                              const controller = folderPath + "/controller/index.ts"
                              const request = folderPath + "/request/index.ts"
                              const router = folderPath + "/router/index.ts"
                              const config = folderPath + "/config/index.ts"
                              const _interface = folderPath + "/interface/index.ts"
                              const _components = folderPath + "/components/index.vue"
                              const _filter = folderPath + "/components/Filter.vue"

                              // view
                              vscode.workspace.fs.writeFile(vscode.Uri.file(view), Buffer.from(viewTemplate(e.path, input)))
                              // controller
                              vscode.workspace.fs.writeFile(vscode.Uri.file(controller), Buffer.from(controllerTemplate(e.path, input)))
                              // request
                              vscode.workspace.fs.writeFile(vscode.Uri.file(request), Buffer.from(requestTemplate(input)))
                              // config
                              vscode.workspace.fs.writeFile(vscode.Uri.file(config), Buffer.from(configTemplate()))
                              // router
                              vscode.workspace.fs.writeFile(vscode.Uri.file(router), Buffer.from(routerTemplate(e.path, input)))
                              // interface
                              vscode.workspace.fs.writeFile(vscode.Uri.file(_interface), Buffer.from(""))
                              // _components
                              vscode.workspace.fs.writeFile(vscode.Uri.file(_components), Buffer.from(componentsTemplate(e.path, input)))
                              // filterTemplate
                              vscode.workspace.fs.writeFile(vscode.Uri.file(_filter), Buffer.from(filterTemplate()))

                              // 创建路由文件
                              if (e.path.indexOf("views") !== -1) {
                                    const routePath = e.path.split("views")[0] + "views"
                                    console.log("🚀 ~ inputs.split ~ routePath:", routePath)

                                    setTimeout(() => {
                                          createRouters(routePath)
                                    }, 500)
                              }

                              vscode.window.showInformationMessage("文件夹和文件已创建")
                        }
                  })
            }
      })

      let copyRouters = vscode.commands.registerCommand("extension.createRouters", async (e) => {
            console.log("🚀 ~ e ~ e:", e.path)
            createRouters(e.path)
      })

      context.subscriptions.push(disposable)
      context.subscriptions.push(copyRouters)
}

export function deactivate() {}
