export const controllerTemplate = (folderPath: string) => {
      const _name = folderPath + "Controller"
      return `class ${_name} {
      constructor() {
            console.log('hello world!');
      }
}
export default new ${_name}()`
}
