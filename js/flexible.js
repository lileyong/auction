//h5本地存储
window.Global || (Global = {fullHost: window.location.origin, authHost: window.location.origin,apiHost:window.location.origin});
Global.isAndroid = window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Linux') > -1; //android终端或者uc浏览器;
Global.isiOS = /iPhone|iPad|iPod|ios|IOS/.test(window.navigator.userAgent);//!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
Global.isQQ = /qq\//i.test(window.navigator.userAgent);
Global.isWechat = /micromessenger/i.test(window.navigator.userAgent);
Global.isWeibo = /weibo/i.test(window.navigator.userAgent);
var T = {}
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
            var Storage = type ? "sessionStorage" : "localStorage";
            value = window[Storage].getItem(name)||window["localStorage"].getItem(name)||window["sessionStorage"].getItem(name);
            if (/^object:/.test(value)) {
                value = JSON.parse(value.replace(/^object\:/, ''));
            } else if (/^string:/.test(value)) {
                value = value.replace(/^string\:/, '');
            }
            return value;
        }
    }
};
T.Util = {
    filterScript: function (str) {
        str = str || '';
        str = decodeURIComponent(str);
        str = str.replace(/<.*>/g, ''); // 过滤标签注入
        str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
        str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
        str = str.replace(/[\s ]/g, '&nbsp;'); // 替换空格
        return str;
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
    }
};
(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            if(/appInfo/.test(window.navigator.userAgent)){
                dpr = 3;//解决小米机型 触发resize事件bug 为2的时候会有bug
            }else{
                dpr = 1;
            }
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        if(win.navigator.appVersion.match(/iphone/gi) && /\/view\/go.html#page=index.html/.test(window.location.href)){ scale = scale-0.0000001;}//适配某些港版机型恶心bug}
        console.log('scale'+scale);
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
         var width = docEl.getBoundingClientRect().width;
        //console.log('clientWidth:'+document.documentElement.clientWidth+'--getBoundingClientRect:'+docEl.getBoundingClientRect().width)
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {})), function() {
    if (/appInfo/.test(window.navigator.userAgent)||T.Storage.get('isApp',1)||T.Util.getPara('isApp')=='1') {
        if (/appInfo/.test(window.navigator.userAgent)){
            var e = navigator.userAgent;
            if ("1" == JSON.parse(e.slice(e.indexOf("appInfo/") + 8, e.length).split('X-Tingyun-Id')[0]).isIphoneX) {
                var t = document.documentElement.className;
                document.documentElement.className = t ? t + " iPhoneX" : "iPhoneX";
            }
        }else{
            T.Storage.set('isApp',1,1);
        }
    }else{
        var t = document.documentElement.className;
        document.documentElement.className = t ? t + " h5" : "h5";
        if(T.Storage.get('noNavbar',1)||T.Util.getPara('noNavbar')=='1'){
            if(Global.isWechat||(Global.isQQ && Global.isiOS)||Global.isWeibo||/localhost/.test(window.location.href)){
                var t = document.documentElement.className;
                T.Storage.set('noNavbar',1,1);
                document.documentElement.className = t ? t + " noNavbar" : "noNavbar";
            }
        }
    }
}();