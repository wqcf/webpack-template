require('../../css/common.scss');
require('./template.scss');
require('cesium/Widgets/widgets.css');

import _ from 'lodash';
import '../../js/pull_down_linkage';
import * as $ from 'jquery';
import MapControl from '../../js/lib/map';
import Cesium from 'cesium/Cesium';

var mapCon = new MapControl('cesiumContainer', false, false);

mapCon.GoMain();

//系统时间

let alarm=[{
    "isAlarm":false,
    "id":1,
    "time": "01/11/2018 09:25:15",
    "type": "【冲突告警】",
    "typeValue": "0312与0313车队在XX路口冲突...."
},{
    "isAlarm":true,
    "id":1,
    "time": "01/11/2018 09:25:15",
    "type": "【解决告警】",
    "typeValue": "0312车队在C路段减速至30km/h."
},{
    "isAlarm":false,
    "id":2,
    "time": "01/11/2018 09:25:15",
    "type": "【冲突告警】",
    "typeValue": "0312与0313车队在XX路口冲突...."
},{
    "isAlarm":true,
    "id":2,
    "time": "01/11/2018 09:25:15",
    "type": "【解决告警】",
    "typeValue": "0312车队在C路段减速至30km/h."
},{
    "isAlarm":false,
    "id":3,
    "time": "01/11/2018 09:25:15",
    "type": "【冲突告警】",
    "typeValue": "0312与0313车队在XX路口冲突...."
},{
    "isAlarm":true,
    "id":3,
    "time": "01/11/2018 09:25:15",
    "type": "【解决告警】",
    "typeValue": "0312车队在C路段减速至30km/h."
},{
    "isAlarm":false,
    "id":4,
    "time": "01/11/2018 09:25:15",
    "type": "【冲突告警】",
    "typeValue": "0312与0313车队在XX路口冲突...."
},{
    "isAlarm":true,
    "id":4,
    "time": "01/11/2018 09:25:15",
    "type": "【解决告警】",
    "typeValue": "0312车队在C路段减速至30km/h."
}]

let embassy=[
    {
        name:"阿拉伯大使馆",
    },{
        name:"马拉西亚大使馆"
    },{
        name:"到达利亚大使馆"
    }
]

let camear=5;

//搜索点击事件1
// $('.left_search_content_dim_search').mousedown(function(){
//     $(this).toggleClass('change_search');
// }).mouseup(function(){
//     $(this).toggleClass('change_search');
// })


//系统时间
$(function () {
    var myDate = new Date();//获取系统当前时间
    var year=myDate.getFullYear();//获取当前年
    var month=myDate.getMonth()+1;//获取当前月
    var date=myDate.getDate(); //获取当前日
    var h=myDate.getHours(); //获取当前小时数(0-23)
    var m=myDate.getMinutes(); //获取当前分钟数(0-59)
    var s=myDate.getSeconds(); //获取当前秒(0-59)
    var week=myDate.getDay();
    var w='';
    var hh='',mm='',ss='';
    if(h<10){
      hh='0'+h;
    }else{
      hh=h.toString();
    }
    if(m<10){
      mm='0'+m;
    }else{
      mm=m.toString();
    }
    if(s<10){
      ss='0'+s;
    }else{
      ss=s.toString();
    }
    
    var time = hh + ":" + mm + ":" + ss;
    var dateToday = year + "/" + month + "/" + date;

    switch(week){
        case 0:w='星期天';break;
        case 1:w='星期一';break;
        case 2:w='星期二';break;
        case 3:w='星期三';break;
        case 4:w='星期四';break;
        case 5:w='星期五';break;
        case 6:w='星期六';break;
        default:break;
    }
    $('.t_bott').text(time);
    $('.date').text(dateToday);
    $('.week').text(w);
    setInterval(function () {
        var myDate = new Date();//获取系统当前时间
        var year=myDate.getFullYear();//获取当前年
        var month=myDate.getMonth()+1;//获取当前月
        var date=myDate.getDate(); //获取当前日
        var h=myDate.getHours(); //获取当前小时数(0-23)
        var m=myDate.getMinutes(); //获取当前分钟数(0-59)
        var s=myDate.getSeconds(); //获取当前秒(0-59)
        var week=myDate.getDay();
        var w='';
        var hh='',mm='',ss='';
        if(h<10){
          hh='0'+h;
        }else{
          hh=h.toString();
        }
        if(m<10){
          mm='0'+m;
        }else{
          mm=m.toString();
        }
        if(s<10){
          ss='0'+s;
        }else{
          ss=s.toString();
        }
        
        var time = hh + ":" + mm + ":" + ss;
        var dateToday = year + "/" + month + "/" + date;

        switch(week){
            case 0:w='星期天';break;
            case 1:w='星期一';break;
            case 2:w='星期二';break;
            case 3:w='星期三';break;
            case 4:w='星期四';break;
            case 5:w='星期五';break;
            case 6:w='星期六';break;
            default:break;
        }

        $('.t_bott').text(time);
        $('.week').text(w);
        $('.date').text(dateToday);
    }, 1000)
    gaojing();
    pullList();
    // $('.left_search_content').removeClass("load_image");
})

