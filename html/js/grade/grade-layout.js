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
                    gradeInfo:{
                        label: "平时成绩计算",
                        style: 'success',
                        collapsible: true,
                        expanded: true,
                        layout: {
                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        // condition_addDate: {
                                        //     label: "日期",
                                        //     comp: {
                                        //         type: $pt.ComponentConstants.Date,
                                        //         format:"YYYY-MM-DD"
                                        //     },
                                        //     pos: {
                                        //         row: 1,
                                        //         width: 4
                                        //     }
                                        // },
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
                                        teacher:{
                                            label: "教师",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled:false,
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
                                                style: "danger",
                                                click: function () {
                                                    $page.controller.reset(true);
                                                }
                                            }, {
                                                text: "search",
                                                style: "primary",
                                                click: function () {
                                                    $page.controller.search();
                                                }
                                            }
                                        ]
                                    }
                                },
                                pos: {
                                    width: 12
                                }
                            },
                            panel02: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        // condition_addDate: {
                                        //     label: "日期",
                                        //     comp: {
                                        //         type: $pt.ComponentConstants.Date,
                                        //         format:"YYYY-MM-DD"
                                        //     },
                                        //     pos: {
                                        //         row: 1,
                                        //         width: 4
                                        //     }
                                        // },
                                        grade: {
                                            label: "签到一次总分",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                rightAddon: {
                                                    text: '分'
                                                }
                                            },
                                            base:$page.baseNumber(),
                                            pos: {
                                                row: 1,
                                                width: 3
                                            }
                                        },
                                        grade1:{
                                            label: "旷课扣分",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                rightAddon: {
                                                    text: '分'
                                                }
                                            },
                                            base:$page.baseNumber(),
                                            pos: {
                                                row: 1,
                                                width: 3
                                            }
                                        },
                                        grade2:{
                                            label: "急事扣分",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                rightAddon: {
                                                    text: '分'
                                                }
                                            },
                                            base:$page.baseNumber(),
                                            pos: {
                                                row: 1,
                                                width: 3
                                            }
                                        },
                                        grade3:{
                                            label: "请假扣分",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                rightAddon: {
                                                    text: '分'
                                                }
                                            },
                                            base:$page.baseNumber(),
                                            pos: {
                                                row: 1,
                                                width: 3
                                            }
                                        },
                                        countAll:{
                                            label: "签到次数",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled:false,
                                                rightAddon: {
                                                    text: '次'
                                                }
                                            },
                                            pos: {
                                                row: 2,
                                                width: 3
                                            }
                                        }
                                    }
                                },
                                pos: {
                                    width: 12
                                }
                            },
                            gradeTable: {
                                label: "签到情况",
                                comp: {
                                    type: $pt.ComponentConstants.Table,
                                    sortable: false,
                                    searchable: false,
                                    downloadable:true,
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
                                            title: "未到次数",
                                            width:200,
                                            data: "absenteeismCount"
                                        },
                                        {
                                            title: "旷课",
                                            data: "absenteeism",
                                            width: 200,
                                        },
                                        {
                                            title:"急事",
                                            width:200,
                                            data:"urgent"
                                        },{
                                            title:"请假",
                                            data:"leaveCount",
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

                            },
                            buttonPanel04: {
                                label: "",
                                comp: {
                                    type: $pt.ComponentConstants.ButtonFooter,
                                    buttonLayout: {
                                        right: [
                                            {
                                                text: "保存",
                                                icon: "save",
                                                style: "warning",
                                                click: function () {
                                                    $page.controller.save(true);
                                                }
                                            }
                                        ]
                                    }
                                },
                                pos: {
                                    width: 12
                                }
                            },
                        }
                    },
                    historyInfo:{
                        label: "平时成绩查询",
                        style: 'success',
                        collapsible: true,
                        expanded: true,
                        layout: {
                            profession: {
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
                            userClass:{
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
                            hteacher:{
                                label: "教师",
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
                                                text: "reset",
                                                style: "danger",
                                                click: function () {
                                                    $page.controller.resetH(true);
                                                }
                                            }, {
                                                text: "search",
                                                style: "primary",
                                                click: function () {
                                                    $page.controller.searchHist();
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
                                label: "签到情况",
                                comp: {
                                    type: $pt.ComponentConstants.Table,
                                    sortable: false,
                                    searchable: false,
                                    downloadable:true,
                                    view:true,
                                    pageable:true,
                                    countPerPage:10,
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
                                            title: "未到次数",
                                            width:200,
                                            data: "absenteeismCount"
                                        },
                                        {
                                            title: "旷课",
                                            data: "absenteeism",
                                            width: 200,
                                        },
                                        {
                                            title:"急事",
                                            width:200,
                                            data:"urgent"
                                        },{
                                            title:"请假",
                                            data:"leaveCount",
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

                            },
                        }
                    },
                }
            }
        }
    }
    $page.layout = new Layout();
}(typeof window !== "undefined" ? window : this ));