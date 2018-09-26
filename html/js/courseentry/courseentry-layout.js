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
                    courseVO: {
                        label: "教师信息",
                        visible:$pt.getUserIdentify() =="教师",
                        collapsible: true,
                        expanded: true,
                        layout: {
                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        courseVO_teacherInfo_tName: {
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
                                        courseVO_teacherInfo_tCode:{
                                            label: "职工号",
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
                                        courseVO_teacherInfo_duties:{
                                            label: "职称",
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
                                        courseVO_teacherInfo_tEmail:{
                                            label:"邮箱",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 2,
                                                width: 4
                                            }
                                        },
                                        courseVO_teacherInfo_telephoneNo:{
                                            label:"手机",
                                            comp: {
                                                type: $pt.ComponentConstants.Text,
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
                                            pos: {
                                                row: 2,
                                                width: 4
                                            }
                                        },
                                        courseVO_teacherInfo_semester:{
                                            label:"学期",
                                            comp: {
                                                type: $pt.ComponentConstants.Select,
                                                data:moment().month()>=2 && moment().month()<=6 ? codes.Semester: codes.Semester.filter(function(item){return item.id!='0'}),
                                                enabled: {
                                                    when: function (row) {
                                                        return !$page.isView;
                                                    }
                                                }
                                            },
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
                                            },
                                            {
                                                text: "修改",
                                                style: "info",
                                                visible: {
                                                    when: function (row) {
                                                        return $page.isView;
                                                    }
                                                },
                                                // visible:$page.isView,
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
                    createCourse: {
                        label: "课程录入",
                        style: 'success',
                        collapsible: true,
                        expanded: true,
                        layout: {
                            panel01: {
                                comp: {
                                    type: $pt.ComponentConstants.Panel,
                                    editLayout: {
                                        uploadFile: {
                                            label: "上传课表",
                                            comp: {
                                                type: $pt.ComponentConstants.File,
                                                showUpload:true,
                                                showRemove:true,
                                                allowedFileExtensions :["xls", "xlsx"],
                                                showClose: true,
                                                showPreview: false,
                                                uploadUrl:"/marksystems/marksystem/rest/mark/uploadCourse",
                                                uploadAsync: true,
                                                placeholder: "Others",
                                                msgValidationError: "请选择正确的文件类型!"
                                            },
                                            evt: {
                                                fileloaded: function () {},
                                                filecleared: function () {
                                                    $page.controller.model.set("DocumentIdList", []);
                                                    $page.controller.model.set("DocumentId", null);
                                                },
                                                fileuploaded: function (event, data, previewId) {
                                                    // $page.controller.model.get("DocumentIdList").push(data.response.documentId);
                                                    // $page.controller.model.get("courseVO_courseTable").push(data.response);
                                                   if(data.response && data.response.length>0){
                                                       data.response.forEach(function(item){
                                                           $page.controller.model.getCurrentModel().courseVO.courseTable.push(item);
                                                       });
                                                       $page.controller.form.forceUpdate();
                                                   }
                                                    NConfirm.getConfirmModal().show({
                                                        title: 'Message',
                                                        disableClose: true,
                                                        messages: ['上传成功！']
                                                    });
                                                    // $page.controller.model.set("DocumentId", data.response.documentId);

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
                            courseVO_courseTable: {
                                label: moment(new Date).format("YYYY-MM-DD"),
                                comp: {
                                    type: $pt.ComponentConstants.Table,
                                    sortable: false,
                                    searchable: false,
                                    // pageable:true,
                                    // countPerPage:10,
                                    addable:true,
                                    columns: [
                                        {
                                            title: "课程",
                                            width:200,
                                            data: "course",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }, {
                                            title: "专业",
                                            width:200,
                                            data: "profession",
                                            codes:codes.Profession,
                                            inline:"select"
                                        }, {
                                            title: "班级",
                                            width:200,
                                            data: "classRoom",
                                            codes:codes.ClassRoom,
                                            inline:"select"
                                        },
                                        {
                                            title: "时间",
                                            data: "courseDate",
                                            width:200,
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        },
                                        {
                                            title:"备注",
                                            width:200,
                                            data:"remark",
                                            inline: {
                                                inlineType: 'cell',
                                                comp: {
                                                    type: {type: $pt.ComponentConstants.Text, label: false}
                                                }
                                            }
                                        }
                                    ],
                                    addClick: function (model, rowModel, layout) {
                                        // this.getModel().add("courseTable", $page.model.addColumn)
                                        model.getCurrentModel().courseVO.courseTable.push({tCode:$pt.getUserCode()});
                                        $page.controller.form.forceUpdate()
                                    },
                                    rowOperations: [
                                       {
                                            icon: "trash",
                                            text: "delete",
                                            style:"primary",
                                            tooltip: "delete",
                                            visible: {
                                                when: function (row) {
                                                   return true;
                                                }
                                            },
                                            click: function (row) {
                                                var removeRow = function (row) {
                                                    if (row.courseId && row.courseId != 0) {
                                                        this.getModel().add("courseVO_deleteCourseList", row);
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
