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
            this.model = $pt.createModel($page.model,$page.validator.indexValidate());
        };
        renderContent() {
            var layout = $pt.createFormLayout($page.layout.createFormLayout());
            var form = <NForm model={this.model} layout={layout} view = {false}/>;
            this.form = ReactDOM.render(form, document.getElementById('main'));
            // this.model.setValidator($page.validator.indexValidate())
        };

    };
    $page.controller = new Controller();
}(typeof window !== 'undefined' ? window : this));