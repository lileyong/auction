;
(function(win, lib) {
    var doc = win.document;
    var ua = win.navigator.userAgent;
    var isIOS = (/iPhone|iPad|iPod/i).test(ua);
    var isAndroid = (/Android/i).test(ua);
    var osVersion = ua.match(/(?:IOS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i);
    var apiVersion = ua.match(/QAPP[\/\s](\d+[._]\d+[._]\d+)/);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var NativeApi = lib.nativeApi = win.NativeApi || (win.NativeApi = {});
    var inc = 1, iframePool = [], iframeLimit = 3;

    var LOCAL_PROTOCOL = 'hybrid';
    var WV_PROTOCOL = 'wv_hybrid';
    var IFRAME_PREFIX = 'iframe_';
    var SUCCESS_PREFIX = 'suc_';
    var FAILURE_PREFIX = 'err_';
    var DEFERRED_PREFIX = 'defer_';
    var PARAM_PREFIX = 'param_';
    var CHUNK_PREFIX = 'chunk_';
    var CALL_GC_TIME = 60 * 1000 * 10;
    var CHUNK_GC_TIME = 60 * 1000 * 10;
    var PARAM_GC_TIME = 60 * 1000;

    function compareVersion(v1, v2) {
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');

        for (var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i], 10), n2 = parseInt(v2[i], 10);

            if (window.isNaN(n1)) {
                n1 = 0;
            }
            if (window.isNaN(n2)) {
                n2 = 0;
            }
            if (n1 < n2) {
                return -1;
            } else if (n1 > n2) {
                return 1;
            }
        }
        return 0;
    }

    if (osVersion) {
        osVersion = (osVersion[1] || '0.0.0').replace(/\_/g, '.');
    } else {
        osVersion = '0.0.0';
    }

    if (apiVersion) {
        apiVersion = (apiVersion[1] || '0.0.0').replace(/\_/g, '.');
    } else {
        apiVersion = '0.0.0';
    }

    var API_Core = {
        isAvailable : compareVersion(apiVersion, '0') === 1,

        compareVersion : function(targetVersion) {
            return compareVersion(apiVersion, targetVersion) === 1;
        },
        call : function(obj, method, params, success, failure, timeout) {

            var sid;
            var defer;

            if (typeof arguments[arguments.length - 1] === 'number') {
                timeout = arguments[arguments.length - 1];
            }

            if (typeof success !== 'function') {
                success = null;
            }

            if (typeof failure !== 'function') {
                failure = null;
            }

            if (lib.promise) {
                defer = lib.promise.defer();
            }

            if (timeout > 0) {
                sid = setTimeout(function() {
                    API_Core.onFailure(sid, {
                        ret : 'TIMEOUT'
                    });
                }, timeout);
            } else {
                sid = API_Private.getSid();
            }

            API_Private.registerCall(sid, success, failure, defer);
            API_Private.registerGC(sid, timeout);
            API_Private.callMethod(obj, method, params, sid);

            if (defer) {
                return defer.promise;
            }
        },

        fireEvent : function(eventname, eventdata, sid) {
            var ev = doc.createEvent('HTMLEvents');
            ev.initEvent(eventname, false, true);
            ev.result = API_Private.parseData(eventdata
                || API_Private.getData(sid));

            doc.dispatchEvent(ev);
        },

        getParam : function(sid) {
            return API_Private.getParam(sid);
        },

        setData : function(sid, chunk) {
            API_Private.setData(sid, chunk);
        },

        onSuccess : function(sid, data) {
            console.log('onSuccess---' + "sid:" + sid + " data:" + data);
            API_Private.onComplete(sid, data, 'success');
        },

        onFailure : function(sid, data) {
            console.log('onFailure---' + "sid:" + sid + " data:" + data);
            API_Private.onComplete(sid, data, 'failure');
        }
    };

    var API_Private = {
        params : {},
        chunks : {},
        calls : {},

        getSid : function() {//65535
            //return Math.floor(Math.random() * (1 << 10)) + '' + inc++;
            return parseInt(Math.random()*65535,10)+1;
        },

        buildParam : function(obj) {
            if (obj && typeof obj === 'object') {
                return JSON.stringify(obj);
            } else {
                return obj || '';
            }
        },

        getParam : function(sid) {
            return this.params[PARAM_PREFIX + sid] || '';
        },

        setParam : function(sid, params) {
            this.params[PARAM_PREFIX + sid] = params;
        },

        parseData : function(str) {
            console.log('parseData---' + str);
            var rst;
            if (str && typeof str === 'string') {
                try {
                    rst = JSON.parse(str);
                } catch (e) {
                    console.log('parseData error---' + e);
                    rst = {
                        ret : [ 'WV_ERR::PARAM_PARSE_ERROR' ]
                    };
                }
            } else {
                rst = str || {};
            }

            return rst;
        },

        setData : function() {
            this.chunks[CHUNK_PREFIX + sid] = this.chunks[CHUNK_PREFIX + sid]
                || [];
            this.chunks[CHUNK_PREFIX + sid].push(chunk);
        },

        getData : function(sid) {
            if (this.chunks[CHUNK_PREFIX + sid]) {
                return this.chunks[CHUNK_PREFIX + sid].join('');
            } else {
                return '';
            }
        },

        registerCall : function(sid, success, failure, defer) {
            if (success) {
                this.calls[SUCCESS_PREFIX + sid] = success;
            }

            if (failure) {
                this.calls[FAILURE_PREFIX + sid] = failure;
            }

            if (defer) {
                this.calls[DEFERRED_PREFIX + sid] = defer;
            }
        },

        unregisterCall : function(sid) {
            var sucId = SUCCESS_PREFIX + sid;
            var failId = FAILURE_PREFIX + sid;
            var defId = DEFERRED_PREFIX + sid;
            var call = {};

            if (this.calls[sucId]) {
                call.success = this.calls[sucId];
                delete this.calls[sucId];
            }
            if (this.calls[failId]) {
                call.failure = this.calls[failId];
                delete this.calls[failId];
            }
            if (this.calls[defId]) {
                call.defer = this.calls[defId];
                delete this.calls[defId];
            }

            return call;
        },

        useIframe : function(sid, url) {
            var iframeid = IFRAME_PREFIX + sid;
            var iframe = iframePool.pop();

            if (!iframe) {
                iframe = doc.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.style.cssText = 'width:0;height:0;border:0;display:none;';
            }

            iframe.setAttribute('id', iframeid);
            iframe.setAttribute('src', url);

            if (!iframe.parentNode) {
                setTimeout(function() {
                    doc.body.appendChild(iframe);
                }, 5);
            }
        },

        retrieveIframe : function(sid) {
            var iframeid = IFRAME_PREFIX + sid;
            var iframe = doc.querySelector('#' + iframeid);

            if (iframePool.length >= iframeLimit) {
                doc.body.removeChild(iframe);
            } else {
                iframePool.push(iframe);
            }
        },

        callMethod : function(obj, method, params, sid) {
            params = API_Private.buildParam(params);
            console.log('call---' + "obj:" + obj + " method:" + method
                + " sid:" + sid + " params:" + params);
            var uri = LOCAL_PROTOCOL + '://' + obj + ':' + sid + '/' + method
                + '?' + params;

            if (isIOS) {
                this.setParam(sid, params);
                this.useIframe(sid, uri);
            } else if (isAndroid) {
                var value = WV_PROTOCOL + ':';
                window.prompt(uri, value);
            }
        },

        registerGC : function(sid, timeout) {
            var that = this;
            var callGCTime = Math.max(timeout || 0, CALL_GC_TIME);
            var paramGCTime = Math.max(timeout || 0, PARAM_GC_TIME);
            var chunkGCTime = Math.max(timeout || 0, CHUNK_GC_TIME);

            setTimeout(function() {
                that.unregisterCall(sid);
            }, callGCTime);

            if (isIOS) {
                setTimeout(function() {
                    if (that.params[PARAM_PREFIX + sid]) {
                        delete that.params[PARAM_PREFIX + sid];
                    }
                }, paramGCTime);
            } else if (isAndroid) {
                setTimeout(function() {
                    if (that.chunks[CHUNK_PREFIX + sid]) {
                        delete that.chunks[CHUNK_PREFIX + sid];
                    }
                }, chunkGCTime);
            }
        },

        onComplete : function(sid, data, type) {
            console.log('onComplete---' + "sid:" + sid + " data:" + data
                + " type:" + type);

            clearTimeout(sid);

            var call = this.unregisterCall(sid);
            var success = call.success;
            var failure = call.failure;
            var defer = call.defer;

            data = data ? data : this.getData(sid);
            data = this.parseData(data);

            var ret = data.ret;
            if (typeof ret === 'string') {
                data = data.value || data;
                if (!data.ret) {
                    data.ret = [ ret ];
                }
            }

            if (type === 'success') {
                success && success(data);
                defer && defer.resolve(data);
            } else if (type === 'failure') {
                failure && failure(data);
                defer && defer.reject(data);
            }

            if (isIOS) {
                this.retrieveIframe(sid);
                if (this.params[PARAM_PREFIX + sid]) {
                    delete this.params[PARAM_PREFIX + sid];
                }
            } else if (isAndroid) {
                if (this.chunks[CHUNK_PREFIX + sid]) {
                    delete this.chunks[CHUNK_PREFIX + sid];
                }
            }
        }
    };

    for ( var key in API_Core) {
        if (!hasOwnProperty.call(NativeApi, key)) {
            NativeApi[key] = API_Core[key];
        }
    }
})(window, window['lib'] || (window['lib'] = {}))

