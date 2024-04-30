export const controllerTemplate = (path: string, folderPath: string) => {
      const _name = folderPath + "Controller"
      const routerPath = path.split("/")
      // routerPath 查找views 后面所有
      const viewsName = "@/" + routerPath.slice(routerPath.indexOf("views")).join("/")

      return `import type { FormType } from "@/components/custom/form";
import alertModal from "@/core/plugins/alertModal";
import * as yup from "yup";
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
     async create(){
            this.updateKey.value = '';
            await this.setForm();
            this.show.value = true;
      }
      // 删除
      async delete(){
            const r = await alertModal.confirm("确定要删除？");
            if(!r.value){
                  return false;
            }

            // 请求删除接口

            // if(rs.code == 0){
            //       alertModal.dialogcustom("删除成功", "success");
            //       this.query(this.list.value?.current);
            // }
      }
      // 更新
      async update(id:number){
            this.updateKey.value = id+'';
            await this.setForm();


            // 请求详情接口 并赋值给form
            this.form.value?.fields.map((item) => {
                  // item.value = rs.data[item.name];
            });
            
            this.form.value?.fields.push({
                  type: "input",
                  value: id,
                  label: "id",
                  name: "id",
                  props: {
                  rowStyle: {
                  display: "none",
                  },
                  },
            });

            this.show.value = true;
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
export default new ${_name}();
`
}
