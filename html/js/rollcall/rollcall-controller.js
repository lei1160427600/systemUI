/**
 * Created by xue on 2017/5/1.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class Controller extends $page.baseCotroller {
        constructor() {
            super()
        };

        /**
         *
         *
         * @returns
         * @memberof Controller
         */
        initializeErrorModel() {
            return true;
        }
        initializeData() {
            this.model = $pt.createModel($page.model, $page.validator.rollCallValidate());
            this.search();
        }

        /**
         *
         *
         * @memberof Controller
         */
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
        }
        create() {
            this.model.validate();
            if (this.model.hasError() == true) {
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            var sendModel = {
                // profession: $page.codes.Profession.getText(this.model.get("Profession")),
                // userClass:$page.codes.ClassRoom.getText(this.model.get("ClassRome")),
                profession: this.model.get("Profession"),
                userClass: this.model.get("ClassRome"),
                random: this.model.get("random"),
                userCode: $pt.getUserCode()
            }
            var done = function (data, status) {
                $page.controller.model.set("creatRollCallTable", data);
                console.log("+++++++++++++++++")
                console.log(data)
                console.log("+++++++++++++++++")
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/createRollCall", sendModel, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });

        }

        /**
         *
         *
         * @param {*} needAlert
         * @memberof Controller
         */
        saveRollCallT(needAlert) {
            var isSaved = false;
            var sendModel = this.model.get("creatRollCallTable");
            var done = function (data, status) {
                $page.controller.model.set("creatRollCallTable", data);
                isSaved = true;
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/saveCheckin", sendModel, {
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
                        messages: ['Save Successfully.']
                    });
                }
            }
        }
        reset() {
            this.model.set("condition", null);
            this.form.forceUpdate()
        }
        search() {
            var sendModel = {
                profession: this.model.get("condition_profession"),
                userClass: this.model.get("condition_userClass"),
                addDate: this.model.get("condition_addDate"),
                tCode: $pt.getUserCode()
            };
            var done = function (data, status) {
                $page.controller.model.set("historyTable", data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/queryCheckin", sendModel, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        }

    }
    $page.controller = new Controller();
}(typeof window !== 'undefined' ? window : this));