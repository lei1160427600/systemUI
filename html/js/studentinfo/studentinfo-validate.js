/**
 * Created by xue on 2017/5/2.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class RollcallValidator {
        rollCallValidate(){
            return $pt.createModelValidator({
                studentVO_studentInfo_profession: {required: $.sessionStorage.get("Identity")!="教师"},
                studentVO_studentInfo_userName:{required: $.sessionStorage.get("Identity")!="教师"},
                studentVO_studentInfo_userCode:{required: $.sessionStorage.get("Identity")!="教师"},
                studentVO_studentInfo_userClass:{required: $.sessionStorage.get("Identity")!="教师"},
                studentVO_studentInfo_semester:{required: $.sessionStorage.get("Identity")!="教师"},
                studentVO_addStudent:{
                    table:{
                        userCode:{required: true},
                        userName:{required: true},
                        userClass:{required: true},
                        profession:{required: true},
                        telephoneNo:{required: true}
                    }
                }
            });
        }

    }
    $page.validator = new RollcallValidator();
}(typeof window !== "undefined" ? window : this))