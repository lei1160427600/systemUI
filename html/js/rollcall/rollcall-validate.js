/**
 * Created by xue on 2017/5/1.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    class RollcallValidator {
        rollCallValidate(){
            return $pt.createModelValidator({
                Profession: {required: true},
                ClassRome:{required:true},
                semester:{required:true}
            });
        }

    }
    $page.validator = new RollcallValidator();
}(typeof window !== "undefined" ? window : this))
