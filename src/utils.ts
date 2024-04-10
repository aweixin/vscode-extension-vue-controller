import * as vscode from "vscode"
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
