(function (context) {
    var $page = $pt.getService(context,'$page');
    class Controller extends $page.baseCotroller{
        constructor(){
            super()
        };
        initializeErrorModel() {
            return true;
        };
        initializeData() {
            this.model = $pt.createModel($page.model,$page.validator.courseValidator());
            this.load()
        };
        renderContent() {
            var layout = $pt.createFormLayout($page.layout.createFormLayout());
            var form = <NForm model={this.model} layout={layout} view = {false}/>;
            this.form = ReactDOM.render(form, document.getElementById('main'));
            // this.model.setValidator($page.validator.indexValidate())
        };
        load(){
            var done = function (data,status){

                // data.addTime = modment(data.addTime).formate(YYYY-MM-DD);
                $page.controller.model.set("tableModule",data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            console.log($pt.getUserCode())
            $pt.doGet("/marksystems/marksystem/rest/mark/loadTask/?tcode="+$pt.getUserCode(), null, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        }
        query(){
            this.model.validate();
            if(this.model.hasError() == true){
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            var done = function (data,status){
                $page.controller.model.set("tableModule",data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            console.log($page.controller.model.get("teacher1"));
            $pt.doGet("/marksystems/marksystem/rest/mark/queryByTcodeAndCourse/?tcode="+$page.controller.model.get("teacher1")+"&course="+$page.controller.model.get("course"), null, {
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
            if(this.model.hasError() == true){
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            var isSaved = false;
            var sendModel = this.model.get("tableModule");
            if(sendModel&&sendModel.length>0){
                for(var i = 0 ;i<sendModel.length;i++){
                    sendModel[i].tCode=$pt.getUserCode();
                }
            }
            var done = function (data,status){
                $page.controller.model.set("tableModule",data);
                isSaved = true;
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/saveTask", sendModel, {
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
                            $page.controller.form.forceUpdate();
                        }
                    });
                }
            }
        }
    }
    $page.controller = new Controller();
}(typeof window !== 'undefined' ? window : this));