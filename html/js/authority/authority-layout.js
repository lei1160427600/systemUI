(function(context){
    $page = $pt.getService(context,'$page');
    var codes = $pt.getService($page, 'codes');
    class Layout {
        createFormLayout(){
        return{
            _sections:{
                taskInfo: {
                    label: "权限管理",
                    style: 'success',
                    collapsible: true,
                    expanded: true,
                    layout:{
                        subPanel01: {
                            comp: {
                                type: $pt.ComponentConstants.Panel,
                                editLayout: {
                                    condition_profession: {
                                        label: "专业",
                                        comp: {
                                            type: $pt.ComponentConstants.Select,
                                            data:codes.Profession,
                                        },
                                        pos: {
                                            row: 1,
                                            width: 4
                                        }
                                    },
                                    condition_userClass:{
                                        label: "班级",
                                        comp: {
                                            type: $pt.ComponentConstants.Select,
                                            data:codes.ClassRoom,
                                        },
                                        pos: {
                                            row: 1,
                                            width: 4
                                        }
                                    },
                                    buttonPanel: {
                                        label: "",
                                        comp: {
                                            type: $pt.ComponentConstants.ButtonFooter,
                                            buttonLayout: {
                                                right: [
                                                    {
                                                        text: "search",
                                                        icon:"search",
                                                        style: "primary",
                                                        click: function () {
                                                            $page.controller.query();
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        pos: {
                                            row:2,
                                            width: 8
                                        }
                                    },
                                    studentVO_addStudent:{
                                        label:"添加管理员",
                                        comp:{
                                            type:$pt.ComponentConstants.Table,
                                            addable:false,
                                            sortable: false,
                                            searchable: false,
                                            downloadable:false,
                                            columns: [
                                                {
                                                    title: "管理员",
                                                    data: "authority",
                                                    inline: "check",
                                                    width:"20%",
                                                    type: {type: $pt.ComponentConstants.Check, label: false},
                                                    labelAttached: true
                                                },
                                                {
                                                    title: "学号",
                                                    width:"20%",
                                                    data: "userCode"
                                                }, {
                                                    title: "姓名",
                                                    width:"20%",
                                                    data: "userName"
                                                }, {
                                                    title: "职务",
                                                    width:"20%",
                                                    data: "duties"
                                                }
                                            ]
                                        },
                                        pos:{
                                          row:4,
                                          width:8
                                        }

                                    },
                                    buttonPanel02: {
                                        label: "",
                                        comp: {
                                            type: $pt.ComponentConstants.ButtonFooter,
                                            buttonLayout: {
                                                right: [
                                                    {
                                                        text: "保存",
                                                        style: "primary",
                                                        icon:"save",
                                                        visible:$.sessionStorage.get("Identity")=="教师",
                                                        click: function () {
                                                            $page.controller.save(true);
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        pos: {
                                            row:4,
                                            width: 8
                                        }
                                    }
                                }
                            },
                            pos: {
                                width: 12
                            }
                        },

                    }
                }
            }
        }
    }
    }
    $page.layout = new Layout();
    // export {Layout}
}(typeof window !=='undefined' ? window : this));
