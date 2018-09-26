/**
 * Created by xue on 2017/5/1.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class RollcallValidator {
        rollCallValidate(){
            return $pt.createModelValidator({
                condition_profession:{required: true},
                condition_userClass:{required: true},
                Profession: {required: true},
                ClassRome:{required:true},
                semester:{required:true}
            });
        }

    }
    $page.validator = new RollcallValidator();
}(typeof window !== "undefined" ? window : this))
