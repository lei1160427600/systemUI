(function (context) {
    var $page = $pt.getService(context, '$page');
    class Controller extends $page.baseCotroller {
        constructor() {
            super()
        };
        initializeErrorModel() {
            return true;
        };
        initializeData() {
            this.model = $pt.createModel($page.model, $page.validator.courseValidator());
            // this.load()
        };
        renderContent() {
            var layout = $pt.createFormLayout($page.layout.createFormLayout());
            var form = < NForm model = {
                this.model
            }
            layout = {
                layout
            }
            view = {
                false
            }
            />;
            this.form = ReactDOM.render(form, document.getElementById('main'));
            // this.model.setValidator($page.validator.indexValidate())
        };
        load() {
            var done = function (data, status) {

                // data.addTime = modment(data.addTime).formate(YYYY-MM-DD);
                $page.controller.model.set("tableModule", data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            console.log($pt.getUserCode())
            $pt.doGet("/marksystems/marksystem/rest/mark/loadTask/?tcode=" + $pt.getUserCode(), null, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        };
        query() {
            this.model.validate();
            if (this.model.hasError() == true) {
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            let sendModel = {
                profession: this.model.get("condition_profession"),
                userClass: this.model.get("condition_userClass"),
            }
            let done = function (data, status) {
                $page.controller.model.set("studentVO_addStudent", data);
                $page.controller.form.forceUpdate();
            }
            let fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/queryAuthority", sendModel, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        };
        save(needAlert) {
            this.model.validate();
            if (this.model.hasError() == true) {
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            if (this.model.hasError() == true) {
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            var isSaved = false;
            var sendModel = this.model.get("studentVO");
            console.log(this.model.get("studentVO"))
            var done = function (data, status) {
                $page.controller.model.set("studentVO", data);

                isSaved = true;
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/saveAuthority", sendModel, {
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