/**
 * Created by xue on 2017/5/1.
 */
(function(context){
    var $page = $pt.getService(context,'$page')
    $page.model={
        rollCallDate:moment(new Date).format("YYYY-MM-DD"),
        Profession:"0",
        semester:"0",
        ClassRome:"0",
        condition:{
            countPerPage:10,
            currentPageIndex:1,
            // url:"/marksystems/marksystem/rest/mark/queryCheckin",
            tCode:$pt.getUserCode()
        },
        historyTable:[]
    }
}(typeof window !=='undefined' ? window : this ))