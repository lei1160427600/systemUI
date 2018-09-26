/**
 * Created by xue on 2017/5/2.
 */
(function(context){
    $page = $pt.getService(context,'$page');
    var codes = $pt.getService($page, 'codes');
    class Layout {
        createFormLayout() {
            return {
                _sections: {
                    userInfo: {
                        label: "个人信息",
                        collapsible: true,
                        visible:$pt.getUserIdentify() !="教师",
                        layout: {
                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        studentVO_studentInfo_userName: {
                                            label: "姓名",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        studentVO_studentInfo_userCode:{
                                            label: "学号",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        studentVO_studentInfo_profession:{
                                            label: "专业",
                                            comp: {
                                                type: $pt.ComponentConstants.Select,
                                                data:codes.Profession,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        studentVO_studentInfo_userClass:{
                                            label: "班级",
                                            comp: {
                                                type: $pt.ComponentConstants.Select,
                                                data:codes.ClassRoom,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        studentVO_studentInfo_duties:{
                                            label: "职务",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        studentVO_studentInfo_telephoneNo:{
                                            label: "手机",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 1,
                                                width: 4
                                            }
                                        },
                                        // test:{
                                        //     label:"Test",
                                        //     comp:{
                                        //         type: $pt.ComponentConstants.InputAndSelect,
                                        //         data:codes.ClassRoom,
                                        //     },
                                        //     pos: {
                                        //         row: 3,
                                        //         width: 4
                                        //     }
                                        // },
                                        test2:{
                                            label:"Test2",
                                            comp:{
                                                type: $pt.ComponentConstants.Search,
                                                searchTriggerDigits: 6,
                                                // data:codes.ClassRoom,
                                            },
                                            pos: {
                                                row: 3,
                                                width: 4
                                            }
                                        }
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
                                                text: "保存",
                                                style: "primary",
                                                visible: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                },
                                                click: function () {
                                                    $page.controller.save(true);
                                                }
                                            },{
                                                text: "修改",
                                                style: "info",
                                                visible: {
                                                    when: function (row) {
                                                        return $page.isView;
                                                    }
                                                },
                                                click: function () {
                                                    $page.isView = false;
                                                    $page.controller.form.forceUpdate();
                                                }
                                            }
                                        ]
                                    }
                                },
                                pos: {
                                    row: 2,
                                    width: 12
                                }
                            }
                        }
                    },
                    studentInfo: {
                        label: "学生信息录入",
                        visible:$pt.getUserIdentify() !="学生",
                        style: 'success',
                        collapsible: true,
                        expanded: true,
                        layout: {

                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        uploadFile: {
                                            label: "上传学生信息",
                                            comp: {
                                                type: $pt.ComponentConstants.File,
                                                showUpload:true,
                                                showRemove:true,
                                                allowedFileExtensions :["xls", "xlsx"],
                                                showClose: true,
                                                showPreview: false,
                                                uploadUrl:"/marksystems/marksystem/rest/mark/uploadStudent",
                                                uploadAsync: true,
                                                placeholder: "Others",
                                                msgValidationError: "请选择正确的文件类型!"
                                            },
                                            evt: {
                                                fileloaded: function () {},
                                                filecleared: function () {
                                                    // $page.controller.model.set("DocumentIdList", []);
                                                    // $page.controller.model.set("DocumentId", null);
                                                },
                                                fileuploaded: function (event, data, previewId) {
                                                    if(data.response && data.response.length>0){
                                                        data.response.forEach(function(item){
                                                            $page.controller.model.getCurrentModel().studentVO.addStudent.push(item);
                                                        });
                                                        $page.controller.form.forceUpdate();
                                                    }
                                                    NConfirm.getConfirmModal().show({
                                                        title: 'Message',
                                                        disableClose: true,
                                                        messages: ['上传成功！']
                                                    });

                                                }
                                            },
                                            pos: {
                                                row: 2,
                                                width: 4
                                            }
                                        }
                                    }
                                },
                                pos: {
                                    row: 2,
                                    width: 12
                                }
                            },
                            studentVO_addStudent: {
                                label: "添加学生信息",
                                comp: {
                                    type: $pt.ComponentConstants.Table,
                                    sortable: false,
                                    searchable: false,
                                    addable:true,
                                    columns: [
                                        {
                                            title: "学号",
                                            width:200,
                                            data: "userCode",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }, {
                                            title: "姓名",
                                            width:200,
                                            data: "userName",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }, {
                                            title: "职务",
                                            width:200,
                                            data: "duties",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        },
                                        {
                                            title: "专业",
                                            width:200,
                                            data: "profession",
                                            codes:codes.Profession,
                                            inline:"select"
                                        }, {
                                            title: "班级",
                                            width:200,
                                            data: "userClass",
                                            codes:codes.ClassRoom,
                                            inline:"select"
                                        }, {
                                            title:"手机",
                                            data:"telephoneNo",
                                            width:200,
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }
                                    ],
                                    addClick: function (model, rowModel, layout) {
                                        model.getCurrentModel().studentVO.addStudent.push({tCode:$pt.getUserCode()});
                                        $page.controller.form.forceUpdate()
                                    },
                                    rowOperations: [
                                       {
                                            icon: "trash",
                                            text: "delete",
                                            style:"primary",
                                            tooltip: "delete",
                                            // visible: {
                                            //     when: function (row) {
                                            //         if ($page.controller.model.get("OperateType") == 0 || $page.controller.model.get("OperateType") == 5) {
                                            //             return false;
                                            //         } else {
                                            //             return !row.get("HasInforce");
                                            //         }
                                            //     }
                                            // },
                                            click: function (row) {
                                                var removeRow = function (row) {
                                                    if (row.userId && row.userId != 0) {
                                                        this.getModel().add("studentVO_deleteStudentList", row);
                                                    }
                                                    this.getModel().remove(this.getDataId(), row);
                                                    $pt.Components.NConfirm.getConfirmModal().hide();
                                                };
                                                $pt.Components.NConfirm.getConfirmModal().show(NTable.REMOVE_CONFIRM_TITLE, NTable.REMOVE_CONFIRM_MESSAGE, removeRow.bind(this, row));

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
                                                style: "primary",
                                                click: function () {
                                                    $page.controller.save(true);
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
                    }
                }
            }
        }
    }
    $page.layout = new Layout();
}(typeof window !== "undefined" ? window : this ));
