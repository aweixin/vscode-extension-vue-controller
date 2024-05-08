export const controllerTemplate = (path: string, folderPath: string) => {
      const _name = folderPath + "Controller"
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      return `
import alertModal from "@/core/plugins/alertModal";
import * as yup from "yup";
import ${folderPath}Request from "${viewsName}/${folderPath}/request/index"
class ${_name} {
      constructor() {
            console.log('hello world!');
      }

      list = ref();
      
      // 增加
     async create(){
      }
      // 删除
      async delete(){
            const r = await alertModal.confirm("确定要删除？");
            if(!r.value){
                  return false;
            }

            // if(rs.code == 0){
            //       alertModal.dialogcustom("删除成功", "success");
            //       this.query(this.list.value?.current);
            // }
      }
      // 更新
      async update(id:number){
      }
      // 查询
      async query(page?:number){
      }
      // 筛选
      filter(){

      }
}
export default new ${_name}();
`
}
