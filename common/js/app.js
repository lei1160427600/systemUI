/**
 * Created by xue on 2017/3/11.
 */
(function(context){
    var $page = $pt.getService(context,'$page');
    var $ri = $pt.getService(context,'$ri');
    var envSetting = $pt.getService(context, 'envSetting');

    (function () {
        Decimal.config({
            precision: 25,
            toExpNeg: -10,
            toExpPos: 25
        });
        $pt.LayoutHelper.setDefaultCellWidth(4);
        NForm.LABEL_DIRECTION = 'horizontal';
        //defined url ;
        $pt.defineURL('index', '/index.html');
        $pt.defineURL('brand.image', '../images/h_banner_school.gif');
        $pt.defineMessage("common.brand", "Copyright(C)2017　河南农业大学　All Rights Reserved.　地址：中国·河南·郑州农业路63号(450002)");
        $page.baseNumber = function () {
            return {
                comp: {
                    type: $pt.ComponentConstants.Text,
                    transformer: {
                        model: function (value) {
                            var reg = /^0$|^[1-9][0-9]$/;
                            var newValue = isNaN(value) || (value + '').isBlank() ? "" : value;
                            if (newValue && !reg.test(newValue)) {
                                newValue = parseInt(newValue);
                            }
                            return newValue;
                        }
                    },
                    format: function (value) {
                        var reg = /^0$|^[1-9][0-9]$/;
                        var newValue = isNaN(value) || (value + '').isBlank() ? "" : value;
                        if (newValue && !reg.test(newValue)) {
                            newValue = parseInt(newValue) + "";
                        }
                        return newValue;
                    }
                },
                css: { comp: 'currency-align-right-text' }
            };
        };
        $pt.getUser =function(){
            return $.sessionStorage.get("user");
        },
        $pt.getUserCode =function(){
            return $.sessionStorage.get("userCode");
        }
        $pt.getUserIdentify =function(){
            return $.sessionStorage.get("Identity");
        }
    })();
    class BaseCotroller{
        exitConfirm(readOnly, done) {
            var _this = this;
            if (_this.model && !readOnly && _this.model.isChanged()) {
                var isContinued = false;
                NConfirm.getConfirmModal().show({
                    title: 'System Message',
                    messages: ['Any unsaved changes will be lost if you leave this page.','Are you sure you want to leave this page?'],
                    onConfirm: function () {
                        if(_this.model){
                            _this.model.applyCurrentToBase();
                        }
                        isContinued = true;
                    },
                    onCancel: function () {
                        isContinued = false;
                    },
                    afterClose: function () {
                        if (isContinued) {
                            done();
                        }
                    }
                });
            } else {
                done();
            }
        };

        initializeLogin(){
            var _self = this;
            var token = $.sessionStorage.get("token");
            if(token && token != "undefined"){
                $.when(_self.initializeData())
                    .done(function(){
                        _self.renderUI();
                        if(_self.model){
                            _self.model.applyCurrentToBase();
                        }
                    });
            }else{
               _self.login();
            }

        };

        login(){
            // if($.sessionStorage.get("Identity")=="教师"){
            //     window.location.href = '/html/courseEntry.html'
            // }else{
            //     window.location.href = '/html/studentinfo.html'
            // }
            window.location.href = '/html/login.html'
        }
        initialize() {
            console.log("initialize")
            this.initializeLogin();

        };
        initializeData(){

        };
        renderUI(){
            $.when(this.renderHeader()).done(
                $.when(this.renderContent()).done(
                    this.renderFooter()
                )
            )

        };
        renderContent() {
            // do nothing, interface only
        };

        getMenus(){

            var menus = [
                {
                    text: '录入',
                    children: [
                        {text: '录入课程',
                          url:$pt.getUserIdentify()!="学生"?'/html/courseEntry.html':"#"
                        },
                        {text: $pt.getUserIdentify()=="学生"?'个人信息':'学生导入',
                        url:'/html/studentinfo.html'
        }
                    ]
                },
                {
                    text: '签到',
                    children: [
                        {text: '点名',
                         url:$pt.getUserIdentify()=="教师"?'/html/rollcall.html':"#"
                        }
                    ]
                },
                {
                    text: '作业',
                    children: [
                        {text: $.sessionStorage.get("Identity")=="教师"?'上传作业':'下载作业',
                            url:'/html/task.html'
                        }
                    ]
                },
                {
                    text: '友情链接',
                    children: [
                        {text: '农大官网',
                         url:"http://www.henau.edu.cn/"},
                        {text: '教务管理',
                        url:"http://jwgl.henau.edu.cn/jwweb/"},
                    ]
                }
            ];
            if($.sessionStorage.get("Identity")=="教师"){
                menus.push({text: '平时成绩',
                    children: [
                        {text: '平时成绩计算',
                            url:"/html/grade.html"}
                    ]});
                menus.push({
                    text: '权限管理',
                    children: [
                        {text: '添加管理员',
                            url:"/html/authority.html"}
                    ]
                })
            }
            return menus;
        };

        renderHeader(menus) {
            var custom = function () {
                var model = $pt.createModel({});
                var layout = $pt.createFormLayout({

                    "_sections": {
                        buttonSection: {
                            layout: {
                                searchButton: {
                                    comp: {
                                        type: $pt.ComponentConstants.ButtonFooter,
                                        buttonLayout: {
                                            right: [{
                                                icon: "sign-out",
                                                style: "link",
                                                text: "Logout",
                                                click: function () {
                                                    NConfirm.getConfirmModal().show({
                                                        title: 'System Message',
                                                        messages: ['Are you sure to log out?'],
                                                        onConfirm: function () {
                                                            $page.logout();
                                                        },
                                                        onCancel: function () {}

                                                    });
                                                }
                                            }, {
                                                icon: "user",
                                                style: "link",
                                                text:$.sessionStorage.get("user"),
                                                // text: $.sessionStorage.get(constants.USER_COOKIE_NAME),
                                                click: function () {
                                                    //window.open($pt.getURL("ui.queryView.search"));
                                                }
                                            }]
                                        }
                                    },
                                    pos: { width: 12 },
                                    css: { cell: 'for-page-header' }
                                }
                            },
                            width: 6
                        }
                    }
                });
                return React.createElement(NForm, { model: model, layout: layout, className: 'for-page-header-comp' });
            };

            ReactDOM.render(<NPageHeader brand={<image src={$pt.getURL("brand.image")} className="pageHeaderImg"/>}
                                         brandFunc={this.gotoIndex.bind(this)}
                                         menus={this.getMenus()}
                                         custom={custom}
                                         side={true}/>,
                document.getElementById("page-header"));
        };
        renderFooter() {
            // render page footer
            ReactDOM.render(<NPageFooter
                name={$pt.getMessage('common.brand')}/>, document.getElementById("page-footer"));
        };
        gotoIndex() {
            if (this.isIndexPage === true) {
                return;
            }
            // $pt.relocatePage($pt.getURL('index'));
            if($.sessionStorage.get("Identity")=="教师"){
                window.location.href = '/html/courseEntry.html';
            }else{
                window.location.href = '/html/studentinfo.html'
            }
        };
        

    }
    $page.logout=function(){
        $.sessionStorage.removeAll();
        window.location.href = '/html/login.html'
    };
    $page.baseCotroller = BaseCotroller;
}(typeof window !== "undefined" ? window : this))