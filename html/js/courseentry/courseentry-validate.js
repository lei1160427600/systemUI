/**
 * Created by xue on 2017/5/2.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class RollcallValidator {
        telephoneCheck(){
            return{
                required: false,
                rule: function(model, value){
                       console.log("value")
                       console.log(value)
                       var re = /^1[34578]\d{9}$/;
                       if (!re.test(value)) {
                           return '手机号码格式不正确！';
                       }
                   }

        }
        }
        emailCheck(){
            return{
                required: false,
                rule: function(model, value){
                    console.log("value")
                    console.log(value)
                    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    if (!re.test(value)) {
                        return '邮箱格式不正确！';
                    }
                }

            }
        }
        rollCallValidate(){
            return $pt.createModelValidator({
                courseVO_teacherInfo_tName:{required:true},
                courseVO_teacherInfo_tCode:{required:true},
                courseVO_teacherInfo_duties:{required:true},
                courseVO_teacherInfo_semester:{required:true},
                courseVO_teacherInfo_tEmail:this.emailCheck(),
                courseVO_teacherInfo_telephoneNo:this.telephoneCheck()
            });
        }

    }
    $page.validator = new RollcallValidator();
}(typeof window !== "undefined" ? window : this))