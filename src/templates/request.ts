export const requestTemplate = (folderPath: string) => {
      const _name = folderPath + "Request"
      return `class ${_name} {
      constructor() {}
      index() {
            console.log("hello world!")
      }
}
export default new ${_name}()
`
}
