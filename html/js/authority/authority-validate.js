/**
 * Created by xue on 2017/3/31.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class CourseValidator {
        courseValidator(){
            return $pt.createModelValidator({
                condition_profession:{required: true},
                condition_userClass:{required: true},
                // tableModule:{
                //     table:{
                //         course:{required: true}
                //     }
                // }
            });
        }

    }
    $page.validator = new CourseValidator();
}(typeof window !== "undefined" ? window : this));
