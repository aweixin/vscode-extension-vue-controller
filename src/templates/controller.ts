export const controllerTemplate = (path: string, folderPath: string) => {
      const _name = folderPath + "Controller";
      const routerPath = path.split("/");
      // routerPath 查找views 后面所有
      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/");

      return `import * as yup from "yup";
import ${folderPath}Request from "${viewsName}/${folderPath}/request/index"
class ${_name} {

      list = ref();

      // 创建or更新
      show = ref(false);
      form = ref<FormType>();
      updateKey = ref('');

      // 筛选
      filterForm = ref();
      filterShow = ref(false);


      // 增加
      create(){
            this.updateKey.value = '';

      }
      // 删除
      async delete(){
            const r = await alertModel.confirm("确定要删除？");
            if(!r.value){
                  return false;
            }

            // 请求删除接口


      }
      // 更新
      update(){

      }
      // 查询
      async query(page?:number){

      }
      // 搜索
      filter(){

      }


      constructor() {
            console.log('hello world!');
      }



      // 设置form 增加 or 更新 表单数据
      setForm(){
            this.form.value = {
                  // 字段列表
                  fields:[],
                  // 提交操作
                  onSubmit:async(values)=>{
                        console.log(values)
                  }

            }
      }


}
export default function(){
      return new ${_name}();
}`;

};
