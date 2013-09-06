//到浙江大学吧内搜索页；其他吧也能用，但是tbs，贴吧id什么的都要自己改一下。连云小森森
//    http://tieba.baidu.com/dc/common/tbs
var tbs;
$.getJSON("http://tieba.baidu.com/dc/common/tbs","",function(data){tbs=data['tbs'];});
var o=new Array();
var thisdel=0;
var _scb=function(data){var txt='';if(data['no']!=0)txt=thisdel+' 失败：'+data['no'];else txt=thisdel+' 成功~';console.debug(txt);setTimeout(delnext,250);}
var del2=function(tid,pid){$.post('/f/commit/post/delete',{commit_fr:"pb",ie:"utf-8",tbs:tbs,kw:"浙江大学",fid:26074,tid:tid,is_vipdel:0,pid:pid,is_finf:false},_scb,"json");};
var del=function(lnk){var tid='',pid='';var rg=lnk.match(/\/p\/(\d+)[?]pid=(\d+)/);
tid=rg[1];pid=rg[2];del2(tid,pid);}
var addlist=function(){
for(i=0;i<$('.p_content').length;i++)
//if(confirm($('.p_content')[i].innerHTML))
if($($('.p_content')[i]).parent().children('input').attr('checked'))
 o.push($($('.p_content')[i]).parent().children('span').children('a').attr('href'));}

var delnext=function(){if(thisdel>o.length-1){alert('全部完毕！'); return;}del(o[thisdel++]);}
var startdelete=function(){addlist();delnext();}
//start

$('.p_content').after('<input type=checkbox><a onclick="if($(this).parent().children(\'input\').attr(\'checked\'))$(this).parent().children(\'input\').removeAttr(\'checked\');else $(this).parent().children(\'input\').attr(\'checked\',\'true\');">删除</a><div><input type=button onclick=startdelete() value=开始删除！></div>');
