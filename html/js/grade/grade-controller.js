/**
 * Created by xue on 2017/5/1.
 */
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
            this.model = $pt.createModel($page.model,$page.validator.rollCallValidate());
                this.searchHist();
        };
        renderContent() {
            var layout = $pt.createFormLayout($page.layout.createFormLayout());
            var form = <NForm model={this.model} layout={layout} view = {false}/>;
            this.form = ReactDOM.render(form, document.getElementById('main'));
            this.model.addPostChangeListener("grade", function (evt) {
                var grade = evt.model.get('grade');
                var grade1 = evt.model.get('grade1');
                var grade2= evt.model.get('grade2');
                var grade3 = evt.model.get('grade3');
                var countAll = evt.model.get('countAll');
               if(grade&&grade1&&grade2&&grade3&&countAll){
                   var list = evt.model.get('gradeTable');
                   if(list && list.length>0){
                       list.forEach(function(item){
                           item.grade = countAll*grade -(item.absenteeism)*grade1 -(item.urgent)*grade2-grade3*(item.leaveCount);
                       })

                   }
                   $page.controller.form.forceUpdate();
               }
            });
            this.model.addPostChangeListener("grade1", function (evt) {
                var grade = evt.model.get('grade');
                var grade1 = evt.model.get('grade1');
                var grade2= evt.model.get('grade2');
                var grade3 = evt.model.get('grade3');
                var countAll = evt.model.get('countAll');
                if(grade&&grade1&&grade2&&grade3&&countAll){
                    var list = evt.model.get('gradeTable');
                    if(list && list.length>0){
                        list.forEach(function(item){
                            item.grade = countAll*grade -(item.absenteeism)*grade1 -(item.urgent)*grade2-grade3*(item.leaveCount);
                        })

                    }
                    $page.controller.form.forceUpdate();
                }
            });
            this.model.addPostChangeListener("grade2", function (evt) {
                var grade = evt.model.get('grade');
                var grade1 = evt.model.get('grade1');
                var grade2= evt.model.get('grade2');
                var grade3 = evt.model.get('grade3');
                var countAll = evt.model.get('countAll');
                if(grade&&grade1&&grade2&&grade3&&countAll){
                    var list = evt.model.get('gradeTable');
                    if(list && list.length>0){
                        list.forEach(function(item){
                            item.grade = countAll*grade -(item.absenteeism)*grade1 -(item.urgent)*grade2-grade3*(item.leaveCount);
                        })

                    }
                    $page.controller.form.forceUpdate();
                }
            });
            this.model.addPostChangeListener("grade3", function (evt) {
                var grade = evt.model.get('grade');
                var grade1 = evt.model.get('grade1');
                var grade2= evt.model.get('grade2');
                var grade3 = evt.model.get('grade3');
                var countAll = evt.model.get('countAll');
                if(grade&&grade1&&grade2&&grade3&&countAll){
                    var list = evt.model.get('gradeTable');
                    if(list && list.length>0){
                        list.forEach(function(item){
                            item.grade = countAll*grade -(item.absenteeism)*grade1 -(item.urgent)*grade2-grade3*(item.leaveCount);
                        })

                    }
                    $page.controller.form.forceUpdate();
                }
            })
        };
        save(needAlert){
            var isSaved = false;
            var sendModel = this.model.get("gradeTable");
            var done = function (data,status){
                $page.controller.model.set("gradeTable",data);
                isSaved=true;
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/saveGrade", sendModel, {
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
        };
        reset(){
            this.model.set("condition",null);
            this.form.forceUpdate()
        }
        resetH(){
            this.model.set("profession",null);
            this.model.set("userClass",null);
            this.model.set("userCode",null);
            this.form.forceUpdate()
        }
        search(){
            this.model.validate();
            if(this.model.hasError() == true){
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    disableClose: true,
                    messages: ['请填写所有必填字段并更正错误的条目!']
                });
                return false;
            }
            var sendModel = {
                profession: this.model.get("condition_profession"),
                userClass:this.model.get("condition_userClass"),
                tCode:$pt.getUserCode()
            };
            var done = function (data,status){
                $page.controller.model.set("countAll",data&&data.length>0 ? data[0].count : 0);
                $page.controller.model.set("gradeTable",data);
                $page.controller.form.forceUpdate();
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/queryGrade", sendModel, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        }
        searchHist(){

            var sendModel = null;
            if($.sessionStorage.get("Identity")=="教师"){
                sendModel = {
                    profession: this.model.get("profession"),
                    userClass:this.model.get("userClass"),
                    tCode:$pt.getUserCode()
                };
            }else{
                sendModel= {
                    profession: this.model.get("profession"),
                    userClass:this.model.get("userClass"),
                    userCode:$pt.getUserCode(),
                    tCode:this.model.get("hteacher")
                }
            }
            var done = function (data,status){
                $page.controller.model.set("historyTable",data);
            }
            var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
            $pt.doPost("/marksystems/marksystem/rest/mark/queryHistoryGrade", sendModel, {
                quiet: false,
                async: false,
                done: done,
                fail: fail
            });
        }

    }
    $page.controller = new Controller();
}(typeof window !== 'undefined' ? window : this));