(function(context){
    $page = $pt.getService(context,'$page');
    var codes = $pt.getService($page, 'codes');
    class Layout {
        createFormLayout(){
        return{
            _sections:{
                taskInfo: {
                    label: "作业",
                    style: 'success',
                    collapsible: true,
                    expanded: true,
                    layout:{
                        subPanel01: {
                            comp: {
                                type: $pt.ComponentConstants.Panel,
                                editLayout: {
                                    teacher1: {
                                        label: "教师",
                                        comp: {
                                            type: $pt.ComponentConstants.Select,
                                            data:codes.Teacher,
                                            visible:$.sessionStorage.get("Identity")!="教师"
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
                                            visible:$.sessionStorage.get("Identity")!="教师",
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
                                                        visible:$.sessionStorage.get("Identity")!="教师",
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
                                    uploadFile: {
                                        label: "上传作业",
                                        comp: {
                                            type: $pt.ComponentConstants.File,
                                            visible:$.sessionStorage.get("Identity")=="教师",
                                            showUpload:true,
                                            showRemove:true,
                                            showClose: true,
                                            showPreview: false,
                                            uploadUrl:"/marksystems/marksystem/rest/mark/uploadTask",
                                            uploadAsync: true,
                                            placeholder: "Others",
                                            msgValidationError: "请选择正确的文件类型!"
                                        },
                                        evt: {
                                            fileloaded: function () {},
                                            filecleared: function () {
                                            },
                                            fileuploaded: function (event, data, previewId) {
                                                $page.controller.model.getCurrentModel().tableModule.push(data.response);
                                                $page.controller.form.forceUpdate();
                                                NConfirm.getConfirmModal().show({
                                                    title: 'Message',
                                                    disableClose: true,
                                                    messages: ['上传成功！']
                                                });

                                            }
                                        },
                                        pos: {
                                            row: 3,
                                            width: 4
                                        }
                                    },
                                    tableModule:{
                                        label:$.sessionStorage.get("Identity")=="教师"?'上传作业':'下载作业',
                                        comp:{
                                            type:$pt.ComponentConstants.Table,
                                            addable:false,
                                            sortable: false,
                                            searchable: false,
                                            downloadable:false,
                                            columns:[
                                                {
                                                    title:"作业",
                                                    data:"task",
                                                    width:"30%"
                                                },{
                                                    title:"课程",
                                                    data:"course",
                                                    width:"30%",
                                                    inline: {
                                                        inlineType: 'cell',
                                                        comp: {
                                                            type: {type: $pt.ComponentConstants.Select, label: false},
                                                            data:codes.Course,
                                                            enabled:$.sessionStorage.get("Identity")=="教师"
                                                        }
                                                    }
                                                },
                                                {
                                                    title:"备注",
                                                    data:"remark",
                                                    width:"30%",
                                                    inline: {
                                                        inlineType: 'cell',
                                                        comp: {
                                                            type: {type: $pt.ComponentConstants.Text, label: false},
                                                            enabled:$.sessionStorage.get("Identity")=="教师"
                                                        }
                                                    }
                                                }
                                            ],
                                            rowOperations: [
                                                // {
                                                //     icon: "trash",
                                                //     text: "delete",
                                                //     style:"primary",
                                                //     tooltip: "delete",
                                                //     // visible: {
                                                //     //     when: function (row) {
                                                //     //         if ($page.controller.model.get("OperateType") == 0 || $page.controller.model.get("OperateType") == 5) {
                                                //     //             return false;
                                                //     //         } else {
                                                //     //             return !row.get("HasInforce");
                                                //     //         }
                                                //     //     }
                                                //     // },
                                                //     click: function (row) {
                                                //         var removeRow = function (row) {
                                                //             if (row.userId && row.userId != 0) {
                                                //                 this.getModel().add("studentVO_deleteStudentList", row);
                                                //             }
                                                //             this.getModel().remove(this.getDataId(), row);
                                                //             $pt.Components.NConfirm.getConfirmModal().hide();
                                                //         };
                                                //         $pt.Components.NConfirm.getConfirmModal().show(NTable.REMOVE_CONFIRM_TITLE, NTable.REMOVE_CONFIRM_MESSAGE, removeRow.bind(this, row));
                                                //
                                                //     }
                                                // },
                                                {
                                                    icon: "download",
                                                    text: "download",
                                                    style:"info",
                                                    tooltip: "download",
                                                    click: function (row) {
                                                        var url = "/marksystems/marksystem/upload/"+row.task;
                                                        window.open(url);
                                                    }
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
                        }
                    }
                }
            }
        }
    }
    }
    $page.layout = new Layout();
    // export {Layout}
}(typeof window !=='undefined' ? window : this));
