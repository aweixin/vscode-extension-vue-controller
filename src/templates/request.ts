export const requestTemplate = (folderPath: string) => {
      const _name = folderPath + "Request"
      return `import ApiService from "@/core/services/ApiService";
class ${_name} {
}
export default new ${_name}()
`
}
