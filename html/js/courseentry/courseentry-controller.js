/**
 * Created by xue on 2017/5/2.
 */
(function (context) {
    var $page = $pt.getService(context,'$page');
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
            this.model.set("courseVO_deleteCourseList",[]);
        }
        renderContent() {
            var layout = $pt.createFormLayout($page.layout.createFormLayout());
            var form = <NForm model={this.model} layout={layout} view = {false}/>;
            this.form = ReactDOM.render(form, document.getElementById('main'));
            // this.model.setValidator($page.validator.indexValidate())
        }
        load(){
            var done = function (data,status){
                $page.controller.model.set("courseVO",data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doGet("/marksystems/marksystem/rest/mark/loadCourseVO/?tcode="+$pt.getUserCode(), null, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        }
        save(needAlert){
            this.model.validate();
            if(this.model.hasError() == true){
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            var isSaved = false;
            var sendModel = this.model.get("courseVO");
            var done = function (data,status){
                $page.controller.model.set("courseVO",data);
                $page.controller.model.set("courseVO_deleteCourseList",[]);
                isSaved = true;
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/saveCourse", sendModel, {
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
                        // onCancel: function () {
                        //     isContinued = false;
                        // },
                    });
                }
            }
            if(isSaved){
                return true;
            }else{
                return false;
            }

        }

    }
    $page.controller = new Controller();
}(typeof window !== 'undefined' ? window : this));