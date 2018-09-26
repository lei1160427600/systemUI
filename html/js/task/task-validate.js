/**
 * Created by xue on 2017/3/31.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class CourseValidator {
        courseValidator(){
            return $pt.createModelValidator({
                teacher1:{required: $.sessionStorage.get("Identity")!="教师"},
                course:{required: $.sessionStorage.get("Identity")!="教师"},
                tableModule:{
                    table:{
                        course:{required: true}
                    }
                }
            });
        }

    }
    $page.validator = new CourseValidator();
}(typeof window !== "undefined" ? window : this));
