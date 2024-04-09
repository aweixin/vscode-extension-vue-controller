export const controllerTemplate = (folderPath: string) => {
      const _name = folderPath + "Controller"
      return `export const ${_name} = {
      index: () => {
            return "Hello World"
      },
}`
}
