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

    return this.zepto;

})(Zepto)