//左侧隐藏 按钮点击事件
var isHide = false;
$(".slide-button-left").click(function () {
    if (!isHide) {
        $('.left_search').animate({ width: "10px" }, 500);
        $(".slide-button-left").animate({ left: "4px" },500);
        $('.left_search_title, .left_search_content').hide(500);
        $('#btns').animate({left: "19px"},500);
        isHide = true;
    } else {
        $('.left_search').animate({ width: "400px" }, 500);

        $(".slide-button-left").animate({ left: "98%" },500);
        $('.left_search_title, .left_search_content').show();
        $('#btns').animate({left: "22%"},500);

        isHide = false;
    }
});
let isHideRight = true;
//警告列表隐藏
$('.slide-button-right').click(function(){
    if(isHideRight){
        isHideRight=false;
        $(".right_warning").animate({ width: 10 }, 500);
        $(".slide-button-right").animate({top:"50%" },500);
        $(".right_warning_box").hide(500);
    }else{
        isHideRight = true;
        $(".right_warning").animate({ width: "380px" }, 500);
        $(".slide-button-right").animate({ left: "4px" },500);
        $(".right_warning_box").show(500);
    }
   
})

//input 模糊查询失去焦点
$(".left_search_content_dim_input").blur(function(){
   let val = $(".left_search_content_dim_input").val();
});

//大使馆点击按钮
let isShow = false;
$('.left_search_content_result').on('click','.left_search_content_result_list',function(){
    $('.left_search_content_result_list').removeClass("list_background");
    $('.left_search_content_result_list').next().slideUp();
    let isClass=$(this).hasClass('pull_menu_status');
    if(isShow && isClass){
        isShow  = false;
        return ;
    }
    $('.left_search_content_result_list').removeClass("pull_menu_status");
    $(this).addClass("pull_menu_status");

    $(this).next().slideToggle(200,function(){

        if ($(this).is(':hidden')) {

            isShow = false;

        }else{

            isShow = true;

        }

    });
    $(this).addClass("list_background");
    // $(this).next().find('li, input, div').addClass('li_background1');
})
$('.left_search_content_result').on('click','li',function(){
    $('li').removeClass("li_click_background");
    $(this).addClass("li_click_background");
})

$('.left_search_content_result').on('click','.left_search_content_result_list1_input_result',function(){
    $('.left_search_content_result_list1_input_result').removeClass("sxt_background");
    $(this).addClass("sxt_background");
})

//视频切换按钮
$('.content_video_button ul li').click(function(){
    let i=$(this).index();
    $('.change').removeClass("change1");
    $(this).addClass("change1")
})
//视频最小化按钮
$('.content_video_head_right_minimize').click(function(){
    $('.content_video').animate({width:0},300).hide(30);
    let h=parseInt($('.content_video').css("height"));
    $('.content_video_icon').show(300).css("bottom",h+15+"px")
})
$('.content_video_icon').click(function(){
    $(this).hide();
    $('.content_video').animate({width:"311px"},300).show();
})
//告警dom
function gaojing(){
    let str='';
    for(let i = 0; i < alarm.length ; i++){
        if(alarm[i].isAlarm){
            str+=`
                <div class="right_warning_list_num">
                    <div class="gaojing_icon_1"></div>
                    <div style="width:2px; height: 100%;background: #00BAF8; margin-left:16px; margin-right:12px;"></div>
                    <div style="position: relative;top: -5px;">
                        <div class="right_warning_list_num_time">
                            <span class="right_warning_list_num_time_1">`+alarm[i].id+`.</span><span class="right_warning_list_num_time_2">`+alarm[i].time+`</span>
                        </div>
                        <div class="right_warning_list_num_content">
                            <span class="right_warning_list_num_content_1">`+alarm[i].type+`</span><div class="right_warning_list_num_content_2">`+alarm[i].typeValue+`</div>   
                        </div>
                    </div>
                </div>
                `
        }else{
            str+=`
                <div class="right_warning_list_num">
                    <div class="gaojing_icon"></div>
                    <div style="width:2px; height: 100%;background: #00BAF8; margin-left:16px; margin-right:12px;"></div>
                    <div style="position: relative;top: -5px;">
                        <div class="right_warning_list_num_time">
                            <span class="right_warning_list_num_time_1">`+alarm[i].id+`.</span><span class="right_warning_list_num_time_2">`+alarm[i].time+`</span>
                        </div>
                        <div class="right_warning_list_num_content" >
                            <span class="right_warning_list_num_content_1">`+alarm[i].type+`</span><div class="right_warning_list_num_content_2">`+alarm[i].typeValue+`</div>   
                        </div>
                    </div>
                </div>
                `
        }
        
    }
    $('.right_warning_list').html(str);

}
function pullList(){

    let str = '';
    for(let i = 0 ; i < embassy.length ; i++){
        str += `
            <div class="left_search_content_result_list pull_menu_status">
                <h3>`+ embassy[i].name+`</h3>
            </div>
            <div class="left_search_content_result_list1">
                <ul>
                    <li>摄像头</li>
                    <li>门禁</li>
                    <li>其他设备</li>
                    <li>循更线路</li>
                </ul>
                <div class="left_search_content_result_list1_input" >
                    <input class="left_search_content_dim_input1 input_background" type="text" name="please_enter" value="请输入摄像头名称" onfocus="javascript:if(this.value=='请输入摄像头名称')this.value='';" onblur="javascript:if(this.value=='')this.value='请输入摄像头名称';" />
                    <div class="left_search_content_dim_search"></div>
                    <div class="left_search_content_dim_clear"></div>
                </div>
                <div class="left_search_content_result_list1_input_box">
                    <div class="left_search_content_result_list1_input_result">
                        <h3>摄像头1</h3>
                    </div>
                </div>
            </div>
        `
    }
    $('.left_search_content_result').html(str);
    serachCamera();
}
function serachCamera(){
    let str='';
    for(let i = 0 ; i < camear ; i++){
        str +=`<div class="left_search_content_result_list1_input_result">
                <h3>摄像头1</h3>
            </div>`
    }
    $('.left_search_content_result_list1_input_box').html(str);
    $('.left_search_content_result_list1').hide();

}