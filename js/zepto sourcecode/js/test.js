/* Zepto v1.0-1-ga3cab6c - polyfill zepto detect event ajax form fx - zeptojs.com/license */
;(function(undefined) {
    if (String.prototype.trim === undefined) // fix for iOS 3.2
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '')
        }

    // For iOS 3.x
    // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
    //这个方法的作用就是累似一个累计处理的作用，将前一条数据的处理结果用作下一次的处理
    //比如[1,2,3,4,].reduce(function(x,y){ return x+y}); ==> ((1+2)+3)+4,

    if (Array.prototype.reduce === undefined) Array.prototype.reduce = function(fun) {
        if (this === void 0 || this === null) throw new TypeError()
        var t = Object(this),
            len = t.length >>> 0,
            k = 0,
            accumulator
        if (typeof fun != 'function') throw new TypeError()
        if (len == 0 && arguments.length == 1) throw new TypeError()
        //取初始值
        if (arguments.length >= 2) accumulator = arguments[1] //如果参数长度大于2个，则将第二个参数作为初始值
        else do {
            if (k in t) {
                accumulator = t[k++] //否则将数组的第一条数据作为初绍值
                break
            }
            if (++k >= len) throw new TypeError() //什么情况下会执行到这里来？？？
        } while (true)
        //遍历数组，将前一次的结果传入处理函数进行累计处理
        while (k < len) {
            if (k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
            k++
        }
        return accumulator
    }

})()

var Zepto = (function() {
    var undefined, key, $, classList, emptyArray = [],
        slice = emptyArray.slice,
        filter = emptyArray.filter,
        document = window.document,
        elementDisplay = {}, classCache = {},
        getComputedStyle = document.defaultView.getComputedStyle,
    //设置CSS时，不用加px单位的属性
        cssNumber = {
            'column-count': 1,
            'columns': 1,
            'font-weight': 1,
            'line-height': 1,
            'opacity': 1,
            'z-index': 1,
            'zoom': 1
        },
    //HTML代码片断的正则
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    //匹配非单独一个闭合标签的标签，类似将<div></div>写成了<div/>
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    //根节点
        rootNodeRE = /^(?:body|html)$/i,

    //需要提供get和set的方法名
    // special attributes that should be get/set via method calls
        methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
    //相邻节点的一些操作
        adjacencyOperators = ['after', 'prepend', 'before', 'append'],
        table = document.createElement('table'),
        tableRow = document.createElement('tr'),
    //这里的用途是当需要给tr,tbody,thead,tfoot,td,th设置innerHTMl的时候，需要用其父元素作为容器来装载HTML字符串
        containers = {
            'tr': document.createElement('tbody'),
            'tbody': table,
            'thead': table,
            'tfoot': table,
            'td': tableRow,
            'th': tableRow,
            '*': document.createElement('div')
        },
    //当DOM ready的时候，document会有以下三种状态的一种
        readyRE = /complete|loaded|interactive/,
    //class选择器的正则
        classSelectorRE = /^\.([\w-]+)$/,
    //id选择器的正则
        idSelectorRE = /^#([\w-]*)$/,
    //DOM标签正则
        tagSelectorRE = /^[\w-]+$/,
        class2type = {},
        toString = class2type.toString,
        zepto = {},
        camelize, uniq,
        tempParent = document.createElement('div');

    //判断一个元素是否匹配给定的选择器
    zepto.matches = function(element, selector) {
        if (!element || element.nodeType !== 1) return false
        //引用浏览器提供的MatchesSelector方法
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector
        if (matchesSelector) return matchesSelector.call(element, selector);
        //如果浏览器不支持MatchesSelector方法，则将节点放入一个临时div节点，
        //再通过selector来查找这个div下的节点集，再判断给定的element是否在节点集中，如果在，则返回一个非零(即非false)的数字
        // fall back to performing a selector:
        var match, parent = element.parentNode,temp = !parent
        //当element没有父节点，那么将其插入到一个临时的div里面
        if (temp)(parent = tempParent).appendChild(element)
        //将parent作为上下文，来查找selector的匹配结果，并获取element在结果集的索引，不存在时为－1,再通过~-1转成0，存在时返回一个非零的值
        match = ~zepto.qsa(parent, selector).indexOf(element)
        //将插入的节点删掉
        temp && tempParent.removeChild(element)
        return match
    }

    //获取对象类型

    function type(obj) {
        //obj为null或者undefined时，直接返回'null'或'undefined'
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
    }

    function isFunction(value) {
        return type(value) == "function"
    }

    zepto.Z.prototype = $.fn

    // Export internal API functions in the `$.zepto` namespace
    zepto.uniq = uniq
    zepto.deserializeValue = deserializeValue
    $.zepto = zepto

    return $
})();

window.Zepto = Zepto;
'$' in window || (window.$ = Zepto);

;(function($) {
    function detect(ua) {
        var os = this.os = {}, browser = this.browser = {},
            webkit = ua.match(/WebKit\/([\d.]+)/),
            android = ua.match(/(Android)\s+([\d.]+)/),
            ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
            iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
            webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            touchpad = webos && ua.match(/TouchPad/),
            kindle = ua.match(/Kindle\/([\d.]+)/),
            silk = ua.match(/Silk\/([\d._]+)/),
            blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
            bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
            rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            playbook = ua.match(/PlayBook/),
            chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
            firefox = ua.match(/Firefox\/([\d.]+)/)

        // Todo: clean this up with a better OS/browser seperation:
        // - discern (more) between multiple browsers on android
        // - decide if kindle fire in silk mode is android or not
        // - Firefox on Android doesn't specify the Android version
        // - possibly devide in os, device and browser hashes

        if (browser.webkit = !! webkit) browser.version = webkit[1]

        if (android) os.android = true, os.version = android[2]
        if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
        if (webos) os.webos = true, os.version = webos[2]
        if (touchpad) os.touchpad = true
        if (blackberry) os.blackberry = true, os.version = blackberry[2]
        if (bb10) os.bb10 = true, os.version = bb10[2]
        if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
        if (playbook) browser.playbook = true
        if (kindle) os.kindle = true, os.version = kindle[1]
        if (silk) browser.silk = true, browser.version = silk[1]
        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
        if (chrome) browser.chrome = true, browser.version = chrome[1]
        if (firefox) browser.firefox = true, browser.version = firefox[1]

        os.tablet = !! (ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)))
        os.phone = !! (!os.tablet && (android || iphone || webos || blackberry || bb10 || (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/))))
    }

    detect.call($, navigator.userAgent)
    // make available to unit tests
    $.__detect = detect

})(Zepto)



