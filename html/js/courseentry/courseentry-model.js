/**
 * Created by xue on 2017/5/2.
 */
(function(context){
    var $page = $pt.getService(context,'$page');
    $page.model={
        courseVO:{
            teacherInfo:{
                tName:$pt.getUser(),
                tCode:$pt.getUserCode()
            },
            courseTable:[
            ],
            deleteCourseList:[
            ],
        },
        rollCallDate:moment(new Date).format("YYYY-MM-DD"),
        Profession:"0",
        semester:"0",
        ClassRome:"0",
        condition:{

        },



    }
}(typeof window !=='undefined' ? window : this ))