export const configTemplate = () => {
      return `export default {
            tableHeader :[
            {
                  columnName: "ID",
                  columnLabel: "id",
                  columnWidth: "30",
            },
            {
                  columnName: "名称",
                  columnLabel: "name",
            },
            {
                  columnName: "创建时间",
                  columnLabel: "createdAt",
            },
            {
                  columnName: "操作",
                  columnLabel: "action",
            },
            ]

      }`
}
