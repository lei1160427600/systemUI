/**
 * Created by xue on 2017/5/2.
 */
(function (context) {
    let $page = $pt.getService(context,'$page');
    $page.isView = true;
    class Controller extends $page.baseCotroller{
        constructor(){
            super()
        };
        initializeErrorModel() {
            return true;
        }
        initializeData() {
            this.model = $pt.createModel($page.model,$page.validator.rollCallValidate());
            this.load();
        }
        renderContent() {
            var layout = $pt.createFormLayout($page.layout.createFormLayout());
            var form = <NForm model={this.model} layout={layout} view = {false}/>;
            this.form = ReactDOM.render(form, document.getElementById('main'));
        }
        load(){
            var done = function (data,status){
                console.log("data===========")
                console.log(data)
                console.log("data===========")
                $page.controller.model.set("studentVO",data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            console.log("------------");
            console.log($pt.getUserCode());
            console.log("------------");
            let url = "/marksystems/marksystem/rest/mark/loadStudentVO/"+$pt.getUserCode();
            console.log("url=======");
            console.log(url);
            console.log("url=======");
            $pt.doGet(url, null, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        }
        save(needAlert){
            this.model.validate();
            if(this.model.hasError() === true){
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            let isSaved = false;
            let sendModel = this.model.get("studentVO");
            let done = function (data,status){
                $page.controller.model.set("studentVO",data);
                $page.controller.model.set("studentVO_deleteStudentList",[]);
                isSaved = true;
            };
            let fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            };
            $pt.doPost("/marksystems/marksystem/rest/mark/saveStudentVO", sendModel, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
            if (isSaved) {
                if (needAlert) {
                    NConfirm.getConfirmModal().show({
                        title: 'Message',
                        disableClose: true,
                        messages: ['保存成功！'],
                        onConfirm: function () {
                            $page.isView = true;
                            $page.controller.form.forceUpdate();
                        }
                    });
                }
            }
        }

    }
    $page.controller = new Controller();
}(typeof window !== 'undefined' ? window : this));