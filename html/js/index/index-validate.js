/**
 * Created by xue on 2017/3/31.
 */
(function (context) {
    var $page = $pt.getService(context, '$page');
    var ContractHomeValidator = jsface.Class({
        validatePercentage: function () {
            return {
                required: false,
                rule: function (model, value, settings) {
                    if (value == null) {
                        return true;
                    } else {
                        if (isNaN(value)) {
                            return 'Percentage  must be a numeric value.';
                        } else {
                            if (parseFloat(value) > parseFloat(9.9999)) {
                                return 'Percentage  can\'t be large than 999.99%.';
                            }
                        }
                        return true;
                    }
                }
            }
        }
    });
    class IndexValidator {
        validatePercentage(){
            return {
                required: false,
                rule: function (model, value, settings) {
                    if (value == null) {
                        return true;
                    } else {
                        if (isNaN(value)) {
                            return 'Percentage  must be a numeric value.';
                        } else {
                            if (parseFloat(value) > parseFloat(9.9999)) {
                                return 'Percentage  can\'t be large than 999.99%.';
                            }
                        }
                        return true;
                    }
                }
            }
        };
        indexValidate(){
            return $pt.createModelValidator({
                name: {required: true},
                PercentageOfPremium: this.validatePercentage(),
                ContractClaimConditionItemList: {
                    table: {
                        Percentage: this.validatePercentage(),
                        // Amount : $helper.validateAmount(false, 9999999999999999.99, 0)
                    }
                }
            });
        }

    }
    $page.validator = new IndexValidator();
}(typeof window !== "undefined" ? window : this));
