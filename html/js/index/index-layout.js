(function(context){
    $page = $pt.getService(context,'$page');
    $page.rows = [
        {
            dataId:"module1",
            label:"module1",
        },{
            dataId:"module2",
            label:"module2",
        },{
            dataId:"module3",
            label:"module3",
        },{
            dataId:"module4",
            label:"module4",
        }
    ]
    class Layout {
        createFormLayout(){
        return{
            _sections:{
                basicContractInfo: {
                    // label: "首页",
                    style: 'success',
                    collapsible: true,
                    expanded: true,
                    // layout:$page.rows.map(this.createModule),
                    layout:{
                        subPanel01: {
                            comp: {
                                type: $pt.ComponentConstants.Panel,
                                editLayout: {
                                    name: {
                                        label: "姓名",
                                        comp: {
                                            type: $pt.ComponentConstants.Text,
                                            // enabled: false
                                        },
                                        pos: {
                                            row: 1,
                                            width:4
                                        }
                                    },
                                    age:{
                                        label:"年龄",
                                        comp:{
                                            type:$pt.ComponentConstants.Text,
                                            enabled:true
                                        },
                                        pos:{
                                            row:1,
                                            width:4
                                        }
                                    },
                                    welcome:{
                                        highlightText:"welcome !",
                                        comp:{
                                            type:$pt.ComponentConstants.NJumbortron,
                                        }
                                    }
                                }
                            },
                            pos: {
                                width: 12
                            }
                        },
                        subPanel02:{
                            label:"备注",
                            comp:{
                                type:$pt.ComponentConstants.Panel,
                                editLayout:{
                                    remark:{
                                        comp:{
                                            type:{type:$pt.ComponentConstants.TextArea,label:false},
                                            lines:3
                                        },
                                        pos:{
                                            width:12
                                        }
                                    }
                                }
                            },
                            pos:{
                                width:12
                            }
                        },
                        modules1:{
                            label:"module1",
                            comp:{
                                type:$pt.ComponentConstants.Panel,
                                editLayout:{
                                    module:{
                                        comp:{
                                            type:{
                                                type:$pt.ComponentConstants.TextArea,
                                                label:false,
                                            },
                                            lines:8
                                        },
                                        pos:{
                                            width:12
                                        }
                                    }

                                }
                            }
                        },
                        modules2:{
                            label:"module1",
                            comp:{
                                type:$pt.ComponentConstants.Panel,
                                editLayout:{
                                    module:{
                                        comp:{
                                            type:{
                                                type:$pt.ComponentConstants.TextArea,
                                                label:false,
                                            },
                                            lines:5
                                        },
                                        pos:{
                                            width:12
                                        }
                                    }

                                }
                            }
                        },
                        modules3:{
                            label:"module1",
                            comp:{
                                type:$pt.ComponentConstants.Panel,
                                editLayout:{
                                    module:{
                                        comp:{
                                            type:{
                                                type:$pt.ComponentConstants.TextArea,
                                                label:false,
                                            },
                                            lines:5
                                        },
                                        pos:{
                                            width:12
                                        }
                                    }

                                }
                            }
                        },
                        modules4:{
                            label:"module1",
                            comp:{
                                type:$pt.ComponentConstants.Panel,
                                editLayout:{
                                    module:{
                                        comp:{
                                            type:{
                                                type:$pt.ComponentConstants.TextArea,
                                                label:false,
                                            },
                                            lines:5
                                        },
                                        pos:{
                                            width:12
                                        }
                                    }

                                }
                            }
                        },
                        tableModule:{
                            label:"table",
                            comp:{
                                type:$pt.ComponentConstants.Table,
                                addable:true,
                                sortable: false,
                                searchable: false,
                                downloadable:true,
                                columns:[
                                    {
                                        title:"学号",
                                        data:"xuehao"
                                    },{
                                        title:"姓名",
                                        data:"name"
                                    },{
                                        title:"性別",
                                        data:"sex"
                                    },{
                                        title:"班级",
                                        data:"class"
                                    }
                                ]
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
