T.recharge = (function(){
    var coinUint = (Global.isAudit && Global.isAudit == '1') ? "元" : "币";//金额单位
    var rechargeMoney = parseFloat($("#recharge-money").val());//充值金额
    var ruleType = 0;//规则类型 0:没有规则 1:区间固定值  2:区间比例值  3:固定充值金额
    var ruleList = [];//规则列表
    var redPackList = [];//立减规则
    var endGetDataFlag = true;//接口是否请求完毕
    var httpNum = 0;
    T.isDoRecharge = false;//是否在充值
    T.hasCallBack = false;//是否拿到回调

    var check = {
        money:function(val){
            if(val==''){
                tip('请输入充值金额');
            }else {
                return true;
            }
        }
    }

    var o = {
        //程序入口
        init:function(isAgain){
            o.initPage(isAgain);
            o.loadCache();
            o.loadList();
            o.bindEvent();
            o.refreshUserMoney(5);
        },
        //初始化页面
        initPage:function(isAgain){
            var access_token = T.Storage.get('access_token');
            var userinfo = T.Storage.get('userinfo')||{};
            if((userinfo && access_token)||isAgain){
                $("#account").text(userinfo.nickName||userinfo.userMobile||'--');
                $("#balance").text(userinfo.moneyList ? userinfo.moneyList[2]:'--');
            }else{
                T.Util.openWindow(T.Util.getRootPath()+'/'+Global.webRoot+'/user/login.html');
            }
            //ios审核环境下修改充值单位
            if(Global.isAudit && Global.isAudit == '1'){
                $(".coinunit").text("元");
                $("#account-type").text("账户余额");
            }
            //充值页面PV/UV（czfwl）
            T.Util.setUserBehaviorList({
                "busId":"充值",
                "conductCode": "czfwl",
                "comductDesc": "充值页面PV/UV",
                "time": new Date().getTime()
            });
        },
        //加载页面缓存
        loadCache:function(){
            var recharge_quick = T.Storage.get('recharge_quick');
            var recharge_list = T.Storage.get('recharge_list');
            if(recharge_quick){
                $("#recharge-quick").html(recharge_quick);
                //渲染充值按钮
                var rechargeMoney = parseFloat(T.Util.getPara('money')||$("#recharge-quick em.on").text()||"10.00").toFixed(2);
                $("#recharge-money").val(rechargeMoney);
                $.each($("#recharge-quick em"),function(i){
                    var item = $("#recharge-quick em").eq(i);
                    if(parseFloat(item.text()) == parseFloat(rechargeMoney)){
                        $("#recharge-quick em").removeClass("on");
                        item.addClass("on");
                    }
                });
                redPackList = T.Storage.get('redPackList')||[];
                var cutMoney = o.getCutMoney(rechargeMoney);
                $("#gain-money").text(rechargeMoney + coinUint);
                $("#cut-money").text(cutMoney + coinUint);
                $("#pay-money").text((rechargeMoney - cutMoney).toFixed(2) + "元");
                //显示页面
                $("#recharge-quick,#payinfo").removeClass("hide");
            }
            if(recharge_list){
                $("#recharge-list").html(recharge_list);
                $("#payinfo,#recharge-list,#recharge-text").removeClass("hide");
            }
            o.bindEvent();
        },
        //事件绑定
        bindEvent:function(){
            //输入充值金额
            $("#recharge-money").on("input",function(){
                var money = $(this).val();
                //添加删除按钮
                if(money.length > 0){
                    $(this).parent().addClass("writing");
                }else{
                    $(this).parent().removeClass("writing");
                }
                //清除非数字字符
                if(!T.money) T.money = "";
                if(money.length >= T.money.length){
                    if(!money.slice(-1).match(/[0-9.]/)||money.match(/\.\d{3}/)){
                        $(this).val(T.money);
                        return false;
                    }
                }
                T.money = money;
                //确认充值金额
                rechargeMoney = parseFloat($(this).val())||0;
                var cutMoney = o.getCutMoney(rechargeMoney);
                $("#recharge-quick em").removeClass("on");
                $("#gain-money").text(o.getTotalMoney());
                $("#cut-money").text(cutMoney + coinUint);
                $("#pay-money").text((rechargeMoney - cutMoney).toFixed(2) + "元");
                //选中快捷投注按钮
                $.each($("#recharge-quick em"),function(i){
                    var dom = $("#recharge-quick em").eq(i);
                    if(parseFloat(dom.text()) == rechargeMoney){
                        dom.addClass("on").siblings().removeClass("on");
                    }
                });
            });
            $("#recharge-money").on("blur",function(){
                $(this).parent().parent().removeClass("writing");
            });
            $(".clear").off().Touch(function(){
                T.money = '';
                $("#gain-money").text("0.00");
                $(this).parent().find("input").val("");
                $(this).parent().removeClass("writing");
            });
            //选择充值金额
            $('#recharge-quick em').off().Touch(function () {
                $(this).addClass("on").siblings().removeClass("on");
                rechargeMoney = parseFloat($(this).text());
                var cutMoney = o.getCutMoney(rechargeMoney);
                $("#recharge-money").val(rechargeMoney);
                $("#gain-money").text(o.getTotalMoney());
                $("#cut-money").text(cutMoney + coinUint);
                $("#pay-money").text((rechargeMoney - cutMoney).toFixed(2) + "元");
            });
            //充值
            $(".recharge-item").off().Touch(function(){
                var rechargeMoney = T.Util.trim($("#recharge-money").val());
                var data = JSON.parse($(this).attr("data-obj"));
                //各类型支付方式的点击量（czwxdjl、czzfbdjl）
                T.Util.setUserBehaviorList({
                    "busId":"充值",
                    "conductCode": "cz" + data["REC_CODE"] + "djl",
                    "comductDesc": "各类型支付方式的点击量",
                    "time": new Date().getTime()
                });
                //充值金额校验
                if(!check.money(rechargeMoney)) return false;
                o.doRecharge({
                    rec_no:data.REC_NO,
                    rec_code:data.REC_CODE,
                    is_form:data.isForm,
                    rechargeMoney:rechargeMoney,
                    successCallbackUrl:data.SYN_S_URL
                });
            });
        },
        //刷新账户余额
        refreshUserMoney:function (num) {
            T.User.getUInfo(function () {
                var userinfo = T.Storage.get('userinfo')||{};
                if(userinfo.moneyList && $('#balance').html()!=userinfo.moneyList[2]){//不相等 取到了充值过后的值
                    $("#balance").text(userinfo.moneyList ? userinfo.moneyList[2]:'--');
                }else{//相等 没取到了充值过后的值
                    httpNum++;
                    if((num && httpNum < num)){//取5次或者10次 之后就不取了；
                        setTimeout(function () {
                            o.refreshUserMoney(num);
                        },2000);
                    }else if(!num&&httpNum<11){
                        setTimeout(function () {
                            o.refreshUserMoney();
                        },1200);
                    }
                }
            },1)
        },
        //获取总金额
        getTotalMoney:function(){
            var totalMoney = parseFloat(rechargeMoney).toFixed(2) + coinUint;
            if(ruleList && ruleList.length){
                for(var i = 0;i < ruleList.length;i++){
                    if(ruleType == '3'){//固定充值金额
                        if(rechargeMoney == ruleList[i].START_MONEY){
                            totalMoney += "+" + parseFloat(ruleList[i].GIVE_MONEY).toFixed(2) + "赠币";
                        }
                    }else{
                        if(rechargeMoney >= ruleList[i].START_MONEY && rechargeMoney < ruleList[i].END_MONEY){
                            if(ruleType == '1'){//区间固定值
                                totalMoney += "+" + parseFloat(ruleList[i].GIVE_MONEY).toFixed(2) + "赠币";
                            }else if(ruleType == '2'){//区间比例值
                                totalMoney += "+" + parseFloat(rechargeMoney * ruleList[i].GIVE_MONEY / 100).toFixed(2) + "赠币";
                            }
                        }
                    }

                }
            }
            return totalMoney;
        },
        //计算立减金额
        getCutMoney:function(money){
            for(var i = 0;i < redPackList.length;i++){
                var item = redPackList[i];
                if(parseFloat(money) >= parseFloat(item.minMoney) && parseFloat(money) < parseFloat(item.maxMoney)){
                    return item.redPack;
                }
            }
            return 0;
        },
        //加载充值列表
        loadList:function(){

            T.Util.xmlHttpRequest({
                type:'get',
                authError:1,
                reqUrl:'/commodity/services/acct/recList?deviceType='+ (T.isNative?T.Util.getDeviceType():'h5')+ '&channelCd=' + (T.isNative?T.Util.getAppInfo('channelCode'):(Global.isiOS ? 'iosh5':'adh5')) + '&appVersion=' + (T.isNative?T.Util.getAppInfo('appVersion'):'all') + '&isH5=' + (T.isNative?"0":"1") + '&platform=' + T.Util.getPlatform(),
                callback:function(data){
                    if(data.msg_code == "0" && data.res_data){
                        //获取充值活动规则
                        ruleType = data.res_data.ruleType;
                        ruleList = data.res_data.ruleList;
                        //渲染充值列表
                        o.showRechargeList(data.res_data);
                    }else{
                        tip(data.msg||Global.neterror);
                    }
                },
                errorCallback:function(){

                }
            });
        },
        //渲染充值列表
        showRechargeList:function(data){
            //渲染运营信息
            if(data.ruleTotal){
                $("#advert").text(data.ruleTotal);
            }
            //渲染充值按钮
            var btnList = data.recButton||[];
            var btnHtml = [];
            var money = T.Util.getParaSearch('money');
            var defaultMoney = 0;
            //获取高于某一金额的固定选项
            function getHigherPoint(val){
                for(var i = 0;i < btnList.length;i++){
                    if(parseFloat(btnList[i].BUTTON_NUMBER) >= val){
                        return String(i);
                    }
                }
            }
            //获取有充值活动的最小固定选项
            function getActivityPoint(){
                for(var i = 0;i < btnList.length;i++){
                    if(btnList[i].BUTTON_GIFT){
                        return String(i);
                    }
                }
            }
            $.each(btnList,function(i,item){
                //审核环境修改充值单位
                if(Global.isAudit && Global.isAudit == '1'){
                    item.BUTTON_NAME = item.BUTTON_NAME.replace(/拍币/,"元");
                }
                var btnClass = "";
                if(!T.Util.isEmpty(money) && money != 'NaN'){//若有带入金额
                    var higherPoint = getHigherPoint(money);
                    if(higherPoint){
                        defaultMoney = parseFloat(btnList[higherPoint].BUTTON_NUMBER);
                        btnClass = i == higherPoint ? ' class="on"' : '';
                    }else{
                        defaultMoney = money;
                        btnClass = parseFloat(item.BUTTON_NAME) == money ? ' class="on"' : '';
                    }
                }else if(data.ruleList && data.ruleList.length){//若有充值活动
                    var activityPoint = getActivityPoint();
                    if(activityPoint){
                        defaultMoney = parseFloat(btnList[activityPoint].BUTTON_NUMBER);
                        btnClass = i == activityPoint ? ' class="on"' : '';
                    }
                }else if(item.IS_DEFAULT){//若有默认充值金额
                    defaultMoney = parseFloat(item.BUTTON_NUMBER);
                    btnClass = ' class="on"';
                }else{
                    defaultMoney = parseFloat(btnList[0].BUTTON_NUMBER);
                    btnClass = i == 0 ? ' class="on"' : '';
                }
                btnHtml.push('<em' + btnClass + '>' + item.BUTTON_NAME + (item.BUTTON_GIFT ? '<span>' + item.BUTTON_GIFT + '</span>':'') + '</em>');
            });
            $("#recharge-quick").html(btnHtml.join(""));
            T.Storage.set('recharge_quick',$("#recharge-quick").html());
            //渲染随机立减
            redPackList = data.redPackList||[];
            T.Storage.set('redPackList',redPackList);
            if(defaultMoney){
                rechargeMoney = parseFloat(defaultMoney);
                var cutMoney = o.getCutMoney(rechargeMoney);
                $("#recharge-money").val(parseFloat(defaultMoney).toFixed(2));
                $("#gain-money").text(o.getTotalMoney());
                $("#cut-money").text(cutMoney + coinUint);
                $("#pay-money").text((rechargeMoney - cutMoney).toFixed(2) + "元");
            }
            //渲染充值列表
            var recList = data.recList||[];
            var recHtml = [];
            $.each(recList,function(i,item){
                recHtml.push('<div class="recharge-item" data-obj=' + "'" + JSON.stringify(item) + "'" + '><i style="background:url(' + T.Util.getFullPic(item.REC_PIC) + ') left center / 0.72rem auto no-repeat;"></i>' + item.JOIN_INFO + '</div>');
            });
            $("#recharge-list").html(recHtml.join(""));
            T.Storage.set('recharge_list',$("#recharge-list").html());
            //显示页面
            $("#recharge-quick,#payinfo,#recharge-list,#recharge-text").removeClass("hide");
            o.bindEvent();//事件绑定
        },
        //充值完成提示
        showTips:function(){
            o.refreshUserMoney();
            var _tips_info = '<h2>充值信息</h2><p>如确认已付款请勿重复支付，可能存在延迟到账，请稍后查看“账户明细”是否充值成功；如未付款，请继续充值</p>';
            confirm({
                className: 'recharge_alert',
                html: _tips_info,
                cancelText:'已完成付款',
                okText: '继续充值',
                okFun: function () {

                },cancelFun: function () {
                    T.Util.back();
                }
            });
        },
        //支付宝充值成功后通知后端
        alipayRechargeCallback:function(orderNo){
            T.Util.xmlHttpRequest({
                type:'get',
                errorType:1,
                reqUrl:'/notify/alipayRechargeCallback?orderNo=' + orderNo,
                callback:function(json){
                    T.Util.back();
                }
            });
        },
        //充值
        doRecharge:function(opt){
            rechargeMoney = opt.rechargeMoney;
            var rec_code = opt.rec_code;
            var is_form = parseInt(opt.is_form);
            var successCallbackUrl = opt.successCallbackUrl;
            if((/^alipay/.test(rec_code)||/^wechat/.test(rec_code)) && !/H5$/i.test(rec_code)){
                T.isH5Pay = false;
            }else{
                T.isH5Pay = true;
            }
            T.isDoRecharge = true;//是否在支付
            clearTimeout(T.showRechargeTips);

            //公用数据
            var recData = {
                "rechargeMoney":rechargeMoney,  //充值金额  notNull
                "rechargeType":rec_code,  	//充值模式(微信：wx，京东：jd，支付宝：ali) NotNull
                "successCallbackUrl":successCallbackUrl,  //支付成功回调地址
                "failCallbackUrl":successCallbackUrl, //支付失败回调地址
                "subject":"拍币",   //	//商品的标题/交易标题/订单标题/订单关键字等
                "describe":"拍币充值",  //商品描述
                "payTimeout":"100000",  //支付超时时间
                "appCd":T.Util.getAppInfo('bundleID'),  //应用包id  NotNull
                "appName":T.Util.getAppInfo('appName'),  //应用包名字   NotNull
                "channelCd":T.Util.getAppInfo('channelCode'),  //渠道cd   NotNull
                "appVersion":T.Util.getAppInfo('appVersion'), //版本  NotNull
                "client_os":Global.isiOS ? "ios" : "Android",  //手机系统类型  NotNull
                "joinType":"0",  //0为H5, 1为APP, 为空则采用H5方式
                "userIp":'127.0.0.1' //IP地址
            }

            endGetDataFlag = false;
            tip('加载中...','loading');
            T.Util.xmlHttpRequest({
                type:'post',
                errorType:1,
                reqUrl:'/commodity/services/acct/rechargeMode',//type =1：全部 2：收入 3：支出
                reqData:recData,
                callback:function(json){
                    pageLoading.hide();
                    endGetDataFlag = true;
                    T.hasCallBack = false;
                    var from = T.Util.getParaSearch('from');
                    //跳第三方支付
                    if(json.res_data && json.res_data.data){
                        var payData,payUrl;
                        if(/^alipay/.test(rec_code) && !/H5$/i.test(rec_code)){//支付宝官充
                            T.Util.aliPay({"payOrder":Base64.encode(json.res_data.data)},function(d){
                                T.hasCallBack = true;
                                T.isDoRecharge = false;
                                var data = JSON.parse(Base64.decode(d.data));
                                if(data && data.resultStatus == '9000'){
                                    tip("充值成功","ok");
                                    o.refreshUserMoney();
                                    o.loadList();//刷新充值列表
                                    o.alipayRechargeCallback(JSON.parse(data.result)["alipay_trade_app_pay_response"]["out_trade_no"]);//通知后端
                                }else{
                                    tip("充值失败","error");
                                    if(from == 'buy'){
                                        T.Util.back();
                                    }
                                }
                            });
                        }else if(/^wechat/.test(rec_code) && !/H5$/i.test(rec_code)){//微信官充
                            T.Util.weixinPay(json.res_data.data,function(d){
                                T.hasCallBack = true;
                                T.isDoRecharge = false;
                                if(d.data && d.data.errCode == 0){
                                    tip("充值成功","ok");
                                    o.refreshUserMoney();
                                    o.loadList();//刷新充值列表
                                    T.Util.back();
                                }else{
                                    tip("充值失败","error");
                                    if(from == 'buy'){
                                        T.Util.back();
                                    }
                                }
                            });
                        }else{
                            if(/^alipay.*H5$/i.test(rec_code)){
                                payData = json.res_data.data;
                            }else{
                                payData = JSON.parse(/{.*:.*}/.test(json.res_data.data)?json.res_data.data:'{"payurl":"' + json.res_data.data + '"}');
                                payUrl = payData["payurl"]||payData["url"];
                            }
                            if(is_form||/^alipay.*H5$/i.test(rec_code)){
                                payUrl = T.Util.getRootPath()+'/'+Global.webRoot+'/user/rechargeForm.html';
                                T.Storage.set('payData',payData);
                            }
                            if(Global.isiOS && T.isNative){
                                T.Util.openWindow(Base64.encode(payUrl + (payUrl.indexOf("?") > -1 ? "&" : "?") + "JPNativeTitle=" + encodeURIComponent("充值")),{isBase64Encode:1});
                            }else{
                                T.Util.openWindow(payUrl + (payUrl.indexOf("?") > -1 ? "&" : "?") + "JPNativeTitle=充值");
                            }
                        }
                    }else{
                        T.isDoRecharge = false;
                        tip(Global.neterror,'error');
                    }
                },
                errorCallback:function(data){
                    pageLoading.hide();
                    endGetDataFlag = true;
                    T.hasCallBack = false;
                    setTimeout(function(){
                        if(data && data.msg){
                            tip(data.msg);
                        }else{
                            tip(Global.neterror,"error");
                        }
                    },500);
                }
            });
        }
    }

    return {
        init:o.init,
        initPage:o.initPage,
        loadList:o.loadList,
        showTips:o.showTips
    }
})();
$(document).ready(function () {
    if(T.isNative){
        T.appToH5.init(function () {//初始化事件回调函数
            T.recharge.init();
        },function () {//webview再次打开回调函数
            T.recharge.init(true);
            if(T.isH5Pay && T.isDoRecharge){
                T.isDoRecharge = false;
                T.recharge.showTips();
            }
        },function () {//webview消失第一视角回调函数

        },function () {//app退到系统后台回调函数

        },function () {//app退到系统后台后重新回到app触发的函数
            var from = T.Util.getParaSearch('from');
            T.recharge.init(true);
            if(T.isH5Pay){
                if(from == 'buy'){
                    T.Util.back({num:2});
                }else{
                    T.Util.back({num:1});
                }
                T.isDoRecharge = false;
                T.recharge.showTips();
            }else{
                if(from == 'buy'){
                    T.Util.back();
                }
                T.showRechargeTips = setTimeout(function(){
                    if(!T.hasCallBack && T.isDoRecharge){
                        T.isDoRecharge = false;
                        T.recharge.showTips();
                    }
                },50);
            }
        });
    }else{
        T.recharge.init();
    }
});