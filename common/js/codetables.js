/**
 * Created by xue on 2017/3/16.
 */
(function(context){
    var $page = $pt.getService(context,'$page');
    var codes = $pt.getService($page,'codes');
    var MutableCodeTable = $pt.extendCodeTable({
        add: function (item) {
            if (this.get(item.id)) {
                // already existed, do nothing
            } else {
                this._codes.push(item);
                this._map[item.id] = item;
                this.render();
                this.sort();
            }
            return this;
        },
        remove: function (id) {
            var index = this._codes.findIndex(function (item) {
                return item.id == id;
            });
            if (index != -1) {
                this._codes.splice(index, 1);
                delete this._map[id];
            }
            return this;
        },
        reset: function (items) {
            this.__initCodesArray(items, this._renderer, this._sorter);
            this._initialized = true;
            return this;
        }
    });

    codes.Boolean = $pt.createCodeTable([
        {
            id:'0',
            text:'false'
        },{
            id:'1',
            text:'true'
        }

    ]);
    codes.Radio = $pt.createCodeTable([
        {
            id:'0',
            text:'Y'
        },{
            id:"1",
            text:"N"
        }

    ]);
    codes.Profession = $pt.createCodeTable([
        {
            id:'0',
            text:'软件工程'
        },{
            id:'1',
            text:'计算机科学与技术'
        }
    ]);
    codes.Reason = $pt.createCodeTable([
        {
            id:'0',
            text:'请假'
        },{
            id:'1',
            text:'旷课'
        },{
            id:'2',
            text:'急事'
        }
    ]);
    codes.ClassRoom = $pt.createCodeTable([
        {
            id:'0',
            text:'一班'
        },{
            id:'1',
            text:'二班'
        },{
            id:'2',
            text:'三班'
        },{
            id:'3',
            text:'四班'
        },{
            id:'4',
            text:'五班'
        }
    ]);
    codes.Semester=$pt.createCodeTable([
        {
            id:'0',
            text:moment().subtract(1,'year').format("YYYY")+"-"+moment().format("YYYY")+"学年第二学期"
        },{
            id:'1',
            text:moment().subtract(1,'year').format("YYYY")+"-"+moment().format("YYYY")+"学年第一学期"
        },{
            id:'2',
            text:moment().subtract(2,'year').format("YYYY")+"-"+moment().subtract(1,'year').format("YYYY")+"学年第二学期"
        },{
            id:'3',
            text:moment().subtract(2,'year').format("YYYY")+"-"+moment().subtract(1,'year').format("YYYY")+"学年第一学期"
        }
    ])
    function getcourseList(){
        var returnData = null;
        var done = function (data,status){
            var list  = [];
            if(data&&data.length>0){
                data.forEach(function (item) {
                    list.push({id:item,text:item})
                })
            }
            returnData=list;

        }
        var fail = function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
        console.log($pt.getUserCode())
        var url = "/marksystems/marksystem/rest/mark/";
        if($pt.getUserIdentify()=="教师"){
            url =url+"loadCourseList/?tcode="+$pt.getUserCode()
        }else{
            url=url+"loadAllCourseList";
        }
        $pt.doGet(url, null, {
            quiet: false,
            async: false,
            done: done,
            fail: fail
        });
        return returnData;
    };
    codes.Course = $pt.createCodeTable(getcourseList());
    function getTeacherList(){
        var returnData = null;
        var done = function (data,status){
            var list  = [];
            if(data&&data.length>0){
                data.forEach(function (item) {
                    list.push({id:item.userCode,text:item.userName})
                })
            }
            returnData=list;

        }
        var fail = function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
        console.log($pt.getUserCode())
        $pt.doGet("/marksystems/marksystem/rest/mark/loadTeacherList/?identity=教师", null, {
            quiet: false,
            async: false,
            done: done,
            fail: fail
        });
        return returnData;
    };
    codes.Teacher = $pt.createCodeTable(getTeacherList());

}(typeof window !=='undefined' ? window : this));