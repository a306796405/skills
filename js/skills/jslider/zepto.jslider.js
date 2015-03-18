$(function(){
    $.fn.jslider = function(config){

        var defaults = {
            className: "ks_wt_1",
            css: {}
        };
        var opts = $.extend({}, defaults, config);
        var $jslider = $(this),
            main_w,
            timer,
            $main = $jslider.find('.ks_dbox'),
            $title = $jslider.find('.ks_wt'),
            slider_len = $main.children().length,
            /*
                initX 第一次手指接触屏幕时的x位置,
                startX 当手指在屏幕上滑动时，通过touchmove事件不断更新startX的值，然后通过pageX - startX计算出每次滑动移动的距离
                movingX 轮播容器相当于自身移动的距离 当该值 >0 或是 < -(个数＊容器宽度) 则为超出边界
            */
            position = { initX: 0, initY: 0, startX: 0, movingX: 0, startY: 0, canmove: false },
            currentTab = 0;

        /* 初始化 */
        $jslider.toggleClass(config.className,true);
        $jslider.css(opts.css);

        var moving = function (i) {
            //此处需要同步movingX的位置
            $main.css("-webkit-transform", "translate3d(" + (position.movingX = i) + "px,0,0)");
        }

        //容错机制
        var setIndex = function (i) {
            return i < 0 ? 0 : i >= $main.children().length ? $main.children().length - 1 : i;
        }

        var toTab = function(i){
            i = setIndex(i), main_w = $main.width();
            moving(-main_w * i), toTitle(i);
            if (currentTab != i && config.change) {
                config.change(i);
            }
            currentTab = i
        }

        var toTitle = function (i) {
            if ($title.length == 0) return;
            //current class
            $title.children().toggleClass("ks_t2", false).eq(i).toggleClass("ks_t2", true);
        }

        $title.on('click.titleClick','li',function(e){
            clearTimer();
            toTab($(this).index());
            setTimer();
        })

        var setTimer = function () {
            if (!config.tick) return;
            if (timer) clearTimer();
            timer = setInterval(function() {
                toTab(currentTab >= $main.children().length - 1 ? 0 : currentTab + 1);
            }, config.tick)
        }

        var clearTimer = function () {
            clearInterval(timer);
            timer = null;
        }
        setTimer();

        //手指滑动事件
        var hasMultiFingers = function(e){
            if(e.touches.length > 1){
                return true;
            }
        }
        /*
        * http://book.51cto.com/art/201304/391096.htm
        * */
        $jslider.on('touchstart',function(e){
            if(hasMultiFingers(e)) return;
            var tt = e.targetTouches[0];
            if($(tt.target).closest('.ks_dbox').length != 0){
                position.canmove = true, position.initX = position.startX = tt.pageX;
                position.initY = tt.pageY;
                clearTimer();
            }
        }).on('touchmove',function(e){
            if(hasMultiFingers(e)) return;
            if(position.canmove){
                var tt = e.targetTouches[0];
                //ks_ts为过渡效果
                $main.removeClass('ks_ts').css("-webkit-transform", "translate3d(" + (position.movingX += tt.pageX - position.startX) + "px,0,0)");
                position.startX = tt.pageX;
                e.preventDefault();
            }
        }).on('touchend',function(e){
            if(hasMultiFingers(e)) return;
            if (!position.canmove) return;

            $main.toggleClass("ks_ts", true);

            var isBounceOut = false,
                ct = e.changedTouches[0],
                main_w = $main.width(),
                current = Math.abs(position.movingX / main_w);

            //手指水平方向滑动距离超过60px时，允许切换图片
            if(position.canmove && Math.abs(ct.pageX - position.initX) > 60){
                //判断是否超出边界
                if(position.movingX > 0){
                    current = 0;
                    isBounceOut = true;
                }
                if(position.movingX < -(slider_len * main_w)){
                    current = slider_len - 1;
                    isBounceOut = true;
                }

                //没超出边界
                if(!isBounceOut){
                    //判断手的滑动方向
                    if(ct.pageX > position.initX){
                        current = Math.floor(current);
                    }else{
                        current = Math.ceil(current);
                    }
                }
            }else{
                current = $title.find('.ks_t2').index();
            }

            toTab(current);
            setTimer();
            position.canmove = false;
        })

        return {
            //添加tab
            add: function(title,content){
                $title.append("<li>" + title + "</li>");
                $main.append("<div class=\"ks_warp\">" + content + "</div>");
                slider_len++;
                return this;
            },
            remove: function (index) {
                //移除tab
                if ($title.children().length == 1) return;
                index = setIndex(index);
                $title.children().eq(index).remove();
                $main.children().eq(index).remove();
                if (index == currentTab) toTab(0);
                return this;
            }, tab: function (index) {
                //跳转到对应tab
                toTab(index);
                return this;
            }
        }
    }

})