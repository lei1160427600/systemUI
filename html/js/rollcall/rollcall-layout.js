/**
 * Created by xue on 2017/5/1.
 */
(function(context){
    $page = $pt.getService(context,'$page');
    var codes = $pt.getService($page, 'codes');
    class Layout {
        createFormLayout() {
            return {
                _sections: {
                    createRollCallInfo: {
                        label: "签到",
                        style: 'success',
                        collapsible: true,
                        expanded: true,
                        layout: {
                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        rollCallDate: {
                                            label: "日期",
                                            comp: {
                                                type: $pt.ComponentConstants.Date,
                                                format:"YYYY-MM-DD",
                                                enabled:false
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        Profession: {
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
                                        ClassRome:{
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
                                        course:{
                                            label: "课程",
                                            comp: {
                                                type: $pt.ComponentConstants.Select,
                                                data:codes.Course,
                                            },
                                            pos: {
                                                row: 2,
                                                width: 4
                                            }
                                        },
                                        random:{
                                            label: "随机点名",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                rightAddon: {
                                                    text: '人'
                                                }
                                            },
                                            base:$page.baseNumber(),
                                            pos: {
                                                row: 2,
                                                width: 4
                                            }
                                        },
                                    }
                                },
                                pos: {
                                    row: 1,
                                    width: 12
                                }
                            },
                            buttonPanel01: {
                                label: "",
                                comp: {
                                    type: $pt.ComponentConstants.ButtonFooter,
                                    buttonLayout: {
                                        right: [
                                            {
                                                text: "create",
                                                style: "primary",
                                                click: function () {
                                                    $page.controller.create(true);
                                                }
                                            }
                                        ]
                                    }
                                },
                                pos: {
                                    row: 2,
                                    width: 12
                                }
                            },
                            creatRollCallTable: {
                                label: "签到",
                                comp: {
                                    type: $pt.ComponentConstants.Table,
                                    sortable: false,
                                    removable:false,
                                    searchable: false,
                                    downloadable: true,
                                    columns: [
                                        {
                                            title: "学号",
                                            width:200,
                                            data: "userCode"
                                        }, {
                                            title: "姓名",
                                            width:200,
                                            data: "userName"
                                        }, {
                                            title: "职务",
                                            width:200,
                                            data: "duties"
                                        },
                                        {
                                            title: "签到",
                                            data: "isCheck",
                                            inline: "check",
                                            width: 200,
                                            type: {type: $pt.ComponentConstants.Check, label: false},
                                            labelAttached: true
                                        },
                                        {
                                            title:"备注",
                                            width:200,
                                            data:"remark",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false},
                                                    enabled: {
                                                        when: function (row) {
                                                            return !row.get("isCheck");
                                                        },
                                                        depends: 'isCheck'
                                                    }
                                                }
                                            }
                                        },{
                                            title:"未到原因",
                                            data:"reason",
                                            codes:codes.Reason,
                                            // inline:"select",
                                            inline:{
                                                inlineType: 'cell',
                                                comp: {
                                                    type: { type: $pt.ComponentConstants.Select, label: false},
                                                    data:codes.Reason,
                                                    enabled: {
                                                        when: function (row) {
                                                            return !row.get("isCheck");
                                                        },
                                                        depends: 'isCheck'
                                                    }
                                                },

                                            },
                                            width:200,
                                        },{
                                            title:"成绩",
                                            data:"grade",
                                            width:200,
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }
                                    ]
                                },
                                css: {
                                    comp: "inline-editor",
                                    cell: "title-align"
                                },
                                pos:{
                                    row:3,
                                    width:12
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
                                                icon: "save",
                                                style: "primary",
                                                click: function (model) {
                                                   var  _this=$page.controller;
                                                    _this.model.validate();
                                                    if(_this.model.hasError() == true){
                                                        NConfirm.getConfirmModal().show({
                                                            title: 'System Message',
                                                            disableClose: true,
                                                            messages: ['请填写所有必填字段并更正错误的条目!']
                                                        });
                                                        return false;
                                                    }
                                                    if(!_this.model.get("creatRollCallTable")){
                                                        return false;
                                                    }
                                                    $page.controller.saveRollCallT(true);
                                                }
                                            }
                                        ]
                                    }
                                },
                                pos: {
                                    row:4,
                                    width: 12
                                }
                            },
                        }
                    },
                    historyRollCallInfo:{
                        label: "签到查询",
                        style: 'success',
                        collapsible: true,
                        expanded: true,
                        layout: {
                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        condition_addDate: {
                                            label: "日期",
                                            comp: {
                                                type: $pt.ComponentConstants.Date,
                                                format:"YYYY-MM-DD"
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
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
                                        condition_userCode:{
                                            label: "",
                                            comp: {
                                                type: $pt.ComponentConstants.Select,
                                                data:codes.ClassRoom,
                                                view:true
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        }
                                    }
                                },
                                pos: {
                                    width: 12
                                }
                            },
                            buttonPanel03: {
                                label: "",
                                comp: {
                                    type: $pt.ComponentConstants.ButtonFooter,
                                    buttonLayout: {
                                        right: [
                                            {
                                                text: "reset",
                                                style: "warning",
                                                click: function () {
                                                    $page.controller.reset(true);
                                                }
                                            }, {
                                                text: "search",
                                                style: "primary",
                                                click: function () {
                                                    $page.controller.search(true);
                                                }
                                            }
                                        ]
                                    }
                                },
                                pos: {
                                    width: 12
                                }
                            },
                            historyTable: {
                                label: "签到历史",
                                comp: {
                                    type: $pt.ComponentConstants.Table,
                                    sortable: false,
                                    pageable:true,
                                    countPerPage:10,
                                    searchable: false,
                                    downloadable: true,
                                    view:true,
                                    columns: [
                                        {
                                            title: "学号",
                                            width:200,
                                            data: "userCode"
                                        }, {
                                            title: "姓名",
                                            width:200,
                                            data: "userName"
                                        }, {
                                            title: "职务",
                                            width:200,
                                            data: "duties"
                                        },
                                        {
                                            title: "签到",
                                            data: "isCheck",
                                            inline: "check",
                                            width: 200,
                                            type: {type: $pt.ComponentConstants.Check, label: false},
                                            labelAttached: true
                                        },
                                        // {
                                        //     title: "签到",
                                        //     data:"checkIn",
                                        //     codes: codes.Radio,
                                        //     width:200,
                                        //     inline: "radio",
                                        //     headerAlign: "left",
                                        // },
                                        {
                                            title:"备注",
                                            width:200,
                                            data:"remark",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false},
                                                    enabled: {
                                                        when: function (row) {
                                                            return !row.get("isCheck");
                                                        },
                                                        depends: 'isCheck'
                                                    }
                                                }
                                            }
                                        },{
                                            title:"未到原因",
                                            data:"reason",
                                            codes:codes.Reason,
                                            // inline:"select",
                                            inline:{
                                                inlineType: 'cell',
                                                comp: {
                                                    type: { type: $pt.ComponentConstants.Select, label: false},
                                                    data:codes.Reason,
                                                    enabled: {
                                                        when: function (row) {
                                                            return !row.get("isCheck");
                                                        },
                                                        depends: 'isCheck'
                                                    }
                                                },

                                            },
                                            width:200,
                                        },{
                                            title:"成绩",
                                            data:"grade",
                                            width:200,
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }
                                    ]
                                },
                                pos:{
                                    width:12
                                }

                            }
                        }
                    }
                }
            }
        }
    }
    $page.layout = new Layout();
}(typeof window !== "undefined" ? window : this ));