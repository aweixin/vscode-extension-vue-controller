export const requestTemplate = (folderPath: string) => {
      const _name = folderPath + "Request"
      return `export const ${_name} = {
      index: () => {
            console.log("index get request")
      },
}`
}