;
(function(win, lib) {

    var ua = win.navigator.userAgent, matched, appVersion;
    if (matched = ua.match(/QAPP[\/\s]([\d\.\_]+)/)) {
        appVersion = matched[1];
    }

    var NativeApi = lib.nativeApi, doc = document, isIOS = /iPhone|iPad|iPod/i
        .test(ua), isAndroid = /Android/i.test(ua), apiVersion = appVersion ? appVersion
        .split('.')
        : [ 0, 0, 0 ], returnValues = [ 'SUCCESS', 'NO_HANDLER',
        'PARAM_ERR', 'FAILED', 'NO_PERMISSION', 'TIMEOUT', 'CANCEL' ], uid = 0, shakeMaps = {}, loadingElemId = '_Loading';

    function comparVersion(targetVersion) {
        targetVersion = targetVersion.split('.');
        for (var i = 0, n1, n2; i < apiVersion.length; i++) {
            n1 = parseInt(targetVersion[i], 10) || 0;
            n2 = parseInt(apiVersion[i], 10) || 0;
            if (n1 > n2)
                return 1;
            if (n1 < n2)
                return -1;
        }
        return 0;
    }

    function isString(obj) {
        return typeof obj === 'string';
    }

    function isNumber(obj) {
        return typeof obj === 'number';
    }

    function isFunction(obj) {
        return typeof obj === 'function';
    }

    function nativeCall(api, params, success, failure, timeout) {
        api = api.split('.');
        var serviceName = api[0], methodName = api[1];
        NativeApi
        && NativeApi.call(serviceName, methodName, params, success,
            failure, timeout);
    }

    function wrapSuccess(callback, preprocessor) {
        return (callback || preprocessor) && function(result) {
                result = preprocessor && preprocessor(result) || result;
                callback && callback(wrapResult(result));
            }
    }

    function wrapFailure(callback) {
        return callback && function(error) {
                callback(wrapError(error));
            }
    }

    function wrapResult(result) {
        result = result || {};
        result.errorCode = 0;
        result.errorMessage = '';
        return result;
    }

    function wrapError(error) {
        var code = 5, msg = isString(error) ? error : error.code;
        if (error) {
            var index = returnValues.indexOf(msg);
            code = index > 0 ? index : code;
        }
        return {
            errorCode : code,
            errorMessage : msg,
            data : error
        };
    }

    var API = win.API = lib.API = {
        aliPay:function (options, callback) {
            console.log('alipay---' + JSON.stringify(options));
            nativeCall('IntentInterface.alipay', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        weixinPay:function (options, callback) {
            console.log('weixinPay---' + JSON.stringify(options));
            nativeCall('IntentInterface.weixinPay', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        thirdShare:function (options, callback) {//原生拉取第三方数据后进行本地系统登录
            console.log('thirdShare---' + JSON.stringify(options));
            nativeCall('IntentInterface.thirdShare', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        thirdLogin:function (options, callback) {//原生不做任何本地系统业务 直接原样返回第三方鉴权数据
            console.log('thirdLogin---' + JSON.stringify(options));
            nativeCall('IntentInterface.thirdLogin', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        thirdToken:function (options, callback) {
            console.log('thirdToken---' + JSON.stringify(options));
            nativeCall('IntentInterface.thirdToken', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        canShowBigAward:function (options, callback) {
            console.log('canShowBigAward---' + JSON.stringify(options));
            nativeCall('IntentInterface.canShowBigAward', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        notifyRenderFinish: function(options, callback) {
            console.log('notifyRenderingFinish---' + JSON.stringify(options));
            nativeCall('IntentInterface.notifyRenderFinish', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        clearCache: function(options, callback) {
            console.log('clearCache---' + JSON.stringify(options));
            nativeCall('IntentInterface.clearCache', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        goTabbar : function(options, callback) {
            console.log('goTabbar---' + JSON.stringify(options));
            nativeCall('IntentInterface.goTabbar', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        screenShot : function(options, callback) {//调用原生截屏方法
            console.log('screenShot---' + JSON.stringify(options));
            nativeCall('IntentInterface.screenShot', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        sendToken : function(options, callback) {
            console.log('sendToken---' + JSON.stringify(options));
            nativeCall('IntentInterface.sendToken', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        LocationInterface:function(options,successCallback,errorCallback){
            console.log('LocationInterface---' + JSON.stringify(options));
            nativeCall('IntentInterface.LocationInterface', options,
                wrapSuccess(successCallback), wrapFailure(errorCallback));
        },
        showNativeTip:function(options, callback){
            console.log('showNativeTip---' + JSON.stringify(options));
            nativeCall('IntentInterface.showNativeTip', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openLogin : function(options, callback) {
            console.log('openLogin---' + JSON.stringify(options));
            nativeCall('IntentInterface.openLogin', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBloggerPage : function(options, callback) {
            console.log('openBloggerPage---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBloggerPage', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBuyDiamond : function(options, callback) {
            console.log('openBuyDiamond---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBuyDiamond', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openNoteDetail : function(options, callback) {
            console.log('openNoteDetail---' + JSON.stringify(options));
            nativeCall('IntentInterface.openNoteDetail', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openInformationDetail : function(options, callback) {
            console.log('openInformationDetail---' + JSON.stringify(options));
            nativeCall('IntentInterface.openInformationDetail', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openYetService : function(options, callback) {
            console.log('openYetService---' + JSON.stringify(options));
            nativeCall('IntentInterface.openYetService', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openUserCenter : function(options, callback) {
            console.log('openUserCenter---' + JSON.stringify(options));
            nativeCall('IntentInterface.openUserCenter', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openJiePan : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('openJiePan---' + JSON.stringify(options));
            nativeCall('IntentInterface.openJiePan', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBindPhone : function(options, callback) {
            console.log('openBindPhone---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBindPhone', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openAddressSelect : function(options, callback) {//地址选择
            console.log('openAddressSelect---' + JSON.stringify(options));
            nativeCall('IntentInterface.openAddressSelect', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBetDetail : function(options, callback) {//打开比分内页投注详情
            console.log('openBetDetail---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBetDetail', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBetRule : function(options, callback) {//打开比分内页玩法介绍
            console.log('openBetRule---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBetRule', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openPlayGame : function(options, callback) {//打开原生比赛内页
            console.log('openPlayGame---' + JSON.stringify(options));
            nativeCall('IntentInterface.openPlayGame', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openPayView : function(options, callback) {
            console.log('openPayView---' + JSON.stringify(options));
            nativeCall('IntentInterface.openPayView', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        sendBetMinSign : function(options, callback) {//分享单场投注记录
            console.log('sendBetMinSign---' + JSON.stringify(options));
            nativeCall('IntentInterface.sendBetMinSign', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openAnyView : function(options, callback) {//打开任意一个带H5url的view fullScreen是否满屏（1是，0不是）heigh,width单位% radius单位px
            console.log('openAnyView---' + JSON.stringify(options));
            nativeCall('IntentInterface.openAnyView', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        gotoJingCai : function(options,callback){ //再来一单
            console.log('gotoJingCai---' + JSON.stringify(options));
            nativeCall('IntentInterface.gotoJingCai', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        getVerifyCode:function (options, callback) {
            options = options || {};
            nativeCall('webService.getVerifyCode', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        callPay : function(options, callback) {
            options = options || {};
            nativeCall('webService.callPay', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        showConfirm : function(options, callback) {
            console.log('showConfirm---' + JSON.stringify(options));
            nativeCall('DialogInterface.showConfirm', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        sendHttp : function(options, callback) {
            options = options || {};
            console.log('sendHttp---' + JSON.stringify(options));
            nativeCall('HttpActionInteface.sendHttp', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        getAppInfo : function(options, callback) {
            options = options || {};
            console.log('getAppInfo---' + JSON.stringify(options));
            nativeCall('DeviceInfoInterface.getAppInfo', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        eventListener : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('regiest---' + JSON.stringify(options));
            nativeCall('webService.eventListener', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openWindow : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('openWindow---' + JSON.stringify(options));
            nativeCall('webService.openWindow', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        closeWindow : function(options, callback) {
            options = options || {};
            console.log('closeWindow---' + JSON.stringify(options));
            nativeCall('webService.closeWindow', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        setWebViewTitle : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('setWebViewTitle---' + JSON.stringify(options));
            nativeCall('webService.setWebViewTitle', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        goGame : function(options, callback) {
            console.log('goGame---' + JSON.stringify(options));
            nativeCall('IntentInterface.goGame', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openClubShare : function(options, callback){//生成俱乐部名片分享
            console.log('openClubShare---' + JSON.stringify(options));
            nativeCall('IntentInterface.openClubShare', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openRecommendIndex : function(options, callback){//到推荐首页
            console.log('openRecommendIndex---' + JSON.stringify(options));
            nativeCall('IntentInterface.openRecommendIndex', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openApplySpecialist : function(options, callback){
            console.log('openApplySpecialist---' + JSON.stringify(options));
            nativeCall('IntentInterface.openApplySpecialist', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        uploadImage : function(options, callback){
            console.log('PhotoInterface---' + JSON.stringify(options));
            nativeCall('PhotoInterface.uploadImage', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        toast : function(options, callback) {
            var text = isString(options) ? options : options && options.text;
            console.log('toast---' + text);
            nativeCall('DialogInterface.showToast', {
                msg : text
            }, wrapSuccess(callback), wrapFailure(callback));
        },
        showLoadding : function(options, callback){
            console.log('showLoadding---' + JSON.stringify(options));
            nativeCall('IntentInterface.showLoadding', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        share : function(options, callback) {
            console.log('share---' + JSON.stringify(options));
            nativeCall('IntentInterface.shareInfo', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openszrz:function(options, callback){
            console.log('openszrz---' + JSON.stringify(options));
            nativeCall('IntentInterface.openszrz', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        geolocation : {
            /**
             * 获取当前的地理位置。
             */
            getCurrentPosition : function(options, callback) {
                options = options || {};
                nativeCall('LocationInterface.getLocation', options,
                    wrapSuccess(callback), wrapFailure(callback));
            }
        },

        network : {
            /**
             * 获取网络类型。 2G - 移动和联通GPRS或EDGE，电信CDMA 3G - 联通UMTS或HSDPA，电信EVDO
             */
            getType : function(callback) {
                nativeCall('DeviceInfoInterface.getNetworkInfo', '',
                    wrapSuccess(callback, function(result) {
                        var type = (result.network || ''), data = {
                            type : type,
                            isWifi : false,
                            is2G : false,
                            is3G : false,
                            isOnline : false
                        };
                        if (/WIFI/i.test(type)) {
                            data.isWifi = data.isOnline = true;
                        } else if (/GPRS|EDGE|CDMA/i.test(type)) {
                            data.is2G = data.isOnline = true;
                        } else if (/UMTS|HSDPA|EVDO/i.test(type)) {
                            data.is3G = data.isOnline = true;
                        }
                        data.isE = data.isG = data.isH = false;
                        data.networkAvailable = type != null && type != '';
                        return data;
                    }), wrapFailure(callback));
            }
        },

        photo : function(options, callback) {
            options = options || {};
            nativeCall('PhotoInterface.photo', options, wrapSuccess(callback,
                function(result) {
                    result.photo = result.resourceUrl;
                }), wrapFailure(callback));
        },

        showImage : function(options, callback) {
            options = options || {};
            nativeCall('PhotoInterface.showImage', options, wrapSuccess(
                callback, function(result) {
                    result.photo = result.resourceUrl;
                }), wrapFailure(callback));
        },

        mutiPhoto : function(options, callback) {
            options = options || {};
            nativeCall('PhotoInterface.mutiPhoto', options, wrapSuccess(
                callback, function(result) {
                    result.photo = result.resourceUrl;
                }), wrapFailure(callback));
        },

        contacts : {

            get : function(options, callback) {
                nativeCall('WVContacts.choose', null, wrapSuccess(callback,
                    function(result) {
                        var data = [ {
                            name : result.name,
                            phoneNumber : result.phone,
                            email : result.email
                        } ];
                        result.results = data;
                        return result;
                    }), wrapFailure(callback));
            }
        },

        showLoading : function(text, callback) {
            var elem = doc.getElementById(loadingElemId);
            if (!elem) {
                var div = doc.createElement('div');
                div.id = loadingElemId;
                div.style.cssText = 'position:absolute;width:100%;height:100%;left:0;top:0;background:url(http://a.tbcdn.cn/mw/base/styles/component/more/images/loading.gif) 50% 50% no-repeat;background-size:40px 16px;pointer-events:none;';
                elem = doc.createDocumentFragment();
                elem.appendChild(div);
            } else {
                elem.style.display = 'block';
            }
            doc.body.appendChild(elem);
            callback && callback(wrapResult(null));
        },

        hideLoading : function(callback) {
            var elem = doc.getElementById(loadingElemId);
            if (elem)
                elem.style.display = 'none';
            callback && callback(wrapResult(null));
        }
    };

    var geo = navigator.geolocation || (navigator.geolocation = {});
    if (!geo.getCurrentPosition)
        geo.getCurrentPosition = API.geolocation.getCurrentPosition;

})(window, window.lib || (window.lib = {}));
