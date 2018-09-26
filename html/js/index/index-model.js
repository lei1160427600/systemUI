/**
 * Created by xue on 2017/3/12.
 */
(function(context){
    var $page = $pt.getService(context,'$page')
    $page.model={
        name:"小明",
        age:"20",
        tableModule:[{
            xuehao:13101001,
            name:"小明",
            sex:"男",
            class:1
        },{
            name:"小明"
        },{
            sex:"男"
        },{
            class:1
        }]
    }
}(typeof window !=='undefined' ? window : this ))
