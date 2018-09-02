window.Global || (Global = {fullHost: window.location.origin, authHost: window.location.origin,apiHost:window.location.origin});
Global.isAndroid = window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Linux') > -1; //android终端或者uc浏览器;
Global.isiOS = /iPhone|iPad|iPod|ios|IOS/.test(window.navigator.userAgent);//!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
Global.isQQ = /qq\//i.test(window.navigator.userAgent);
Global.isWechat = /micromessenger/i.test(window.navigator.userAgent);
Global.isWeibo = /weibo/i.test(window.navigator.userAgent);
Global.isMiniProgram = Global.isWechat &&  /miniprogram/i.test(window.navigator.userAgent);
Global.language = 'en';
Global.iosBtn = false;//控制审核开关(false未不是审核期间)
Global.versionStr = 'web.0.0';
Global.appCode = Global.isiOS ? "30002" : "30001";//应用编码
Global.webVersion = "1101";//增量包版本号
Global.isFirst = true;//默认初始化 在原生交互过来之后
Global.neterror = '当前网络不可用，请检查网络设置';
Global.setAutoScroll = 0;
Global.trenchType ='';//用户渠道
Global.deviceCode ='';//设备号
Global.is_majia ='';//马甲号
Global.is_game = '';//商城导航栏 0:隐藏 1:展示
Global.show_wxpay = '';//商城微信支付 1:展示 0:隐藏
Global.OS = 'web';
Global.hasTipBox = false;
Global.netWorkStatus = 1;// 0,1,2 0 无网 1 wifi 2 移动网络
Global.blankHeight=0;//ios首页高度
Global.webRoot = 'auction'; //根目录
Global.h_version = "1.0.0";   //H5版本号
Global.caseTime = -1;//缓存时间
Global.hasHeiping = false;//是否黑过屏
Global.noPic = '../img/goods/lazy_load.png';//全局默认图片
Global.devicefp ='';
Global.inviteChannelCode='';//
Global.isAudit = '';//ios审核标记
var kefuhttpFlag = true;
var T = {};
T.isNative =/appInfo/.test(window.navigator.userAgent);
if(T.isNative){
    Global.OS = Global.isAndroid  ? 'Android' :  'IOS';
}
Number.prototype.toFixed = function(s){
    var changenum=(parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
    if(this * 1000 % 5 ==0 && this * 1000 % 10 !=0){
        changenum=(parseInt(this * Math.pow( 10, s+1 ) + 5)/ Math.pow( 10, s+1 )).toString();
        changenum=(parseInt(changenum * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
    }
    var index=changenum.indexOf(".");
    if(index<0&&s>0){
        changenum=changenum+".";
        for(i=0;i<s;i++){
            changenum=changenum+"0";
        }
    }else {
        index=changenum.length-index;
        for(i=0;i<(s-index)+1;i++){
            changenum=changenum+"0";
        }
    }
    return changenum;
};
var pageFrom = "";
/**
 * @description 格式化日期为指定的格式
 * @param {String} pattern 输出格式, YYYY-MM-dd hh:mm:ss的组合
 * @return {String}
 * @example
 * var t=new Date();
 * t.format('%Y/%M/%d %h:%m:%s');
 * 输出：2012/07/16 16:05:30
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/([Yy]+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
var Collection = (function(){
    var collectFlag = false ; //收集开关
    var maxResTime = 3; //响应时间超过3s的才需要记录
    var sendSize = 10 ; //超过10条上传一次
    var ignoreList = ["collect/req.json","match/state.json","game/getInvitationStatus","game/getRandomMatchStatus","game/getGameRecord"];//需要忽略的接口
    var filterUrl = function(_url){
        for(var i=0; i<ignoreList.length;i++){
            if(_url.indexOf(ignoreList[i]) != -1){
                return false ;
            }
        }
        return true;
    };
    return {
        collectFlag:collectFlag,
        maxResTime:maxResTime,
        ignoreList:ignoreList,
        filterUrl:filterUrl,
        sendSize:sendSize
    }
})();
/**
 * @namespace url跳转类
 * @author _iL
 */
//h5本地存储
T.Storage = {
    /**
     * @description 是否支持localStorage
     * @example T.Storage.is();
     * @memberOf T.Storage
     */
    is: function () {
        return !!window.localStorage;
    },
    /**
     * @description 设置localStorage
     * @param {String} name 名称
     * @param {String} value 值
     * @example T.Storage.set('cp_pagetype', 'page');
     * @memberOf T.Storage
     */
    set: function (name, value, type) {
            switch (typeof value) {
                case 'object':
                    value = 'object:' + JSON.stringify(value);
                    break;
                case 'string':
                    value = 'string:' + value;
                    break;
            }

        if (!T.Storage.is()) {
            return;
            //T.Cookie.set(name, value);
        } else {
            var Storage = type ? "sessionStorage" : "localStorage";
            try {
                    window[Storage].setItem(name, value);
            } catch (e) {
                if ((navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1))confirm('为了正常运行网站，请关闭Safari浏览器-秘密（无痕）浏览')
            }
        }
    },
    /**
     * @description 获取localStorage
     * @param {String} name 名称
     * @example T.Storage.get('cp_pagetype');
     * @memberOf T.Storage
     */
    get: function (name, type) {
        var value;
        if (!T.Storage.is()) {
            return;
        } else {
            value = type ? window["sessionStorage"].getItem(name) : (window["localStorage"].getItem(name)||window["sessionStorage"].getItem(name));
            if (/^object:/.test(value)) {
                value = JSON.parse(value.replace(/^object\:/, ''));
            } else if (/^string:/.test(value)) {
                value = value.replace(/^string\:/, '');
            }
            return value;
        }
    },

    remove: function (name, type) {
        if (!T.Storage.is()) {
            return;
        } else {
            var Storage = type ? "sessionStorage" : "localStorage";
            window[Storage].removeItem(name);
        }
    },
    //用完即删的Stroage
    getAndRemove:function(name,type){
        var tempStorage = T.Storage.get(name,type);
        if(tempStorage){
            T.Storage.remove(name,type);
            window.tempStorage = tempStorage;
        }
        return window.tempStorage;
    }
};
window['noMore'] = function(obj){
    var html = '<div class="noMore-updates"><p>'+warnObj.noMoreData[Global.language]+'</p></div>';
    if(!obj){
        obj = $('body');
    }else if(typeof obj == 'string'){
        obj = $(obj);
    }
    if(!obj.find('.noMore-updates').length){
        obj.append(html);
    }
};
T.popTaskList = [];//弹层任务列表
T.doPopTask = function(){//执行弹层任务
    setTimeout(function(){
        if(T.popTaskList.length){
            var popTask = T.popTaskList[0];
            T.popTaskList.splice(0,1);
            if(popTask.type == 'alert'){
                alert(popTask.opt[0],popTask.opt[1],popTask.opt[2]);
            }else{
                confirm(popTask.opt);
            }
        }else{
            T.Util.canShowBigAward('1');//弹层消失告诉原生可以弹出大奖弹层
        }
    },500);
};
window['alert'] = function (msg, fn, tag) {
    T.Util.canShowBigAward('0');//有弹层不可以触发原生大奖弹层
    if($("#alertBox").height == 0 || msg != $("#alertBox p").html()){  //相同内容不继续弹框
        var alertHtml = $('<div id="alertBox" class="popBox"><div class="box-inner"><div class="box-content">\
                        <div class="confirmcontent"></div>\
                         <div class="confirmbutton"><div>OK</div></div></div></div></div>');
        if ($('#alertBox').length == 0 && $('#confirmBox').length == 0) {
            $('body').append(alertHtml);
            setTimeout(function(){
                $("#alertBox .box-content").addClass("show");
            },0);
        }else{
            T.popTaskList.push({type:'alert',opt:[msg,fn,tag]});//新建弹层任务
            return false;
        }
        if ($('#mask').length == 0) {
            $('body').append('<div id="mask" class="mask hide"></div>');
        }
        $(".confirmcontent").html(msg);
        tag && $("#alertBox .confirmbutton div").html(tag) || $("#alertBox .confirmbutton div").html('好的');
        $("input,textarea").blur();
        $("#numKeyWord").hide();
        $("#mask, #alertBox").show();
        if($(".confirmcontent").height() <= 152){
            $(".confirmcontent").css("padding","0.76rem 0.6933334rem");
        }else{
            $(".confirmcontent").css("padding","0.64rem 0.6933334rem");
        }
        setTimeout(function(){
            $(".popBox").css('opacity',1);
        },10);
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        $('#mask').bind("touchmove",function(e){
            e.preventDefault();
        });
        $("#alertBox .confirmbutton div").one("click", function () {
            $(this).addClass('tapped');
            var m ;
            clearTimeout(m);
            m = setTimeout(function () {
                    $('.tapped').removeClass('tapped');
                }
                , 250);
            if (typeof fn == "function") {
                fn()
            }
            $("#alertBox,#mask").remove();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            //触发弹层任务
            T.doPopTask();
        })
    }
};

window['confirm'] = function (options) {
    T.Util.canShowBigAward('0');//有弹层不可以触发原生大奖弹层
    var options = typeof options == 'string' ? {html:options} : (options||{});
    var html = options.html;
    var cancelText = options.cancelText;
    var okText = options.okText;
    var cancelFun = options.cancelFun;
    var okFun = options.okFun;
    var close = options.close;
    var closeFun = options.closeFun;
    var isHideMask = options.isHideMask;
    var className = options.className;

    var confirmHtml = '<div id="confirmBox" class="popBox' + (className?' '+className:'') + '"><div class="box-inner"><div class="box-content">';
    if(className && className.indexOf('auctionSuccess')>-1){//竞拍成功加上星星背景弹层
        confirmHtml += '<div class="auctionSuccessStarBox"></div>' + (T.isNative?'<span class="btnShare"></span>':'');
    }
    confirmHtml += '<div class="confirmcontent">' + html + '</div>';
    confirmHtml += '<div class="confirmbutton"><div class="cancelText">' + (cancelText||'取消') + '</div><div class="okText">' + (okText||'好的') + '</div></div>';
    if(close) confirmHtml += '<i id="close"></i>';
    confirmHtml += '</div></div></div>';

    if ($('#alertBox').length == 0 && $('#confirmBox').length == 0) {
        $('body').append(confirmHtml);
        setTimeout(function(){
            $("#confirmBox .box-content").addClass("show");
        },0);
    }else{
        T.popTaskList.push({type:'confirm',opt:options});//新建弹层任务
        return false;
    }
    if ($('#mask').length == 0) {
        $('body').append('<div id="mask" class="mask hide"></div>');
    }
    $("input,textarea").blur();
    $("#numKeyWord").hide();
    $("#mask, #confirmBox").show();
    $(".floatWidget").removeClass("show");
    if($(".confirmcontent").height() <= 152){
        $(".confirmcontent").css("padding","0.76rem 0.6933334rem");
    }else{
        $(".confirmcontent").css("padding","0.64rem 0.6933334rem");
    }
    setTimeout(function(){
        $(".popBox").css('opacity',1);
    },10);
    document.documentElement.style.overflow = "hidden";
    $("#confirmBox").bind("touchmove",function(ev){
        var target = ev.target;
        if($(target).is(".popBox")||$(target).is(".box-inner")||$(target).is(".box-content")||$(target).is(".confirmcontent")||$(target).is(".confirmbutton")){
            ev.preventDefault();
        }
    });

    $("#confirmBox .confirmbutton div").eq(0).on(end_ev, function () {
        $("#confirmBox,#mask").remove();
        $(".floatWidget").addClass("show");
        if(isHideMask && isHideMask=='1'){
            $("#confirmBox").hide();
        }else{
            $("#confirmBox,#mask").hide();
        }
        $(this).addClass('tapped');
        var m ;
        clearTimeout(m);
        m = setTimeout(function () {
            $('.tapped').removeClass('tapped');
        }, 250);
        if (typeof cancelFun == "function") {
            cancelFun();
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        //触发弹层任务
        T.doPopTask();
        });
    $("#confirmBox  .confirmbutton div").eq(1).on(end_ev, function () {
        $(".floatWidget").addClass("show");
        if(!options.okNoClose){
            $("#confirmBox,#mask").remove();
            if(isHideMask && isHideMask=='1'){
                $("#confirmBox").hide();
            }else{
                $("#confirmBox,#mask").hide();
            }
            $(this).addClass('tapped');
        }
        var m ;
        clearTimeout(m);
        m = setTimeout(function () {
                $('.tapped').removeClass('tapped');
        },250);
        if (typeof okFun == "function") {
            okFun()
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        //触发弹层任务
        T.doPopTask();
    });
    $("#close").Touch(function(){
        $("#confirmBox,#mask").remove();
        $(".floatWidget").addClass("show");
        if (typeof closeFun == "function") {
            closeFun();
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        //触发弹层任务
        T.doPopTask();
    });
    $('.auctionSuccess .btnShare').off().Touch(function () {
        //拍中商品后“分享”按钮点击量（pzfxdjl_001，数字为商品id）
        T.Util.setUserBehaviorList({
            "busId": T.Util.getPara('id'),
            "conductCode": "pzfxdjl_" + T.Util.getPara('id'),
            "comductDesc": "拍中商品后“分享”按钮点击量",
            "time": new Date().getTime()
        });
        T.Util.screenShot(Global.fullHost + '/auction/view/go.html#page=goodsDetail.html&id=' + T.Util.getPara("id") + '&noNavbar=1&expectNo=' + expectNo + '&isNext=' + T.Util.getPara("isNext") + "&channelCode=" + (Global.isiOS ? 'iosh5':'adh5') + '&appInfo=' + Base64.encode(JSON.stringify(T.Util.getAppInfo())).replace(/\=/g,"_"));//竞拍成功截屏分享
    });
    $('.popBox.layer img').off().Touch(function (el) {
        $("#confirmBox,#mask").remove();
        if (typeof okFun == "function") {
            okFun(el)
        }
    });
};
window['tip'] = function (msg, opt,time) {//如果3个参数 第三个表示消失时间
    //更改tip类型
    if(!opt||T.Util.getStrLen(msg) > 16){
        opt = 'normal';
    }
    //首页直接调用原生tip框
    if(/go.html#page=index.html/.test(window.location.href) && T.isNative){
        T.Util.showNativeTip(msg,opt);
        return false;
    }
    //排除重复tip框
    if(Global.hasTipBox){
        clearTimeout(T.showNextTip);
        T.showNextTip = setTimeout(function(){
            $('#tipBox').remove();
            Global.hasTipBox = false;
            tip(msg,opt);
        },1);
        return false;
    }
    Global.hasTipBox = true;
    if ($('#masktip').length && opt == 'loading') { //多次调用loading
        return;
    }
    $('.alertBox').add($('#masktip')).remove();
    clearTimeout(window.alert.time);
    $("input,textarea").blur();
    $("#numKeyWord").hide();
    if (opt == 'ok' || opt == 'error' || opt == 'loading' || opt == 'warn'|| opt == 'normal' || opt == 'big') {
        var loadingHtml = '<em></em><em></em><em></em><em></em><em></em><em></em><em></em><em></em><em></em><em></em><em></em><em></em>';
        var tipHtml = '<div id="tipBox" class="tipBox ' + opt + '"><div id="tipcell"><div id="tipcontent">';
        tipHtml += '<span class="tipicon" id="' + opt + '">' + (opt=='loading'?loadingHtml:'') + '</span>';
        tipHtml += '<p>' + msg + '</p></div></div></div>';
        tipHtml = $(tipHtml);
        setTimeout(function () {	//防止上面的remove代码导致不能显示出alert
            $('body').append(tipHtml);
            if($("#tipcontent").width() > document.documentElement.clientWidth - 192){
                $("#tipcontent").css('width',document.documentElement.clientWidth - 192);
            }
            if(/go.html#page=index.html/.test(window.location.href)){
                $("#tipcontent").css('top',"0.2rem");
            }
            if(opt == 'normal'){
                $("#tipBox").css({"top":"calc(50% - " + 0.5 * $("#tipBox").height() + "px)"});
            }
            if (opt != 'loading') {
                tipHtml.animate({
                    opacity: 1
                }, 400, 'swing', function () {
                    setTimeout(function () {
                        tipHtml.animate({
                            opacity: 0
                        }, 500, 'swing', function () {
                            Global.hasTipBox = false;
                            tipHtml.remove();
                        });
                    }, time||600)
                });
            } else {
                tipHtml.animate({
                    opacity: 1
                }, 400,'swing',function(){
                    Global.hasTipBox = false;
                });
            }
        }, 0);
    } else {
        pageLoading.show(1);
    }
};

//浮层控件
window["showFloat"] = function(options){
    var options = typeof options == 'string' ? {html:options} : (options||{});
    var className = options.className;
    var html = options.html;
    var time = options.time||3000;
    var activeText = options.activeText||'立即查看>';
    var activeFun = options.activeFun;

    if($("#float").length){
        $("#float").addClass(className);
        $("#float #floatContent").html(html);
        $("#float #floatButton").html(activeText);
    }else{
        var floatHtml = '<div id="float" class="' + className + '" style="top:' + $("#navtitle").height() + 'px"><div id="floatContent">' + html + '</div><em id="floatButton">' + activeText + '</em></div>';
        options.dom ? options.dom.prepend(floatHtml) : $("#main").prepend(floatHtml);
    }
    $("#float").animate({"margin-top":"0rem"},400);

    if(time != 'forever'){
        clearTimeout(Global.floatTimer);
        Global.floatTimer = setTimeout(function(){
            $("#float").animate({"margin-top":"-" + $("#float").height() + "px"},400);
        },time);
    }

    $("#float").off().Touch(function(){
        activeFun && activeFun();
    });
}

//数字文本框
$.fn.NumInput = function(options){
    this.each(function(){
        var o= {
            max:999999999,//最大值
            min:1,//最小值
            val:1,//默认值
            up:'.up',//上点击dom
            down:'.down',//下点击dom
            num:1,//加减间隔
            float:0,
            pad:1,//补零位数
            ts:this,
            fn:function(){},//回调函数
            focusFn:null,//
            blurFn:null//失焦回调
        };
        if (options) {
            $.extend(o, options);
        }else{
            o.val=$(this).val()||1;
        }
        var $ipt=$(this);
        var $up=$ipt.parent().find(o.up);
        var $down=$ipt.parent().find(o.down);
        $ipt.val(o.val);
        var _val=$ipt.val();
        //加法
        var doAdd=function() {
            var n1 = parseFloat($ipt.val());//原数字
            if (!n1) {
                n1 = 0;
            }
            var n2 = n1 + o.num;//新数字
            $ipt.val(parseFloat((n2 > o.max ? n1 : n2).toFixed(o['float'])));
            //$ipt.focus();
            o.blurFn ? o.blurFn() : o.fn();
            classChange();
        };
        var doMinus=function(){
            var n1 = parseFloat($ipt.val());//原数字
            if(!n1){
                n1 = 1;
            }
            var n2 = n1 - o.num;//新数字
            $ipt.val(parseFloat((n2<o.min?n1:n2).toFixed(o['float'])));
            o.blurFn ? o.blurFn() : o.fn();
            classChange();
        };

        $ipt.off().on("touchstart",function(event){
            o.focusFn ? o.focusFn() : o.fn();
            event.stopPropagation();
        }).blur(function(){
            if($ipt.val()==''){
                $ipt.val(o.val)
            }
            if ($ipt.val() > o.max) {
                $ipt.val(o.max);
            } else if ($ipt.val() < o.min) {
                $ipt.val(o.min);
            }
            o.blurFn ? o.blurFn() : o.fn();
        }).on("keyup",function(e){
            var str = $ipt.val().match(/\d{1,}(\.\d{0,}){0,1}/);
            str = (str && str[0]) || '';
            if (str != '') {
                $ipt.val(parseFloat(parseFloat(str).toFixed(o['float'])));
                if(o.min<2){
                    if ($ipt.val() > o.max) {
                        $ipt.val(o.max);
                    } else if ($ipt.val() < o.min) {
                        $ipt.val(o.min);
                    }
                }
                if (isNaN($ipt.val())) {
                    $ipt.val(o.val);
                }
            } else {
                $ipt.val('');
            }
            o.fn();
            classChange();
        });

        $up.length>0 && $up.off().Touch(function(){
            if(!$ipt.hasClass('disable')){
                doAdd();
            }
        });

        !$ipt.hasClass('disable')&&$down.length>0 && $down.off().Touch(function(){
            if(!$ipt.hasClass('disable')){
                doMinus();
            }
        });

        function classChange(){
            $ipt.siblings().removeClass('no-click');
            if($ipt.val()==o.min){
                $ipt.prev().addClass('no-click');
            }
            if($ipt.val()==o.max){
                $ipt.next().addClass('no-click');
            }
        }
        classChange();
    });
    return this;
};

var pageLoading = {
    show: function (black, msg) {
        if ($('#tipBox').length == 0) {
            tip(msg || '', 'loading');
        } else {
            return;
        }
        if (black) {
            if ($('#mask').length == 0) {
                $(document.body).append($('<div id="mask" class="mask"></div>'));
            }
            $('#mask').height(window.innerHeight + 'px').show();
        }
    },
    hide: function (ifFadeOut) {
        if(/go.html#page=index.html/.test(window.location.href) && T.isNative){
            T.Util.hideNativeTip();//隐藏原生tip框
        }else{
            setTimeout(function(){
                var e = $("#tipBox");
                if (!e.is('.loading'))return;
                if (ifFadeOut == 1) {
                    $('.tipBox').add($('#mask')).remove();
                } else {
                    $("#tipBox").add($("#mask")).animate({
                        opacity: 0
                    }, 400, 'easing', function () {
                        $(this).remove()
                    });
                    setTimeout(function(){
                        $("#tipBox.loading").remove();
                    },399);
                }
            },10);
        }
    }
};

var connectSuccessFlag = 0;//是否存在ws成功连接标示 0 初始化 失败 1 成功 2没有返回成功或者失败正在链接中
var wsClient = null;//ws连接客户端标示
var wsClientNum = 0;
var globalMQArr=[];
T.Util = {
    concat_: function(arr1,arr2){//合并两个数组，去重
        //不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
        var arr = arr1.concat();
        //或者使用slice()复制，var arr = arr1.slice(0)
        for(var i=0;i<arr2.length;i++){
            arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
        }
        return arr;
    },
    ruleRefresh:function(wrap){
        var iEleHeight    = $(wrap)[0].offsetHeight;
        var iScrollHeight = $(wrap)[0].scrollHeight;
        if(iScrollHeight >= iEleHeight && iScrollHeight >= Math.max(document.documentElement.clientHeight,window.screen.height)){
            noMore($(wrap));
        }
    },
    showDefaultPic:function(imgItem){
        $(imgItem).attr("src","../img/goods/lazy_load.png");
    },
    isEmpty : function(obj){
        if(Object.prototype.toString.call(obj) == "[object Object]"){
            var i;
            for(i in obj){
                return false
            }
            return true;
        }
        if(obj == null || typeof (obj) == "undefined" || obj == undefined || obj == "undefined" || (""+obj).toUpperCase() == "NULL" || ""+obj == ""){ // 0 == "" ->true
            return true ;
        }

        return false ;
    },
    repeat:function(val,len){
        var html = [];
        for(var i = 0;i < len;i++){
            html.push(val);
        }
        return html.join("");
    },
    //数字文本框正则校验
    numReg:function(val,str){
        if(val){
            if(/\.\d{2}/.test(val)){
                return false;
            }else{
                if(/\./.test(val)){
                    return /[0-9]/.test(str);
                }else{
                    return /[0-9.]/.test(str);
                }
            }
        }else{
            return /[0-9]/.test(str);
        }
    },
    numFormat:function(num){
        if(parseFloat(num) > 0){
            return '+' + num;
        }else{
            return num;
        }
    },
    getTranslate:function(selector){
        var transform = $(selector).css('transform'),webkitTransform = $(selector).css('-webkit-transform');
        var translate = [],x = 0,y = 0;
        if(transform){
            translate = transform.replace(/\sscale.*/g,"").replace(/[^0-9\-,.]/g,'').split(',');
        }else{
            translate = webkitTransform.replace(/\stranslateZ.*/g,"").replace(/[^0-9\-,.]/g,'').split(',');
        }
        x = parseInt(translate[0]),y = parseInt(translate[1]);
        return [x,y];
    },
    priceFormat:function(price){
        var price = Number(price).toFixed(2);
        return '<em>' + price.split(".")[0] + '.</em><em>' + price.split(".")[1] + '</em>';
    },
    //获取当前时间
    getCurrentTime :function(){
        if(Global.caseTime==-1){
            Global.caseTime= Date.parse(new Date())/1000-1451624399;
        }
        return Global.caseTime++;
    },
    //获取零点时间戳
    getZeroTime:function(time){
        var time = time ? new Date(time) : new Date();
        return time.getTime() - 3600000 * time.getHours() - 60000 * time.getMinutes() - 1000 * time.getSeconds();
    },
    //获取周几
    getWeekStr:function(time){
        var weekStr = ["周日","周一","周二","周三","周四","周五","周六"];
        return weekStr[new Date(time).getDay()];
    },
    //将数据组装到URL中
    dataToUrl:function(url,data){
        var initUrl = url;
        var dataUrl = "";
        $.each(data,function(i,item){
            dataUrl += ((initUrl.indexOf("?") < 0 && !dataUrl) ? "?":"&") + i + "=" + ((Global.isiOS && T.isNative && /[\u4E00-\u9FA5]/.test(item)) ? encodeURIComponent(encodeURIComponent(item)) : item);
        });
        return dataUrl;
    },
    //阻止滑动
    preventDefault:function() {
        $(document).bind("touchmove",function(e){
            e.preventDefault();
        });
    },
    //允许滑动
    unPreventDefault:function(){
        $(document).unbind("touchmove");
    },
    //复制到剪贴板
    copyToClipboard:function(text,isSlient){
        try{
            clipboard.writeText(text);
            !isSlient && tip("复制成功","ok");
        }catch(e){
            !isSlient && tip("不支持剪贴板","error");
        }
    },
    //获取平台类型
    getPlatform:function(){
        Global.platform = "";
        if(T.isNative){
            Global.platform = "app";
        }else if(Global.isWechat){
            Global.platform = "wechat";
        }else if(Global.isQQ){
            Global.platform = "QQ";
        }else if(Global.isWeibo){
            Global.platform = "weibo";
        }else{
            Global.platform = "safari";
        }
        return Global.platform;
    },
    //获取App信息
    getAppInfo:function(key){
        var appInfo;
        if(T.isNative){
            var userAgent = navigator.userAgent;
            appInfo = JSON.parse(userAgent.slice(userAgent.indexOf('appInfo/') + 8,userAgent.length).split('X-Tingyun-Id')[0])||{};
        }else if(T.Util.getPara("appInfo")) {
            appInfo = JSON.parse(Base64.decode(T.Util.getPara("appInfo").replace(/_/g,"=")));
        }else if(T.Storage.get("appInfo",1)) {
            appInfo = T.Storage.get("appInfo",1);
        }else{
            appInfo = {
                "appName":"掌上乐购",
                "appVersion":"1.0.2",//登录接口兼容
                "bundleID":"com.jingpai.h5",
                "appleID":"1370760333",
                "initChannelCode":Global.isiOS ? 'iosh5':'adh5',
                "channelCode":Global.isiOS ? 'iosh5':'adh5',
                "model":"iPhone",
                "deviceModel":"iPhone X",
                "isIphoneX":"1",
                "version":"11.2.1",
                "deviceID":T.Storage.get('deviceFinger')||"63FD672A-7110-4B05-93ED-C406D6FFEC57"
            }
        }
        //安卓在ua中传入的appName值为null，需额外从init事件中取
        if(T.Util.isEmpty(appInfo["appName"])){
            appInfo["appName"] = Global.appName;
        }
        //优选商城(wangmeng)的appleID传错了，需要额外校正
        var channelCode = T.Util.getPara("channelCode") ? T.Util.getPara("channelCode") : appInfo["channelCode"];
        if(channelCode == "wangmeng"){
            appInfo["appleID"] = "1355600249";
        }
        //非原生登录接口兼容
        if(!T.isNative && T.Util.getAppVersion(appInfo["appVersion"]) < 102){
            appInfo["appVersion"] = "1.0.2";
        }
        //h5渠道
        if(!T.isNative && T.Util.getPara("channelCode")){
            appInfo["channelCode"] = T.Util.getPara("channelCode");
        }
        //特殊校正
        for(var p in appInfo){
            if(T.Util.getPara(p)){
                appInfo[p] = T.Util.getPara(p);
            }
        }
        //将校正后的appInfo存入storage中
        T.Storage.set("appInfo",appInfo,1);
        return key ? appInfo[key]||"":appInfo;
    },
    //设置App信息
    setAppInfo:function(opt){
        if(typeof opt != 'object') return false;
        var appInfo = T.Util.getAppInfo();
        for(var p in opt){
            appInfo[p] = opt[p];
        }
        T.Storage.set("appInfo",appInfo,1);
    },
    //获取app版本号
    getAppVersion:function(appVerStr){
        return parseInt((appVerStr||T.Util.getAppInfo("appVersion")).replace(/\./g,""));
    },
    //获取设备类型
    getDeviceType:function(){
        if(/iosh5/.test(T.Util.getAppInfo('channelCode'))){
            return 'ios';
        }else if(/adh5/.test(T.Util.getAppInfo('channelCode'))){
            return 'Android';
        }else{
            return Global.isiOS ? "ios" : "Android";
        }
    },
    //发送设备指纹
    sendDeviceFinger:function(options){
        if(T.Util.isThirdChannelPage()){
            options = options||{};
            var fpNum = "";
            var fp = new DeviceFingerPrint();
            fp.get(function(result, components){
                fpNum = result;
                T.Storage.set('deviceFinger',result);
                var channelCode = T.Util.getAppInfo('channelCode');
                T.Util.xmlHttpRequest({
                    type:'post',
                    errorType:1,
                    reqData:{deviceH5Cd:result,deviceWidth:screen.width,deviceHeight:screen.height,otherChannelCode:channelCode,browserType:Global.isWechat?"wechat":"safari",url:window.location.href.split(/[?#]/g)[0],deviceType:Global.isiOS?"ios":"android"},
                    reqUrl:"/user/services/user/setAppChannelH5",
                    callback:function(json){
                        Global.fpCode = json.res_data.fpCode;
                        T.Storage.set('inviteChannelCode',json.res_data.fpCode,1);
                        //下载
                        $("#downbtn,.download,.appDownload .okText").off().Touch(function(){
                            T.Util.appDownload($.extend(options,{obj:$(this)}));
                        });
                    },
                    errorCallback:function(data){
                        $("#downbtn,.download,.appDownload .okText").off().Touch(function(){
                            tip(Global.neterror);
                            T.Util.appDownload($.extend(options,{obj:$(this)}));
                        });
                    }
                });
            });
        }
    },
    //用户行为即时上报
    sendUserBehavior:function(opt){
        var userinfo = T.Storage.get('userinfo')||{};
        var appinfo = T.Util.getAppInfo()||{};
        var sessionId = T.Storage.get('sessionId',1);
        T.Util.xmlHttpRequest({
            type:'post',
            errorType:1,
            reqData:{
                "userId":userinfo["userId"],
                "deviceId": appinfo["deviceID"],
                "appVersion": appinfo["appVersion"],
                "deviceVersion": "1.0.3",
                "channelCode": appinfo["channelCode"],
                "sessionId":sessionId,//第一次不传
                "list": [{
                    "busId": T.Util.getAppInfo("channelCode"),
                    "conductCode": opt && opt.code,
                    "comductDesc": opt && opt.event,
                    "browsType":T.Util.getPlatform(),
                    "time": new Date().getTime()
                }]
            },
            reqUrl:"/commodity/services/product/conduct.json",
            callback:function(json){
                if(json.res_data && json.res_data.value){
                    T.Storage.set("sessionId",json.res_data.value,1);
                }
                opt.callback && opt.callback();
            },
            errorCallback:function(data){
                $("#downbtn").off().Touch(function(){
                    tip(data.msg||Global.neterror);
                });
                opt.callback && opt.callback();
            }
        });
        clearTimeout(Global.sendUserBehaviorTimeout);
        Global.sendUserBehaviorTimeout = setTimeout(function(){
            T.Util.sendUserBehavior({code:'APP_DOWNLOAD_' + T.Util.getAppInfo("initChannelCode").toUpperCase() +'_SESSION_TIME',event:'APP下载停留时间'});
        },3000);
    },
    //将用户行为写入用户行为事件库
    setUserBehaviorList:function(opt){
        var userBehaviorList = T.Storage.get('userBehaviorList')||[];//用户行为事件库
        if(opt instanceof Array){
            userBehaviorList.concat(opt);
        }else if(opt instanceof Object){
            userBehaviorList.push(opt);
        }
        T.Storage.set('userBehaviorList',userBehaviorList);
    },
    //用户行为定时批量上报
    sendUserBehaviorList:function(opt){
        opt = opt||{};
        //监听用户行为事件库变化，当容量达到10条或时间达到1分钟则进行上报
        clearInterval(Global.sendUserBehaviorListTimer);
        Global.sendUserBehaviorListTimer = setInterval(function(){
            var userBehaviorList = T.Storage.get('userBehaviorList')||[];//用户行为事件库
            var userBehaviorTime  = Number(T.Storage.get('userBehaviorTime')||0);//用户行为累计时间
            //用户行为累计时间递增
            userBehaviorTime += 1;
            T.Storage.set('userBehaviorTime',userBehaviorTime);
            //满足上报条件则进行上报
            if(userBehaviorList.length >= 10||(userBehaviorTime >= 60 && userBehaviorList.length >= 1)){
                var userinfo = T.Storage.get('userinfo')||{};
                var appinfo = T.Util.getAppInfo()||{};
                var sessionId = T.Storage.get('sessionId',1);
                //用户行为事件库添加统一字段
                for(var p in userBehaviorList){
                    userBehaviorList[p].browsType = T.Util.getPlatform();
                }
                //预清空用户行为事件库及用户行为累计时间
                T.Storage.remove('userBehaviorList');
                T.Storage.remove('userBehaviorTime');
                T.Util.xmlHttpRequest({
                    type:'post',
                    errorType:1,
                    reqData:{
                        "userId":userinfo["userId"],
                        "deviceId": appinfo["deviceID"],
                        "appVersion": appinfo["appVersion"],
                        "deviceVersion": "1.0.3",
                        "channelCode": appinfo["channelCode"],
                        "sessionId":sessionId,//第一次不传
                        "list": userBehaviorList
                    },
                    reqUrl:"/commodity/services/product/conduct.json",
                    callback:function(json){
                        if(json.res_data && json.res_data.value){
                            T.Storage.set("sessionId",json.res_data.value,1);
                        }
                        opt.callback && opt.callback();
                    },
                    errorCallback:function(data){
                        //若上报失败，则将清空的缓存还原
                        T.Util.setUserBehaviorList(userBehaviorList);
                        opt.callback && opt.callback();
                    }
                });
            }
        },1000);
    },
    //判断是否为测试环境
    isTestEnv:function(){
        return /localhost/.test(Global.fullHost)||/dev.ruirun123.cn/.test(Global.fullHost)||/192.168.*.*/.test(Global.fullHost);
    },
    //获取下载链接
    getDownloadUrl:function(){
        var appInfo = T.Util.getAppInfo();
        var fullHost = Global.fullHost.replace('http://localhost','https://dev.ruirun123.cn:6443');
        if(appInfo["channelCode"] == "zspjpqy"){
            return fullHost + (T.Util.isTestEnv()?'/pc':'') + '/download/enterprise.html';
        }else{
            return fullHost + (T.Util.isTestEnv()?'/pc':'') + '/download/index.html?appCode=' + Global.appCode + '&channelCode=' + appInfo["channelCode"] + '&bundleID=' + appInfo["bundleID"] + '&appleID=' + appInfo["appleID"] + '&time=' + new Date().getTime();
        }
    },
    //判断是否为第三方推广渠道
    isThirdChannel:function(){
        var thirdChannel = ['zuimei','tuia','wangyi','jrtt','toutiao','baidull','meizu'];
        var channelCode  = T.Util.getAppInfo('channelCode');
        var shortUrl = T.Util.getShortUrl(window.location.href);
        for(var i = 0;i < thirdChannel.length;i++){
            if(shortUrl.match(thirdChannel[i])||channelCode.match(thirdChannel[i])){
                return true;
            }
        }
        return false;
    },
    //判断是否为第三方推广渠道的下载落地页
    isThirdChannelPage:function(){
        var thirdChannel = ['zuimei','tuia','wangyi','jrtt','toutiao','baidull','meizu'];
        var shortUrl = T.Util.getShortUrl(window.location.href);
        for(var i = 0;i < thirdChannel.length;i++){
            if(shortUrl.match(thirdChannel[i])){
                return true;
            }
        }
        return false;
    },
    //初始化第三方推广渠道
    initThirdChannel:function(){
        if(T.Util.isThirdChannelPage()){
            var channelCode = T.Util.getShortUrl(window.location.href).replace("dl","").replace('jrtt',"toutiao");
            var initChannelCode = channelCode;
            if(/jrtt\d.html/.test(window.location.href)){
                channelCode = channelCode + (Global.isiOS?"":"1");
            }else if(/meizu.html/.test(window.location.href)){
                channelCode = Global.isiOS ? "legou" : channelCode + "1";
            }else if(/wangyi/.test(channelCode) && Global.isiOS){
                channelCode += 'ios';
            }else if(/baidull/.test(channelCode) && !Global.isiOS){
                channelCode = 'lg'+channelCode;
                initChannelCode = channelCode;
            }
            T.Util.setAppInfo({
                initChannelCode:initChannelCode,
                channelCode:channelCode
            });
        }
    },
    //获取APP下载链接
    getAppDownloadUrl:function(){
        //根据不同的推广渠道下载不同的包
        if(T.Util.isThirdChannel()){//第三方推广渠道
            if(/meizu/.test(T.Util.getAppInfo("initChannelCode"))){//跳转魅族应用市场
                return {
                    and:'http://app.meizu.com/apps/public/detail?package_name=com.zslg.lot'
                }
            }else{
                return {
                    and:'http://jp.zsp66.com/dl/android/zsp/zslg_' + T.Util.getAppInfo("initChannelCode") + '.apk'
                }
            }
        }else{
            return {
                and:'http://a.app.qq.com/o/simple.jsp?pkgname=com.zslg.lot&from=singlemessage'//自有渠道
            }
        }
    },
    //初始化下载APP
    initAppDownload:function(options){
        options = options||{};
        var appleID = T.Util.getAppInfo("appleID");
        appleID = T.Util.isEmpty(appleID) ? "1370760333" : appleID;
        if(T.Util.isThirdChannel()){
            //初始化第三方推广渠道
            T.Util.initThirdChannel();
            //发送设备指纹
            T.Util.sendDeviceFinger(options);
            //用户行为上报
            T.Util.sendUserBehavior({code:'APP_DOWNLOAD_' + T.Util.getAppInfo("initChannelCode").toUpperCase() + '_PV',event:'APP下载PV'});
        }
        //在浏览器中打开时带入登录态
        if(T.Util.getPara('access_token')){
            T.Storage.set('access_token',T.Util.getPara('access_token'));
        }
        //绑定下载事件
        $("#downbtn,.download,.appDownload .okText").off().Touch(function(){
            T.Util.appDownload({obj:$(this)});
        });
        if(T.Util.getPara('initdownload')){
            setTimeout(function(){
                if(Global.isiOS){
                    if(options && options.type == 'qiye'){
                        T.Util.openWindow('itms-services://?action=download-manifest&url=https://jp.zsp66.com/dl/ios/szpjpqy_release_100.plist');
                        T.Util.showInstallProgress(options);
                    }else{
                        T.Util.openWindow('itms-apps://itunes.apple.com/app/tap-black-to-white/id'+appleID);
                    }
                }else{
                    T.Util.openWindow(T.Util.getAppDownloadUrl()["and"]);
                }
            },10);
        }
    },
    //下载APP
    appDownload:function(options){
        options = options||{};
        if(T.Util.isThirdChannel()){
            Global.fpCode = Global.fpCode||T.Storage.get('inviteChannelCode',1);
            if(Global.fpCode){//复制设备指纹
                T.Util.copyToClipboard(Global.fpCode,true);
            }else if(T.Util.isThirdChannelPage()){
                return tip("设备指纹上报中，请稍后...");
            }
            //用户行为上报
            $.extend(options,{CLICK_TYPE:(options.obj && options.obj.is(".okText"))?"POPUP":"BUTTON"});
            T.Util.sendUserBehavior({code:'APP_DOWNLOAD_' + T.Util.getAppInfo("initChannelCode").toUpperCase() +'_CLICK_' + options.CLICK_TYPE,event:'点击' + (options.CLICK_TYPE=='POPUP'?"弹层":"按钮") + '下载'});
        }
        //下载
        setTimeout(function(){
            if(Global.isiOS){
                var appleID = T.Util.getAppInfo("appleID");
                appleID = T.Util.isEmpty(appleID) ? "1370760333" : appleID;
                if(Global.isWeibo||(options && options.type == 'qiye' && Global.isWechat)){
                    confirm({className:'openInBrowser',html:'<img src="../img/download/open_in_safari.png">'});
                    setTimeout(function(){
                        $(".box-content").off().Touch(function(){
                            $("#confirmBox,#mask").remove();
                        });
                    },0);
                    window.location.hash = T.Util.addHashPara({'initdownload':true,'access_token':T.Storage.get('access_token')});
                }else{
                    if(options && options.type == 'qiye'){
                        T.Util.openWindow('itms-services://?action=download-manifest&url=https://jp.zsp66.com/dl/ios/szpjpqy_release_100.plist');
                        T.Util.showInstallProgress(options);
                    }else{
                        T.Util.openWindow('itms-apps://itunes.apple.com/app/tap-black-to-white/id'+appleID);
                    }
                }
            }else{
                if(Global.isWechat){
                    confirm({className:'openInBrowser',html:'<img src="../img/download/open_in_browser.png">'});
                    setTimeout(function(){
                        $(".box-content").off().Touch(function(){
                            $("#confirmBox,#mask").remove();
                        });
                    },0);
                    window.location.hash = T.Util.addHashPara({'initdownload':true,'access_token':T.Storage.get('access_token')});
                }else{
                    T.Util.openWindow(T.Util.getAppDownloadUrl()["and"]);
                }
            }
        },Global.isiOS?0:250);
        //转化统计
        if(/tuia.html/.test(window.location.href)){
            //推啊转化统计
            try{
                countLog.init();
            }catch(e){

            }
        }else if(/jrtt\d.html/.test(window.location.href)){
            var jjttConvertId = [];
            if(/dljrtt\d.html/.test(window.location.href)){
                jjttConvertId = ["1605030500051975","1605030746869783","1605030522724365","1605030808788030","1605030722488381"];
            }else{
                jjttConvertId = ["1598250557862973","1598250805177383","1600075534182413","1600076320911395","1600076329624637"];
            }
            var jrttIndex = T.Util.getShortUrl().slice(-1);
            //今日头条转化跟踪转化代码
            try{
                _taq.push({convert_id: jjttConvertId[jrttIndex - 1], event_type: "download_start"});
            }catch(e){

            }
        }
    },
    //显示安装进度
    showInstallProgress:function(options){
        setTimeout(function(){
            var progress = 3;//安装进度
            var progressStatus = "安装中...";
            var confirmObj = {
                className:'userDefined install',
                html:'<div id="progress"><em id="progressBar" style="width:' + progress + '%;"></em></div><h2>' + progressStatus + '</h2>',
                cancelText:' ',
                cancelFun:function(){
                    T.Util.openWindow('../csp.mobileprovision');
                },
                okText:/surpriseQiYe.html/.test(window.location.href) ? ' ' : '安装说明',
                okFun:function(){
                    confirm({
                        className:'userDefined shuoming',
                        html:' ',
                        okText:' ',
                        cancelText:' ',
                        close:true,
                        closeFun:function(){
                            showConfirm();
                        }
                    });
                },
                close:true
            }
            function showConfirm(){
                if(progress >= 96){
                    progressStatus = '安装完成';
                }
                confirmObj.html = '<div id="progress"><em id="progressBar" style="width:' + progress + '%;"></em></div><h2>' + progressStatus + '</h2>';
                confirm(confirmObj);
            }
            showConfirm();
            setTimeout(function(){
                progress = parseFloat($("#progressBar").css("width"));
                clearInterval(Global.progressInterval);
                Global.progressInterval = setInterval(function(){
                    progress += 1;
                    $("#progressBar").css("width",progress + "%");
                    if(progress >= 100){
                        clearInterval(Global.progressInterval);
                        $(".confirmcontent h2").text("安装完成");
                    }
                },200);
            },500);
        },3000);
    },
    //获取applogo
    getAppLogo:function(isLocal){
        var channelCode = T.Util.getAppInfo("channelCode");
        //安卓h5、iosh5、企业版统一使用掌上乐购的logo
        if(channelCode == "adh5"||channelCode == "iosh5"||/qiye/.test(channelCode)){
            channelCode = "legou";
        }
        if(!T.Util.isEmpty(T.Util.getAppInfo("appleID"))){
            if(isLocal){
                return T.Util.getRootPath()+'/'+Global.webRoot+'/img/logo/' + channelCode + ".png";
            }else{
                return Global.fullHost + "/auction/img/logo/" + channelCode + ".png";
            }
        }else{
            if(isLocal){
                return T.Util.getRootPath()+'/'+Global.webRoot+'/img/logo/legou.png';
            }else{
                return Global.fullHost + "/auction/img/logo/legou.png";
            }
        }
    },
    //获取分享文案
    getShareText:function(){
        var channelCode = T.Util.getAppInfo("channelCode");
        var appName = T.Util.getAppInfo("appName");

        return {
            title:appName + "，更省钱的正品购物app",
            description:"23.8万人正在使用的购物app，购物更优惠，更省钱就上" + appName
        }
    },
    bin2hex:function(str) {
        var result = "";
        for (var i = 0; i < str.length; i++ ) {
            var c = str.charCodeAt(i);
            result += T.Util.byte2Hex(c>>8 & 0xff);
            result += T.Util.byte2Hex(c & 0xff);
        }
        return result;
    },
    byte2Hex :function (b) {
        if(b < 0x10)
            return "0" + b.toString(16);
        else
            return b.toString(16);
    },
    trim:function(val){
        return String(val).replace(/\s/g,"");
    },
    //判断是否为汉字
    isPureChinese:function(str){
        var strArr = str.split("");
        var isChinese = false;
        for(var i = 0;i < strArr.length;i++){
            if(/[\u4E00-\u9FA5]/.test(strArr[i])){
                isChinese = true;
            }else{
                return false;
            }
        }
        return isChinese;
    },
    //获取字节长度
    getStrLen:function(str){
        var strArr = str.split("");
        var strLen = 0;
        $.each(strArr,function(i,item){
            if(/[\u4E00-\u9FA5]/.test(item)){
                strLen += 2;
            }else{
                strLen += 1;
            }
        });
        return strLen;
    },
    //字节截取
    strSlice:function(str,len){
        var strArr = str.split("");
        var strLen = 0;
        var sliceStr = '';
        for(var i = 0;i < strArr.length;i++){
            if(/[\u4E00-\u9FA5]/.test(strArr[i])){
                strLen += 2;
            }else{
                strLen += 1;
            }
            if(strLen <= len){
                sliceStr += strArr[i];
            }else{
                return sliceStr + '...';
            }
        }
        return sliceStr;
    },
    //字符隐藏
    hideMidStr:function(str,start,end){
        var len = String(str).length;
        return str.slice(0,start) + str.slice(start,len - end).replace(/\d/g,"*") + str.slice(len - end,len);
    },
    //获取完整的图片资源路径
    getFullPic:function(imgUrl){
        if(/^http/.test(imgUrl)){
            return imgUrl;
        }else{
            return Global.fullHost + imgUrl;
        }
    },
    builder:function (txt){
        try{
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var txt = !txt ? window.location.origin : txt;
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "buyin";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125,1,62,20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
            var bin = atob(b64);
            return T.Util.bin2hex(bin.slice(-16,-12));
        }catch(error){
            console.error(error);
            return null;
        }
    },
    getDeviceCode :function (key){
        var crc;
        if(window.localStorage){
            crc = window.localStorage.getItem(key);
            if(crc){
                return crc;
            }
        }
        crc = T.Util.builder(key);
        if(crc){
            window.localStorage && window.localStorage.setItem(key,crc);
        }
        return crc;

    },
    xmlHttpRequest: function (_config) {
        if(Global.netWorkStatus==0){//没有网络并且不是首页 返回timeout
            if(Global.OS=='IOS'){
                if(T.Util.getAppInfo().appVersion!='1.0.0'){
                    if(!(/go.html#page=index.html/.test(window.location.href))){//首页不弹网络异常
                        tip(Global.neterror,'error');
                    }
                    if(_config.errorCallback){
                        _config.errorCallback(null,{},'timeout');
                    }
                    return;
                }
            }else{
                if(!(/go.html#page=index.html/.test(window.location.href))){//首页不弹网络异常
                    tip(Global.neterror,'error');
                }
                if(_config.errorCallback){
                    _config.errorCallback(null,{},'timeout');
                }
                return;
            }


        }//无网return;
        var requestObj = {};
        var beginTime = new Date().getTime();
        var needToken = 1;
        if(_config.needToken && _config.needToken=='no'){needToken = 0}
        var _url = Global.fullHost + _config.reqUrl;
        if (_config.hostFlag == "auth") {
            _url = Global.authHost + _config.reqUrl
        } else if (_config.hostFlag == "own") {
            _url = _config.reqUrl
        } else if (_config.hostFlag == "appweb") {
            _url = Global.apiHost + _config.reqUrl
        }

        if(_config.type && _config.type.toLowerCase() == "get"){
            if(_url.indexOf("?") != -1){
                _url +="&time="+beginTime ;
            }else{
                _url +="?time="+beginTime ;
            }
            requestObj.req_method = "GET";
        }else{
            if(_config.reqData){
                _config.reqData.time = beginTime ;
            }
            requestObj.req_method = "POST";
        }
        requestObj.req_url = encodeURIComponent(_url) ;
        if(!T.Util.isEmpty(T.Storage.get("userinfo"))){
            requestObj.user_code = T.Storage.get("userinfo").user_no ;
        }

        var headersObj = {'devicefp':Global.devicefp,'Language':Global.language,'d-version':_config.version ? _config.version:Global.h_version,
            'tId':'h5-'+T.Util.getAppInfo("channelCode")+ new Date().getTime()+"-"+ T.Util.getAppInfo('deviceID'),'client-os':Global.OS,// 渠道 cCode 包名bName 版本aVersion
            'rId': T.Util.getDeviceCode('auctionRid'),
            'deviceID':T.Util.getAppInfo('deviceID'),
            'cCode':T.Util.getAppInfo("channelCode"),
            'bName':T.Util.getAppInfo("bundleID"),'aVersion':T.Util.getAppInfo("appVersion")};
        if(!T.Util.isEmpty(T.Storage.get("access_token")) && needToken) {
            headersObj.Authenticate = T.Storage.get("access_token");
        }

        $.ajax({
            type: _config.type ? _config.type : 'POST',
            url: _url,
            data: JSON.stringify(_config.reqData),
            dataType: _config.dataType ? _config.dataType : 'json',
            timeout: _config.timeout ? _config.timeout : 30000,
            contentType: "application/json;charset=utf-8",
            headers:headersObj,
            async: (_config.async != undefined) ? _config.async : true,
            success: function (data,textStatus,xhr) {
                if(_config.reqUrl.indexOf('/commodity/services/template/GET_EXPECT_INFO.json') !=0){
                    pageLoading.hide();
                }
                requestObj.req_status = "200";
                var finishTime = new Date().getTime();
                requestObj.expend_time = finishTime - beginTime;
                requestObj.submit_model = "AJAX";
                var difTime = 0;
                try{
                    var serverTimer = new Date(xhr.getResponseHeader("Date")).getTime();
                    var local_cur_time = new Date().getTime();
                    difTime = local_cur_time - serverTimer;
                }catch(e){}
                T.Storage.set("difTime",difTime);
                if (data.msg_code && data.msg_code == 0) {
                    _config.callback(data,textStatus,xhr);
                }else if(data.message_code && data.message_code == 1000) {
                    _config.callback(data,textStatus,xhr);
                } else {
                    var errorMsg = data.msg || data.result_msg || 'no-data';
                    requestObj.res_error = errorMsg.substring(0,20);
                    if (data.msg_code == '-10') {
                        T.Util.sendToken({'token':''});//传递给原生
                        T.Util.clearUserInfo();//清除用户隐私信息
                        if(_config.authError && _config.errorCallback){//鉴权
                            _config.errorCallback(data);
                            return;//坑爹的不return;
                        }
                        T.Util.login();
                        return;
                    } else if(data.msg_code == '-20'){//账户余额不足
                        if(_config.errorCallback){
                            _config.errorCallback(data);
                        }
                        if(/goodsDetail.html/.test(window.location.href)){
                            //出价时“余额不足”弹窗，前往充值的点击量（yebzdjl_001，数字为商品id）
                            T.Util.setUserBehaviorList({
                                "busId": T.Util.getPara('id'),
                                "conductCode": "yebzdjl_" + T.Util.getPara('id'),
                                "comductDesc": "出价时“余额不足”弹窗，前往充值的点击量",
                                "time": new Date().getTime()
                            });
                        }
                        T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/user/recharge.html?from=buy&money=' + parseFloat(Math.abs(data.res_data.value||data.res_data)));
                    }else{
                        if (!_config.errorType) {
                            tip(data.msg || data.result_msg);
                        }
                        if(_config.errorCallback){
                            _config.errorCallback(data);
                        }
                    }
                }
                if(Collection.maxResTime*1000 < requestObj.expend_time && Collection.filterUrl(_config.reqUrl)){
                    if(T.Util.isEmpty(T.Storage.get("collectInfo"))){
                        var obj = [];
                        obj.push(requestObj);
                        T.Storage.set("collectInfo",JSON.stringify(obj));
                    }else{
                        var obj = JSON.parse(T.Storage.get("collectInfo"));
                        obj.push(requestObj);
                        T.Storage.set("collectInfo",JSON.stringify(obj));
                        if(obj.length >=Collection.sendSize && Collection.collectFlag){
                            T.Util.sendCollectInfos();
                        }
                    }
                }
                // reportError(data.result ? 'callXmlHttpRequestSuccess' : 'callXmlHttpRequestError');
            },
            error: function (xhr, textStatus) {
                pageLoading.hide();
                console.log("main.js xmlHttpRequest 请求返回错误");
                console.log('url:' + _url + 'data:' + JSON.stringify(_config.reqData) + 'status:' + textStatus);
                if(textStatus=='timeout'||textStatus=='abort'||textStatus == 'error'){//超时
                    if(!(/go.html#page=index.html/.test(window.location.href)) && _config){
                        tip('('+xhr.status+')'+Global.neterror,'error');
                    }
                    netOkFlag = false;
                }
                requestObj.req_status = xhr.status;
                var finishTime = new Date().getTime();
                requestObj.expend_time = finishTime - beginTime;
                requestObj.res_error = xhr.statusText;
                requestObj.submit_model = "AJAX";
                if(Collection.filterUrl(_config.reqUrl)){
                    if(T.Util.isEmpty(T.Storage.get("collectInfo"))){
                        var obj = [];
                        obj.push(requestObj);
                        T.Storage.set("collectInfo",JSON.stringify(obj));
                    }else{
                        var obj = JSON.parse(T.Storage.get("collectInfo"));
                        obj.push(requestObj);
                        T.Storage.set("collectInfo",JSON.stringify(obj));
                        if(obj.length >=Collection.sendSize && Collection.collectFlag){
                            T.Util.sendCollectInfos();
                        }
                    }
                }
                if(_config.errorCallback){
                    _config.errorCallback(null,xhr,textStatus);
                }
            }
        });
    },
    shopListClick:function () {
        var isH5Auction = "";//是否为H5版竞拍
        if(/go.html#page=newUserH5.html/.test(window.location.href)){
            isH5Auction = '1';
        }
        $('.shopYuyue').off().Touch(function (el) {
            var href = window.location.href;
            if(/page=auctionList.html&type=pre/.test(href)){
                //各个预约商品的预约按钮点击量（syyyp_djlyy001，数字为商品id）
                T.Util.setUserBehaviorList({
                    "busId":"预约拍",
                    "conductCode": "syyyp_djlyy"+$(el).parent().parent().data("id"),
                    "comductDesc": "各个预约商品的预约按钮点击量",
                    "time": new Date().getTime()
                });
            }else if(/page=newGoods.html/.test(href)){
                //各个商品“参与竞拍”或“预约竞拍”的点击量（xptd_jpdjl001、xptd_yydjl001）
                T.Util.setUserBehaviorList({
                    "busId":"新品天地",
                    "conductCode": "xptd_yydjl"+$(el).data("id"),
                    "comductDesc": "各个商品“参与竞拍”或“预约竞拍”的点击量",
                    "time": new Date().getTime()
                });
            }
            if($(el).attr('data-isvisitor')==1){tip('您已预约哦');return;}
            var commodityId = $(el).parent().parent().attr("data-id");
            var yuNumEl =  $(el).parent().find('.shopMoney em');
            var yuNum = yuNumEl.html()*1;
            T.Util.xmlHttpRequest({
                type:'get',
                errorType:'1',
                reqUrl:'/commodity/services/product/visitors.json?expectNo='+$(el).parent().parent().attr("data-no")+'&commodityId='+commodityId,
                callback:function(data){
                    $(el).attr('data-isvisitor',1);
                    $(el).html('已预约');
                    tip('预约成功','ok');
                    yuNumEl.html(yuNum+1);
                    if((yuNum+1)>=($(el).parent().find('.shopYuYueNeedNum em').html())){//当加了1之后等于预约需要人数 延迟500毫秒需要调取接口 防止消息丢失
                        setTimeout(function () {
                            if($(el).parent().parent().hasClass('yuYue')){//500毫秒之后还是预约的状态需要拉取接口
                                T.Util.getCommodityInfo(commodityId);
                            }
                        },500);

                    }
                },
                errorCallback:function(data){
                    if((data.msg_code=='1001'&&data.msg=='当前商品暂时不能预约')||data.msg=='已预约'){
                        setTimeout(function () {
                            if($(el).parent().parent().hasClass('yuYue')){//500毫秒之后还是预约的状态需要拉取接口
                                T.Util.getCommodityInfo(commodityId);
                            }
                        },500);
                    }else{
                        data && tip(data.msg,'error');
                    }
                }
            });
        });
        $('.shopImg,.shopAuctionBox').off().Touch(function (el) {
            var href = window.location.href;
            if(/page=auctionList.html&type=my/.test(href)){
                //有“我在拍”商品时，各个商品的点击量（sywzp_wzp001，数字为商品id）
                T.Util.setUserBehaviorList({
                    "busId":"我在拍",
                    "conductCode": "sywzp_wzp"+$(el).data("id"),
                    "comductDesc": "有“我在拍”商品时，各个商品的点击量",
                    "time": new Date().getTime()
                });
            }else if(/page=auctionList.html&type=pre/.test(href)){
                //各个预约商品查看详情的点击量（syyyp_djlxq001，数字为商品id）
                T.Util.setUserBehaviorList({
                    "busId":"预约拍",
                    "conductCode": "syyyp_djlxq"+$(el).data("id"),
                    "comductDesc": "各个预约商品查看详情的点击量",
                    "time": new Date().getTime()
                });
            }else if(/page=index.html/.test(href)||/page=auctionList.html&type=hot/.test(href)){
                //各个商品“参与竞拍”的点击量（zzrp_jpdjl001，数字为商品id）
                T.Util.setUserBehaviorList({
                    "busId":"正在热拍",
                    "conductCode": "zzrp_jpdjl"+$(el).data("id"),
                    "comductDesc": "各个商品“参与竞拍”的点击量",
                    "time": new Date().getTime()
                });
            }else if(/page=auctionList.html&type=intelligent/.test(href)){
                //各个商品的点击量（zntj_djl001，数字为商品id）
                T.Util.setUserBehaviorList({
                    "busId":"智能推荐",
                    "conductCode": "zntj_djl"+$(el).data("id"),
                    "comductDesc": "各个商品的点击量",
                    "time": new Date().getTime()
                });
            }else if(/page=newGoods.html/.test(href)){
                //各个商品“参与竞拍”或“预约竞拍”的点击量（xptd_jpdjl001、xptd_yydjl001）
                T.Util.setUserBehaviorList({
                    "busId":"新品天地",
                    "conductCode": "xptd_jpdjl"+$(el).data("id"),
                    "comductDesc": "各个商品“参与竞拍”或“预约竞拍”的点击量",
                    "time": new Date().getTime()
                });
            }
            if($(el).parent().hasClass("auction")||$(el).parent().hasClass("yuYue")){
                T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=goodsDetail.html&id='+$(el).parent().attr("data-id")+'&isNext=1&expectNo='+$(el).parent().attr("data-no")+(isH5Auction?"&isH5Auction=1":""));
            }else if($(el).parent().hasClass("over")){
                T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=goodsDetail.html&id='+$(el).parent().attr("data-id")+'&expectNo='+$(el).parent().attr("data-no")+(isH5Auction?"&isH5Auction=1":""));
            }
        },{noRepeat:1});
        $('.shopOverBox,.shopStopBox').off().Touch(function (el) {
            T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=goodsDetail.html&id='+$(el).parent().attr("data-id")+'&expectNo='+$(el).parent().attr("data-no")+(isH5Auction?"&isH5Auction=1":""));
        },{noRepeat:1});

        $('.shopFavorite').off().Touch(function (el) {
            var type = 1;
            type = $(el).find('i').hasClass("icon-favoriteOn")?2:1;//type  1:收藏 2：取消
            T.Util.xmlHttpRequest({
                type:'get',
                reqUrl:'/commodity/services/product/favorite.json?commodityId=' + $(el).parent().attr("data-id")+'&type='+type,//type  1:收藏 2：取消
                callback:function(data){
                    if(type==1){
                        $(el).find('i').removeClass().addClass("icon-favoriteOn");
                        tip("收藏成功",'ok');
                    }else{
                        if(T.Util.getParaHash("page")=='auctionList.html'&&T.Util.getPara('type')=='collect'){
                            $(el).parent().remove();
                        }
                        if(!$("#shopBox .shopList").length){
                            $("html,body").addClass("white");
                            $('#shopBox').html('<li class="nodata ' + T.Util.getParaHash('type') + '"><i></i><h2>暂无数据~</h2><div class="btn">立即去竞拍</div></li>');
                            $(".nodata .btn").off().Touch(function(){
                                T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=auctionList.html&type=hot');
                            });
                        }
                        $(el).find('i').removeClass().addClass("icon-favorite");
                        tip("取消收藏成功",'ok');
                    }
                },
                errorCallback:function(data){}
            });
        });

        //成交走势
        $(".auctionTrend").off().Touch(function(el){
            var url = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=auctionTrend.html';
            var data = JSON.parse(Base64.decode($(el).parent().parent().attr("data-item")));
            data["AUCTION_PRICE"] = $(this).parent().parent().find(".AUCTION_PRICE").html();
            T.Util.openWindow(url + T.Util.dataToUrl(url,data));
        },{stop:true});
    },
    doShopListHtml:function (d,type) {
        var messArr = [];
        var htmlArr=[];
        for(var i=0;i<d.length;i++){
            var shopStateClass='';
            if(d[i].EXPECT_STATUS=='80'){//预约类型
                shopStateClass = 'yuYue';
            }else if(d[i].EXPECT_STATUS=='100'){//正在拍类型
                shopStateClass = 'auction';
            }else if(d[i].EXPECT_STATUS=='120'||d[i].EXPECT_STATUS=='90'){//暂停类型 90为预约暂停
                shopStateClass = 'stop';
            }else{//over类型
                if(d[i].AUCTION_USER_NAME){//有人竞拍成功
                    shopStateClass = 'over';
                }else{//无人竞拍成功
                    shopStateClass = 'over noPeople';
                }
            }
            if(/auctionList.html&type=hot/.test(window.location.href)){
                shopStateClass += ' hot';
            }
            if(d[i].EXPECT_STATUS=='100'){addTimer('#'+d[i].COMMODITY_ID,Math.ceil(d[i].SURPLUS_TIME/1000));}
            var imgStr = '',userCount = '',shopFavorite='<div class="shopFavorite"><i class="'+(d[i].ISFAVORITE?"icon-favoriteOn":"icon-favorite")+'"></i></div>';
            imgStr = 'class="lozad" src="../img/goods/lazy_load.png" data-src="'+d[i].COMMODITY_LOGO+'"';
            if(/auctionList.html&type=collect/.test(window.location.href)){
                userCount = '<div class="userCount">' + (d[i].FAVORTE_COUNT||0) + '</div>'
            }
            if(/auctionList.html&type=my/.test(window.location.href)||/auctionList.html&type=pre/.test(window.location.href)){
                shopFavorite='';
            }
            htmlArr.push('<li class="shopList '+ shopStateClass+'" data-item="' + Base64.encode(JSON.stringify(d[i])) + '" data-id="'+d[i].COMMODITY_ID+'" data-no="'+d[i].EXPECT_NO+'" data-expect_id="'+d[i].EXPECT_ID+'">' + userCount + '\
                                    '+shopFavorite+'\
                                    <div class="shopImg"><img '+imgStr+'  onerror="T.Util.showDefaultPic(this)"></div>');

            if(/auctionList.html&type=collect/.test(window.location.href)){//我的收藏
                htmlArr.push('<div class="shopAuctionBox collect" style="display:block!important;"><div class="avgPrice"><span>平均成交价</span><span><em>¥</em>'+(d[i].AVG_AUCTION_PRICE?d[i].AVG_AUCTION_PRICE.toFixed(2):"--")+'</span></div>');
                htmlArr.push('<div class="marketPrice">市场价 ¥'+(d[i].MARKET_PRICE?d[i].MARKET_PRICE.toFixed(2):"--")+'</div>');
                htmlArr.push('<div class="auctionTrend">成交走势</div></div>');
            }else if(/page=auctionList.html&type=my/.test(window.location.href)){//我在拍
                htmlArr.push('<div class="shopAuctionBox collect" style="display:block!important;">');
                htmlArr.push('<div class="infoItem selfBidCount"><span>我出价：</span><span>' + d[i].USER_AUCTION_NUM + '次</span></div>');
                htmlArr.push('<div class="infoItem avgPrice"><span>平均成交价：</span><span><em>¥</em>'+(d[i].AVG_PRICE?d[i].AVG_PRICE.toFixed(2):"--")+'</span></div>');
                htmlArr.push('<div class="infoItem auctionPrice"><span>当前竞拍价：</span><span> ¥<em class="AUCTION_PRICE">'+(d[i].AUCTION_PRICE*1).toFixed(2)+'</em></span></div>');
                htmlArr.push('<div class="infoItem marketPrice"><span>当前领先者：</span><span class="shopUserName">' + (d[i].AUCTION_USER_NAME || "<em style='color:#999;'>暂时无人出价</em>") + '</span></div>');
                htmlArr.push('<div class="bottomLeft"><div class="infoBottom marketPrice">市场价 <em>¥'+(d[i].MARKET_PRICE?d[i].MARKET_PRICE.toFixed(2):"--")+'</em></div>');
                htmlArr.push('<div class="infoBottom userCount"><em>' + d[i].USERCOUNT + '</em>位用户竞拍中</div></div>');
                htmlArr.push('<div class="shopTime"><span id="'+d[i].COMMODITY_ID+'" data-djs="'+d[i].COUNT_DOWN+'" type-djs="1"><cite>--</cite>:<cite>--</cite>:<cite>--</cite></span><em>继续竞拍</em></div></div>');
            }else{
                //预约拍
                htmlArr.push('<div class="shopYuYueBox"><div class="shopMoney"><span>已预约人数:</span><em>'+d[i].BESPEAK_NUM+'</em></div>');
                htmlArr.push('<div class="shopYuYueNeedNum"><span>需要预约人数:</span><em>'+d[i].BESPEAK_MIN_NUM+'</em></div>');
                htmlArr.push('<div class="shopYuyue" data-isVisitor="'+d[i].IS_VISITOR+'">'+(d[i].IS_VISITOR?"已预约":"预约竞拍")+'</div></div>');
                //正在拍
                htmlArr.push('<div class="shopAuctionBox">');
                var jpBtn='参与竞拍';
                htmlArr.push('<div class="shopMoney"><span>竞拍价</span><span><em>¥</em><em class="AUCTION_PRICE">'+(d[i].AUCTION_PRICE*1).toFixed(2)+'</em></span></div>');
                htmlArr.push('<div><em class="shopUserName">'+(d[i].AUCTION_USER_NAME || "<em style='color:#999;'>暂时无人出价</em>")+'</em></div>');
                htmlArr.push('<div class="shopTime"><span id="'+d[i].COMMODITY_ID+'" data-djs="'+d[i].COUNT_DOWN+'" type-djs="1"><cite>--</cite>:<cite>--</cite>:<cite>--</cite></span><em>'+jpBtn+'</em></div></div>');
                //竞拍成交
                htmlArr.push('<div class="shopOverBox"><div class="shopMoney"><span>竞拍价</span><span><em>¥</em><em class="AUCTION_PRICE">'+(d[i].AUCTION_PRICE*1).toFixed(2)+'</em></span></div>');
                htmlArr.push('<div class="shopUserName">'+(d[i].AUCTION_USER_NAME || "<em style='color:#999;'>暂时无人出价</em>")+'</div>');
                htmlArr.push('<div class="shopStop"><span>'+(d[i].AUCTION_USER_NAME?"已成交":"已结束")+'</div></div>');
                //暂停竞拍
                htmlArr.push('<div class="shopStopBox">');
                htmlArr.push('<div class="shopMoney"><span>竞拍价</span><span><em>¥</em><em class="AUCTION_PRICE">--</em></span></div><div class="shopUserName">--</div>');
                htmlArr.push('<div class="shopStop"><span>'+(d[i].EXPECT_STATUS=="90"?"暂停预约":"暂停竞拍")+'</div></div>');
            }

            htmlArr.push('</li>');
            if(globalMQArr.indexOf('auction/commodity/'+d[i].COMMODITY_ID)==-1){
                messArr.push('auction/commodity/'+d[i].COMMODITY_ID);
            }

        }
        var userinfo = T.Storage.get('userinfo');
        if(!T.Util.isEmpty(userinfo)){
            if(globalMQArr.indexOf('user/favorite/'+userinfo.userId)==-1){
                messArr.push('user/favorite/'+userinfo.userId);//用户收藏相关
            }
        }

        T.Util.mqtt(messArr);

        return htmlArr;
    },
    getCommodityInfo:function (id,eid) {
        if($('[data-id="'+id+'"]').length==0){return;}//页面上找不到该id 做返回处理
        T.Util.xmlHttpRequest({
            type:'get',
            errorType:1,
            reqUrl:'/commodity/services/template/GET_EXPECT_INFO.json?commodityId='+id,
            callback:function(data){
                var d = data.res_data[0];
                if(T.Util.isEmpty(d)){return;}
                var page = T.Util.getParaHash("page");
                if(page=='goodsRecord.html'&& eid<d.currentExpectNum){ var domItem = $('li[data-id="'+d.commodityId+'"][data-expect_id="'+d.expectId+'"]');domItem.find('.record-status').html('竞拍结束');return;}
                T.Util.expectStatusChange(d,'interface');//状态切换
                switch (page){
                    case 'goodsDetail.html'://商品详情
                        T.goodsDetail.getProductInfo();
                        break;
                    case 'allGoods.html'://竞拍大厅
                        var domItem = $('.goods-item[data-id="'+d.commodityId+'"]');
                        if(domItem.attr('data-expect_id')<d.expectId){//期号存在变更 初始化新的一期
                            T.Util.commodityNewNoInit(d);//新一期ui初始化
                        }
                        var priceDom = domItem.find('.AUCTION_PRICE');
                        if(priceDom.html()<d.auctionPrice){
                            priceDom.html(parseFloat(d.auctionPrice*1).toFixed(2)).removeClass('animatedSlideOutUp').addClass('animatedSlideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                priceDom.removeClass('animatedSlideOutUp');
                            });//最新出价人价格
                        }
                        var userNameDom = domItem.find('.shopUserName');
                        var msgUname = d.auctionUserName||'暂时无人出价';
                        if(userNameDom.html()!=msgUname){
                            userNameDom.html(msgUname).removeClass('animatedZoomOut').addClass('animatedZoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                userNameDom.removeClass('animatedZoomOut');
                            });//最新出价人姓名
                        }
                        break;
                    default:

                        var domItem = $('li[data-id="'+d.commodityId+'"]');
                        if(page=='goodsRecord.html'){
                            dom = $('li[data-id="'+d.commodityId+'"][data-expect_id="'+d.expectId+'"]');
                            if(dom.length==0){console.log('投注记录没找对应期号的商品：id'+d.commodityId+'data-expect_id='+d.expectId);return;}
                        }
                        if(domItem.attr('data-expect_id')<d.expectId){//存在期号变更 初始化新的一期
                            T.Util.commodityNewNoInit(d);//新一期ui初始化
                        }
                        var priceDom = domItem.find('.AUCTION_PRICE');
                        if(priceDom.html()<d.auctionPrice){
                            priceDom.html(parseFloat(d.auctionPrice*1).toFixed(2)).removeClass('animatedSlideOutUp').addClass('animatedSlideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                priceDom.removeClass('animatedSlideOutUp');
                            });//最新出价人价格
                        }
                        var userNameDom = domItem.find('.shopUserName');
                        var msgUname = d.auctionUserName||'暂时无人出价';
                        if(userNameDom.html()!=msgUname){
                            userNameDom.html(msgUname).removeClass('animatedZoomOut').addClass('animatedZoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                userNameDom.removeClass('animatedZoomOut');
                            });//最新出价人姓名
                        }
                        break;
                }

            },
            errorCallback:function(data){
                console.log(data);
            }
        });
    },
    expectStatusChange:function (msg,type) {
        var page = T.Util.getParaHash("page");
        if(T.Util.isEmpty(msg)){return;}
        if(page=="goodsRecord.html" && msg.expectStatus && msg.expectStatus==100){
            if(type && type=='interface'){
                addTimer('#'+msg.commodityId,Math.ceil(msg.SURPLUS_TIME/1000));
            }else{
                addTimer('#'+msg.commodityId,parseInt($('#'+msg.commodityId).attr('data-djs')));
            }
            return;
        }
        if(page=="allGoods.html"){//全部商品页
            var dom = $('.goods-item[data-id="'+msg.commodityId+'"]');//[data-expect_id="'+msg.expectId+'"]
        }else{
            var dom = $('li[data-id="'+msg.commodityId+'"]');//[data-expect_id="'+msg.expectId+'"]
        }
        if(page=="goodsRecord.html"){return;};
        for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
            var domItem = $(dom[i]);
            if(page=='allGoods.html'){
                switch (msg.expectStatus.toString()){
                    case '80':
                        domItem.removeClass().addClass('goods-item pre');
                        break;
                    case '95':
                        domItem.find('.shopUserName').html('预约完成');
                        domItem.find('.shopTime em').html('即将竞拍');
                        if(type && type=='interface'){
                            addTimer('#'+msg.commodityId,Math.ceil(msg.SURPLUS_TIME/1000));
                        }else{
                            addTimer('#'+msg.commodityId,parseInt(msg.countDown));
                        }
                        domItem.removeClass().addClass('goods-item auction');
                        break;
                    case '100':
                        domItem.find('.shopTime em').html('参与竞拍');
                        if(page=='auctionList.html'&&T.Util.getPara('type')=='pre'){//预约界面 有可能产生预约之后就产品就开始了 然后回到首页需要重新拉取接口 因为有可能开始竞拍的产品是热拍产品
                            T.Storage.set('auctionListPreTag','1');
                        }
                        if(type && type=='interface'){
                            addTimer('#'+msg.commodityId,Math.ceil(msg.SURPLUS_TIME/1000));
                        }else{
                            addTimer('#'+msg.commodityId,parseInt($('#'+msg.commodityId).attr('data-djs')));
                        }
                        domItem.removeClass().addClass('goods-item auction');
                        break;
                    case '90'://预约暂停
                        domItem.removeClass().addClass('goods-item stop');
                        break;
                    case '120':
                        domItem.removeClass().addClass('goods-item stop');
                        break;
                    default:
                        domItem.removeClass().addClass('goods-item over');
                        break;
                }
            }else{
                switch (msg.expectStatus.toString()){
                    case '80':
                        domItem.removeClass().addClass('shopList yuYue');
                        break;
                    case '95':
                        domItem.find('.shopUserName').html('预约完成');
                        domItem.find('.shopTime em').html('即将竞拍');
                        if(type && type=='interface'){
                            addTimer('#'+msg.commodityId,Math.ceil(msg.SURPLUS_TIME/1000));
                        }else{
                            addTimer('#'+msg.commodityId,parseInt(msg.countDown));
                        }
                        domItem.removeClass().addClass('shopList auction');
                        break;
                    case '100':
                        domItem.find('.shopTime em').html('参与竞拍');
                        if(type && type=='interface'){
                            addTimer('#'+msg.commodityId,Math.ceil(msg.SURPLUS_TIME/1000));
                        }else{
                            addTimer('#'+msg.commodityId,parseInt($('#'+msg.commodityId).attr('data-djs')));
                        }
                        domItem.removeClass().addClass('shopList auction');
                        break;
                    case '90'://预约暂停
                        domItem.find('.shopStop span').html('暂停预约');
                        domItem.removeClass().addClass('shopList stop');
                        break;
                    case '120':
                        domItem.find('.shopStop span').html('暂停竞拍');
                        domItem.removeClass().addClass('shopList stop');
                        break;
                    default:
                        domItem.removeClass().addClass('shopList over');
                        break;
                }
            }
        }
    },
    commodityNewNoInit:function (d) {//新一期开始ui初始化
        var page = T.Util.getParaHash("page");
        if(page=='allGoods.html'){
            var domItem = $('.goods-item[data-id="'+d.commodityId+'"]');
            domItem.attr('data-expect_id',d.expectId);
            domItem.attr('data-no',d.expectNo);
            domItem.find('.AUCTION_PRICE').html(((d.auctionPrice||'0')*1).toFixed(2));//竞拍起步价初始化
            domItem.find('.shopUserName').html("<em style='color:#999;'>暂时无人出价</em>");//竞拍人初始化
            domItem.find('.prenow span').html('0');//已预约人数初始化
            domItem.find('.preline span').html(d.minVisitor||d.bespeakMinNum);//需要预约多少人初始化
            domItem.attr('data-isvisitor',0);
            domItem.find('.goods-submit').attr('data-isvisitor',0).find('.pre').html('预约');
        }else{
            var domItem = $('li[data-id="'+d.commodityId+'"]');
            domItem.attr('data-expect_id',d.expectId);
            domItem.attr('data-no',d.expectNo);
            domItem.find('.shopYuyue').attr('data-isvisitor',0).html('预约竞拍');
            domItem.find('.shopYuYueBox .shopMoney em').html('0');//已预约人数初始化
            domItem.find('.yuYueInfoBox .prenow em').html('0');//新品天地 💰2个tab
            domItem.find('.shopYuYueBox .shopYuYueNeedNum em').html(d.minVisitor||d.bespeakMinNum);//需要预约多少人初始化
            domItem.find('.AUCTION_PRICE').html(((d.auctionPrice||'0')*1).toFixed(2));//竞拍起步价初始化
            domItem.find('.shopUserName').html("<em style='color:#999;'>暂时无人出价</em>");//竞拍人初始化
        }

    },
    //在页面底部插入智能推荐
    showGoodsRecommend:function(fromMore){
        Global.pageIndex = 1;
        Global.hasMore = false;
        T.Util.xmlHttpRequest({
            type:'get',
            reqUrl:'/commodity/services/shop/shopType.json?type=2&page='+Global.pageIndex+'&limit=6',//商城类别列表1：//商城 2智能推荐 3/热拍 4/预约拍
            callback:function(data){
                var info  = data.res_data.value.INFO;
                if(data.res_data.value.ISEND==2){//还有更多
                    Global.hasMore = true;
                    Global.pageIndex++;
                }else{
                    Global.hasMore = false;
                }
                var htmlArr=[];
                for(var i = 0;i < 6;i++){
                    if(i % 3 == 0) htmlArr.push('<div class="row">');
                    if(i < info.length){
                        htmlArr.push('<div class="shopList" data-tjid="' + info[i].COMMODITY_ID + '" data-no="' + info[i].EXPECT_NO + '"><h2>' + info[i].COMMODITY_NAME + '</h2><img class="lozad" src="../img/goods/lazy_load.png" data-src="' + info[i].COMMODITY_LOGO + '"><p>近期成交 ￥' + (info[i].PRE_AUCTION_PRICE||'--') + '</p></div>');
                    }else{
                        htmlArr.push('<div class="shopList"></div>');
                    }
                    if(i % 3 == 2) htmlArr.push('</div>');
                }
                $("#intelligentBox").show();
                if(!$("#intelligentBox").length){
                    $("#content").append('<div id="intelligentBox"><div class="inteligentHead"><h2>智能推荐</h2></div><div class="inteligentList"></div></div>');
                }
                if(htmlArr.length){
                    fromMore ? $(".inteligentList").append(htmlArr.join("")) : $(".inteligentList").html(htmlArr.join(""));
                }
                if($(".inteligentHead").offset().top + $("#intelligentBox").height() < window.innerHeight){
                    $("#intelligentBox").height(window.innerHeight - $(".inteligentHead").offset().top);
                }
                lozad().observe();
                //事件绑定
                $(".inteligentList .shopList").off().Touch(function(el){
                    var conductCode = "",comductDesc = "";
                    if($('.record-tabitem[data-type="overNo"]').is(".on")||/cjg.html/.test(window.location.href)){
                        conductCode = "jpjlcjg_zntj"+$(el).data("tjid");
                        comductDesc =  "“差价购”页面智能推荐各商品的点击量";
                    }else if(/orderDetail.html/.test(window.location.href)){
                        conductCode = "ddtjdjl";
                        comductDesc = "我的订单中“智能推荐”商品的点击量";
                    }else if(/page=auctionList.html&type=my/.test(window.location.href)){
                        conductCode = "sywzp_id"+$(el).data("tjid");
                        comductDesc = "底部智能推荐各商品的点击量";
                    }else if(/page=auctionList.html&type=pre/.test(window.location.href)){
                        conductCode = "syyyp_id"+$(el).data("tjid");
                        comductDesc = "底部智能推荐各商品的点击量";
                    }else if(/cjg.html/.test(window.location.href)){
                        conductCode = "sycjg_id"+$(el).data("tjid");
                        comductDesc = "底部智能推荐各商品的点击量";
                    }else if(/page=auctionList.html&type=collect/.test(window.location.href)){
                        conductCode = "wdsc_id"+$(el).data("tjid");
                        comductDesc = "底部智能推荐各商品的点击量";
                    }
                    //底部智能推荐各商品的点击量
                    T.Util.setUserBehaviorList({
                        "busId":"智能推荐点击量",
                        "conductCode": conductCode,
                        "comductDesc": comductDesc,
                        "time": new Date().getTime()
                    });
                    T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=goodsDetail.html&id=' + $(el).attr("data-tjid") + '&expectNo=' + $(el).attr("data-no") + '&isNext=1');
                });
            },
            errorCallback:function(data,xhr,textStatus){
                tip(data ? data.msg : Global.neterror,"error");
            }
        });
    },
    messAgeArriver:function (message) {
        if(!message.payloadString||message.payloadString==''){return;}
        var msg  =JSON.parse(message.payloadString);
        console.log("msgTime:"+new Date().getTime()+" "+message.payloadString);
        var page = T.Util.getParaHash("page");
        if(page!="goodsDetail.html"){
            if(page=="allGoods.html"){//全部商品页
                var dom = $('.goods-item[data-id="'+msg.commodityId+'"]');//[data-expect_id="'+msg.expectId+'"]
                if(dom.length==0){console.log('不存在商品：id'+msg.commodityId);return;}
            }else if(page=="goodsRecord.html"){
                var dom = $('li[data-id="'+msg.commodityId+'"][data-expect_id="'+msg.expectId+'"]');
                if(dom.length==0){console.log('投注记录没找对应期号的商品：id'+msg.commodityId+'data-expect_id='+msg.expectId);return;}
            }else{
                var dom = $('[data-id="'+msg.commodityId+'"]');//[data-expect_id="'+msg.expectId+'"]
                if(dom.length==0){console.log('不存在商品：id'+msg.commodityId);return;}
            }
        }else if(page=="goodsDetail.html"){
            expectId = expectId||'';
            console.log('msg.expectId:'+msg.expectId+'---expectId:'+expectId);
            if(msg.commodityId!=commodityId){return;}//不是本场的id return掉
            if((msg.expectId!=expectId)&&(msg.type!='FAVORITE'||msg.type!='VISITORS'||msg.type!='COUPON')){
                if((msg.expectId>expectId) &&($('#auction-other-box').html()!=='前往下一期'||$('#auction-other-box').html()!=='商品竞拍已结束')){
                    T.goodsDetail.auctionOver();//当期号id大于用户最新拉取接口获取的id时 切换为前往下一期ui
                }
                return;
            };//如果在竞拍详情页 期号存在变更 切换显示竞拍成功下一期视图切换
        }
        if(msg.type=='REPLACE'&&page=="goodsDetail.html"){//代拍出价
            //好友“xxx”正为您助力，免费获得1次出价
            //好友“xxx”助力猛烈，免费获得5次自动出价
            var str = '好友“'+msg.uname+'”正为您助力，免费获得'+msg.count+'次出价';
            if(msg.count>3){
                str = '好友“'+msg.uname+'”助力猛烈，免费获得'+msg.count+'次自动出价';
            }
            $('#autoNum').val(msg.repCou);
            $("#auction-submit h2").html('好友助力中');
            $('.daipaiTip').html(str).removeClass('dpTipNone').addClass('dpTipNone').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('dpTipNone');
            });
        }
        if(msg.type=='COUNT_DOWN'){//倒计时
            return;
            if(page=="goodsDetail.html"){//详情页
                var min = Math.floor(msg.countDown/60).toString();
                if(min.length <= 1) { min = "0" + min;}
                var sec = Math.floor((msg.countDown-(min*60))).toString();
                if(sec.length <= 1) {sec = "0" + sec; }
                if($('#goodsdetail-box').hasClass('preauction')){//详情页满足倒计时规则 且还是预约的节点 则说明消息有延迟 需要重新拉取接口
                    T.goodsDetail.getProductInfo();
                }
                $('#cutDownTime').show().siblings().hide();
                $('#cutDownTime i').html(min);
                $('#cutDownTime em').html(sec);
                if(msg.countDown!=0){
                    addMsTimer('#cutDownTime span',100);//允许后端消息延迟一秒
                }else{
                    $('#cutDownTime span').html('00');
                }
            }else{
               /* var hour = Math.floor(msg.countDown/60/60).toString();
                if(hour.length <= 1) { hour = "0" + hour;}
                var min = Math.floor((msg.countDown-(hour*60))/60).toString();
                if(min.length <= 1) { min = "0" + min;}
                var sec = Math.floor((msg.countDown-(min*60))).toString();
                if(sec.length <= 1) {sec = "0" + sec; }*/

                var h = Math.floor(msg.countDown / 3600).toString();
                if(h.length <= 1) { h = "0" + h;}
                var m = Math.floor((msg.countDown / 60 % 60)).toString();
                if(m.length <= 1) { m = "0" + m;}
                var s = Math.floor((msg.countDown % 60)).toString();
                if(s.length <= 1) {s = "0" + s; }
                for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                    var domItem = $(dom[i]);
                    domItem.find('cite').eq(0).html(h);
                    domItem.find('cite').eq(1).html(m);
                    domItem.find('cite').eq(2).html(s);
                    /*if(msg.countDown!=0){
                        addMsTimer(domItem.find('cite').eq(2),100);//允许后端消息延迟一秒
                    }else{
                        domItem.find('cite').eq(2).html('00');
                    }*/
                }
            }

        }
        if(msg.type=='AUCTION'){
            if(page=="goodsDetail.html"){
                /*var djsTime = msg.nextdata - (new Date().getTime()+parseInt(T.Storage.get('difTime')));
                djsTime = djsTime/1000;
               $('[type-djs]').attr('data-djs',djsTime);
                addTimer('#'+msg.commodityId,djsTime);*/
                if(msg.auctionPrice*1<=auctionPrice*1){//消息里面的竞拍金额比获取到的金额低 说明消息存在延迟 直接return；
                    return;
                }
                /*if($('#auctionlist li').eq(0).length>0&&$('#auctionlist li').eq(0).attr('data-userid')==msg.userId&&(msg.auctionPrice==$('#auctionlist li').eq(0).attr('data-money'))){//
                    return;
                }*/
                addTimer('.cutDownTime',parseInt($('#'+msg.commodityId).attr('data-djs')));
                if($('#goodsdetail-box').hasClass('preauction')){//详情页满足倒计时规则 且还是预约的节点 则说明消息有延迟 需要重新拉取接口
                    T.goodsDetail.getProductInfo();
                }
                var userinfo = T.Storage.get('userinfo');
                if(!T.Util.isEmpty(userinfo) && msg.userId.split(',').indexOf(userinfo.userId)>-1) {//是自己需要在自动竞拍中需要把次数减1
                    if(msg.repCou>0){//存在代拍次数
                        $("#autoNum").val(msg.repCou);
                        $("#autoNum").addClass('disable');
                        $('#addsub em').addClass('disable');
                        $("#auction-submit h2").html('好友助力中');
                    }else{
                        if(msg.count>0){//存在连续竞拍
                            $('#autoAuctionBox').show().siblings().hide();
                            var allNum = $('#allAutoNum').html();
                            $('#sAutoNum').html(allNum-msg.count);
                            $('#autoAuctionBox .jindu').css('width',(msg.count/allNum)*100+'%');
                        }else{
                            $('#auction-submit h2').html('出价');
                            $('#autoNum').val(1);
                            $('#auctionBox').show().siblings().hide();
                        }
                        if(msg.acctMap){
                            for(i in msg.acctMap){
                                if(i==('1_2')){//拍币
                                    var m2 = ($('#cjgMoney').attr('data-m'))*1+(msg.acctMap[i])*1;//累积出的所有拍币价格
                                    $('#cjgMoney').attr('data-m',m2);
                                    var mk = $('#cjgMoney').attr('data-mk')*1;//市场价
                                    var rr = $('#cjgMoney').attr('data-rr')*1;//返币比例
                                    if(mk>=100&&(m2>=(mk/10))){//显示累积出价
                                        $('.cjgMoney,.yxhMoney').show();
                                        $('#cjgMoney').html((mk-(m2*(rr/100))).toFixed(2));//市场价-拍币*返币比例
                                    }
                                }
                            }
                        }
                    }
                    $('.leaduserDiv').addClass('Isme');
                    if(IS_NEW==1){//是新手商品拍中的时候需要拍查询已拍次数
                        T.goodsDetail.newAuctionTask();
                    }
                }else{
                    $('.leaduserDiv').removeClass('Isme');
                    T.goodsDetail.auctionYhm();//自己没拍中再查询是否存在优惠购
                }
                $('#USERCOUNT').html(msg.allCount);//出价人数
                $('#auctionlist li').eq(0).show();
                $('#auctionlist li').eq(3).remove();
                if(msg.auctionPrice!=auctionPrice){
                    auctionPrice = msg.auctionPrice;//修改商品竞价
                    var eleee = $('#priceBox');
                    $('#priceBox').append('<div>'+parseFloat(auctionPrice).toFixed(2)+'</div>');
                    eleee.animate({
                        marginTop:-eleee.find('div').height()/70+'rem'
                    },500,function(){
                        eleee.css('margin-top',0);
                        eleee.find("div").eq(0).remove();
                        $('.AUCTION_PRICE').html(parseFloat(msg.auctionPrice).toFixed(2));//修改商品当前竞拍价
                    });
                }

                if($('#leadeuser').css('display')=='none'){//由没人出价到有人出价ui变化
                    $('#leadeuser').show();
                }
                var uname = msg.uname;
                if(!uname){uname=msg.userMobile};
                $('.lastBidderName').html(uname);//最新出价人姓名
                $('#lastBidder em').html('('+msg.area+')');//最新出价人地域
                $('#leaduser').attr('src','../img/usercenter/photo.png').attr('src',msg.upic);//出价人图片
                $('#ALLCOUNT').html($('#ALLCOUNT').html()*1+1);
                $('#auctionlist').prepend('<li class="auctionlist-item hide" data-userid="'+msg.userId+'" data-money="'+msg.auctionPrice+'"><img src="'+msg.upic+'"><em>'+uname+'</em><em>出局</em><em>('+(msg.area||"未知区域")+')</em><em>￥'+(msg.auctionPrice*1).toFixed(2)+'</em></li>');
                if($('#auctionlist li').length>1){//有大于1条数据需要删除无记录状态
                    $('#auctionlist').show();
                }
            }else{
                for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                    var domItem = $(dom[i]);
                    if(/page=auctionList.html&type=my/.test(window.location.href)){
                        domItem.find('.joinCount').html(msg.allCount);//出价人数
                    }
                    if(page=="allGoods.html"){
                        domItem.removeClass().addClass('goods-item auction');//有人出价 强制改成竞拍状态
                    }else if(page!="goodsRecord.html"){
                        domItem.removeClass().addClass('shopList auction');//有人出价 强制改成竞拍状态
                    }
                    domItem.find('.AUCTION_PRICE').html(parseFloat(msg.auctionPrice).toFixed(2)).removeClass('animatedSlideOutUp').addClass('animatedSlideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass('animatedSlideOutUp');
                    });//最新出价人价格
                    var uname = msg.uname;
                    if(!uname){uname=msg.userMobile};
                    domItem.find('.shopUserName').html(uname).removeClass('animatedZoomOut').addClass('animatedZoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass('animatedZoomOut');
                    });//最新出价人姓名
                    if(page=="goodsRecord.html"){//竞拍记录加出价次数
                        var userinfo = T.Storage.get('userinfo');
                        if(!T.Util.isEmpty(userinfo) && msg.userId.split(',').indexOf(userinfo.userId)>-1) {//是自己需要在竞拍记录中增加出价次数
                            domItem.find('.my-count em').html(domItem.find('.my-count em').html()*1+1);
                        }
                    }
                    if(page=="allGoods.html"){//兼容页面上搜查出来存在两个id节点倒计时失效
                        addTimer('[djs-id="'+msg.commodityId+'"]',parseInt($('[djs-id="'+msg.commodityId+'"]').attr('data-djs')));
                    }else{
                        addTimer('#'+msg.commodityId,parseInt($('#'+msg.commodityId).attr('data-djs')));
                    }

                }
            }
        }
        if(msg.type=='BALANCE'){//竞拍成功的消息
            if(page=="goodsDetail.html"){
                setTimeout(function () {//倒计时0跟结算消息一起推过来 做一个延时处理
                    $('#numKeyWord').hide();
                    var userinfo = T.Storage.get('userinfo');
                    if(!T.Util.isEmpty(userinfo) && (msg.userId.split(',').indexOf(userinfo.userId)>-1) && !goodsDetailHasTipSuccessFlag){//包含自己需要提示用户竞拍成功
                        goodsDetailHasTipSuccessFlag = true;
                        newUserHasAuctionSuccessFlag = true;//未退出页面全局变量 新用户专区商品新用户中过奖之后再次点击出价代拍提醒需要不一样
                        userinfo.isSuccessAuction = '1';//竞拍成功改变本地是否新用户标志  未重新拉取用户信息变量
                        T.Storage.set('userinfo',userinfo);
                        if(msg.userId.split(',').length>1 && msg.userId.split(',').indexOf(userinfo.userId)>-1){//一拍多中 并且自己拍中 竞拍成功者的信息要更新为自己
                            $('.lastBidderName').html(T.Util.isEmpty(userinfo.nickName)?userinfo.userMobile:userinfo.nickName);//最新出价人姓名
                            if(msg.area&&msg.area.split(',').length>1){
                                $('#lastBidder em').html('('+msg.area.split(',')[msg.userId.split(',').indexOf(userinfo.userId)]+')');//最新出价人地域
                            }
                            $('#leaduser').attr('src','../img/usercenter/photo.png').attr('src',userinfo.userPic);//出价人图片
                        }
                        if(msg.userId.split(',').indexOf(userinfo.userId)==-1){//自己是最后一个出价 但是没有中 一拍多中有可能出现 此时需要再次更新界面上中奖人的头像和信息
                            $('.lastBidderName').html(msg.uname);//最新出价人姓名
                            $('#lastBidder em').html('('+msg.area+')');//最新出价人地域
                            $('#leaduser').attr('src','../img/usercenter/photo.png').attr('src',msg.upic);//出价人图片
                        }
                        var isDelegate = msg.isDelegate!=1;
                        if(isH5Auction){
                            T.goodsDetail.getAuctionRecord();
                        }
                        if(isDelegate){//无委托
                            confirm({className:'userDefined auctionSuccess alert',html:'<div class="imgBox"><img src="' + commodityLogo + '"></div><p>立即支付<em>'+msg.auctionPrice+'</em>元</p><div class="auctionSuccessWarn">友情提示：订单有效期为3天哦</div>'
                                ,cancelText:' ',cancelFun:function () {},okText:' ',okFun:function () {
                                    T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/pay.html?commodityId='+commodityId+'&expectId='+msg.expectId+'&auctionPrice='+msg.auctionPrice+'&payType=auctionSuc&isentity='+msg.IS_ENTITY+'&isNotMargain=1');
                                },close:true
                            });
                        }else{//有委托
                            confirm({className:'userDefined auctionSuccess',html:'<div class="imgBox"><img src="' + commodityLogo + '"></div><p>立即支付<em>'+msg.auctionPrice+'</em>元</p><div class="auctionSuccessWarn">友情提示：订单有效期为3天哦</div>'
                                ,cancelText:' ',cancelFun:function () {
                                    T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/weituoAuction.html?commodityId=' + commodityId + '&id='+msg.expectId+'&tax='+msg.tax+'&delegatePrice='+msg.delegatePrice+'&auctionPrice='+msg.auctionPrice+'&marketPrice='+marketPrice.toFixed(2));
                                },okText:' ',okFun:function () {
                                    T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/view/pay.html?commodityId='+commodityId+'&expectId='+msg.expectId+'&auctionPrice='+msg.auctionPrice+'&payType=auctionSuc&isentity='+msg.IS_ENTITY+'&isNotMargain=1');
                                },close:true
                            });
                        }
                    }
                    if(T.Util.isEmpty(msg.userId)){
                        alert('商品无人出价已流拍，将进入下一期竞拍',function () {
                            T.goodsDetail.getProductInfo('isNext');//点击重新拉取数据
                        });
                    }
                    T.goodsDetail.auctionOver();//竞拍成功视图切换
                },100);
            }else if(page=="goodsRecord.html"){
                for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                    var domItem = $(dom[i]);
                    domItem.find('.record-status').html('竞拍结束');
                }
            }else{
                for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                    var domItem = $(dom[i]);
                    if(msg.expectId<domItem.attr('data-expect_id')){return;}//start 和状态变更的消息比结算的消息先到达做return处理
                    if(page=='allGoods.html'){
                        if(T.Util.isEmpty(msg.userId)){
                            domItem.removeClass().addClass('goods-item over noPeople');//结束了没人
                        }else{
                            domItem.removeClass().addClass('goods-item over');//结算显示成交ui
                        }
                    }else{
                        if(T.Util.isEmpty(msg.userId)){
                            domItem.removeClass().addClass('shopList over noPeople');//结束了没人
                        }else{
                            domItem.removeClass().addClass('shopList over');//结算显示成交ui
                        }
                    }
                }
            }
        }
        if(msg.type=='START'){//新的一期开始啦 重新商品附上心的期数 初始化新一期的相关参数
            if(page!="goodsDetail.html"&&page!="goodsRecord.html"){
                for(var i=0;i<dom.length;i++) {//兼容存在多个dom的情况
                    var domItem = $(dom[i]);
                    console.log('商品id：' + msg.commodityId + '开始新一期');
                    domItem.attr('data-expect_id', msg.newExpectId);
                    domItem.attr('data-no', msg.expectNo);
                    T.Util.expectStatusChange(msg);//状态变更
                    T.Util.commodityNewNoInit(msg);//新一期ui初始化
                }
            }
        }
        if(msg.type=='STATUS_CHANGE'){//状态变更 暂停到开始 开始到暂停
        //{"commodityId":"116","expectId":"5701","expectNo":"4","expectStatus":"100","type":"STATUS_CHANGE"}
            if(page=="goodsDetail.html"){
                switch (msg.expectStatus){
                    case '80':
                        break;
                    case '95':
                    case '100'://从新拉取接口数据
                       // setTimeout(function () {//倒计时0跟结算消息一起推过来 做一个延时处理
                            $('#auctionstatus .cutDownTime').show().siblings().hide();
                            T.goodsDetail.getProductInfo();
                       // },500);
                        break;
                    case '90'://预约暂停
                            $('#stopBox').html('暂停预约');
                            $('#stopBox').show().siblings().hide();
                            $('#auction-other-box').show().html('商品暂停预约');
                            $('#auction-submit-box').hide();
                    break;
                    case '120':
                            $('#stopBox').html('暂停竞拍');
                            $('#stopBox').show().siblings().hide();
                            $('#auction-other-box').show().html('商品暂停竞拍');
                            $('#auction-submit-box').hide();
                        break;
                    default:
                        break;
                }
            }else{
                if(page!="goodsRecord.html"){
                    if(dom.attr('data-expect_id')<msg.expectId){//期号存在变更 初始化新的一期
                        T.Util.commodityNewNoInit(msg);//新一期ui初始化
                    }
                    T.Util.expectStatusChange(msg);
                }
            }
        }
        if(msg.type=='FAVORITE'){//收藏状态
            //{"commodityId":"201","count":0,"favoriteType":"1","type":"FAVORITE","userId":"100208"}收藏
            //{"commodityId":"201","count":0,"favoriteType":"2","type":"FAVORITE","userId":"100208"}取消
            if(page!="goodsDetail.html"){
                if(msg.favoriteType==1){//收藏
                    for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                        var domItem = $(dom[i]);
                        domItem.find('.shopFavorite i').removeClass().addClass("icon-favoriteOn");
                    }
                }else{//取消
                    for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                        var domItem = $(dom[i]);
                        domItem.find('.shopFavorite i').removeClass().addClass("icon-favorite");
                    }
                }
            }
            if(page=="goodsDetail.html"){
                $('#FAVORTE_COUNT').html(msg.allCount);//收藏人数更正
            }
        }
        if(msg.type=='VISITORS'){//预约人数变更
        //{"commodityId":"114","currentVisitor":"1","expectId":"5702","expectNo":"2","minVisitor":"1","type":"VISITORS"}
            if(page!="goodsDetail.html"){
                for(var i=0;i<dom.length;i++){//兼容存在多个dom的情况
                     var domItem = $(dom[i]);
                     if(page=='allGoods.html'){
                         var userinfo = T.Storage.get('userinfo');
                         if(!T.Util.isEmpty(userinfo) && msg.userId.split(',').indexOf(userinfo.userId)>-1){//是自己需要把其他层view改变预约按钮状态文案
                             domItem.attr('data-isvisitor',1);
                             domItem.find('.goods-submit').attr('data-isvisitor',1).find('.pre').html('已预约');
                         }
                         domItem.find('.prenow span').html(msg.currentVisitor);
                     }else{
                         var userinfo = T.Storage.get('userinfo');
                         if(!T.Util.isEmpty(userinfo) && msg.userId.split(',').indexOf(userinfo.userId)>-1){//是自己需要把其他层view改变预约按钮状态文案
                             domItem.find('.shopYuyue').attr('data-isvisitor',1).html('已预约');
                         }
                         domItem.find('.yuYueInfoBox .prenow em').html(msg.currentVisitor);//新品天地 💰2个tab
                         domItem.find('.shopYuYueBox .shopMoney em').html(msg.currentVisitor);
                    }
                }
            }else{
                $('#BESPEAK_NUM').html(msg.currentVisitor);
            }
        }
        if(msg.type=='COUPON'){//委托券消息
            confirm({
                className:'userDefined weituoQuan',
                html:'',
                okText:'我知道了'
            });
        }
    },
    mqtt: function (message_arr,mqttType) {
        if(T.Util.isEmpty(mqttType)&&message_arr.length==0){return};
        if(T.Util.isEmpty(mqttType)&&message_arr.length>0){globalMQArr = T.Util.concat_(message_arr,globalMQArr);}
        //console.log(globalMQArr);
        var wsbroker = location.hostname;  //mqtt websocket enabled broker
        if( window.location.origin.indexOf('://localhost')>-1){//本地测试
            wsbroker = 'jp.ruirun123.cn';
        }
        var port = location.port;
        var protocol = location.protocol;
        if( window.location.origin.indexOf('file')==0){
            protocol = Global.apiHost.split(':')[0];
            wsbroker = Global.apiHost.split(':')[1];
            port = Global.apiHost.split(':')[2];
        }
        //var wsport = wsbroker.indexOf("dev.ruirun123.cn")>-1 ? 80:8050; // port for above
        var wsport = T.Util.isEmpty(port)? (protocol == "https:"?443:80):port*1;
        /*if (location.protocol == "https:") {
            wsport=location.port*1;
            if(wsbroker.indexOf("jp.ruirun123.cn")>-1 || wsbroker.indexOf("mqtt.ruirun123.cn")>-1){//生产环境https 走默认443端口
                wsport = 443;
            }
        }*/
        var clientId = 'TMP/' + parseInt(Math.random(10000) * 1000000) % 102400;

        /*if(T.Storage.get('userClientId')){//
            clientId = T.Storage.get('userClientId');
        }else{
            clientId = 'TMP/' + parseInt(Math.random(10000) * 1000000) % 102400;
            T.Storage.set('userClientId',clientId);
        }*/

        if (!T.Util.isEmpty(T.Storage.get("access_token")) && !T.Util.isEmpty(T.Storage.get("userinfo"))) {
            clientId = 'P/' + T.Storage.get("userinfo").userId+'-'+parseInt(Math.random(10000) * 1000000) % 102400;
            //password = T.Storage.get("access_token");
        }

        function connectFunc(type) {
           // var a = new  Date().getTime();
            var options = {
                //timeout: 3,
                userName:'guest',
                password: wsbroker.indexOf("dev.ruirun123.cn")>-1?'guest':'JPai2018',
                keepAliveInterval:15,
                // cleanSession:false,
                onSuccess: function () {
                    //$('#nativeIndexOne').html('DomOk:'+Global.indexDomReadyTime+'--wssuc:'+(new  Date().getTime() -a) +'ms');
                    console.log("建立链接成功");
                   pageLoading.hide();
                    connectSuccessFlag = 1;
                    wsClientNum=0;//成功之后变为0
                    if(mqttType&&mqttType=='unsubscribe'){//退定主题
                        unsubscribe();
                        mqttType='';
                    }else{
                        if((type && type=='fail')|| (mqttType&&mqttType=='viewAgain')){
                            subscribe('all');
                            mqttType = '';
                        }else{
                            subscribe();
                        }
                    }
                },
                onFailure: function (message) {
                    //alert('fail:'+(new  Date().getTime() -a) +'ms');
                    connectSuccessFlag = 0;
                    wsClientNum++;
                    wsClientNum =  wsClientNum>10?10:wsClientNum;
                    setTimeout(function () {
                        if(Global.netWorkStatus!=0){connectFunc('fail');}//断开链接并且有网的时候再重连//失败重连

                    },wsClientNum*1000);
                    console.log("建立链接失败 - 失败消息：" + message.errorMessage);
                }
            };
            if (protocol == "https:") {
                options.useSSL = true;
            }
            console.log("建立链接至 " + wsbroker + ":" + wsport+'---链接的id为：'+clientId);
            if(connectSuccessFlag==0){
                connectSuccessFlag=2;
                wsClient.connect(options);
            }
        }
        function subscribe(type) {
            var arr ;
            if(type && type=='all'){
                arr = globalMQArr;
            }else{
                arr = message_arr;
            }
            if($.isArray(arr)){
                for(var i=0;i<arr.length;i++){
                    wsClient.subscribe(arr[i], {qos: 0});
                }
            }else{
                wsClient.subscribe(arr, {qos: 0});
            }
        }
        function unsubscribe() {
            if($.isArray(globalMQArr)){
                for(var i=0;i<globalMQArr.length;i++){
                    wsClient.unsubscribe(globalMQArr[i]);
                }
            }else{
                wsClient.unsubscribe(globalMQArr);
            }
        }
        function hasWsClient() {
            if ((typeof wsClient == 'undefined' || wsClient == null)){//没有client对象 新建client对象 或者链接没回来

                wsClient = new Paho.MQTT.Client(wsbroker, wsport, "/ws","myclientid_" + clientId);
                wsClient.onConnectionLost = function (responseObject) {
                    console.log("链接断开 - errorCode:"+responseObject.errorCode +'----msg:' +responseObject.errorMessage);
                    // if(responseObject.errorCode==4){//errorCode:4----msg:AMQJS0004E Ping timed out
                    //     wsClient=null;//重新生成新的wsClient
                    // }
                    //tip('网络重连中...','loading');
                    if(!T.Util.isEmpty(T.Storage.get("userinfo"))){
                        clientId = 'P/' + T.Storage.get("userinfo").userId+'-'+parseInt(Math.random(10000) * 1000000) % 102400;
                    }else{
                        clientId = 'TMP/' + parseInt(Math.random(10000) * 1000000) % 102400;
                    }
                    connectSuccessFlag = 0;
                    if(Global.netWorkStatus!=0){connectFunc('fail');}//断开链接并且有网的时候再重连
                };
                wsClient.onMessageArrived = function (message) {
                    //var bbb= 1;
                    //if(bbb==1){$('.auctionNumBox').html('消息和主题订阅:'+(new  Date().getTime() - Global.subscribeTime) +'ms--消息和domOK:'+(new  Date().getTime() - Global.indexDomReadyTime) +'ms'); bbb++;}
                    T.Util.messAgeArriver(message);
                    //console.log("收到消息 " + message.destinationName + "  消息内容" + message.payloadString);
                };
            }
            if(connectSuccessFlag==1){//存在连接通道
                console.log("建立链接成功后增加的订阅");
                if(mqttType&&mqttType=='unsubscribe'){
                    unsubscribe();
                    mqttType='';
                }else{
                    if(mqttType&&mqttType=='viewAgain'){
                        subscribe('all');
                        mqttType = '';
                    }else{
                        subscribe();
                    }
                }
            }else{
                connectFunc();//不存在连接通道 调用建立连接通道
            }
        }
        hasWsClient();
    },
    sendCollectInfos : function(){
        if(!T.Util.isEmpty(T.Storage.get("collectInfo"))){
            var browseType = "Web";
            var apiVersion = "";
            if(T.isNative){
                var ua = window.navigator.userAgent;
                apiVersion = ua.match(/QAPP[\/\s](\d+[._]\d+[._]\d+)/);
                if (apiVersion && apiVersion.length) {
                    apiVersion = (apiVersion[1] || '0.0.0').replace(/\_/g, '.');
                }
                if((/iPhone|iPad|iPod/i).test(ua)){
                    browseType = "IOS";
                }else{
                    browseType = "Android";
                }
            }
            var sendItem = T.Storage.get("collectInfo");
            //直接清空Storage里的collectInfo信息
            T.Storage.remove("collectInfo");
            $.ajax({  //接口404 先注释
                url:Global.fullHost +'/collect-web/services/collect/req.json',
                dataType:"string",
                type:"POST",
                data:JSON.stringify({
                    "s_model":browseType,
                    "d_code":"",
                    "h_version":Global.h_version,
                    "s_version":apiVersion,
                    "item":sendItem
                }),
                success:function(data){},
                error:function(){}
            });
        }
    },
    //支付宝官充
    aliPay:function(obj,callback){
        if (T.isNative) {
            api.aliPay(obj , function (result) {callback(result)});
        }else{
            console.log('请在原生客户端打开');
        }
    },
    //微信官充
    weixinPay:function (obj,callback) {
        if (T.isNative) {
            api.weixinPay(obj , function (result) {callback(result)});
        }else{
            console.log('请在原生客户端打开');
        }
    },
    //第三方分享
    thirdShare:function (opt,callBack) {
        //分享出去的url统一添加渠道标志码及appinfo
        if(opt && opt.url){
            var urlArr = opt.url.split("#");
            opt.url = urlArr[0] + '#' + T.Util.addHashPara({"isH5Share":T.isNative?0:1,"channelCode":Global.isiOS ? 'iosh5':'adh5'},opt.url);
        }
        if (T.isNative) {// type:
            api.thirdShare(opt,function (result) {
                if((result.data==0 &&Global.OS=='IOS')||(result.errorCode==0&&Global.OS=='Android')){//状态码为0表示分享成功
                    T.Util.xmlHttpRequest({//分享获取赠币  在回调里面调用分享送币接口
                        type:'get',
                        errorType:1,//报错不提示
                        authError:1,//鉴权失败不跳登录
                        reqUrl:"/commodity/services/invite/share.json",
                        callback:function(data){

                        },
                        errorCallback:function(data){

                        }
                    });
                }
                callBack(result)
            });
        }else{
            opt && opt.url && (window.location.href = opt.url);
        }
    },
    //第三方登录
    thirdLogin:function (type,callBack) {//原生拉取第三方数据后进行本地系统登录
        if (T.isNative) {// type:   WEIXIN    QQ
            api.thirdLogin({'type':type} , function (result) {callBack(result)});
        }
    },
    //第三方鉴权
    thirdToken:function (type,callBack) {//原生不做任何本地系统业务 直接原样返回第三方鉴权数据
        if (T.isNative) {// type:   WEIXIN    QQ
            api.thirdToken({'type':type} , function (result) {callBack(result)});
        }
    },
    notifyRenderFinish:function () {//通知原生dom渲染完成
        if (T.isNative) {
            api.notifyRenderFinish({} , function (result) {});
        }
    },
    clearCache:function () {//清缓存方法
        if (T.isNative) {
            api.clearCache({} , function (result) {});
        }else{
            window.localStorage.clear();
            window.sessionStorage.clear();
            tip("清除成功","ok");
        }
    },
    //清除用户信息
    clearUserInfo:function(){
        T.Storage.remove('access_token');//清除用户密码
        T.Storage.remove('userinfo');//清除用户信息
        T.Storage.remove('accountDetail');//清除账户明细信息
        T.Storage.remove('myShaidan');//清除用户晒单信息
        T.Storage.remove('myWeituo');//清除用户委托信息
        T.Storage.remove('payOrder');//清除用户已付款订单信息
        T.Storage.remove('message');//清除用户消息中心信息
        T.Storage.remove('bankCardList');//清除用户银行卡信息
        T.Storage.remove('selectedCard');//清除用户选择银行卡信息
        T.Storage.remove('userAddress');//清除用户收货地址信息
        T.Storage.remove('selectAddressInfo');//清除用户选择收货地址信息
    },
    screenShot:function (url) {//原生截屏
        if (T.isNative) {
            url = url||'';
            api.screenShot({'url':url} , function (result) {
                if((result.data==0 &&Global.OS=='IOS')||(result.errorCode==0&&Global.OS=='Android')){//状态码为0表示分享成功
                    T.Util.xmlHttpRequest({//分享获取赠币  在回调里面调用分享送币接口
                        type:'get',
                        errorType:1,//报错不提示
                        authError:1,//鉴权失败不跳登录
                        reqUrl:"/commodity/services/invite/share.json",
                        callback:function(data){

                        },
                        errorCallback:function(data){

                        }
                    });
                }
            });
            if((Global.OS=="IOS"&&T.Util.getAppVersion(T.Util.getAppInfo("appVersion")) < 105)){//ios低版本直接点击就调用领币接口
                T.Util.xmlHttpRequest({//分享获取赠币  在回调里面调用分享送币接口
                    type:'get',
                    errorType:1,//报错不提示
                    authError:1,//鉴权失败不跳登录
                    reqUrl:"/commodity/services/invite/share.json",
                    callback:function(data){

                    },
                    errorCallback:function(data){

                    }
                });
            }
        }else{
            console.log('原生截屏在网页打开无效');
        }
    },
    sendToken:function(obj){
        if (T.isNative) {
            api.sendToken(obj , function (result) {});
        }
    },
    //原生tips
    showNativeTip:function(msg,type){
        if (T.isNative) {
            api.showNativeTip({"msg":msg,"type":type});
        }
    },
    //隐藏原生tip
    hideNativeTip:function(){
        if (T.isNative) {
            api.showNativeTip({"type":"hideloading"});
        }
    },
    canShowBigAward:function (type) {
        if (T.isNative) {//type：1 可以显示中奖弹层，其他/默认：不可以
            api.canShowBigAward({"type":type||'0'});
        }
    },
    goTabbar:function(index){
        if (T.isNative) {
            //index传0，1，2，3pop所有层回到tabbar,并选中指定页。index不传，或非法，pop所有层回到tabbar
            api.goTabbar({"index":index} , function (result) {});
        }else{
            if(index=='1'){
                window.location.href = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=latestDeal.html';
            }else if(index=='2'){
                window.location.href = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=allGoods.html';
            }else if(index=='3'){
                window.location.href = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=mall.html';
            }else if(index=='4'){
                window.location.href = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=mine.html';
            }else{
                window.location.href = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=index.html';
            }
        }
    },
    openWindow: function (url,options) {//pop 参数表示ios新打开一层
        if (T.isNative) {//调用原生
            if(url.indexOf('page=goodsDetail.html')>-1){
                url = url+'&JPNativeWakeLock=1';//不熄屏参数
            }
            api.openWindow($.extend({'url':url},options), function (result) {});
        }else{
            window.location.href = url;
        }
    },
    isNeedLogin:function(){
        T.needLoginPage = ["accountDetail.html","address.html","drawing.html","myBankCard.html","myShaidan.html","myWeituo.html","payOrder.html","selectBankCard.html","auctionList.html&type=my","auctionList.html&type=collect","goodsRecord.html.html"];
        for(var i = 0;i < T.needLoginPage.length;i++){
            if(window.location.href.match(T.needLoginPage[i])){
                return true;
            }
        }
    },
    login:function(options){
        if(Global.isWechat){//|| ua.match(/QQ/i) == "qq"
            T.User.initUserLoginType('authFail');//针对微信 qq打开需要做鉴权登录
        }else{
            var needLogin = T.Util.isNeedLogin();
            if(!window.location.href.match(/\/user\/login\.html/)){
                T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/user/login.html' + (needLogin ? "?needLogin=true":"") + (options && options.isBack ? (needLogin ? "&" : "?") + "isBack=true":''));
            }
        }

    },
    back: function (options,callback) {
        options = options||{};
        if(typeof closeBeforeBack !='undefined' && typeof closeBeforeBack =='function'){
            closeBeforeBack();
        }
        //安卓关层时不会退出键盘，需手动退出
        $("input,textarea").blur();
        $("#numKeyWord").hide();
        if(options && options.index){
            T.Util.goTabbar(options.index);
        }else if(T.isNative){
            api.closeWindow(options,callback);
        }else{
            T.Storage.set('GlobalH5Back',1,1);
            if(options.url){
                window.location.href = options.url;
            }else if(window.history.length > 1){
                if(options&&options.num&&window.history.length>=options.num){
                    window.history.go('-'+options.num);
                }else{
                    window.history.back();
                }
            }else{
                window.location.href = T.Util.getRootPath()+'/'+Global.webRoot+'/view/go.html#page=index.html';
            }
        }
    },
    //获取地理定位，仅1.0.3以上版本可用
    getCurrentPosition:function(options){
        if(T.isNative && T.Util.getAppVersion() >= 103){
            api.LocationInterface(options,function(data){
                options.successCallback && options.successCallback(data);
            },function(data){
                data.msg && tip(data.msg);
            });
        }
    },
    filterScript: function (str) {
        str = str || '';
        str = decodeURIComponent(str);
        str = str.replace(/<.*>/g, ''); // 过滤标签注入
        str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
        str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
        str = str.replace(/[\s ]/g, '&nbsp;'); // 替换空格
        return str;
    },
    jsLoad:function(url,fn){
        if(!T.loadedJsUrl) T.loadedJsUrl ='';
        var list;
        if (typeof (url) == 'object') {
            if (url.length > 1) {
                list = url.slice(0);
            }
            url = url[0];
        }
        var node = document.createElement('script');
        var m = '';
        m = '?m=' + Math.random();
        node.src = url;
        if (T.loadedJsUrl.indexOf(url) != -1) {
            if (fn && typeof fn == 'function') {
                setTimeout(function() {
                    fn()
                }, 100);
            }
            return;
        } else {
            T.loadedJsUrl += url;
        }
        if (list) {
            node.onload = node.onreadystatechange = function() {
                if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                    list.shift();
                    this.JsLoad(list);
                    this.onload = this.onreadystatechange = null;
                }
            }
        }
        var head = document.body;
        head.appendChild(node);
        node.onload = node.onreadystatechange = function() {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                if (fn && typeof fn == 'function') {
                    fn();
                }
            }
        }
    },
    //兼容写法s
    getPara: function (name, url) {
        var paraStr = (typeof url == 'undefined') ? window.location.href : url;
        var paraArr = paraStr.split(/[?#]/g);
        for(var index = 1;index < paraArr.length;index++){
            var para = paraArr[index];
            para = para.split('&');
            for (var i = para.length - 1; para[i]; i--) {
                para[i] = para[i].split('=');
                if (para[i][0] == name) {
                    try { // 防止FF等decodeURIComponent异常
                        return this.filterScript(para[i][1]);
                    } catch (e) {
                        return para[i][1];
                    }
                }
            }
        }
        return '';
    },
    //获取search参数
    getParaSearch:function(name, url){
        var para = (typeof url == 'undefined') ? window.location.href : url;
        para = para.split('?');
        if(para.length >= 2){
            para = para[1];
            para = para.split("#")[0];
            para = para.split('&');
            for (var i = para.length-1; para[i]; i--) {
                para[i] = para[i].split('=');
                if (para[i][0] == name) {
                    try { // 防止FF等decodeURIComponent异常
                        return this.filterScript(para[i][1]);
                    } catch (e) {}
                }
            }
            return '';
        }
    },
    //获取hash参数
    getParaHash: function(name, url) {
        var para = (typeof url == 'undefined') ? window.location.href : url;
        para = para.split('#');
        if(para.length >= 2){
            para = para[1];
            para = para.split("?")[0];
            para = para.split('&');
            for (var i = 0; para[i]; i++) {
                para[i] = para[i].split('=');
                if (para[i][0] == name) {
                    try { // 防止FF等decodeURIComponent异常
                        return this.filterScript(para[i][1]);
                    } catch (e) {}
                }
            }
            return '';
        }
    },
    //hash管理
    addHashPara:function(opt,url){
        var para = (typeof url == 'undefined') ? window.location.href : url;
        var hash = '';
        var isParaExist = false;
        para = para.split('#');
        if(para.length >= 2){
            para = para[1];
            para = para.split(/[&?]/g);
            for (var i = 0; para[i]; i++) {
                para[i] = para[i].split('=');
                for(var p in opt){
                    if(para[i][0] == p){
                        isParaExist = true;
                        para[i][1] = opt[p];
                    }
                }
                if(!T.Util.isEmpty(para[i][0]) && !T.Util.isEmpty(para[i][1])){
                    hash += (hash?'&':'') + para[i][0] + '=' + String(para[i][1]);
                }
            }
        }
        if(!isParaExist){
            for(var p in opt){
                if(!T.Util.isEmpty(p) && !T.Util.isEmpty(opt[p])){
                    hash += (hash?'&':'') + p + '=' + opt[p];
                }
            }
        }
        return hash;
    },
    //获取短URL
    getShortUrl:function(){
        var url = window.location.href;
        var shortUrlEnd = url.indexOf('.html') - 1;
        var urlArr = url.split('');
        var shortUrlArr = [];
        for(var i = shortUrlEnd;i >= 0;i--){
            if(urlArr[i] == '/') break;
            shortUrlArr.push(urlArr[i]);
        }
        return shortUrlArr.reverse().join("");
    },
    getRootPath: function () {	//如 http://xxxxx:8088/project
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPath = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

        if(window.location.href.indexOf('file')==0){//文件打包到手机本地
            var beforePath = window.location.href.split('/auction/')[0];
            if(beforePath.length && beforePath.substr(beforePath.length-1,beforePath.length) == "/"){
                beforePath = beforePath.substr(0,beforePath.length-1);
            }
            return beforePath;
        }else{
            return localhostPath;
        }
    },
    getHostInfo:function(){
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPath = curWwwPath.substring(0, pos);
        return localhostPath;
    },
    doTimeParse:function(time,type){
        if(T.Util.isEmpty(time))return;
        var timeArr =  new Date(time).toString().split('GMT')[0].split(' ');
        return timeArr[1]+' '+timeArr[2]+', '+timeArr[3]+' '+timeArr[4].split(':')[0]+':'+timeArr[4].split(':')[1];
    },
    arrayUnique:function(arr){
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++){
            if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },
    parseNumber :function (num) {//转换千分位
        if(/\.\d+/.test(num)){
            num = ((''+num).length-1) - (''+num).indexOf('.') > 2 ? (new Number(num).toFixed(2)+'') : (''+num);
        }
        return (''+num).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    kefuNew:function (type,source,visEvtObj) {//
        if(visEvtObj){
            visEvtObj.urlEnableForVisitor = 0;//访客不允许点击对话中图文信息的url链接
        }
        var _url = 'http://v.rainbowred.com/visitor/mobile/chat.html?companyId=546&JPNativeTitle=在线客服&echatTag='+source+'&lan=zh&visEvt='+encodeURIComponent(JSON.stringify(visEvtObj));//'http://chat8.live800.com/live800/chatClient/chatbox.jsp?companyID=931028&configID=152291&jid=2750116277&JPNativeTitle=在线客服';
        if(type=='native'){//原生点击客服经过客服跳转中间页过来 直接href过去
            window.location.href = _url;
        }else{//h5这边打开客服 新开窗口
            if(Global.isiOS&&T.isNative){
                _url = 'http://v.rainbowred.com/visitor/mobile/chat.html?companyId=546&JPNativeTitle='+encodeURIComponent('在线客服')+'&echatTag='+encodeURIComponent(source)+'&lan=zh&visEvt='+encodeURIComponent(JSON.stringify(visEvtObj));
                T.Util.openWindow(Base64.encode(_url),{isBase64Encode:1});
            }else{
                T.Util.openWindow(_url);
            }
        }
    },
    kefu:function (type,info) {
        if(!kefuhttpFlag){return};
        kefuhttpFlag = false;//'http://chat8.live800.com
        var _url = T.Util.getRootPath()+'/live800/chatClient/chatbox.jsp?companyID=931028&configID=152291&jid=2750116277&JPNativeTitle=在线客服';
        var reqUrl = '/user/services/app/liveSign.json';
        if(info){
            reqUrl=reqUrl+'?memo='+encodeURI(info);
        }
        T.Util.xmlHttpRequest({
            type:'get',
            errorType:'1',
            authError:'1',
            reqUrl:reqUrl,
            callback:function(data){
                kefuhttpFlag = true;
               /* if(info){
                    for(var p in info){
                        _url += '&' + p + '=' + info[p];
                    }
                }*/
                 _url = _url+'&info='+data.res_data.value;
                if(type&&type=='native'){//原生点击客服经过客服跳转中间页过来 直接href过去
                    window.location.href = _url;
                }else{//h5这边打开客服 新开窗口
                    if(Global.isiOS&&T.isNative){
                        T.Util.openWindow(Base64.encode(_url),{isBase64Encode:1});
                    }else{
                        T.Util.openWindow(_url);
                    }
                }
            },
            errorCallback:function(){
                kefuhttpFlag = true;
                console.log('接口报错啦');
                if(type=='native'){//原生点击客服经过客服跳转中间页过来 直接href过去
                    window.location.href = _url;
                }else{//h5这边打开客服 新开窗口
                    T.Util.openWindow(_url);
                }
            }
        });
    },
    htmlScroll:function(is){
        if(is){
            // alert(3)
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            $('#mask').bind("touchmove",function(e){
                e.preventDefault();
            });
        }else{
            $('#mask').unbind("touchmove");
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    },
    webThirdLoginJump:function () {
        var callBackUrl = 'https://jp.zsp66.com/auction/view/oauth_callback.html';
        if(T.Storage.get('refercallBackUrl',1)){//设置一个session同一个callBackUrl 防止url上面很多个thirdLoginCode参数
            callBackUrl = T.Storage.get('refercallBackUrl',1);
        }else{
            var arr = location.href.split("&");
            for (var i=0;i<arr.length;i++){
                if(arr[i].indexOf('#')>-1){
                    arr[i] = arr[i].replace('#','/f-jinhao/');
                }
                if(arr[i].indexOf('?')>-1){
                    arr[i] = arr[i].replace('?','/f-wenhao/');
                }
            }
            callBackUrl = callBackUrl+'?refer='+ arr.join('/f-and/');
            T.Storage.set('refercallBackUrl',callBackUrl,1)
        }
        if(Global.isWechat){
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7639e38fd7b8e075&redirect_uri="+callBackUrl+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        }else if(Global.isQQ){
            location.href = "https://open.mp.qq.com/connect/oauth2/authorize?appid=101477739&redirect_uri="+callBackUrl+"&response_type=code&scope=snsapi_base&state=1#qq_redirect";
        }else{
            alert('第三方跳转鉴权类型获取错误  无法跳转');
        }
    },
    webThirdLogin:function (type) {
        if(!T.Util.isEmpty(T.Util.getPara('thirdLoginCode'))){
            T.Util.xmlHttpRequest({
                type:'post',
                reqData:{'channelCode':type,'thirdToken':T.Util.getPara('thirdLoginCode')},//channelCode   WEIXIN  QQ thirdToken
                errorType:1,
                reqUrl:'/user/services/login/thirdLogin.json',
                callback:function(data){
                    var token = data.res_data.value.token;
                    if(token.indexOf('-')>-1){//预token未绑定手机的token
                        var reqData={'isBind':2,"token":token,'inviteChannelCode':Global.inviteChannelCode};
                        T.Util.xmlHttpRequest({
                            type:'post',
                            errorType:1,
                            authError:1,
                            reqData:reqData,
                            reqUrl:'/user/services/user/tokenConvert.json',
                            callback:function(data){
                                T.Util.clearUserInfo();//清除上一个用户的隐私信息
                                T.Storage.set('access_token',data.res_data.value);
                                T.User.getUInfo(function(){

                                });
                            },
                            errorCallback:function(data){
                                tip(data.msg);
                            }
                        });

                    }else{//已经绑定过
                        T.Storage.set('access_token',token);
                        T.User.getUInfo(function () {

                        });
                    }
                },
                errorCallback:function(data){
                    if(data.msg_code=='1001'){//"msg": "第三方登陆鉴权失败",
                        T.Util.webThirdLoginJump();
                    }
                }
            })
        }else{
            T.Util.webThirdLoginJump();
        }
    },
}
var httpErrorMsg = function (readyState) {
    var errorMsg = "Request error occurred";
    switch (readyState) {
        case 0:
            errorMsg = "Network anomaly";
            break; //代表未初始化的状态。创建了一个XMLHttpRequest对象，尚未初始化
        case 1:
            errorMsg = "Network anomaly";
            break;  //代表连接状态，已经调用了open方法，并且已经准备好发送请求
        case 2:
            errorMsg = "Server response exception";
            break;  //代表发送状态，已经调用了send方法发出请求，尚未得到响应结果
        case 3:
            errorMsg = "Accept server response exception";
            break;  //代表正在接收状态，已经接收了HTTP响应的头部信息，正在接收响应内容
        case 4:
            errorMsg = "Network anomaly";
            break;  //代表已loading状态，此时响应内容已完全被接收
        default:
            break;
    }
    return errorMsg;
};

if(typeof $.fn.Touch ==='function'){//兼容活动页用的tap事件
    $('#dlbanner').Touch(function () {
        T.Util.appDownload();
    });
    $('#back').Touch(function () {
        T.Util.getPara('initdownload') ? T.Util.back({num:2}):T.Util.back();
    });
    $('#kefu,#kefuOnline,#floatkefu').Touch(function () {
        T.Util.kefuNew();
    });
    $("#aggree-protocol i").off().Touch(function(){
        $(this).toggleClass("checked");
    });
    $("#aggree-protocol span").off().Touch(function(){
        $(this).siblings("i").toggleClass("checked");
    });
    $("#aggree-protocol em").off().Touch(function(){
        if($(this).parent().is(".user-protocol")){
            T.Util.openWindow('https://jp.zsp66.com/auction/user/regProtocol.html');
        }else{
            T.Util.openWindow('https://jp.zsp66.com/auction/user/protocol.html');
        }
    },{stop:true});
}
T.User = {
    initUserLoginType:function () {
        var userinfo = T.Storage.get('userinfo')||{};
        var channelCode = T.Util.getAppInfo('channelCode');
        if(T.Storage.get('noThirdLogin',1)||T.Util.isThirdChannelPage()){
            return false;
        }
        if(!(/iosh5/.test(channelCode)||/adh5/.test(channelCode))){//非iosh5 安卓h5 进来清除登录状态
            if(userinfo.loginType == "3"){//如果是微信登录强制推出
                T.Storage.remove('access_token');
                T.Storage.remove('userinfo');
            }
            return false;
        }
        if(Global.isWechat){//微信打开鉴权
            if(userinfo.loginType != "3"){//不是微信登录类型强制推出
                T.Storage.remove('access_token');
            }
            if(T.Util.isEmpty(T.Storage.get('access_token'))){//没有系统token去调用鉴权
                T.Util.webThirdLogin('WEIXIN');
            }else{
                T.User.getUInfo(function () {//如果更新之后发现绑定类型发生变化会清除token重新联合登录
                    console.log('微信或者qq联合登录界面更新用户信息成功');
                });
            }
        }
    },
    //获取用户信息
    getUInfo:function(callbackAA,noAuth){
        //token为null的时候不触发getUser
        if(T.Util.isEmpty(T.Storage.get('access_token'))||T.Storage.get('access_token').indexOf('-')>-1){

            if(T.isNative && window.location.href.indexOf('/auction/user/login.html')==-1){
                T.Util.clearUserInfo();
                T.Util.sendToken({"token":''});
            }
            if(callbackAA && typeof callbackAA ==='function'){
                callbackAA();
            };
            return;
        }
        var config = {
            type:'get',
            reqUrl:'/user/services/user/getUser.json',//access_token存起来,//登录成功获取用户信息
            callback:function(data){
                //更新用户信息
                var oldUserInfo = T.Storage.get('userinfo')||{};
                if(oldUserInfo.bindCount!=data.res_data.value.bindCount && window.location.href.indexOf('setMobile.html')==-1){//联合登录 绑定类型发生变更的时候 需要清除本地token 并重新鉴权
                    var channelCode = T.Util.getAppInfo('channelCode');
                    if(Global.isWechat && T.Util.isEmpty(T.Storage.get('thirdLoginBindTypeChangeFlag',1))&&(/iosh5/.test(channelCode)||/adh5/.test(channelCode))){//||Global.isQQ
                        T.Storage.remove('access_token');
                        T.Storage.set('thirdLoginBindTypeChangeFlag',1,1);
                        T.User.initUserLoginType();
                    }
                }
                var userinfo = data.res_data.value||{};
                T.Storage.set('userinfo',userinfo);
                //更新用户密码设置信息
                var isSetPwd = T.Storage.get('isSetPwd')||{};
                var userAcct = T.Storage.get('lastLoginInfo');//用户当前登录账号
                isSetPwd[userAcct] = userinfo.isSetPwd;
                T.Storage.set('isSetPwd',isSetPwd);
                if(callbackAA && typeof callbackAA ==='function'){callbackAA(data);}
            },
            errorCallback:function(data){
                callbackAA && callbackAA(data);//回调 鉴权失败有需要初始化业务界面
            }
        }
        if(!T.Util.isEmpty(noAuth) && noAuth=='1'){//鉴权失败不处理
            config.authError=1;
            config.errorType=1;
        }
        T.Util.xmlHttpRequest(config);
    },
    //获取用户收货地址
    getUserAddress:function(callBack){
        if(!T.Storage.get('access_token')){
            return false;
        }
        T.Util.xmlHttpRequest({
            type:'get',
            reqUrl:'/user/services/user/userAddressList.json',
            callback:function(data){
                var d=data.res_data.value;
                if(d && d.length){
                    T.Storage.set('userAddress',d);
                }
                callBack && callBack(d);
            },
            errorCallback:function(){}
        });
    }
}
T.appToH5= {
    init:function(initCallBack,apperaCallBack,disapperaCallBack,lockCallback,unlockCallback){
        function appInit(ev){
            if(window.location.origin.indexOf('file')==0){//打包到本地
                Global.fullHost = ev.result.apiHost;
                Global.apiHost = ev.result.apiHost;
                Global.authHost = ev.result.authHost;
                Global.payHost = ev.result.payHost;
            }
            console.log('initEvent---result:'+JSON.stringify(ev.result));
            if(ev.result.netWorkStatus){
                Global.netWorkStatus = ev.result.netWorkStatus;
            }
            if(ev.result.webVersion){
                Global.webVersion = ev.result.webVersion;//增量包版本号
                //增量包版本号变化后清除本地缓存
                if(Global.webVersion != T.Storage.get('webVersion')){
                    T.Storage.set('webVersion',Global.webVersion);
                    for(var p in localStorage){
                        if(/\.html/.test(p)){
                            T.Storage.remove(p);
                        }
                    }
                }
            }
            if(ev.result.devicefp){//设备指纹
                Global.devicefp = ev.result.devicefp;
            }
            if(ev.result.invitation){//invitation:  邀请码
                Global.inviteChannelCode = ev.result.invitation;
            }
            if(ev.result.appCode){
                Global.appCode = ev.result.appCode;//应用编码
            }
            if(ev.result.isAudit){
                Global.isAudit = ev.result.isAudit;//是否在审核期间
            }
            if(ev.result.appName){
                Global.appName = ev.result.appName;//应用名
            }
            if(ev.result.language){
                Global.language = ev.result.language;//语言
            }
            if(ev.result.deviceCode){
                Global.deviceCode = ev.result.deviceCode;//设备号
            }
            if(ev.result.showWeiXin){
                Global.showWeiXin = ev.result.showWeiXin;//微信登录、分享开关
            }
            if(ev.result.showQQ){
                Global.showQQ = ev.result.showQQ;//QQ登录、分享开关
            }
            if(ev.result.showWeiBo){
                Global.showWeiBo = ev.result.showWeiBo;//微博分享开关
            }
            if(ev.result.canShare){
                Global.canShare = ev.result.canShare;//分享开关
            }else if(Global.isAndroid){
                Global.canShare = 1;//安卓默认支持分享
            }
            if(Global.isAudit && Global.isAudit == '1'){
                Global.canShare = 0;//审核环境不支持分享
            }
            if(Global.isAndroid && T.Util.getAppVersion() <= 100){
                Global.canShare = 1;//安卓1.0.0版本都支持分享
            }
            if(!ev.result.isLogin){//退出登录
                T.Storage.remove('access_token');
                T.Storage.remove('userinfo');
                (initCallBack && typeof initCallBack ==='function') && initCallBack();//回调
                if(typeof nativeEventInit != 'undefined' && typeof nativeEventInit == 'function'){
                    nativeEventInit();
                }
                Global.isFirst = false;
                return;
            }
            if(ev.result.accessToken){//刷新登录之后需要重新获取用户信息
                if(ev.result.accessToken == T.Storage.get('access_token')){//如果token一样 说明登录的还是同一个人 可以先执行回调 后异步拉去用户最新信息
                    (initCallBack && typeof initCallBack ==='function') && initCallBack();
                    T.User.getUInfo(function(){},'1');//初始化的时候 token失效不弹登录层
                }else{
                    T.Storage.set('access_token',ev.result.accessToken);
                    T.User.getUInfo(function(){//之前token没有或者不一样 需要先拉用户下信息再做回调
                        (initCallBack && typeof initCallBack ==='function') && initCallBack();
                        if(typeof nativeEventInit != 'undefined' && typeof nativeEventInit == 'function'){
                            nativeEventInit();
                        }
                        Global.isFirst = false;
                    },'1');//初始化的时候 token失效不弹登录层
                }
            }
        }
        api = lib.API;
        document.addEventListener("EVENT_INIT", appInit, false);
        //document.addEventListener("EVENT_REFRESH",refresh,false);
        api.eventListener({}, function (result) {console.log('app到H5事件初始化' + JSON.stringify(result))});
        //document.addEventListener("EVENT_LOGIN", login,false);
        document.addEventListener("EVENT_NETWORK", function (ev) {
            console.log('EVENT_NETWORK---result:'+JSON.stringify(ev.result));
            Global.netWorkStatus = ev.result.netWorkStatus;
            if(Global.netWorkStatus>0){apperaCallBack && apperaCallBack(ev);}
        }, false);//网络变化
        document.addEventListener("EVENT_APPEAR", function (ev) {//webview再次重新出现在用户第一视角
            console.log('EVENT_APPEAR---result:'+JSON.stringify(ev.result));
            if(ev.result.netWorkStatus){
                Global.netWorkStatus = ev.result.netWorkStatus;
                if(ev.result.netWorkStatus==0){return};
            }
            if(ev.result.accessToken){//每次都异步更新用户信息
                T.Storage.set('access_token',ev.result.accessToken);
                T.User.getUInfo(function(){},'1');//有token需要获取用户信息
            }
            apperaCallBack && apperaCallBack(ev);
        },false);
        document.addEventListener("EVENT_DISAPPEAR", function (ev) {//webview退出在用户第一视角
            console.log('EVENT_DISAPPEAR---result:'+JSON.stringify(ev.result));
            disapperaCallBack && disapperaCallBack(ev);
        },false);
        document.addEventListener("EVENT_LOCK", function (ev) {//app退到系统后台
            console.log('EVENT_LOCK---result:'+JSON.stringify(ev.result));
            lockCallback && lockCallback(ev);
        },false);
        document.addEventListener("EVENT_UNLOCK", function (ev) {//app系统后台从新打开
            console.log('EVENT_UNLOCK---result:'+JSON.stringify(ev.result));
            unlockCallback && unlockCallback(ev);
        },false);
    }
}
var addTimerList = [];
var addTimer = function(){
    var interval;
    return function(el,timeStamp,eid){//三个参数 第一个表示节点 第二个是倒计时时间 第三个是扩展类 目前有订单记录的期号id 也有倒计时类别区分
        if(!interval){
            interval = setInterval(go,1000);
        }
        if(T.Util.getParaHash("page")!='goodsDetail.html'||eid=='newUserTeach'){
            timeStamp = timeStamp+1;
        }
        var obj = {ele:el,time:timeStamp<1?1:timeStamp,eid:eid||'00'};
        for (var i=0;i<addTimerList.length;i++){
            if(el){
                if(addTimerList[i]){
                    if(el === addTimerList[i].ele){
                        addTimerList[i].time = timeStamp;
                       return;
                    }
                }
            }
        }
        addTimerList.push(obj);
    }
    function go() {
        for (var i = 0; i < addTimerList.length; i++) {
            addTimerList[i].time == --addTimerList[i].time < 0 ? 0 : addTimerList[i].time;
            var ela = $(addTimerList[i].ele);
            if(T.Util.getParaHash("page")=='goodsDetail.html'||addTimerList[i].eid=='newUserTeach'){
                ela.find('i').html(changeTimeStamp(addTimerList[i].time,addTimerList[i].ele,addTimerList[i].eid));
            }else{
                ela.html(changeTimeStamp(addTimerList[i].time,addTimerList[i].ele,addTimerList[i].eid));
            }
            if(!addTimerList[i].time){
                addTimerList.splice(i--, 1);
            }
        }
    }
    //传入倒计时时间
    function changeTimeStamp(distancetime,el,eid){
        var ela = $(el);
        if(T.Util.getParaHash("page")=='allGoods.html' && $(el).parent().parent().hasClass('stop')){
            return '已暂停';
        }
        if(distancetime > 0){
            if(T.Util.getParaHash("page")=='goodsDetail.html'||eid=='newUserTeach'){
                var min = Math.floor(distancetime/60).toString();
                if(min.length <= 1) { min = "0" + min;}
                var sec = Math.floor((distancetime-(min*60))).toString();
                if(sec.length <= 1) {sec = "0" + sec; }
                if(sec<4){
                    ela.removeClass('pulse').addClass('pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass('pulse');
                    });
                }
                if(distancetime!=0){
                    addMsTimer(ela.find('span'),100);//允许后端消息延迟一秒
                }else{
                    ela.find('span').html('00');
                }
                return min + ":" +sec;
            }else if(eid=='cjg'||eid=='waitPay'){
                var days = parseInt(distancetime / 60 / 60 / 24 , 10); //计算剩余的天数
                var hours = parseInt(distancetime / 60 / 60 % 24 , 10); //计算剩余的小时
                var minutes = parseInt(distancetime / 60 % 60, 10);//计算剩余的分钟
                var seconds = parseInt(distancetime % 60, 10);//计算剩余的秒数
                if(days.length <= 1) { days = "0" + days;}
                if(hours.length <= 1) { hours = "0" + hours;}
                if(minutes.length <= 1) { minutes = "0" + minutes;}
                if(seconds.length <= 1) { seconds = "0" + seconds;}
                if(eid=='waitPay'){
                    if(days>0){
                        return '剩余:'+days + "天" +hours +"时" +minutes+'分';
                    }else{
                        return '剩余:'+hours + "时" +minutes +"分" +seconds+'秒';
                    }
                }else{
                    if(days>0){
                        return days + "天" +hours +"时" +minutes+'分后失效';
                    }else{
                        return hours + "时" +minutes +"分" +seconds+'秒后失效';
                    }
                }

            }else{//除了竞拍详情页之外的页面 因为倒计时加了1 所以倒计时等于1的时候 就该重新拉取接口
                if(distancetime==1){
                    if(T.Util.getParaHash("page")=='allGoods.html'){//兼容页面上搜查出来存在两个id节点倒计时失效
                        T.Util.getCommodityInfo(el.replace('[djs-id="','').replace('"]',''),eid);
                    }else{
                        T.Util.getCommodityInfo(el.replace('#',''),eid);
                    }
                }
                var h = Math.floor(distancetime / 3600).toString();
                if(h.length <= 1) { h = "0" + h;}
                var m = Math.floor((distancetime / 60 % 60)).toString();
                if(m.length <= 1) { m = "0" + m;}
                var s = Math.floor((distancetime % 60)).toString();
                if(s.length <= 1) { s = "0" + s;}
                return h + ":" +m +":" +s;
            }
        }else{
                if(T.Util.getParaHash("page")=='goodsDetail.html'||eid=='newUserTeach'){
                    if(T.Util.getParaHash("page")=='goodsDetail.html'){
                        T.goodsDetail.getProductInfo('fromDjsTimer');
                    };
                    ela.find('span').html('00');
                    return "00:00";
                }else{
                    if(eid=='cjg'||eid=='waitPay'){
                        return '已失效';
                    }else{
                        if(T.Util.getParaHash("page")=='allGoods.html'){//兼容页面上搜查出来存在两个id节点倒计时失效
                            T.Util.getCommodityInfo(el.replace('[djs-id="','').replace('"]',''),eid);
                        }else{
                            T.Util.getCommodityInfo(el.replace('#',''),eid);
                        }
                        return "00:00:01";
                    }

                }
        }
    }
}();
var addMsTimer = function(){
    var list = [],
        interval;
    return function(el,timeStamp){
        if(!interval){
            interval = setInterval(go,10);
        }
        var obj = {ele:el,time:timeStamp};
        for (var i=0;i<list.length;i++){
            if(el){
                if(list[i]){
                    if(el === list[i].ele){
                        list[i].time = timeStamp;
                        return;
                    }
                }
            }
        }
        list.push(obj);
    }
    function go() {
        for (var i = 0; i < list.length; i++) {
            list[i].time == --list[i].time < 0 ? 0 : list[i].time;
            $(list[i].ele).html(changeTimeStamp(list[i].time));
            if (!list[i].time)
                list.splice(i--, 1);
        }
    }
    //传入倒计时时间
    function changeTimeStamp(distancetime){
        if(distancetime > 0){
            var hm = Math.floor(distancetime%100).toString();
            if(hm.length <= 1) {
                hm = "0" + hm;
            }
            return hm;
        }else{
            //若否，就是已经到截止时间了
            return "00"
        }
    }
}();
T.Util.sendUserBehaviorList();//用户行为定时批量上报
if(!T.isNative){
    Global.inviteChannelCode = T.Storage.get('inviteChannelCode',1);
    T.User.initUserLoginType();//针对微信 qq打开需要做鉴权登录
}