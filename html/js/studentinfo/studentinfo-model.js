/**
 * Created by xue on 2017/5/2.
 */
(function(context){
    var $page = $pt.getService(context,'$page');
    $page.model={
        studentVO:{
            userName:$pt.getUser(),
            userCode:$pt.getUserCode(),
            addStudent:[
            ],
            deleteStudentList:[{
                userClass:null
                }]
        }



    }
}(typeof window !=='undefined' ? window : this ))