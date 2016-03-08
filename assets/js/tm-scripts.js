/* Image click fix */
(function($) {
    "use strict";
    $(document).on("click", ".tm-extra-product-options .use_images_containter .tmcp-field-wrap label", function() {
        return false;
    });
    $(document).on("click", ".tm-extra-product-options label img, .tm-extra-product-options label .tmhexcolorimage", function() {
        var $this=$(this),
            label=$this.closest("label"),
            tmepo=$this.closest(".tm-extra-product-options"),
            box=tmepo.find("#" + label.attr("for"));
        if (!box.length || box.attr('data-tm-disabled')){
            return;
        }
        var _check=false;
        if (box.is(":checked")){
            _check=true;                                
        }
        if (box.is(".tmcp-field.tmcp-radio") && _check){
            return;
        }
        if (!_check){
            var boxes=tmepo.find('[name="'+box.attr("name")+'"]');
            //boxes.removeAttr("checked").prop("checked",false);
            boxes.prop("checked",false);
            //box.attr("checked","checked").prop("checked",true);
            box.prop("checked",true);
        }else{
            //box.removeAttr("checked").prop("checked",false);
            box.prop("checked",false);
        }
        box.trigger('change').trigger('tmredirect');
    });

})(jQuery);

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik MΓ¶ller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    "use strict";

    var lastTime = 0;var vendors = ['ms', 'moz', 'webkit', 'o'];for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];}if (!window.requestAnimationFrame)window.requestAnimationFrame = function(callback, element) {var currTime = new Date().getTime();var timeToCall = Math.max(0, 16 - (currTime - lastTime));var id = window.setTimeout(function() {callback(currTime + timeToCall);},timeToCall);lastTime = currTime + timeToCall;return id;};if (!window.cancelAnimationFrame)window.cancelAnimationFrame = function(id) {clearTimeout(id);};
}());

/**
* jquery.resizestop (and resizestart)
* by: Fatih Kadir Akın
* https://github.com/f/jquery.resizestop
* License is CC0, published to the public domain.
*/
(function(a){var b=Array.prototype.slice;a.extend(a.event.special,{resizestop:{add:function(d){var c=d.handler;a(this).resize(function(f){clearTimeout(c._timer);f.type="resizestop";var g=a.proxy(c,this,f);c._timer=setTimeout(g,d.data||200)})}},resizestart:{add:function(d){var c=d.handler;a(this).on("resize",function(f){clearTimeout(c._timer);if(!c._started){f.type="resizestart";c.apply(this,arguments);c._started=true}c._timer=setTimeout(a.proxy(function(){c._started=false},this),d.data||300)})}}});a.extend(a.fn,{resizestop:function(){a(this).on.apply(this,["resizestop"].concat(b.call(arguments)))},resizestart:function(){a(this).on.apply(this,["resizestart"].concat(b.call(arguments)))}})})(jQuery);
/*!
 * JavaScript Cookie v2.0.0-pre
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl
 * Released under the MIT license
 */
!function(e){if("function"==typeof define&&define.amd)define(e);else if("object"==typeof exports)module.exports=e();else{var n=window.Cookies,o=window.Cookies=e(window.jQuery);o.noConflict=function(){return window.Cookies=n,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if(arguments.length>1){if(i=e({path:"/"},t.defaults,i),"number"==typeof i.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(a){}return r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires&&"; expires="+i.expires.toUTCString(),i.path&&"; path="+i.path,i.domain&&"; domain="+i.domain,i.secure&&"; secure"].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),l=f[0].replace(u,decodeURIComponent),m=f.slice(1).join("=");if('"'===m.charAt(0)&&(m=m.slice(1,-1)),m=o&&o(m,l)||m.replace(u,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(a){}if(n===l){c=m;break}n||(c[l]=m)}return c}return t.get=t.set=t,t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n()});
/*
* TM scripts
*/
(function($) {
    "use strict";

    if (!$.tm_reverse) {
        $.fn.tm_reverse = [].reverse;
    }
    if (!$.is_on_screen) {
        $.fn.is_on_screen = function(){
            var win = $(window);
            var u = $.tm_getPageScroll();
            var viewport = {
                top : u[1],
                left : u[0]
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
         
            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
         
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        };
    }

    if (!$.tm_tooltip) {
        $.tm_tooltip = function(jobj) {
            if (typeof jobj === 'undefined') {
                jobj = $( '.tm-tooltip' );
            }
            var targets = jobj,
                target  = false,
                tooltip = false,
                title   = false;
            if (!targets.length>0 || targets.data('tm-has-tm-tip')){
                return;
            }
            targets.data('tm-has-tm-tip',1);
            targets.each(function(i,el){
                var current_element = $(el);
                var is_swatch = current_element.attr( 'data-tm-tooltip-swatch' );
                if (is_swatch){
                    var label=current_element.closest('.tmcp-field-wrap');
                    if (label.length==0){
                        label=current_element.closest('.cpf_hide_element');
                    }
                    if (label.length==0){
                        label=current_element.closest('.cpf-section');
                    }
                    label=label.find('.checkbox_image_label,.radio_image_label,.tm-tip-html');
                    var tip=$(label).html();
                    current_element.data('tm-tip-html',tip);
                    $(label).hide();
                }

            });
            targets.on( 'tc-tooltip-html-changed', function(){
                var $this=$(this);
                if ($this.attr('data-tm-tooltip-html')){
                    $this.show();
                }else{
                    $this.hide();
                }
            });
            targets.on( 'mouseenter tmshowtooltip', function(){
                
                target  = $( this );
                if (target.data('is_moving')){
                    return;
                }
                var tip     = target.attr( 'title' );
                var tiphtml = target.attr( 'data-tm-tooltip-html' );
                var is_swatch = target.attr( 'data-tm-tooltip-swatch' );
                $('#tm-tooltip').remove();
                tooltip = $( '<div id="tm-tooltip" class="tm-tip tm-animated"></div>' );
                
                if( !((tip && tip != '') || is_swatch || tiphtml )){
                    return false;
                }
                
                if (target.attr( 'data-tm-tooltip-html' )){
                    tip = target.attr( 'data-tm-tooltip-html' );
                }else{
                    tip = target.attr( 'title' );
                }
                if (is_swatch){
                    tip=target.data('tm-tip-html');
                }
                if (typeof jobj === 'undefined'){
                    target.removeAttr( 'title' );
                }
                tooltip.css( 'opacity', 0 )
                       .html( tip )
                       .appendTo( 'body' );
         
                var init_tooltip = function(nofx){
                    if (nofx==1){
                        if (is_swatch){
                            tip=target.data('tm-tip-html');
                        }else{
                            if (target.attr( 'data-tm-tooltip-html' )){
                                tip = target.attr( 'data-tm-tooltip-html' );
                            }else{
                                tip = target.attr( 'title' );
                            }                            
                        }
                        tooltip.html(tip);    
                    }
                    
                    if( $( window ).width() < tooltip.outerWidth() * 1.5 ){
                        tooltip.css( 'max-width', $( window ).width() / 2 );
                    }else{
                        tooltip.css( 'max-width', 340 );
                    }
                    var u = $.tm_getPageScroll();
                    var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                        pos_top  = target.offset().top - tooltip.outerHeight() - 20;
                    
                    var pos_from_top=target.offset().top-u[1]-tooltip.outerHeight();
                    
                    if( pos_left < 0 ){
                        pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                        tooltip.addClass( 'left' );
                    }else{
                        tooltip.removeClass( 'left' );
                    }
                    if( pos_left + tooltip.outerWidth() > $( window ).width() ){
                        pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                        tooltip.addClass( 'right' );
                    }else{
                        tooltip.removeClass( 'right' );
                    }
                    if( pos_top < 0 || pos_from_top < 0){
                        pos_top  = target.offset().top + target.outerHeight();
                        tooltip.addClass( 'top' );
                    }else{
                        tooltip.removeClass( 'top' );
                    }
                    $( window ).trigger('tm_tooltip_show');
                    if (nofx){
                        tooltip.css( { left: pos_left, top: (pos_top) } ); 
                        target.data('is_moving',false);                       
                    }else{
                        tooltip.css( { left: pos_left, top: pos_top } )
                           .removeClass('fadeOutDown').addClass('fadeInUp');
                           //tooltip.animate( { top: pos_top, opacity: 1 }, 1 );
                    }
                };
         
                init_tooltip();
                $( window ).resize( init_tooltip );
                target.data('is_moving',false);
                var remove_tooltip = function(){
                    if (target.data('is_moving')){
                        return;
                    }
                    tooltip.removeClass('fadeInUp').addClass('fadeOutDown');
                    var speed=1000;
                    tooltip.animate( { opacity: 0 }, speed, function(){
                        $( this ).remove();
                    });
         
                    if (!tiphtml && !is_swatch){
                        target.attr( 'title', tip );
                    }
                };

                target.on( 'tmmovetooltip', function(){target.data('is_moving',true);init_tooltip(1);} );
                target.on( 'mouseleave tmhidetooltip', remove_tooltip );
                tooltip.on( 'click', remove_tooltip );
            });
            return targets;
        }
    }

    $.fn.aserializeArray = function() {
        var rselectTextarea = /^(?:select|textarea)/i,
            rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
        if (!this.get(0).elements) {
            $(this).wrap('<form></form>');
            var varretval = this.parent().map(function() {
                return this.elements ? $.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function(i, elem) {
                var val = $(this).val();
                return val == null ? null : $.isArray(val) ? $.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val
                    };
                }) : {
                    name: elem.name,
                    value: val
                };
            }).get();
            $(this).unwrap();
            return varretval;
        } else {
            return this.map(function() {
                return this.elements ? $.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function(i, elem) {
                var val = $(this).val();
                return val == null ? null : $.isArray(val) ? $.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val
                    };
                }) : {
                    name: elem.name,
                    value: val
                };
            }).get();
        }
    }
    $.fn.tm_serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
    $.fn.tm_aserializeObject = function(){
        var o = {};
        var a = this.aserializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
    

    if (!$().on) {
        $.fn.on = function(types, selector, data, fn) {
            return this.delegate(selector, types, data, fn);
        }
    }

    if (!$.tmType) {
        $.tmType = function(obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }
    }

    /* https://github.com/kvz/phpjs/blob/master/functions/array/array_values.js */
    if (!$.tm_array_values) {
        $.tm_array_values = function(input) {
            var tmp_arr = [], key = '';
            for (key in input) {
                tmp_arr[tmp_arr.length] = input[key];
            }
            return tmp_arr;
        }
    }

    /* https://github.com/kvz/phpjs/blob/master/functions/misc/uniqid.js */
    if (!$.tm_uniqid) {
        $.tm_uniqid = function(prefix, more_entropy) {
            if (typeof prefix === 'undefined') {
                prefix = '';
            }
            var retId;
            var formatSeed = function (seed, reqWidth) {
                seed = parseInt(seed, 10)
                  .toString(16); // to hex str
                if (reqWidth < seed.length) {
                      // so long we split
                    return seed.slice(seed.length - reqWidth);
                }
                if (reqWidth > seed.length) {
                      // so short we pad
                    return Array(1 + (reqWidth - seed.length))
                        .join('0') + seed;
                }
                return seed;
            };
            // BEGIN REDUNDANT
            if (!this.php_js) {
                this.php_js = {};
            }
              // END REDUNDANT
            if (!this.php_js.uniqidSeed) {
                // init seed with big random int
                this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
            }
            this.php_js.uniqidSeed++;

              // start with prefix, add current milliseconds hex string
            retId = prefix;
            retId += formatSeed(parseInt(new Date()
                .getTime() / 1000, 10), 8);
              // add seed hex string
            retId += formatSeed(this.php_js.uniqidSeed, 5);
            if (more_entropy) {
                // for more entropy we add a float lower to 10
                retId += (Math.random() * 10)
                  .toFixed(8)
                  .toString();
            }

            return retId;
        }
    }

    /**
     * Textarea and select clone() bug workaround | Spencer Tipping
     * Licensed under the terms of the MIT source code license
     * https://github.com/spencertipping/jquery.fix.clone/blob/master/jquery.fix.clone.js
     */

    if (!$().tm_clone) {
        $.fn.tm_clone = function() {
            var result = $.fn.clone.apply(this, arguments),
                my_textareas = this.find('textarea').add(this.filter('textarea')),
                result_textareas = result.find('textarea').add(result.filter('textarea')),
                my_selects = this.find('select').add(this.filter('select')),
                result_selects = result.find('select').add(result.filter('select'));
            for (var i = 0, l = my_textareas.length; i < l; ++i) {
                $(result_textareas[i]).val($(my_textareas[i]).val());
            }
            for (var i = 0, l = my_selects.length; i < l; ++i) {
                for (var j = 0, m = my_selects[i].options.length; j < m; ++j) {
                    if (my_selects[i].options[j].selected === true) {
                        result_selects[i].options[j].selected = true;
                    }
                }
            }
            return result;
        }
    }

    (function() {
        // based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
        var baseEasings = {};
        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
            baseEasings[name] = function(p) {
                return Math.pow(p, i + 2);
            };
        });
        $.extend(baseEasings, {
            Sine: function(p) {
                return 1 - Math.cos(p * Math.PI / 2);
            },
            Circ: function(p) {
                return 1 - Math.sqrt(1 - p * p);
            },
            Elastic: function(p) {
                return p === 0 || p === 1 ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
            },
            Back: function(p) {
                return p * p * (3 * p - 2);
            },
            Bounce: function(p) {
                var pow2,
                    bounce = 4;

                while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
            }
        });
        $.each(baseEasings, function(name, easeIn) {
            $.easing["easeIn" + name] = easeIn;
            $.easing["easeOut" + name] = function(p) {
                return 1 - easeIn(1 - p);
            };
            $.easing["easeInOut" + name] = function(p) {
                return p < 0.5 ?
                    easeIn(p * 2) / 2 :
                    1 - easeIn(p * -2 + 2) / 2;
            };
        });
    })();

    if (!$().tm_getPageSize) {
        $.tm_getPageSize = function() {
            var e, t, pageHeight, pageWidth;
            if (window.innerHeight && window.scrollMaxY) {
                e = window.innerWidth + window.scrollMaxX;
                t = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight) {
                e = document.body.scrollWidth;
                t = document.body.scrollHeight;
            } else {
                e = document.body.offsetWidth;
                t = document.body.offsetHeight;
            }
            var n, r;
            if (self.innerHeight) {
                if (document.documentElement.clientWidth) {
                    n = document.documentElement.clientWidth;
                } else {
                    n = self.innerWidth;
                }
                r = self.innerHeight
            } else if (document.documentElement && document.documentElement.clientHeight) {
                n = document.documentElement.clientWidth;
                r = document.documentElement.clientHeight;
            } else if (document.body) {
                n = document.body.clientWidth;
                r = document.body.clientHeight;
            }
            if (t < r) {
                pageHeight = r;
            } else {
                pageHeight = t;
            } if (e < n) {
                pageWidth = n;
            } else {
                pageWidth = e;
            }
            return new Array(pageWidth, pageHeight, n, r, e, t);

        }
    }

    if (!$().tm_getPageScroll) {
        $.tm_getPageScroll = function() {
            var e, t;
            if (self.pageYOffset) {
                t = self.pageYOffset;
                e = self.pageXOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                t = document.documentElement.scrollTop;
                e = document.documentElement.scrollLeft;
            } else if (document.body) {
                t = document.body.scrollTop;
                e = document.body.scrollLeft;
            }
            return new Array(e, t);

        }
    }

    if (!$().tm_floatbox) {
        $.fn.tm_floatbox = function(t) {
            function s(e) {
                if (o(e, n)) {
                    return n;
                } else {
                    return false;
                }
            }

            function f() {
                if (t.hideelements) $("embed, object, select").css({
                    visibility: "visible"
                });
                if (t.showoverlay == true) {
                    if (t._ovl) {
                        t._ovl.unbind();
                        t._ovl.remove();
                    }
                }  
                
                $(t.floatboxID).addClass('tc-closing').removeClass(t.animateIn).addClass(t.animateOut);
                $(t.floatboxID).animate({
                    opacity: 0
                    
                    }, 1000, function() {
                        $(t.floatboxID).remove();                      
                    }
                );
                
                var _in = $.fn.tm_floatbox.instances.length;
                if (_in > 0) {
                    var _t = $.fn.tm_floatbox.instances[_in - 1];
                    if (t.id == _t.id) $.fn.tm_floatbox.instances.pop();
                }

                $(window).off("scroll.tmfloatbox");
            }

            function o(n, s) {
                if (s.length == 1) {
                    f();
                    if (t.hideelements) $("embed, object, select").css({
                        visibility: "hidden"
                    });
                    $(t.type).attr("id", t.id).addClass(t.classname).html(t.data).appendTo(n);
                    var _in = $.fn.tm_floatbox.instances.length;
                    if (_in > 0) {
                        var _t = $.fn.tm_floatbox.instances[_in - 1];
                        t.zIndex = _t.zIndex + 100;
                    }
                    $.fn.tm_floatbox.instances.push(t);
                    $(t.floatboxID).css({
                        width: t.width,
                        height: t.height
                    });
                    var o = $.tm_getPageSize();
                    var u = $.tm_getPageScroll();
                    var l = 0;
                    var c = parseInt(u[1] + (o[3] - $(t.floatboxID).height()) / 2);
                    var h = parseInt(u[0] + (o[2] - $(t.floatboxID).width()) / 2);
                    $(t.floatboxID).css({
                        top: l + "px",
                        left: h + "px",
                        "z-index": t.zIndex
                    });
                    r = l;
                    i = h;
                    n.cancelfunc = t.cancelfunc;
                    if (t.showoverlay == true) {
                        t._ovl = $('<div class="fl-overlay"></div>').css({
                            zIndex: (t.zIndex - 1),
                            opacity: .8
                        });
                        t._ovl.appendTo("body");
                        if (!t.ismodal) t._ovl.click(t.cancelfunc);
                    }
                    if (t.showfunc) {
                        t.showfunc.call();
                    }
                   
                    $(t.floatboxID).addClass(t.animationBaseClass+" "+t.animateIn);
                    if (t.refresh=="fixed"){
                        var top = parseInt( (o[3] - $(t.floatboxID).height()) / 2);

                        if (t.top!==false){
                            top=t.top;
                        }else{
                            top=top + "px"
                        }
                        $(t.floatboxID).css({
                            position: "fixed",
                            top: top
                        });

                        if (t.left!==false){
                            $(t.floatboxID).css({
                                left: t.left
                            });
                        }

                    }else{
                        a();
                        $(window).on("scroll.tmfloatbox",doit);
                    }

                    return true;
                } else {
                    return false;
                }
            }

            function requestTick() {
                if(!ticking) {
                    if (t.refresh){
                        setTimeout(function() {
                            requestAnimationFrame(update);
                        }, t.refresh );
                    }else{
                        requestAnimationFrame(update);
                    }
                    
                    ticking = true;
                }
            }

            function update() {
                a();
                ticking = false;
            }

            function doit(){
                requestTick();
            }

            function u(n, r) {
                $(t.floatboxID).css({
                    top: n + "px",
                    left: r + "px",
                    opacity: 1
                });
            }

            function a() {
                var n = $.tm_getPageSize();
                var s = $.tm_getPageScroll();
                var o = parseInt(s[1] + (n[3] - $(t.floatboxID).height()) / 2);
                var a = parseInt(s[0] + (n[2] - $(t.floatboxID).width()) / 2);
                o = parseInt((o - r) / t.fps);
                a = parseInt((a - i) / t.fps);
                r += o;
                i += a;
                u(r, i);
            }

            t = jQuery.extend({
                id: "flasho",
                classname: "flasho",
                type: "div",
                data: "",
                width: "500px",
                height: "auto",
                animationBaseClass:'tm-animated',
                animateIn:'fadeInDown',
                animateOut:'fadeOutDown',
                top:false,
                left:false,
                refresh: false,
                fps: 4,
                hideelements: false,
                showoverlay: true,
                zIndex: 100100,
                ismodal: false,
                cancelfunc: f,
                showfunc: null
            }, t);
            t.floatboxID = "#" + t.id;
            t.type = "<" + t.type + ">";
            var n = this;
            var r = 0;
            var i = 0;
            var ticking = false;

            return s(this);
        }
        $.fn.tm_floatbox.instances = [];
        
    }

    if (!$().tmtabs) {
        $.fn.tmtabs = function(options) {
            var elements = this;
            
            if (elements.length==0){
                return;
            }
            options = $.extend({
                headers: ".tm-tab-headers",
                header: ".tab-header",
                addheader:".tm-add-tab",
                classdown: "tcfa-angle-down",
                classup: "tcfa-angle-up",
                animationclass: "fadeInDown",
                dataattribute:"data-id",
                selectedtab:"auto",
                showonhover:false,
                useclasstohide:false,
                afteraddtab:function(){a,b},
                deletebutton:false,
                deletebuttonhtml:'<h4 class="tm-del-tab"><span class="tcfa tcfa-times"></span></h4>',
                deleteheader:'.tm-del-tab',
                deleteconfirm:false,
                beforedeletetab:function(a,b){},
                afterdeletetab:function(){}
            }, options);

            return elements.each(function(){
                var t=$(this),
                    headers = t.find(options.headers+" "+options.header);
                if (headers.length==0){
                    return;
                }
                t.data('tm-has-tmtabs',1);
                var init_open=0,
                    add_counter=0,
                    last=false,
                    current="";

                function tm_tab_add_header_events(header){
                    header.on("closetab.tmtabs",function(e){
                        var _tab=t.find($(this).data("tab"));
                        $(this).removeClass("closed open").addClass("closed");
                        $(this).find(".tm-arrow").removeClass(options.classdown+" "+options.classup).addClass(options.classdown);
                        if(options.useclasstohide){
                            _tab.addClass("tm-hide");
                        }else{
                            _tab.hide();
                        }
                        _tab.removeClass("tm-animated "+options.animationclass);
                    });

                    header.on("opentab.tmtabs",function(e){
                        $(this).removeClass("closed open").addClass("open");
                        $(this).find(".tm-arrow").removeClass("tcfa-angle-down tcfa-angle-up").addClass("tcfa-angle-up");
                        var _tab=t.find($(this).data("tab"));
                        if(options.useclasstohide){
                            _tab.removeClass("tm-hide");
                        }else{
                            _tab.show();
                        }
                        _tab.removeClass("tm-animated "+options.animationclass).addClass("tm-animated "+options.animationclass);
                        current=$(this).data("tab");
                    });
                    var additional_events="";
                    if(options.showonhover===true || typeof options.showonhover==="function"){
                        additional_events=" mouseover";
                    }
                    header.on("click.tmtabs"+additional_events,function(e){
                        e.preventDefault();
                        if (e.type=="mouseover" && typeof options.showonhover==="function" && !options.showonhover.call()){
                            return;
                        }
                        if (current==$(this).data("tab")){
                            return;
                        }
                        if (last){
                            $(last).trigger("closetab.tmtabs");
                        }
                        $(this).trigger("opentab.tmtabs");
                        last=$(this);
                        Cookies.set('tmadmintab', $(this).attr(options.dataattribute), { expires: 7, path: '' });
                    });

                    if(options.deletebutton){
                        header.after(options.deletebuttonhtml);
                        header.closest(".tm-box").find(options.deleteheader).on('click.tmtabs',function(e){
                            if(t.find(options.headers+" "+options.header).length<2){
                                return;
                            }
                            if(options.deleteconfirm){
                                if (!confirm(tm_epo_admin.builder_delete)) {
                                    return;
                                }
                            }
                            var $t=$(this),
                                $header=$t.closest(".tm-box").find(options.header).attr(options.dataattribute),
                                $tab=t.find("."+$t.closest(".tm-box").find(options.header).attr(options.dataattribute));
                            
                            options.beforedeletetab.call(t,$header,$tab);

                            $tab.remove();
                            $t.closest(".tm-box").remove();

                            options.afterdeletetab.call(t);
                        });
                    }
                }
                headers.each(function(i,header){
                    
                    var header=$(header),id="."+header.attr(options.dataattribute);
                    header.data("tab",id);
                    if(options.useclasstohide){
                        t.find(id).addClass("tm-hide");
                    }else{
                        t.find(id).hide();
                    }
                    t.find(id).data("state","closed");
                    if (!init_open && header.is(".open")){
                        header.removeClass("closed open").addClass("open").data("state","open");
                        header.find(".tm-arrow").removeClass(options.classdown+" "+options.classup).addClass(options.classup);
                        if(options.useclasstohide){
                            t.find(id).removeClass("tm-hide");
                        }else{
                            t.find(id).show();
                        }
                        t.find(id).data("state","open");
                        init_open=1;
                        current=id;
                        last=header;
                    }else{
                        header.removeClass("closed open").addClass("closed").data("state","closed");
                    }
                    
                    tm_tab_add_header_events(header);

                });
                t.find(options.addheader).on("click.tmtabs",function(e){
                    e.preventDefault();
                    var last_header=t.find(options.headers+" "+options.header).last(),
                        id=last_header.attr(options.dataattribute),
                        last_tab=t.find("."+id),
                        new_header=last_header.tm_clone().off("closetab.tmtabs opentab.tmtabs click.tmtabs"),
                        new_tab=last_tab.tm_clone().empty();

                        add_counter++;
                        var newid=id+'-'+add_counter;
                        new_header
                            .html(t.find(options.headers+" "+options.header).length+1)
                            .removeClass("closed open")
                            .addClass("closed")
                            .data("tab","."+newid)
                            .data("state","closed")
                            .attr(options.dataattribute,newid);
                        new_tab.removeClass(id).addClass(newid);
                        if(options.useclasstohide){
                            new_tab.addClass("tm-hide");
                        }else{
                            new_tab.hide();
                        }
                        new_tab.removeClass("tm-animated "+options.animationclass);

                        last_header.closest(".tm-box").after(new_header);
                        
                        new_header.wrap('<div class="tm-box"></div>');

                        tm_tab_add_header_events(new_header);
                        last_tab.after(new_tab);
                        options.afteraddtab.call(this,new_header,new_tab);
                        
                });
                if(options.selectedtab=="auto"){
                    var _selected_tab = Cookies.get('tmadmintab');
                    $(options.header+'['+options.dataattribute+'="'+_selected_tab+'"]').trigger('click.tmtabs');
                }else if(options.selectedtab!==false){
                    var _selected_tab = parseInt(options.selectedtab);
                    t.find(options.header+':eq('+_selected_tab+')').trigger('click.tmtabs');
                }
                
            });
        };
    }
    
    if (!$().tmtoggle) {
        $.fn.tmtoggle = function() {
            var elements = this;
            
            if (elements.length==0){
                return;
            }

            var is_one_open_for_accordion = false;

            elements.each(function(){
                var t=$(this);
                if (!t.data('tm-toggle-init')){
                    t.data('tm-toggle-init',1);
                    var headers = t.find(".tm-toggle"),
                        wrap=t.find(".tm-collapse-wrap"),
                        wraps=$(".tm-collapse.tmaccordion").find(".tm-toggle");
                    if (headers.length==0 || wrap.length==0){
                        return;
                    }
                    
                    if (wrap.is(".closed")){
                        $(wrap).removeClass("closed open").addClass("closed").hide();
                        $(headers).find(".tm-arrow").removeClass("tcfa-angle-down tcfa-angle-up").addClass("tcfa-angle-down");
                    }else{
                        $(wrap).removeClass("closed open").addClass("open").show();
                        $(headers).find(".tm-arrow").removeClass("tcfa-angle-down tcfa-angle-up").addClass("tcfa-angle-up");
                        is_one_open_for_accordion = true;
                    }

                    headers.each(function(i,header){
                                            
                        $(header).on("closewrap.tmtoggle",function(e){
                            if (t.is('.tmaccordion') && $(wrap).is(".closed")){
                                return;
                            }                                            
                            $(wrap).removeClass("closed open").addClass("closed");
                            $(this).find(".tm-arrow").removeClass("tcfa-angle-down tcfa-angle-up").addClass("tcfa-angle-down");
                            $(wrap).removeClass("tm-animated fadeInDown");
                            if (t.is('.tmaccordion')){
                                $(wrap).hide();
                            }else{
                                $(wrap).animate({"height":"toggle"},100,function(){$(wrap).hide();});
                            }                        
                            $(window).trigger("tmlazy");
                        });

                        $(header).on("openwrap.tmtoggle",function(e){
                            if (t.is('.tmaccordion')){
                                $(wraps).not($(this)).trigger("closewrap.tmtoggle");
                            }
                            $(wrap).removeClass("closed open").addClass("open");
                            $(this).find(".tm-arrow").removeClass("tcfa-angle-down tcfa-angle-up").addClass("tcfa-angle-up");
                            $(wrap).show().removeClass("tm-animated fadeInDown").addClass("tm-animated fadeInDown");
                            $(window).trigger("tmlazy");
                            if (t.is('.tmaccordion') && !t.is_on_screen()){
                                $(window).scrollTo($(header));
                            }
                        });
                        
                        $(header).on("click.tmtoggle",function(e){
                            e.preventDefault();
                            if ($(wrap).is(".closed")){
                                $(this).trigger("openwrap.tmtoggle");                            
                            }else{
                                $(this).trigger("closewrap.tmtoggle");
                            }
                        });

                    });
                    
                }
            });
            if (!is_one_open_for_accordion && elements.filter('.tmaccordion').length>0){
                elements.filter('.tmaccordion').first().find(".tm-toggle").trigger('openwrap.tmtoggle');
            }
            return elements;
        };
    }

    if (!$().tmpoplink) {
        $.fn.tmpoplink = function() {
            var elements = this;
            
            if (elements.length==0){
                return;
            }

            var floatbox_template= function(data) {
                var out = '';
                out = "<div class=\'header\'><h3>" + data.title + "<\/h3><\/div>" +
                    "<div id=\'" + data.id + "\' class=\'float_editbox\'>" +
                    data.html + "<\/div>" +
                    "<div class=\'footer\'><div class=\'inner\'><span class=\'tm-button button button-secondary button-large details_cancel\'>" +
                    tm_epo_js.i18n_close +
                    "<\/span><\/div><\/div>";
                return out;
            }

            return elements.each(function(){
                var t=$(this);
                if(t.is('.tc-poplink')){
                    return;
                }
                t.addClass('tc-poplink');
                var id=$(this).attr('href'),
                    title=$(this).attr('data-title')?$(this).attr('data-title'):tm_epo_js.i18n_addition_options,
                    html = $(id).html(),
                    $_html = floatbox_template({
                        "id": "temp_for_floatbox_insert",
                        "html": html,
                        "title": title
                    }),
                    clicked=false;

                t.on("click.tmpoplink",function(e){
                    e.preventDefault();
                    var _to = $("body").tm_floatbox({
                        "fps": 1,
                        "ismodal": false,
                        "refresh": 100,
                        "width": "80%",
                        "height": "80%",
                        "classname": "flasho tm_wrapper",
                        "data": $_html
                    });

                    $(".details_cancel").click(function() {
                        if (clicked){
                            return;
                        }
                        clicked=true;
                        if (_to){
                             clicked=false;
                            _to.cancelfunc();
                        }
                    });
                });
                

                
            });
        };
    }

})(jQuery);

jQuery.jMaskGlobals={
    maskElements: '.tc-extra-product-options input'
};
// jQuery Mask Plugin v1.11.3
// github.com/igorescobar/jQuery-Mask-Plugin
(function(a){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var y=function(b,d,e){b=a(b);var g=this,l=b.val(),m;d="function"===typeof d?d(b.val(),void 0,b,e):d;var c={invalid:[],getCaret:function(){try{var k,r=0,a=b.get(0),f=document.selection,c=a.selectionStart;if(f&&-1===navigator.appVersion.indexOf("MSIE 10"))k=f.createRange(),k.moveStart("character",b.is("input")?-b.val().length:-b.text().length),
r=k.text.length;else if(c||"0"===c)r=c;return r}catch(d){}},setCaret:function(k){try{if(b.is(":focus")){var r,a=b.get(0);a.setSelectionRange?a.setSelectionRange(k,k):a.createTextRange&&(r=a.createTextRange(),r.collapse(!0),r.moveEnd("character",k),r.moveStart("character",k),r.select())}}catch(c){}},events:function(){b.on("keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",
function(){l===b.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("keydown.mask, blur.mask",function(){l=b.val()}).on("focus.mask",function(k){!0===e.selectOnFocus&&a(k.target).select()}).on("focusout.mask",function(){e.clearIfNotMatch&&!m.test(c.val())&&c.val("")})},getRegexMask:function(){for(var k=[],b,a,c,e,h=0;h<d.length;h++)(b=g.translation[d.charAt(h)])?(a=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),c=b.optional,(b=b.recursive)?(k.push(d.charAt(h)),e={digit:d.charAt(h),
pattern:a}):k.push(c||b?a+"?":a)):k.push(d.charAt(h).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));k=k.join("");e&&(k=k.replace(RegExp("("+e.digit+"(.*"+e.digit+")?)"),"($1)?").replace(RegExp(e.digit,"g"),e.pattern));return RegExp(k)},destroyEvents:function(){b.off("keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(k){var a=b.is("input")?"val":"text";if(0<arguments.length){if(b[a]()!==k)b[a](k);a=b}else a=b[a]();return a},getMCharsBeforeCount:function(a,b){for(var c=0,
f=0,e=d.length;f<e&&f<a;f++)g.translation[d.charAt(f)]||(a=b?a+1:a,c++);return c},caretPos:function(a,b,e,f){return g.translation[d.charAt(Math.min(a-1,d.length-1))]?Math.min(a+e-b-f,e):c.caretPos(a+1,b,e,f)},behaviour:function(b){b=b||window.event;c.invalid=[];var e=b.keyCode||b.which;if(-1===a.inArray(e,g.byPassKeys)){var d=c.getCaret(),f=c.val().length,p=d<f,h=c.getMasked(),l=h.length,n=c.getMCharsBeforeCount(l-1)-c.getMCharsBeforeCount(f-1);c.val(h);!p||65===e&&b.ctrlKey||(8!==e&&46!==e&&(d=c.caretPos(d,
f,l,n)),c.setCaret(d));return c.callbacks(b)}},getMasked:function(b){var a=[],l=c.val(),f=0,p=d.length,h=0,m=l.length,n=1,q="push",u=-1,t,w;e.reverse?(q="unshift",n=-1,t=0,f=p-1,h=m-1,w=function(){return-1<f&&-1<h}):(t=p-1,w=function(){return f<p&&h<m});for(;w();){var x=d.charAt(f),v=l.charAt(h),s=g.translation[x];if(s)v.match(s.pattern)?(a[q](v),s.recursive&&(-1===u?u=f:f===t&&(f=u-n),t===u&&(f-=n)),f+=n):s.optional?(f+=n,h-=n):s.fallback?(a[q](s.fallback),f+=n,h-=n):c.invalid.push({p:h,v:v,e:s.pattern}),
h+=n;else{if(!b)a[q](x);v===x&&(h+=n);f+=n}}b=d.charAt(t);p!==m+1||g.translation[b]||a.push(b);return a.join("")},callbacks:function(a){var g=c.val(),m=g!==l,f=[g,a,b,e],p=function(a,b,c){"function"===typeof e[a]&&b&&e[a].apply(this,c)};p("onChange",!0===m,f);p("onKeyPress",!0===m,f);p("onComplete",g.length===d.length,f);p("onInvalid",0<c.invalid.length,[g,a,b,c.invalid,e])}};g.mask=d;g.options=e;g.remove=function(){var a=c.getCaret();c.destroyEvents();c.val(g.getCleanVal());c.setCaret(a-c.getMCharsBeforeCount(a));
return b};g.getCleanVal=function(){return c.getMasked(!0)};g.init=function(d){d=d||!1;e=e||{};g.byPassKeys=a.jMaskGlobals.byPassKeys;g.translation=a.jMaskGlobals.translation;g.translation=a.extend({},g.translation,e.translation);g=a.extend(!0,{},g,e);m=c.getRegexMask();!1===d?(e.placeholder&&b.attr("placeholder",e.placeholder),b.attr("autocomplete","off"),c.destroyEvents(),c.events(),d=c.getCaret(),c.val(c.getMasked()),c.setCaret(d+c.getMCharsBeforeCount(d,!0))):(c.events(),c.val(c.getMasked()))};
g.init(!b.is("input"))};a.maskWatchers={};var A=function(){var b=a(this),d={},e=b.attr("data-mask");b.attr("data-mask-reverse")&&(d.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(d.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(d.selectOnFocus=!0);if(z(b,e,d))return b.data("mask",new y(this,e,d))},z=function(b,d,e){e=e||{};var g=a(b).data("mask"),l=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof d&&(d=d(b)),"object"!==typeof g||l(g.options)!==l(e)||g.mask!==
d}catch(m){}};a.fn.mask=function(b,d){d=d||{};var e=this.selector,g=a.jMaskGlobals,l=a.jMaskGlobals.watchInterval,m=function(){if(z(this,b,d))return a(this).data("mask",new y(this,b,d))};a(this).each(m);e&&""!==e&&g.watchInputs&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(m)},l));return this};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");
b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(){a(document).find(a.jMaskGlobals.maskElements).filter(q.dataMaskAttr).each(A)};var q={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};
a.jMaskGlobals=a.jMaskGlobals||{};q=a.jMaskGlobals=a.extend(!0,{},q,a.jMaskGlobals);q.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},q.watchInterval)});

/*! jQuery JSON plugin v2.5.1 | github.com/Krinkle/jquery-json */
!function($){"use strict";var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},hasOwn=Object.prototype.hasOwnProperty;$.toJSON="object"==typeof JSON&&JSON.stringify?JSON.stringify:function(a){if(null===a)return"null";var b,c,d,e,f=$.type(a);if("undefined"===f)return void 0;if("number"===f||"boolean"===f)return String(a);if("string"===f)return $.quoteString(a);if("function"==typeof a.toJSON)return $.toJSON(a.toJSON());if("date"===f){var g=a.getUTCMonth()+1,h=a.getUTCDate(),i=a.getUTCFullYear(),j=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds();return 10>g&&(g="0"+g),10>h&&(h="0"+h),10>j&&(j="0"+j),10>k&&(k="0"+k),10>l&&(l="0"+l),100>m&&(m="0"+m),10>m&&(m="0"+m),'"'+i+"-"+g+"-"+h+"T"+j+":"+k+":"+l+"."+m+'Z"'}if(b=[],$.isArray(a)){for(c=0;c<a.length;c++)b.push($.toJSON(a[c])||"null");return"["+b.join(",")+"]"}if("object"==typeof a){for(c in a)if(hasOwn.call(a,c)){if(f=typeof c,"number"===f)d='"'+c+'"';else{if("string"!==f)continue;d=$.quoteString(c)}f=typeof a[c],"function"!==f&&"undefined"!==f&&(e=$.toJSON(a[c]),b.push(d+":"+e))}return"{"+b.join(",")+"}"}},$.evalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){return eval("("+str+")")},$.secureEvalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered))return eval("("+str+")");throw new SyntaxError("Error parsing JSON, source is not valid.")},$.quoteString=function(a){return a.match(escape)?'"'+a.replace(escape,function(a){var b=meta[a];return"string"==typeof b?b:(b=a.charCodeAt(),"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16))})+'"':'"'+a+'"'}}(jQuery);

/* Lazy Load XT 1.0.6 | MIT License */
!function(a,b,c,d){function e(a,b){return a[b]===d?t[b]:a[b]}function f(){var a=b.pageYOffset;return a===d?r.scrollTop:a}function g(a,b){var c=t["on"+a];c&&(w(c)?c.call(b[0]):(c.addClass&&b.addClass(c.addClass),c.removeClass&&b.removeClass(c.removeClass))),b.trigger("lazy"+a,[b]),k()}function h(b){g(b.type,a(this).off(p,h))}function i(c){if(A.length){c=c||t.forceLoad,B=1/0;var d,e,i=f(),j=b.innerHeight||r.clientHeight,k=b.innerWidth||r.clientWidth;for(d=0,e=A.length;e>d;d++){var l,m=A[d],o=m[0],q=m[n],s=!1,u=c;if(z(r,o)){if(c||!q.visibleOnly||o.offsetWidth||o.offsetHeight){if(!u){var v=o.getBoundingClientRect(),x=q.edgeX,y=q.edgeY;l=v.top+i-y-j,u=i>=l&&v.bottom>-y&&v.left<=k+x&&v.right>-x}if(u){g("show",m);var C=q.srcAttr,D=w(C)?C(m):o.getAttribute(C);D&&(m.on(p,h),o.src=D),s=!0}else B>l&&(B=l)}}else s=!0;s&&(A.splice(d--,1),e--)}e||g("complete",a(r))}}function j(){C>1?(C=1,i(),setTimeout(j,t.throttle)):C=0}function k(a){A.length&&(a&&"scroll"===a.type&&a.currentTarget===b&&B>=f()||(C||setTimeout(j,0),C=2))}function l(){v.lazyLoadXT()}function m(){i(!0)}var n="lazyLoadXT",o="lazied",p="load error",q="lazy-hidden",r=c.documentElement||c.body,s=b.onscroll===d||!!b.operamini||!r.getBoundingClientRect,t={autoInit:!0,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:s,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"",oninit:{removeClass:"lazy"},onshow:{addClass:q},onload:{removeClass:q,addClass:"lazy-loaded"},onerror:{removeClass:q},checkDuplicates:!0},u={srcAttr:"data-src",edgeX:0,edgeY:0,visibleOnly:!0},v=a(b),w=a.isFunction,x=a.extend,y=a.data||function(b,c){return a(b).data(c)},z=a.contains||function(a,b){for(;b=b.parentNode;)if(b===a)return!0;return!1},A=[],B=0,C=0;a[n]=x(t,u,a[n]),a.fn[n]=function(c){c=c||{};var d,f=e(c,"blankImage"),h=e(c,"checkDuplicates"),i=e(c,"scrollContainer"),j={};a(i).on("scroll",k);for(d in u)j[d]=e(c,d);return this.each(function(d,e){if(e===b)a(t.selector).lazyLoadXT(c);else{if(h&&y(e,o))return;var i=a(e).data(o,1);f&&"IMG"===e.tagName&&!e.src&&(e.src=f),i[n]=x({},j),g("init",i),A.push(i)}})},a(c).ready(function(){g("start",v),v.on(t.loadEvent,l).on(t.updateEvent,k).on(t.forceEvent,m),a(c).on(t.updateEvent,k),t.autoInit&&l()})}(window.jQuery||window.Zepto||window.$,window,document);
(function($) {
$.extend($.lazyLoadXT, {
  autoInit:  false,
  selector: 'img.tmlazy',
  srcAttr: 'data-original',
  visibleOnly:false,
  updateEvent:jQuery.lazyLoadXT.updateEvent + ' tmlazy'
});
})(jQuery);

/*
 *  Project: nouislider (http://refreshless.com/nouislider/)
 *  Description: noUiSlider is a range slider without bloat
 *  License: http://www.wtfpl.net/about/
 */
/* wNumb.js */
(function(){'use strict';var FormatOptions=['decimals','thousand','mark','prefix','postfix','encoder','decoder','negativeBefore','negative','edit','undo'];function strReverse(a){return a.split('').reverse().join('')}function strStartsWith(input,match){return input.substring(0,match.length)===match}function strEndsWith(input,match){return input.slice(-1*match.length)===match}function throwEqualError(F,a,b){if((F[a]||F[b])&&(F[a]===F[b])){throw new Error(a);}}function isValidNumber(input){return typeof input==='number'&&isFinite(input)}function toFixed(value,decimals){var scale=Math.pow(10,decimals);return(Math.round(value*scale)/scale).toFixed(decimals)}function formatTo(decimals,thousand,mark,prefix,postfix,encoder,decoder,negativeBefore,negative,edit,undo,input){var originalInput=input,inputIsNegative,inputPieces,inputBase,inputDecimals='',output='';if(encoder){input=encoder(input)}if(!isValidNumber(input)){return false}if(decimals!==false&&parseFloat(input.toFixed(decimals))===0){input=0}if(input<0){inputIsNegative=true;input=Math.abs(input)}if(decimals!==false){input=toFixed(input,decimals)}input=input.toString();if(input.indexOf('.')!==-1){inputPieces=input.split('.');inputBase=inputPieces[0];if(mark){inputDecimals=mark+inputPieces[1]}}else{inputBase=input}if(thousand){inputBase=strReverse(inputBase).match(/.{1,3}/g);inputBase=strReverse(inputBase.join(strReverse(thousand)))}if(inputIsNegative&&negativeBefore){output+=negativeBefore}if(prefix){output+=prefix}if(inputIsNegative&&negative){output+=negative}output+=inputBase;output+=inputDecimals;if(postfix){output+=postfix}if(edit){output=edit(output,originalInput)}return output}function formatFrom(decimals,thousand,mark,prefix,postfix,encoder,decoder,negativeBefore,negative,edit,undo,input){var originalInput=input,inputIsNegative,output='';if(undo){input=undo(input)}if(!input||typeof input!=='string'){return false}if(negativeBefore&&strStartsWith(input,negativeBefore)){input=input.replace(negativeBefore,'');inputIsNegative=true}if(prefix&&strStartsWith(input,prefix)){input=input.replace(prefix,'')}if(negative&&strStartsWith(input,negative)){input=input.replace(negative,'');inputIsNegative=true}if(postfix&&strEndsWith(input,postfix)){input=input.slice(0,-1*postfix.length)}if(thousand){input=input.split(thousand).join('')}if(mark){input=input.replace(mark,'.')}if(inputIsNegative){output+='-'}output+=input;output=output.replace(/[^0-9\.\-.]/g,'');if(output===''){return false}output=Number(output);if(decoder){output=decoder(output)}if(!isValidNumber(output)){return false}return output}function validate(inputOptions){var i,optionName,optionValue,filteredOptions={};for(i=0;i<FormatOptions.length;i+=1){optionName=FormatOptions[i];optionValue=inputOptions[optionName];if(optionValue===undefined){if(optionName==='negative'&&!filteredOptions.negativeBefore){filteredOptions[optionName]='-'}else if(optionName==='mark'&&filteredOptions.thousand!=='.'){filteredOptions[optionName]='.'}else{filteredOptions[optionName]=false}}else if(optionName==='decimals'){if(optionValue>=0&&optionValue<8){filteredOptions[optionName]=optionValue}else{throw new Error(optionName);}}else if(optionName==='encoder'||optionName==='decoder'||optionName==='edit'||optionName==='undo'){if(typeof optionValue==='function'){filteredOptions[optionName]=optionValue}else{throw new Error(optionName);}}else{if(typeof optionValue==='string'){filteredOptions[optionName]=optionValue}else{throw new Error(optionName);}}}throwEqualError(filteredOptions,'mark','thousand');throwEqualError(filteredOptions,'prefix','negative');throwEqualError(filteredOptions,'prefix','negativeBefore');return filteredOptions}function passAll(options,method,input){var i,args=[];for(i=0;i<FormatOptions.length;i+=1){args.push(options[FormatOptions[i]])}args.push(input);return method.apply('',args)}function wNumb(options){if(!(this instanceof wNumb)){return new wNumb(options)}if(typeof options!=="object"){return}options=validate(options);this.to=function(input){return passAll(options,formatTo,input)};this.from=function(input){return passAll(options,formatFrom,input)}}window.wNumb=wNumb}());
/*! nouislider - 8.0.2 - 2015-07-06 13:22:09 */
!function(a){if("function"==typeof define&&define.amd)define([],a);else if("object"==typeof exports){var b=require("fs");module.exports=a(),module.exports.css=function(){return b.readFileSync(__dirname+"/nouislider.min.css","utf8")}}else window.noUiSlider=a()}(function(){"use strict";function a(a){return a.filter(function(a){return this[a]?!1:this[a]=!0},{})}function b(a,b){return Math.round(a/b)*b}function c(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.defaultView||c.parentWindow,e=c.documentElement,f=d.pageXOffset;return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f=0),{top:b.top+d.pageYOffset-e.clientTop,left:b.left+f-e.clientLeft}}function d(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function e(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function f(a,b,c){j(a,b),setTimeout(function(){k(a,b)},c)}function g(a){return Math.max(Math.min(a,100),0)}function h(a){return Array.isArray(a)?a:[a]}function i(a){var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function k(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function l(a,b){a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function m(a,b){return 100/(b-a)}function n(a,b){return 100*b/(a[1]-a[0])}function o(a,b){return n(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function p(a,b){return b*(a[1]-a[0])/100+a[0]}function q(a,b){for(var c=1;a>=b[c];)c+=1;return c}function r(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=q(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+o([d,e],c)/m(f,g)}function s(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=q(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],p([d,e],(c-f)*m(f,g))}function t(a,c,d,e){if(100===e)return e;var f,g,h=q(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):c[h-1]?a[h-1]+b(e-a[h-1],c[h-1]):e}function u(a,b,c){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!d(e)||!d(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(e),c.xVal.push(b[0]),e?c.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(c.xSteps[0]=b[1])}function v(a,b,c){return b?void(c.xSteps[a]=n([c.xVal[a],c.xVal[a+1]],b)/m(c.xPct[a],c.xPct[a+1])):!0}function w(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)u(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)v(e,this.xNumSteps[e],this)}function x(a,b){if(!d(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function y(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");a.spectrum=new w(b,a.snap,a.dir,a.singleStep)}function z(a,b){if(b=h(b),!Array.isArray(b)||!b.length||b.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");a.handles=b.length,a.start=b}function A(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function B(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function C(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function D(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function E(a,b){if(!d(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function F(a,b){if(!d(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function G(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function H(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function I(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function J(a){var b,c={margin:0,limit:0,animate:!0,format:U};b={step:{r:!1,t:x},start:{r:!0,t:z},connect:{r:!0,t:C},direction:{r:!0,t:G},snap:{r:!1,t:A},animate:{r:!1,t:B},range:{r:!0,t:y},orientation:{r:!1,t:D},margin:{r:!1,t:E},limit:{r:!1,t:F},behaviour:{r:!0,t:H},format:{r:!1,t:I}};var d={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"};return Object.keys(d).forEach(function(b){void 0===a[b]&&(a[b]=d[b])}),Object.keys(b).forEach(function(d){var e=b[d];if(void 0===a[d]){if(e.r)throw new Error("noUiSlider: '"+d+"' is required.");return!0}e.t(c,a[d])}),c.pips=a.pips,c.style=c.ort?"top":"left",c}function K(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[g(d),g(e)]):[d,e]}function L(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e||f,g}function M(a,b){var c=document.createElement("div"),d=document.createElement("div"),e=["-lower","-upper"];return a&&e.reverse(),j(d,T[3]),j(d,T[3]+e[b]),j(c,T[2]),c.appendChild(d),c}function N(a,b,c){switch(a){case 1:j(b,T[7]),j(c[0],T[6]);break;case 3:j(c[1],T[6]);case 2:j(c[0],T[7]);case 0:j(b,T[6])}}function O(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(c.appendChild(M(b,d)));return e}function P(a,b,c){j(c,T[0]),j(c,T[8+a]),j(c,T[4+b]);var d=document.createElement("div");return j(d,T[1]),c.appendChild(d),d}function Q(b,d){function e(a,b,c){if("range"===a||"steps"===a)return M.xVal;if("count"===a){var d,e=100/(b-1),f=0;for(b=[];(d=f++*e)<=100;)b.push(d);a="positions"}return"positions"===a?b.map(function(a){return M.fromStepping(c?M.getStep(a):a)}):"values"===a?c?b.map(function(a){return M.fromStepping(M.getStep(M.toStepping(a)))}):b:void 0}function m(b,c,d){var e=M.direction,f={},g=M.xVal[0],h=M.xVal[M.xVal.length-1],i=!1,j=!1,k=0;return M.direction=0,d=a(d.slice().sort(function(a,b){return a-b})),d[0]!==g&&(d.unshift(g),i=!0),d[d.length-1]!==h&&(d.push(h),j=!0),d.forEach(function(a,e){var g,h,l,m,n,o,p,q,r,s,t=a,u=d[e+1];if("steps"===c&&(g=M.xNumSteps[e]),g||(g=u-t),t!==!1&&void 0!==u)for(h=t;u>=h;h+=g){for(m=M.toStepping(h),n=m-k,q=n/b,r=Math.round(q),s=n/r,l=1;r>=l;l+=1)o=k+l*s,f[o.toFixed(5)]=["x",0];p=d.indexOf(h)>-1?1:"steps"===c?2:0,!e&&i&&(p=0),h===u&&j||(f[m.toFixed(5)]=[h,p]),k=m}}),M.direction=e,f}function n(a,b,c){function e(a){return["-normal","-large","-sub"][a]}function f(a,b,c){return'class="'+b+" "+b+"-"+h+" "+b+e(c[1])+'" style="'+d.style+": "+a+'%"'}function g(a,d){M.direction&&(a=100-a),d[1]=d[1]&&b?b(d[0],d[1]):d[1],i.innerHTML+="<div "+f(a,"noUi-marker",d)+"></div>",d[1]&&(i.innerHTML+="<div "+f(a,"noUi-value",d)+">"+c.to(d[0])+"</div>")}var h=["horizontal","vertical"][d.ort],i=document.createElement("div");return j(i,"noUi-pips"),j(i,"noUi-pips-"+h),Object.keys(a).forEach(function(b){g(b,a[b])}),i}function o(a){var b=a.mode,c=a.density||1,d=a.filter||!1,f=a.values||!1,g=a.stepped||!1,h=e(b,f,g),i=m(c,b,h),j=a.format||{to:Math.round};return I.appendChild(n(i,d,j))}function p(){return G["offset"+["Width","Height"][d.ort]]}function q(a,b){void 0!==b&&(b=Math.abs(b-d.dir)),Object.keys(R).forEach(function(c){var d=c.split(".")[0];a===d&&R[c].forEach(function(a){a(h(B()),b,r(Array.prototype.slice.call(Q)))})})}function r(a){return 1===a.length?a[0]:d.dir?a.reverse():a}function s(a,b,c,e){var f=function(b){return I.hasAttribute("disabled")?!1:l(I,T[14])?!1:(b=L(b),a===S.start&&void 0!==b.buttons&&b.buttons>1?!1:(b.calcPoint=b.points[d.ort],void c(b,e)))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!1),g.push([a,f])}),g}function t(a,b){var c,d,e=b.handles||H,f=!1,g=100*(a.calcPoint-b.start)/p(),h=e[0]===H[0]?0:1;if(c=K(g,b.positions,e.length>1),f=y(e[0],c[h],1===e.length),e.length>1){if(f=y(e[1],c[h?0:1],!1)||f)for(d=0;d<b.handles.length;d++)q("slide",d)}else f&&q("slide",h)}function u(a,b){var c=G.getElementsByClassName(T[15]),d=b.handles[0]===H[0]?0:1;c.length&&k(c[0],T[15]),a.cursor&&(document.body.style.cursor="",document.body.removeEventListener("selectstart",document.body.noUiListener));var e=document.documentElement;e.noUiListeners.forEach(function(a){e.removeEventListener(a[0],a[1])}),k(I,T[12]),q("set",d),q("change",d)}function v(a,b){var c=document.documentElement;if(1===b.handles.length&&(j(b.handles[0].children[0],T[15]),b.handles[0].hasAttribute("disabled")))return!1;a.stopPropagation();var d=s(S.move,c,t,{start:a.calcPoint,handles:b.handles,positions:[J[0],J[H.length-1]]}),e=s(S.end,c,u,{handles:b.handles});if(c.noUiListeners=d.concat(e),a.cursor){document.body.style.cursor=getComputedStyle(a.target).cursor,H.length>1&&j(I,T[12]);var f=function(){return!1};document.body.noUiListener=f,document.body.addEventListener("selectstart",f,!1)}}function w(a){var b,e,g=a.calcPoint,h=0;return a.stopPropagation(),H.forEach(function(a){h+=c(a)[d.style]}),b=h/2>g||1===H.length?0:1,g-=c(G)[d.style],e=100*g/p(),d.events.snap||f(I,T[14],300),H[b].hasAttribute("disabled")?!1:(y(H[b],e),q("slide",b),q("set",b),q("change",b),void(d.events.snap&&v(a,{handles:[H[h]]})))}function x(a){var b,c;if(!a.fixed)for(b=0;b<H.length;b+=1)s(S.start,H[b].children[0],v,{handles:[H[b]]});a.tap&&s(S.start,G,w,{handles:H}),a.drag&&(c=[G.getElementsByClassName(T[7])[0]],j(c[0],T[10]),a.fixed&&c.push(H[c[0]===H[0]?1:0].children[0]),c.forEach(function(a){s(S.start,a,v,{handles:H})}))}function y(a,b,c){var e=a!==H[0]?1:0,f=J[0]+d.margin,h=J[1]-d.margin,i=J[0]+d.limit,l=J[1]-d.limit;return H.length>1&&(b=e?Math.max(b,f):Math.min(b,h)),c!==!1&&d.limit&&H.length>1&&(b=e?Math.min(b,i):Math.max(b,l)),b=M.getStep(b),b=g(parseFloat(b.toFixed(7))),b===J[e]?!1:(a.style[d.style]=b+"%",a.previousSibling||(k(a,T[17]),b>50&&j(a,T[17])),J[e]=b,Q[e]=M.fromStepping(b),q("update",e),!0)}function z(a,b){var c,e,f;for(d.limit&&(a+=1),c=0;a>c;c+=1)e=c%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=d.format.from(f),(f===!1||isNaN(f)||y(H[e],M.toStepping(f),c===3-d.dir)===!1)&&q("update",e))}function A(a){var b,c,e=h(a);for(d.dir&&d.handles>1&&e.reverse(),d.animate&&-1!==J[0]&&f(I,T[14],300),b=H.length>1?3:1,1===e.length&&(b=1),z(b,e),c=0;c<H.length;c++)q("set",c)}function B(){var a,b=[];for(a=0;a<d.handles;a+=1)b[a]=d.format.to(Q[a]);return r(b)}function C(){T.forEach(function(a){a&&k(I,a)}),I.innerHTML="",delete I.noUiSlider}function D(){var a=J.map(function(a,b){var c=M.getApplicableStep(a),d=i(String(c[2])),e=Q[b],f=100===a?null:c[2],g=Number((e-c[2]).toFixed(d)),h=0===a?null:g>=c[1]?c[2]:c[0]||!1;return[h,f]});return r(a)}function E(a,b){R[a]=R[a]||[],R[a].push(b),"update"===a.split(".")[0]&&H.forEach(function(a,b){q("update",b)})}function F(a){var b=a.split(".")[0],c=a.substring(b.length);Object.keys(R).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete R[a]})}var G,H,I=b,J=[-1,-1],M=d.spectrum,Q=[],R={};if(I.noUiSlider)throw new Error("Slider was already initialized.");return G=P(d.dir,d.ort,I),H=O(d.handles,d.dir,G),N(d.connect,I,H),x(d.events),d.pips&&o(d.pips),{destroy:C,steps:D,on:E,off:F,get:B,set:A}}function R(a,b){if(!a.nodeName)throw new Error("noUiSlider.create requires a single element.");var c=J(b,a),d=Q(a,c);d.set(c.start),a.noUiSlider=d}var S=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},T=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];w.prototype.getMargin=function(a){return 2===this.xPct.length?n(this.xVal,a):!1},w.prototype.toStepping=function(a){return a=r(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},w.prototype.fromStepping=function(a){return this.direction&&(a=100-a),e(s(this.xVal,this.xPct,a))},w.prototype.getStep=function(a){return this.direction&&(a=100-a),a=t(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},w.prototype.getApplicableStep=function(a){var b=q(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},w.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var U={to:function(a){return a.toFixed(2)},from:Number};return{create:R}});

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.13
 */
;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));

// Spectrum Colorpicker v1.7.1
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports&&"object"==typeof module?module.exports=t:t(jQuery)}(function(t,e){"use strict";function r(e,r,n,a){for(var i=[],s=0;s<e.length;s++){var o=e[s];if(o){var l=tinycolor(o),c=l.toHsl().l<.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";c+=tinycolor.equals(r,o)?" sp-thumb-active":"";var f=l.toString(a.preferredFormat||"rgb"),u=b?"background-color:"+l.toRgbString():"filter:"+l.toFilter();i.push('<span title="'+f+'" data-color="'+l.toRgbString()+'" class="'+c+'"><span class="sp-thumb-inner" style="'+u+';" /></span>')}else{var h="sp-clear-display";i.push(t("<div />").append(t('<span data-color="" style="background-color:transparent;" class="'+h+'"></span>').attr("title",a.noColorSelectedText)).html())}}return"<div class='sp-cf "+n+"'>"+i.join("")+"</div>"}function n(){for(var t=0;t<p.length;t++)p[t]&&p[t].hide()}function a(e,r){var n=t.extend({},d,e);return n.callbacks={move:c(n.move,r),change:c(n.change,r),show:c(n.show,r),hide:c(n.hide,r),beforeShow:c(n.beforeShow,r)},n}function i(i,o){function c(){if(W.showPaletteOnly&&(W.showPalette=!0),De.text(W.showPaletteOnly?W.togglePaletteMoreText:W.togglePaletteLessText),W.palette){de=W.palette.slice(0),pe=t.isArray(de[0])?de:[de],ge={};for(var e=0;e<pe.length;e++)for(var r=0;r<pe[e].length;r++){var n=tinycolor(pe[e][r]).toRgbString();ge[n]=!0}}ke.toggleClass("sp-flat",X),ke.toggleClass("sp-input-disabled",!W.showInput),ke.toggleClass("sp-alpha-enabled",W.showAlpha),ke.toggleClass("sp-clear-enabled",Je),ke.toggleClass("sp-buttons-disabled",!W.showButtons),ke.toggleClass("sp-palette-buttons-disabled",!W.togglePaletteOnly),ke.toggleClass("sp-palette-disabled",!W.showPalette),ke.toggleClass("sp-palette-only",W.showPaletteOnly),ke.toggleClass("sp-initial-disabled",!W.showInitial),ke.addClass(W.className).addClass(W.containerClassName),z()}function d(){function e(e){return e.data&&e.data.ignore?(O(t(e.target).closest(".sp-thumb-el").data("color")),j()):(O(t(e.target).closest(".sp-thumb-el").data("color")),j(),I(!0),W.hideAfterPaletteSelect&&T()),!1}if(g&&ke.find("*:not(input)").attr("unselectable","on"),c(),Be&&_e.after(Le).hide(),Je||je.hide(),X)_e.after(ke).hide();else{var r="parent"===W.appendTo?_e.parent():t(W.appendTo);1!==r.length&&(r=t("body")),r.append(ke)}y(),Ke.bind("click.spectrum touchstart.spectrum",function(e){xe||A(),e.stopPropagation(),t(e.target).is("input")||e.preventDefault()}),(_e.is(":disabled")||W.disabled===!0)&&V(),ke.click(l),Fe.change(P),Fe.bind("paste",function(){setTimeout(P,1)}),Fe.keydown(function(t){13==t.keyCode&&P()}),Ee.text(W.cancelText),Ee.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),F(),T()}),je.attr("title",W.clearText),je.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),Qe=!0,j(),X&&I(!0)}),qe.text(W.chooseText),qe.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),g&&Fe.is(":focus")&&Fe.trigger("change"),E()&&(I(!0),T())}),De.text(W.showPaletteOnly?W.togglePaletteMoreText:W.togglePaletteLessText),De.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),W.showPaletteOnly=!W.showPaletteOnly,W.showPaletteOnly||X||ke.css("left","-="+(Se.outerWidth(!0)+5)),c()}),f(He,function(t,e,r){he=t/se,Qe=!1,r.shiftKey&&(he=Math.round(10*he)/10),j()},S,C),f(Ae,function(t,e){ce=parseFloat(e/ae),Qe=!1,W.showAlpha||(he=1),j()},S,C),f(Ce,function(t,e,r){if(r.shiftKey){if(!ye){var n=fe*ee,a=re-ue*re,i=Math.abs(t-n)>Math.abs(e-a);ye=i?"x":"y"}}else ye=null;var s=!ye||"x"===ye,o=!ye||"y"===ye;s&&(fe=parseFloat(t/ee)),o&&(ue=parseFloat((re-e)/re)),Qe=!1,W.showAlpha||(he=1),j()},S,C),$e?(O($e),q(),Ye=Xe||tinycolor($e).format,w($e)):q(),X&&M();var n=g?"mousedown.spectrum":"click.spectrum touchstart.spectrum";Oe.delegate(".sp-thumb-el",n,e),Ne.delegate(".sp-thumb-el:nth-child(1)",n,{ignore:!0},e)}function y(){if(G&&window.localStorage){try{var e=window.localStorage[G].split(",#");e.length>1&&(delete window.localStorage[G],t.each(e,function(t,e){w(e)}))}catch(r){}try{be=window.localStorage[G].split(";")}catch(r){}}}function w(e){if(Y){var r=tinycolor(e).toRgbString();if(!ge[r]&&-1===t.inArray(r,be))for(be.push(r);be.length>ve;)be.shift();if(G&&window.localStorage)try{window.localStorage[G]=be.join(";")}catch(n){}}}function _(){var t=[];if(W.showPalette)for(var e=0;e<be.length;e++){var r=tinycolor(be[e]).toRgbString();ge[r]||t.push(be[e])}return t.reverse().slice(0,W.maxSelectionSize)}function x(){var e=N(),n=t.map(pe,function(t,n){return r(t,e,"sp-palette-row sp-palette-row-"+n,W)});y(),be&&n.push(r(_(),e,"sp-palette-row sp-palette-row-selection",W)),Oe.html(n.join(""))}function k(){if(W.showInitial){var t=We,e=N();Ne.html(r([t,e],e,"sp-palette-row-initial",W))}}function S(){(0>=re||0>=ee||0>=ae)&&z(),te=!0,ke.addClass(me),ye=null,_e.trigger("dragstart.spectrum",[N()])}function C(){te=!1,ke.removeClass(me),_e.trigger("dragstop.spectrum",[N()])}function P(){var t=Fe.val();if(null!==t&&""!==t||!Je){var e=tinycolor(t);e.isValid()?(O(e),I(!0)):Fe.addClass("sp-validation-error")}else O(null),I(!0)}function A(){Z?T():M()}function M(){var e=t.Event("beforeShow.spectrum");return Z?void z():(_e.trigger(e,[N()]),void(J.beforeShow(N())===!1||e.isDefaultPrevented()||(n(),Z=!0,t(we).bind("keydown.spectrum",R),t(we).bind("click.spectrum",H),t(window).bind("resize.spectrum",U),Le.addClass("sp-active"),ke.removeClass("sp-hidden"),z(),q(),We=N(),k(),J.show(We),_e.trigger("show.spectrum",[We]))))}function R(t){27===t.keyCode&&T()}function H(t){2!=t.button&&(te||(Ge?I(!0):F(),T()))}function T(){Z&&!X&&(Z=!1,t(we).unbind("keydown.spectrum",R),t(we).unbind("click.spectrum",H),t(window).unbind("resize.spectrum",U),Le.removeClass("sp-active"),ke.addClass("sp-hidden"),J.hide(N()),_e.trigger("hide.spectrum",[N()]))}function F(){O(We,!0)}function O(t,e){if(tinycolor.equals(t,N()))return void q();var r,n;!t&&Je?Qe=!0:(Qe=!1,r=tinycolor(t),n=r.toHsv(),ce=n.h%360/360,fe=n.s,ue=n.v,he=n.a),q(),r&&r.isValid()&&!e&&(Ye=Xe||r.getFormat())}function N(t){return t=t||{},Je&&Qe?null:tinycolor.fromRatio({h:ce,s:fe,v:ue,a:Math.round(100*he)/100},{format:t.format||Ye})}function E(){return!Fe.hasClass("sp-validation-error")}function j(){q(),J.move(N()),_e.trigger("move.spectrum",[N()])}function q(){Fe.removeClass("sp-validation-error"),D();var t=tinycolor.fromRatio({h:ce,s:1,v:1});Ce.css("background-color",t.toHexString());var e=Ye;1>he&&(0!==he||"name"!==e)&&("hex"===e||"hex3"===e||"hex6"===e||"name"===e)&&(e="rgb");var r=N({format:e}),n="";if(Ve.removeClass("sp-clear-display"),Ve.css("background-color","transparent"),!r&&Je)Ve.addClass("sp-clear-display");else{var a=r.toHexString(),i=r.toRgbString();if(b||1===r.alpha?Ve.css("background-color",i):(Ve.css("background-color","transparent"),Ve.css("filter",r.toFilter())),W.showAlpha){var s=r.toRgb();s.a=0;var o=tinycolor(s).toRgbString(),l="linear-gradient(left, "+o+", "+a+")";g?Re.css("filter",tinycolor(o).toFilter({gradientType:1},a)):(Re.css("background","-webkit-"+l),Re.css("background","-moz-"+l),Re.css("background","-ms-"+l),Re.css("background","linear-gradient(to right, "+o+", "+a+")"))}n=r.toString(e)}W.showInput&&Fe.val(n),W.showPalette&&x(),k()}function D(){var t=fe,e=ue;if(Je&&Qe)Te.hide(),Me.hide(),Pe.hide();else{Te.show(),Me.show(),Pe.show();var r=t*ee,n=re-e*re;r=Math.max(-ne,Math.min(ee-ne,r-ne)),n=Math.max(-ne,Math.min(re-ne,n-ne)),Pe.css({top:n+"px",left:r+"px"});var a=he*se;Te.css({left:a-oe/2+"px"});var i=ce*ae;Me.css({top:i-le+"px"})}}function I(t){var e=N(),r="",n=!tinycolor.equals(e,We);e&&(r=e.toString(Ye),w(e)),Ie&&_e.val(r),t&&n&&(J.change(e),_e.trigger("change",[e]))}function z(){ee=Ce.width(),re=Ce.height(),ne=Pe.height(),ie=Ae.width(),ae=Ae.height(),le=Me.height(),se=He.width(),oe=Te.width(),X||(ke.css("position","absolute"),ke.offset(W.offset?W.offset:s(ke,Ke))),D(),W.showPalette&&x(),_e.trigger("reflow.spectrum")}function B(){_e.show(),Ke.unbind("click.spectrum touchstart.spectrum"),ke.remove(),Le.remove(),p[Ue.id]=null}function L(r,n){return r===e?t.extend({},W):n===e?W[r]:(W[r]=n,void c())}function K(){xe=!1,_e.attr("disabled",!1),Ke.removeClass("sp-disabled")}function V(){T(),xe=!0,_e.attr("disabled",!0),Ke.addClass("sp-disabled")}function $(t){W.offset=t,z()}var W=a(o,i),X=W.flat,Y=W.showSelectionPalette,G=W.localStorageKey,Q=W.theme,J=W.callbacks,U=u(z,10),Z=!1,te=!1,ee=0,re=0,ne=0,ae=0,ie=0,se=0,oe=0,le=0,ce=0,fe=0,ue=0,he=1,de=[],pe=[],ge={},be=W.selectionPalette.slice(0),ve=W.maxSelectionSize,me="sp-dragging",ye=null,we=i.ownerDocument,_e=(we.body,t(i)),xe=!1,ke=t(m,we).addClass(Q),Se=ke.find(".sp-picker-container"),Ce=ke.find(".sp-color"),Pe=ke.find(".sp-dragger"),Ae=ke.find(".sp-hue"),Me=ke.find(".sp-slider"),Re=ke.find(".sp-alpha-inner"),He=ke.find(".sp-alpha"),Te=ke.find(".sp-alpha-handle"),Fe=ke.find(".sp-input"),Oe=ke.find(".sp-palette"),Ne=ke.find(".sp-initial"),Ee=ke.find(".sp-cancel"),je=ke.find(".sp-clear"),qe=ke.find(".sp-choose"),De=ke.find(".sp-palette-toggle"),Ie=_e.is("input"),ze=Ie&&"color"===_e.attr("type")&&h(),Be=Ie&&!X,Le=Be?t(v).addClass(Q).addClass(W.className).addClass(W.replacerClassName):t([]),Ke=Be?Le:_e,Ve=Le.find(".sp-preview-inner"),$e=W.color||Ie&&_e.val(),We=!1,Xe=W.preferredFormat,Ye=Xe,Ge=!W.showButtons||W.clickoutFiresChange,Qe=!$e,Je=W.allowEmpty&&!ze;d();var Ue={show:M,hide:T,toggle:A,reflow:z,option:L,enable:K,disable:V,offset:$,set:function(t){O(t),I()},get:N,destroy:B,container:ke};return Ue.id=p.push(Ue)-1,Ue}function s(e,r){var n=0,a=e.outerWidth(),i=e.outerHeight(),s=r.outerHeight(),o=e[0].ownerDocument,l=o.documentElement,c=l.clientWidth+t(o).scrollLeft(),f=l.clientHeight+t(o).scrollTop(),u=r.offset();return u.top+=s,u.left-=Math.min(u.left,u.left+a>c&&c>a?Math.abs(u.left+a-c):0),u.top-=Math.min(u.top,u.top+i>f&&f>i?Math.abs(i+s-n):n),u}function o(){}function l(t){t.stopPropagation()}function c(t,e){var r=Array.prototype.slice,n=r.call(arguments,2);return function(){return t.apply(e,n.concat(r.call(arguments)))}}function f(e,r,n,a){function i(t){t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.returnValue=!1}function s(t){if(f){if(g&&c.documentMode<9&&!t.button)return l();var n=t.originalEvent&&t.originalEvent.touches&&t.originalEvent.touches[0],a=n&&n.pageX||t.pageX,s=n&&n.pageY||t.pageY,o=Math.max(0,Math.min(a-u.left,d)),b=Math.max(0,Math.min(s-u.top,h));p&&i(t),r.apply(e,[o,b,t])}}function o(r){var a=r.which?3==r.which:2==r.button;a||f||n.apply(e,arguments)!==!1&&(f=!0,h=t(e).height(),d=t(e).width(),u=t(e).offset(),t(c).bind(b),t(c.body).addClass("sp-dragging"),s(r),i(r))}function l(){f&&(t(c).unbind(b),t(c.body).removeClass("sp-dragging"),setTimeout(function(){a.apply(e,arguments)},0)),f=!1}r=r||function(){},n=n||function(){},a=a||function(){};var c=document,f=!1,u={},h=0,d=0,p="ontouchstart"in window,b={};b.selectstart=i,b.dragstart=i,b["touchmove mousemove"]=s,b["touchend mouseup"]=l,t(e).bind("touchstart mousedown",o)}function u(t,e,r){var n;return function(){var a=this,i=arguments,s=function(){n=null,t.apply(a,i)};r&&clearTimeout(n),(r||!n)&&(n=setTimeout(s,e))}}function h(){return t.fn.spectrum.inputTypeColorSupport()}var d={beforeShow:o,move:o,change:o,show:o,hide:o,color:!1,flat:!1,showInput:!1,allowEmpty:!1,showButtons:!0,clickoutFiresChange:!0,showInitial:!1,showPalette:!1,showPaletteOnly:!1,hideAfterPaletteSelect:!1,togglePaletteOnly:!1,showSelectionPalette:!0,localStorageKey:!1,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",togglePaletteMoreText:"more",togglePaletteLessText:"less",clearText:"Clear Color Selection",noColorSelectedText:"No Color Selected",preferredFormat:!1,className:"",containerClassName:"",replacerClassName:"",showAlpha:!1,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:!1,offset:null},p=[],g=!!/msie/i.exec(window.navigator.userAgent),b=function(){function t(t,e){return!!~(""+t).indexOf(e)}var e=document.createElement("div"),r=e.style;return r.cssText="background-color:rgba(0,0,0,.5)",t(r.backgroundColor,"rgba")||t(r.backgroundColor,"hsla")}(),v=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),m=function(){var t="";if(g)for(var e=1;6>=e;e++)t+="<div class='sp-"+e+"'></div>";return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","<div class='sp-palette-button-container sp-cf'>","<button type='button' class='sp-palette-toggle'></button>","</div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",t,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button type='button' class='sp-choose'></button>","</div>","</div>","</div>"].join("")}(),y="spectrum.id";t.fn.spectrum=function(e){if("string"==typeof e){var r=this,n=Array.prototype.slice.call(arguments,1);return this.each(function(){var a=p[t(this).data(y)];if(a){var i=a[e];if(!i)throw new Error("Spectrum: no such method: '"+e+"'");"get"==e?r=a.get():"container"==e?r=a.container:"option"==e?r=a.option.apply(a,n):"destroy"==e?(a.destroy(),t(this).removeData(y)):i.apply(a,n)}}),r}return this.spectrum("destroy").each(function(){var r=t.extend({},e,t(this).data()),n=i(this,r);t(this).data(y,n.id)})},t.fn.spectrum.load=!0,t.fn.spectrum.loadOpts={},t.fn.spectrum.draggable=f,t.fn.spectrum.defaults=d,t.fn.spectrum.inputTypeColorSupport=function w(){if("undefined"==typeof w._cachedResult){var e=t("<input type='color'/>")[0];w._cachedResult="color"===e.type&&""!==e.value}return w._cachedResult},t.spectrum={},t.spectrum.localization={},t.spectrum.palettes={},t.fn.spectrum.processNativeColorInputs=function(){var e=t("input[type=color]");e.length&&!h()&&e.spectrum({preferredFormat:"hex6"})},function(){function t(t){var r={r:0,g:0,b:0},a=1,s=!1,o=!1;return"string"==typeof t&&(t=F(t)),"object"==typeof t&&(t.hasOwnProperty("r")&&t.hasOwnProperty("g")&&t.hasOwnProperty("b")?(r=e(t.r,t.g,t.b),s=!0,o="%"===String(t.r).substr(-1)?"prgb":"rgb"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("v")?(t.s=R(t.s),t.v=R(t.v),r=i(t.h,t.s,t.v),s=!0,o="hsv"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("l")&&(t.s=R(t.s),t.l=R(t.l),r=n(t.h,t.s,t.l),s=!0,o="hsl"),t.hasOwnProperty("a")&&(a=t.a)),a=x(a),{ok:s,format:t.format||o,r:D(255,I(r.r,0)),g:D(255,I(r.g,0)),b:D(255,I(r.b,0)),a:a}}function e(t,e,r){return{r:255*k(t,255),g:255*k(e,255),b:255*k(r,255)}}function r(t,e,r){t=k(t,255),e=k(e,255),r=k(r,255);var n,a,i=I(t,e,r),s=D(t,e,r),o=(i+s)/2;if(i==s)n=a=0;else{var l=i-s;switch(a=o>.5?l/(2-i-s):l/(i+s),i){case t:n=(e-r)/l+(r>e?6:0);break;case e:n=(r-t)/l+2;break;case r:n=(t-e)/l+4}n/=6}return{h:n,s:a,l:o}}function n(t,e,r){function n(t,e,r){return 0>r&&(r+=1),r>1&&(r-=1),1/6>r?t+6*(e-t)*r:.5>r?e:2/3>r?t+(e-t)*(2/3-r)*6:t}var a,i,s;if(t=k(t,360),e=k(e,100),r=k(r,100),0===e)a=i=s=r;else{var o=.5>r?r*(1+e):r+e-r*e,l=2*r-o;a=n(l,o,t+1/3),i=n(l,o,t),s=n(l,o,t-1/3)}return{r:255*a,g:255*i,b:255*s}}function a(t,e,r){t=k(t,255),e=k(e,255),r=k(r,255);var n,a,i=I(t,e,r),s=D(t,e,r),o=i,l=i-s;if(a=0===i?0:l/i,i==s)n=0;else{switch(i){case t:n=(e-r)/l+(r>e?6:0);break;case e:n=(r-t)/l+2;break;case r:n=(t-e)/l+4}n/=6}return{h:n,s:a,v:o}}function i(t,e,r){t=6*k(t,360),e=k(e,100),r=k(r,100);var n=j.floor(t),a=t-n,i=r*(1-e),s=r*(1-a*e),o=r*(1-(1-a)*e),l=n%6,c=[r,s,i,i,o,r][l],f=[o,r,r,s,i,i][l],u=[i,i,o,r,r,s][l];return{r:255*c,g:255*f,b:255*u}}function s(t,e,r,n){var a=[M(q(t).toString(16)),M(q(e).toString(16)),M(q(r).toString(16))];return n&&a[0].charAt(0)==a[0].charAt(1)&&a[1].charAt(0)==a[1].charAt(1)&&a[2].charAt(0)==a[2].charAt(1)?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")}function o(t,e,r,n){var a=[M(H(n)),M(q(t).toString(16)),M(q(e).toString(16)),M(q(r).toString(16))];return a.join("")}function l(t,e){e=0===e?0:e||10;var r=B(t).toHsl();return r.s-=e/100,r.s=S(r.s),B(r)}function c(t,e){e=0===e?0:e||10;var r=B(t).toHsl();return r.s+=e/100,r.s=S(r.s),B(r)}function f(t){return B(t).desaturate(100)}function u(t,e){e=0===e?0:e||10;var r=B(t).toHsl();return r.l+=e/100,r.l=S(r.l),B(r)}function h(t,e){e=0===e?0:e||10;var r=B(t).toRgb();return r.r=I(0,D(255,r.r-q(255*-(e/100)))),r.g=I(0,D(255,r.g-q(255*-(e/100)))),r.b=I(0,D(255,r.b-q(255*-(e/100)))),B(r)}function d(t,e){e=0===e?0:e||10;var r=B(t).toHsl();return r.l-=e/100,r.l=S(r.l),B(r)}function p(t,e){var r=B(t).toHsl(),n=(q(r.h)+e)%360;return r.h=0>n?360+n:n,B(r)}function g(t){var e=B(t).toHsl();return e.h=(e.h+180)%360,B(e)}function b(t){var e=B(t).toHsl(),r=e.h;return[B(t),B({h:(r+120)%360,s:e.s,l:e.l}),B({h:(r+240)%360,s:e.s,l:e.l})]}function v(t){var e=B(t).toHsl(),r=e.h;return[B(t),B({h:(r+90)%360,s:e.s,l:e.l}),B({h:(r+180)%360,s:e.s,l:e.l}),B({h:(r+270)%360,s:e.s,l:e.l})]}function m(t){var e=B(t).toHsl(),r=e.h;return[B(t),B({h:(r+72)%360,s:e.s,l:e.l}),B({h:(r+216)%360,s:e.s,l:e.l})]}function y(t,e,r){e=e||6,r=r||30;var n=B(t).toHsl(),a=360/r,i=[B(t)];for(n.h=(n.h-(a*e>>1)+720)%360;--e;)n.h=(n.h+a)%360,i.push(B(n));return i}function w(t,e){e=e||6;for(var r=B(t).toHsv(),n=r.h,a=r.s,i=r.v,s=[],o=1/e;e--;)s.push(B({h:n,s:a,v:i})),i=(i+o)%1;return s}function _(t){var e={};for(var r in t)t.hasOwnProperty(r)&&(e[t[r]]=r);return e}function x(t){return t=parseFloat(t),(isNaN(t)||0>t||t>1)&&(t=1),t}function k(t,e){P(t)&&(t="100%");var r=A(t);return t=D(e,I(0,parseFloat(t))),r&&(t=parseInt(t*e,10)/100),j.abs(t-e)<1e-6?1:t%e/parseFloat(e)}function S(t){return D(1,I(0,t))}function C(t){return parseInt(t,16)}function P(t){return"string"==typeof t&&-1!=t.indexOf(".")&&1===parseFloat(t)}function A(t){return"string"==typeof t&&-1!=t.indexOf("%")}function M(t){return 1==t.length?"0"+t:""+t}function R(t){return 1>=t&&(t=100*t+"%"),t}function H(t){return Math.round(255*parseFloat(t)).toString(16)}function T(t){return C(t)/255}function F(t){t=t.replace(O,"").replace(N,"").toLowerCase();var e=!1;if(L[t])t=L[t],e=!0;else if("transparent"==t)return{r:0,g:0,b:0,a:0,format:"name"};var r;return(r=V.rgb.exec(t))?{r:r[1],g:r[2],b:r[3]}:(r=V.rgba.exec(t))?{r:r[1],g:r[2],b:r[3],a:r[4]}:(r=V.hsl.exec(t))?{h:r[1],s:r[2],l:r[3]}:(r=V.hsla.exec(t))?{h:r[1],s:r[2],l:r[3],a:r[4]}:(r=V.hsv.exec(t))?{h:r[1],s:r[2],v:r[3]}:(r=V.hsva.exec(t))?{h:r[1],s:r[2],v:r[3],a:r[4]}:(r=V.hex8.exec(t))?{a:T(r[1]),r:C(r[2]),g:C(r[3]),b:C(r[4]),format:e?"name":"hex8"}:(r=V.hex6.exec(t))?{r:C(r[1]),g:C(r[2]),b:C(r[3]),format:e?"name":"hex"}:(r=V.hex3.exec(t))?{r:C(r[1]+""+r[1]),g:C(r[2]+""+r[2]),b:C(r[3]+""+r[3]),format:e?"name":"hex"}:!1}var O=/^[\s,#]+/,N=/\s+$/,E=0,j=Math,q=j.round,D=j.min,I=j.max,z=j.random,B=function(e,r){if(e=e?e:"",r=r||{},e instanceof B)return e;if(!(this instanceof B))return new B(e,r);var n=t(e);this._originalInput=e,this._r=n.r,this._g=n.g,this._b=n.b,this._a=n.a,this._roundA=q(100*this._a)/100,this._format=r.format||n.format,this._gradientType=r.gradientType,this._r<1&&(this._r=q(this._r)),this._g<1&&(this._g=q(this._g)),this._b<1&&(this._b=q(this._b)),this._ok=n.ok,this._tc_id=E++};B.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},setAlpha:function(t){return this._a=x(t),this._roundA=q(100*this._a)/100,this},toHsv:function(){var t=a(this._r,this._g,this._b);return{h:360*t.h,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=a(this._r,this._g,this._b),e=q(360*t.h),r=q(100*t.s),n=q(100*t.v);return 1==this._a?"hsv("+e+", "+r+"%, "+n+"%)":"hsva("+e+", "+r+"%, "+n+"%, "+this._roundA+")"},toHsl:function(){var t=r(this._r,this._g,this._b);return{h:360*t.h,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=r(this._r,this._g,this._b),e=q(360*t.h),n=q(100*t.s),a=q(100*t.l);return 1==this._a?"hsl("+e+", "+n+"%, "+a+"%)":"hsla("+e+", "+n+"%, "+a+"%, "+this._roundA+")"},toHex:function(t){return s(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(){return o(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:q(this._r),g:q(this._g),b:q(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+q(this._r)+", "+q(this._g)+", "+q(this._b)+")":"rgba("+q(this._r)+", "+q(this._g)+", "+q(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:q(100*k(this._r,255))+"%",g:q(100*k(this._g,255))+"%",b:q(100*k(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+q(100*k(this._r,255))+"%, "+q(100*k(this._g,255))+"%, "+q(100*k(this._b,255))+"%)":"rgba("+q(100*k(this._r,255))+"%, "+q(100*k(this._g,255))+"%, "+q(100*k(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:K[s(this._r,this._g,this._b,!0)]||!1},toFilter:function(t){var e="#"+o(this._r,this._g,this._b,this._a),r=e,n=this._gradientType?"GradientType = 1, ":"";if(t){var a=B(t);r=a.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+n+"startColorstr="+e+",endColorstr="+r+")"},toString:function(t){var e=!!t;t=t||this._format;var r=!1,n=this._a<1&&this._a>=0,a=!e&&n&&("hex"===t||"hex6"===t||"hex3"===t||"name"===t);return a?"name"===t&&0===this._a?this.toName():this.toRgbString():("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),("hex"===t||"hex6"===t)&&(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString())},_applyModification:function(t,e){var r=t.apply(null,[this].concat([].slice.call(e)));return this._r=r._r,this._g=r._g,this._b=r._b,this.setAlpha(r._a),this},lighten:function(){return this._applyModification(u,arguments)},brighten:function(){return this._applyModification(h,arguments)},darken:function(){return this._applyModification(d,arguments)},desaturate:function(){return this._applyModification(l,arguments)},saturate:function(){return this._applyModification(c,arguments)},greyscale:function(){return this._applyModification(f,arguments)},spin:function(){return this._applyModification(p,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(y,arguments)},complement:function(){return this._applyCombination(g,arguments)},monochromatic:function(){return this._applyCombination(w,arguments)},splitcomplement:function(){return this._applyCombination(m,arguments)},triad:function(){return this._applyCombination(b,arguments)},tetrad:function(){return this._applyCombination(v,arguments)}},B.fromRatio=function(t,e){if("object"==typeof t){var r={};for(var n in t)t.hasOwnProperty(n)&&(r[n]="a"===n?t[n]:R(t[n]));t=r}return B(t,e)},B.equals=function(t,e){return t&&e?B(t).toRgbString()==B(e).toRgbString():!1},B.random=function(){return B.fromRatio({r:z(),g:z(),b:z()})},B.mix=function(t,e,r){r=0===r?0:r||50;var n,a=B(t).toRgb(),i=B(e).toRgb(),s=r/100,o=2*s-1,l=i.a-a.a;n=o*l==-1?o:(o+l)/(1+o*l),n=(n+1)/2;var c=1-n,f={r:i.r*n+a.r*c,g:i.g*n+a.g*c,b:i.b*n+a.b*c,a:i.a*s+a.a*(1-s)};return B(f)},B.readability=function(t,e){var r=B(t),n=B(e),a=r.toRgb(),i=n.toRgb(),s=r.getBrightness(),o=n.getBrightness(),l=Math.max(a.r,i.r)-Math.min(a.r,i.r)+Math.max(a.g,i.g)-Math.min(a.g,i.g)+Math.max(a.b,i.b)-Math.min(a.b,i.b);return{brightness:Math.abs(s-o),color:l}},B.isReadable=function(t,e){var r=B.readability(t,e);return r.brightness>125&&r.color>500},B.mostReadable=function(t,e){for(var r=null,n=0,a=!1,i=0;i<e.length;i++){var s=B.readability(t,e[i]),o=s.brightness>125&&s.color>500,l=3*(s.brightness/125)+s.color/500;(o&&!a||o&&a&&l>n||!o&&!a&&l>n)&&(a=o,n=l,r=B(e[i]))}return r};var L=B.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},K=B.hexNames=_(L),V=function(){var t="[-\\+]?\\d+%?",e="[-\\+]?\\d*\\.\\d+%?",r="(?:"+e+")|(?:"+t+")",n="[\\s|\\(]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")\\s*\\)?",a="[\\s|\\(]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")\\s*\\)?";return{rgb:new RegExp("rgb"+n),rgba:new RegExp("rgba"+a),hsl:new RegExp("hsl"+n),hsla:new RegExp("hsla"+a),hsv:new RegExp("hsv"+n),hsva:new RegExp("hsva"+a),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();window.tinycolor=B}(),t(function(){t.fn.spectrum.load&&t.fn.spectrum.processNativeColorInputs()})});


/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 JΓ¶rn Zaefferer; Licensed MIT */

/*!
 * Renamed methods for compatibility
 */
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( ["jquery"], factory );
    } else {
        factory( jQuery );
    }
}(function( $ ) {

$.extend($.fn, {
    // http://jqueryvalidation.org/validate/
    tc_validate: function( options ) {

        // if nothing is selected, return nothing; can't chain anyway
        if ( !this.length ) {
            if ( options && options.debug && window.console ) {
                console.warn( "Nothing selected, can't validate, returning nothing." );
            }
            return;
        }

        // check if a validator for this form was already created
        var tc_validator = $.data( this[ 0 ], "tc_validator" );
        if ( tc_validator ) {
            return tc_validator;
        }

        // Add novalidate tag if HTML5.
        this.attr( "novalidate", "novalidate" );

        tc_validator = new $.tc_validator( options, this[ 0 ] );
        $.data( this[ 0 ], "tc_validator", tc_validator );

        if ( tc_validator.settings.onsubmit ) {

            this.on( "click.tc_validate", ":submit", function( event ) {
                if ( tc_validator.settings.submitHandler ) {
                    tc_validator.submitButton = event.target;
                }

                // allow suppressing validation by adding a cancel class to the submit button
                if ( $( this ).hasClass( "cancel" ) ) {
                    tc_validator.cancelSubmit = true;
                }

                // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
                    tc_validator.cancelSubmit = true;
                }
            });

            // validate the form on submit
            this.on( "submit.tc_validate", function( event ) {
                if ( tc_validator.settings.debug ) {
                    // prevent form submit to be able to see console output
                    event.preventDefault();
                }
                function handle() {
                    var hidden, result;
                    if ( tc_validator.settings.submitHandler ) {
                        if ( tc_validator.submitButton ) {
                            // insert a hidden input as a replacement for the missing submit button
                            hidden = $( "<input type='hidden'/>" )
                                .attr( "name", tc_validator.submitButton.name )
                                .val( $( tc_validator.submitButton ).val() )
                                .appendTo( tc_validator.currentForm );
                        }
                        result = tc_validator.settings.submitHandler.call( tc_validator, tc_validator.currentForm, event );
                        if ( tc_validator.submitButton ) {
                            // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                            hidden.remove();
                        }
                        if ( result !== undefined ) {
                            return result;
                        }
                        return false;
                    }
                    return true;
                }

                // prevent submit for invalid forms or custom submit handlers
                if ( tc_validator.cancelSubmit ) {
                    tc_validator.cancelSubmit = false;
                    return handle();
                }
                if ( tc_validator.form() ) {
                    if ( tc_validator.pendingRequest ) {
                        tc_validator.formSubmitted = true;
                        return false;
                    }
                    return handle();
                } else {
                    tc_validator.focusInvalid();
                    return false;
                }
            });
        }

        return tc_validator;
    },
    // http://jqueryvalidation.org/valid/
    tc_valid: function() {
        var valid, tc_validator, errorList;

        if ( $( this[ 0 ] ).is( "form" ) ) {
            valid = this.tc_validate().form();
        } else {
            errorList = [];
            valid = true;
            tc_validator = $( this[ 0 ].form ).tc_validate();
            this.each( function() {
                valid = tc_validator.element( this ) && valid;
                errorList = errorList.concat( tc_validator.errorList );
            });
            tc_validator.errorList = errorList;
        }
        return valid;
    },

    // http://jqueryvalidation.org/rules/
    tc_rules: function( command, argument ) {
        var element = this[ 0 ],
            settings, staticRules, existingRules, data, param, filtered;

        if ( command ) {
            settings = $.data( element.form, "tc_validator" ).settings;
            staticRules = settings.rules;
            existingRules = $.tc_validator.staticRules( element );
            switch ( command ) {
            case "add":
                $.extend( existingRules, $.tc_validator.normalizeRule( argument ) );
                // remove messages from rules, but allow them to be set separately
                delete existingRules.messages;
                staticRules[ element.name ] = existingRules;
                if ( argument.messages ) {
                    settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
                }
                break;
            case "remove":
                if ( !argument ) {
                    delete staticRules[ element.name ];
                    return existingRules;
                }
                filtered = {};
                $.each( argument.split( /\s/ ), function( index, method ) {
                    filtered[ method ] = existingRules[ method ];
                    delete existingRules[ method ];
                    if ( method === "required" ) {
                        $( element ).removeAttr( "aria-required" );
                    }
                });
                return filtered;
            }
        }

        data = $.tc_validator.normalizeRules(
        $.extend(
            {},
            $.tc_validator.classRules( element ),
            $.tc_validator.attributeRules( element ),
            $.tc_validator.dataRules( element ),
            $.tc_validator.staticRules( element )
        ), element );

        // make sure required is at front
        if ( data.required ) {
            param = data.required;
            delete data.required;
            data = $.extend( { required: param }, data );
            $( element ).attr( "aria-required", "true" );
        }

        // make sure remote is at back
        if ( data.remote ) {
            param = data.remote;
            delete data.remote;
            data = $.extend( data, { remote: param });
        }

        return data;
    }
});

// Custom selectors
$.extend( $.expr[ ":" ], {
    // http://jqueryvalidation.org/blank-selector/
    blank: function( a ) {
        return !$.trim( "" + $( a ).val() );
    },
    // http://jqueryvalidation.org/filled-selector/
    filled: function( a ) {
        return !!$.trim( "" + $( a ).val() );
    },
    // http://jqueryvalidation.org/unchecked-selector/
    unchecked: function( a ) {
        return !$( a ).prop( "checked" );
    }
});

// constructor for validator
$.tc_validator = function( options, form ) {
    this.settings = $.extend( true, {}, $.tc_validator.defaults, options );
    this.currentForm = form;
    this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.tc_validator.format = function( source, params ) {
    if ( arguments.length === 1 ) {
        return function() {
            var args = $.makeArray( arguments );
            args.unshift( source );
            return $.tc_validator.format.apply( this, args );
        };
    }
    if ( arguments.length > 2 && params.constructor !== Array  ) {
        params = $.makeArray( arguments ).slice( 1 );
    }
    if ( params.constructor !== Array ) {
        params = [ params ];
    }
    $.each( params, function( i, n ) {
        source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
            return n;
        });
    });
    return source;
};

$.extend( $.tc_validator, {

    defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusCleanup: false,
        focusInvalid: true,
        errorContainer: $( [] ),
        errorLabelContainer: $( [] ),
        onsubmit: true,
        ignore: ":hidden",
        ignoreTitle: false,
        onfocusin: function( element ) {
            this.lastActive = element;

            // Hide error label and remove error class on focus if enabled
            if ( this.settings.focusCleanup ) {
                if ( this.settings.unhighlight ) {
                    this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                }
                this.hideThese( this.errorsFor( element ) );
            }
        },
        onfocusout: function( element ) {
            if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
                this.element( element );
            }
        },
        onkeyup: function( element, event ) {
            // Avoid revalidate the field when pressing one of the following keys
            // Shift       => 16
            // Ctrl        => 17
            // Alt         => 18
            // Caps lock   => 20
            // End         => 35
            // Home        => 36
            // Left arrow  => 37
            // Up arrow    => 38
            // Right arrow => 39
            // Down arrow  => 40
            // Insert      => 45
            // Num lock    => 144
            // AltGr key   => 225
            var excludedKeys = [
                16, 17, 18, 20, 35, 36, 37,
                38, 39, 40, 45, 144, 225
            ];

            if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
                return;
            } else if ( element.name in this.submitted || element === this.lastElement ) {
                this.element( element );
            }
        },
        onclick: function( element ) {
            // click on selects, radiobuttons and checkboxes
            if ( element.name in this.submitted ) {
                this.element( element );

            // or option elements, check parent select in that case
            } else if ( element.parentNode.name in this.submitted ) {
                this.element( element.parentNode );
            }
        },
        highlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
            } else {
                $( element ).addClass( errorClass ).removeClass( validClass );
            }
        },
        unhighlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
            } else {
                $( element ).removeClass( errorClass ).addClass( validClass );
            }
        }
    },

    // http://jqueryvalidation.org/jQuery.validator.setDefaults/
    setDefaults: function( settings ) {
        $.extend( $.tc_validator.defaults, settings );
    },

    messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date ( ISO ).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: $.tc_validator.format( "Please enter no more than {0} characters." ),
        minlength: $.tc_validator.format( "Please enter at least {0} characters." ),
        rangelength: $.tc_validator.format( "Please enter a value between {0} and {1} characters long." ),
        range: $.tc_validator.format( "Please enter a value between {0} and {1}." ),
        max: $.tc_validator.format( "Please enter a value less than or equal to {0}." ),
        min: $.tc_validator.format( "Please enter a value greater than or equal to {0}." )
    },

    autoCreateRanges: false,

    prototype: {

        init: function() {
            this.labelContainer = $( this.settings.errorLabelContainer );
            this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
            this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
            this.submitted = {};
            this.valueCache = {};
            this.pendingRequest = 0;
            this.pending = {};
            this.invalid = {};
            this.reset();

            var groups = ( this.groups = {} ),
                rules;
            $.each( this.settings.groups, function( key, value ) {
                if ( typeof value === "string" ) {
                    value = value.split( /\s/ );
                }
                $.each( value, function( index, name ) {
                    groups[ name ] = key;
                });
            });
            rules = this.settings.rules;
            $.each( rules, function( key, value ) {
                rules[ key ] = $.tc_validator.normalizeRule( value );
            });

            function delegate( event ) {
                var tc_validator = $.data( this.form, "tc_validator" ),
                    eventType = "on" + event.type.replace( /^tc_validate/, "" ),
                    settings = tc_validator.settings;
                if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
                    settings[ eventType ].call( tc_validator, this, event );
                }
            }

            $( this.currentForm )
                .on( "focusin.tc_validate focusout.tc_validate keyup.tc_validate",
                    ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                    "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                    "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                    "[type='radio'], [type='checkbox']", delegate)
                // Support: Chrome, oldIE
                // "select" is provided as event.target when clicking a option
                .on("click.tc_validate", "select, option, [type='radio'], [type='checkbox']", delegate);

            if ( this.settings.invalidHandler ) {
                $( this.currentForm ).on( "invalid-form.tc_validate", this.settings.invalidHandler );
            }

            // Add aria-required to any Static/Data/Class required fields before first validation
            // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
            $( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
        },

        // http://jqueryvalidation.org/Validator.form/
        form: function() {
            this.checkForm();
            $.extend( this.submitted, this.errorMap );
            this.invalid = $.extend({}, this.errorMap );
            if ( !this.valid() ) {
                $( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
            }
            this.showErrors();
            return this.valid();
        },

        checkForm: function() {
            this.prepareForm();
            for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
                this.check( elements[ i ] );
            }
            return this.valid();
        },

        // http://jqueryvalidation.org/Validator.element/
        element: function( element ) {
            var cleanElement = this.clean( element ),
                checkElement = this.validationTargetFor( cleanElement ),
                result = true;

            this.lastElement = checkElement;

            if ( checkElement === undefined ) {
                delete this.invalid[ cleanElement.name ];
            } else {
                this.prepareElement( checkElement );
                this.currentElements = $( checkElement );

                result = this.check( checkElement ) !== false;
                if ( result ) {
                    delete this.invalid[ checkElement.name ];
                } else {
                    this.invalid[ checkElement.name ] = true;
                }
            }
            // Add aria-invalid status for screen readers
            $( element ).attr( "aria-invalid", !result );

            if ( !this.numberOfInvalids() ) {
                // Hide error containers on last error
                this.toHide = this.toHide.add( this.containers );
            }
            this.showErrors();
            return result;
        },

        // http://jqueryvalidation.org/Validator.showErrors/
        showErrors: function( errors ) {
            if ( errors ) {
                // add items to error list and map
                $.extend( this.errorMap, errors );
                this.errorList = [];
                for ( var name in errors ) {
                    this.errorList.push({
                        message: errors[ name ],
                        element: this.findByName( name )[ 0 ]
                    });
                }
                // remove items from success list
                this.successList = $.grep( this.successList, function( element ) {
                    return !( element.name in errors );
                });
            }
            if ( this.settings.showErrors ) {
                this.settings.showErrors.call( this, this.errorMap, this.errorList );
            } else {
                this.defaultShowErrors();
            }
        },

        // http://jqueryvalidation.org/Validator.resetForm/
        resetForm: function() {
            if ( $.fn.resetForm ) {
                $( this.currentForm ).resetForm();
            }
            this.submitted = {};
            this.lastElement = null;
            this.prepareForm();
            this.hideErrors();
            var i, elements = this.elements()
                .removeData( "previousValue" )
                .removeAttr( "aria-invalid" );

            if ( this.settings.unhighlight ) {
                for ( i = 0; elements[ i ]; i++ ) {
                    this.settings.unhighlight.call( this, elements[ i ],
                        this.settings.errorClass, "" );
                }
            } else {
                elements.removeClass( this.settings.errorClass );
            }
        },

        numberOfInvalids: function() {
            return this.objectLength( this.invalid );
        },

        objectLength: function( obj ) {
            /* jshint unused: false */
            var count = 0,
                i;
            for ( i in obj ) {
                count++;
            }
            return count;
        },

        hideErrors: function() {
            this.hideThese( this.toHide );
        },

        hideThese: function( errors ) {
            errors.not( this.containers ).text( "" );
            this.addWrapper( errors ).hide();
        },

        valid: function() {
            return this.size() === 0;
        },

        size: function() {
            return this.errorList.length;
        },

        focusInvalid: function() {
            if ( this.settings.focusInvalid ) {
                try {
                    $( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
                    .filter( ":visible" )
                    .focus()
                    // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                    .trigger( "focusin" );
                } catch ( e ) {
                    // ignore IE throwing errors when focusing hidden elements
                }
            }
        },

        findLastActive: function() {
            var lastActive = this.lastActive;
            return lastActive && $.grep( this.errorList, function( n ) {
                return n.element.name === lastActive.name;
            }).length === 1 && lastActive;
        },

        elements: function() {
            var tc_validator = this,
                rulesCache = {};

            // select all valid inputs inside the form (no submit or reset buttons)
            return $( this.currentForm )
            .find( "input, select, textarea" )
            .not( ":submit, :reset, :image, :disabled" )
            .not( this.settings.ignore )
            .filter( function() {
                if ( !this.name && tc_validator.settings.debug && window.console ) {
                    console.error( "%o has no name assigned", this );
                }

                // select only the first element for each name, and only those with rules specified
                if ( this.name in rulesCache || !tc_validator.objectLength( $( this ).tc_rules() ) ) {
                    return false;
                }

                rulesCache[ this.name ] = true;
                return true;
            });
        },

        clean: function( selector ) {
            return $( selector )[ 0 ];
        },

        errors: function() {
            var errorClass = this.settings.errorClass.split( " " ).join( "." );
            return $( this.settings.errorElement + "." + errorClass, this.errorContext );
        },

        reset: function() {
            this.successList = [];
            this.errorList = [];
            this.errorMap = {};
            this.toShow = $( [] );
            this.toHide = $( [] );
            this.currentElements = $( [] );
        },

        prepareForm: function() {
            this.reset();
            this.toHide = this.errors().add( this.containers );
        },

        prepareElement: function( element ) {
            this.reset();
            this.toHide = this.errorsFor( element );
        },

        elementValue: function( element ) {
            var val,
                $element = $( element ),
                type = element.type;

            if ( type === "radio" || type === "checkbox" ) {
                return this.findByName( element.name ).filter(":checked").val();
            } else if ( type === "number" && typeof element.validity !== "undefined" ) {
                return element.validity.badInput ? false : $element.val();
            }

            val = $element.val();
            if ( typeof val === "string" ) {
                return val.replace(/\r/g, "" );
            }
            return val;
        },

        check: function( element ) {
            element = this.validationTargetFor( this.clean( element ) );

            var rules = $( element ).tc_rules(),
                rulesCount = $.map( rules, function( n, i ) {
                    return i;
                }).length,
                dependencyMismatch = false,
                val = this.elementValue( element ),
                result, method, rule;

            for ( method in rules ) {
                rule = { method: method, parameters: rules[ method ] };
                try {

                    result = $.tc_validator.methods[ method ].call( this, val, element, rule.parameters );

                    // if a method indicates that the field is optional and therefore valid,
                    // don't mark it as valid when there are no other rules
                    if ( result === "dependency-mismatch" && rulesCount === 1 ) {
                        dependencyMismatch = true;
                        continue;
                    }
                    dependencyMismatch = false;

                    if ( result === "pending" ) {
                        this.toHide = this.toHide.not( this.errorsFor( element ) );
                        return;
                    }

                    if ( !result ) {
                        this.formatAndAdd( element, rule );
                        return false;
                    }
                } catch ( e ) {
                    if ( this.settings.debug && window.console ) {
                        console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                    }
                    if ( e instanceof TypeError ) {
                        e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                    }

                    throw e;
                }
            }
            if ( dependencyMismatch ) {
                return;
            }
            if ( this.objectLength( rules ) ) {
                this.successList.push( element );
            }
            return true;
        },

        // return the custom message for the given element and validation method
        // specified in the element's HTML5 data attribute
        // return the generic message if present and no method specific message is present
        customDataMessage: function( element, method ) {
            return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
                method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
        },

        // return the custom message for the given element name and validation method
        customMessage: function( name, method ) {
            var m = this.settings.messages[ name ];
            return m && ( m.constructor === String ? m : m[ method ]);
        },

        // return the first defined argument, allowing empty strings
        findDefined: function() {
            for ( var i = 0; i < arguments.length; i++) {
                if ( arguments[ i ] !== undefined ) {
                    return arguments[ i ];
                }
            }
            return undefined;
        },

        defaultMessage: function( element, method ) {
            return this.findDefined(
                this.customMessage( element.name, method ),
                this.customDataMessage( element, method ),
                // title is never undefined, so handle empty string as undefined
                !this.settings.ignoreTitle && element.title || undefined,
                $.tc_validator.messages[ method ],
                "<strong>Warning: No message defined for " + element.name + "</strong>"
            );
        },

        formatAndAdd: function( element, rule ) {
            var message = this.defaultMessage( element, rule.method ),
                theregex = /\$?\{(\d+)\}/g;
            if ( typeof message === "function" ) {
                message = message.call( this, rule.parameters, element );
            } else if ( theregex.test( message ) ) {
                message = $.tc_validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
            }
            this.errorList.push({
                message: message,
                element: element,
                method: rule.method
            });

            this.errorMap[ element.name ] = message;
            this.submitted[ element.name ] = message;
        },

        addWrapper: function( toToggle ) {
            if ( this.settings.wrapper ) {
                toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
            }
            return toToggle;
        },

        defaultShowErrors: function() {
            var i, elements, error;
            for ( i = 0; this.errorList[ i ]; i++ ) {
                error = this.errorList[ i ];
                if ( this.settings.highlight ) {
                    this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                }
                this.showLabel( error.element, error.message );
            }
            if ( this.errorList.length ) {
                this.toShow = this.toShow.add( this.containers );
            }
            if ( this.settings.success ) {
                for ( i = 0; this.successList[ i ]; i++ ) {
                    this.showLabel( this.successList[ i ] );
                }
            }
            if ( this.settings.unhighlight ) {
                for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
                    this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
                }
            }
            this.toHide = this.toHide.not( this.toShow );
            this.hideErrors();
            this.addWrapper( this.toShow ).show();
        },

        validElements: function() {
            return this.currentElements.not( this.invalidElements() );
        },

        invalidElements: function() {
            return $( this.errorList ).map(function() {
                return this.element;
            });
        },

        showLabel: function( element, message ) {
            var place, group, errorID,
                error = this.errorsFor( element ),
                elementID = this.idOrName( element ),
                describedBy = $( element ).attr( "aria-describedby" );
            if ( error.length ) {
                // refresh error/success class
                error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
                // replace message on existing label
                error.html( message );
            } else {
                // create error element
                error = $( "<" + this.settings.errorElement + ">" )
                    .attr( "id", elementID + "-error" )
                    .addClass( this.settings.errorClass )
                    .html( message || "" );

                // Maintain reference to the element to be placed into the DOM
                place = error;
                if ( this.settings.wrapper ) {
                    // make sure the element is visible, even in IE
                    // actually showing the wrapped element is handled elsewhere
                    place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
                }
                if ( this.labelContainer.length ) {
                    this.labelContainer.append( place );
                } else if ( this.settings.errorPlacement ) {
                    this.settings.errorPlacement( place, $( element ) );
                } else {
                    place.insertAfter( element );
                }

                // Link error back to the element
                if ( error.is( "label" ) ) {
                    // If the error is a label, then associate using 'for'
                    error.attr( "for", elementID );
                } else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
                    // If the element is not a child of an associated label, then it's necessary
                    // to explicitly apply aria-describedby

                    errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
                    // Respect existing non-error aria-describedby
                    if ( !describedBy ) {
                        describedBy = errorID;
                    } else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
                        // Add to end of list if not already present
                        describedBy += " " + errorID;
                    }
                    $( element ).attr( "aria-describedby", describedBy );

                    // If this element is grouped, then assign to all elements in the same group
                    group = this.groups[ element.name ];
                    if ( group ) {
                        $.each( this.groups, function( name, testgroup ) {
                            if ( testgroup === group ) {
                                $( "[name='" + name + "']", this.currentForm )
                                    .attr( "aria-describedby", error.attr( "id" ) );
                            }
                        });
                    }
                }
            }
            if ( !message && this.settings.success ) {
                error.text( "" );
                if ( typeof this.settings.success === "string" ) {
                    error.addClass( this.settings.success );
                } else {
                    this.settings.success( error, element );
                }
            }
            this.toShow = this.toShow.add( error );
        },

        errorsFor: function( element ) {
            var name = this.idOrName( element ),
                describer = $( element ).attr( "aria-describedby" ),
                selector = "label[for='" + name + "'], label[for='" + name + "'] *";

            // aria-describedby should directly reference the error element
            if ( describer ) {
                selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
            }
            return this
                .errors()
                .filter( selector );
        },

        idOrName: function( element ) {
            return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
        },

        validationTargetFor: function( element ) {

            // If radio/checkbox, validate first element in group instead
            if ( this.checkable( element ) ) {
                element = this.findByName( element.name );
            }

            // Always apply ignore filter
            return $( element ).not( this.settings.ignore )[ 0 ];
        },

        checkable: function( element ) {
            return ( /radio|checkbox/i ).test( element.type );
        },

        findByName: function( name ) {
            return $( this.currentForm ).find( "[name='" + name + "']" );
        },

        getLength: function( value, element ) {
            switch ( element.nodeName.toLowerCase() ) {
            case "select":
                return $( "option:selected", element ).length;
            case "input":
                if ( this.checkable( element ) ) {
                    return this.findByName( element.name ).filter( ":checked" ).length;
                }
            }
            return value.length;
        },

        depend: function( param, element ) {
            return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
        },

        dependTypes: {
            "boolean": function( param ) {
                return param;
            },
            "string": function( param, element ) {
                return !!$( param, element.form ).length;
            },
            "function": function( param, element ) {
                return param( element );
            }
        },

        optional: function( element ) {
            var val = this.elementValue( element );
            return !$.tc_validator.methods.required.call( this, val, element ) && "dependency-mismatch";
        },

        startRequest: function( element ) {
            if ( !this.pending[ element.name ] ) {
                this.pendingRequest++;
                this.pending[ element.name ] = true;
            }
        },

        stopRequest: function( element, valid ) {
            this.pendingRequest--;
            // sometimes synchronization fails, make sure pendingRequest is never < 0
            if ( this.pendingRequest < 0 ) {
                this.pendingRequest = 0;
            }
            delete this.pending[ element.name ];
            if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
                $( this.currentForm ).submit();
                this.formSubmitted = false;
            } else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
                $( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
                this.formSubmitted = false;
            }
        },

        previousValue: function( element ) {
            return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
                old: null,
                valid: true,
                message: this.defaultMessage( element, "remote" )
            });
        },

        // cleans up all forms and elements, removes validator-specific events
        destroy: function() {
            this.resetForm();

            $( this.currentForm )
                .off( ".tc_validate" )
                .removeData( "tc_validator" );
        }

    },

    classRuleSettings: {
        required: { required: true },
        email: { email: true },
        url: { url: true },
        date: { date: true },
        dateISO: { dateISO: true },
        number: { number: true },
        digits: { digits: true },
        creditcard: { creditcard: true }
    },

    addClassRules: function( className, rules ) {
        if ( className.constructor === String ) {
            this.classRuleSettings[ className ] = rules;
        } else {
            $.extend( this.classRuleSettings, className );
        }
    },

    classRules: function( element ) {
        var rules = {},
            classes = $( element ).attr( "class" );

        if ( classes ) {
            $.each( classes.split( " " ), function() {
                if ( this in $.tc_validator.classRuleSettings ) {
                    $.extend( rules, $.tc_validator.classRuleSettings[ this ]);
                }
            });
        }
        return rules;
    },

    normalizeAttributeRule: function( rules, type, method, value ) {

        // convert the value to a number for number inputs, and for text for backwards compability
        // allows type="date" and others to be compared as strings
        if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
            value = Number( value );

            // Support Opera Mini, which returns NaN for undefined minlength
            if ( isNaN( value ) ) {
                value = undefined;
            }
        }

        if ( value || value === 0 ) {
            rules[ method ] = value;
        } else if ( type === method && type !== "range" ) {

            // exception: the jquery validate 'range' method
            // does not test for the html5 'range' type
            rules[ method ] = true;
        }
    },

    attributeRules: function( element ) {
        var rules = {},
            $element = $( element ),
            type = element.getAttribute( "type" ),
            method, value;

        for ( method in $.tc_validator.methods ) {

            // support for <input required> in both html5 and older browsers
            if ( method === "required" ) {
                value = element.getAttribute( method );

                // Some browsers return an empty string for the required attribute
                // and non-HTML5 browsers might have required="" markup
                if ( value === "" ) {
                    value = true;
                }

                // force non-HTML5 browsers to return bool
                value = !!value;
            } else {
                value = $element.attr( method );
            }

            this.normalizeAttributeRule( rules, type, method, value );
        }

        // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
        if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
            delete rules.maxlength;
        }

        return rules;
    },

    dataRules: function( element ) {
        var rules = {},
            $element = $( element ),
            type = element.getAttribute( "type" ),
            method, value;

        for ( method in $.tc_validator.methods ) {
            value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
            this.normalizeAttributeRule( rules, type, method, value );
        }
        return rules;
    },

    staticRules: function( element ) {
        var rules = {},
            tc_validator = $.data( element.form, "tc_validator" );

        if ( tc_validator.settings.rules ) {
            rules = $.tc_validator.normalizeRule( tc_validator.settings.rules[ element.name ] ) || {};
        }
        return rules;
    },

    normalizeRules: function( rules, element ) {
        // handle dependency check
        $.each( rules, function( prop, val ) {
            // ignore rule when param is explicitly false, eg. required:false
            if ( val === false ) {
                delete rules[ prop ];
                return;
            }
            if ( val.param || val.depends ) {
                var keepRule = true;
                switch ( typeof val.depends ) {
                case "string":
                    keepRule = !!$( val.depends, element.form ).length;
                    break;
                case "function":
                    keepRule = val.depends.call( element, element );
                    break;
                }
                if ( keepRule ) {
                    rules[ prop ] = val.param !== undefined ? val.param : true;
                } else {
                    delete rules[ prop ];
                }
            }
        });

        // evaluate parameters
        $.each( rules, function( rule, parameter ) {
            rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
        });

        // clean number parameters
        $.each([ "minlength", "maxlength" ], function() {
            if ( rules[ this ] ) {
                rules[ this ] = Number( rules[ this ] );
            }
        });
        $.each([ "rangelength", "range" ], function() {
            var parts;
            if ( rules[ this ] ) {
                if ( $.isArray( rules[ this ] ) ) {
                    rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
                } else if ( typeof rules[ this ] === "string" ) {
                    parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
                    rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
                }
            }
        });

        if ( $.tc_validator.autoCreateRanges ) {
            // auto-create ranges
            if ( rules.min != null && rules.max != null ) {
                rules.range = [ rules.min, rules.max ];
                delete rules.min;
                delete rules.max;
            }
            if ( rules.minlength != null && rules.maxlength != null ) {
                rules.rangelength = [ rules.minlength, rules.maxlength ];
                delete rules.minlength;
                delete rules.maxlength;
            }
        }

        return rules;
    },

    // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
    normalizeRule: function( data ) {
        if ( typeof data === "string" ) {
            var transformed = {};
            $.each( data.split( /\s/ ), function() {
                transformed[ this ] = true;
            });
            data = transformed;
        }
        return data;
    },

    // http://jqueryvalidation.org/jQuery.validator.addMethod/
    addMethod: function( name, method, message ) {
        $.tc_validator.methods[ name ] = method;
        $.tc_validator.messages[ name ] = message !== undefined ? message : $.tc_validator.messages[ name ];
        if ( method.length < 3 ) {
            $.tc_validator.addClassRules( name, $.tc_validator.normalizeRule( name ) );
        }
    },

    methods: {

        // http://jqueryvalidation.org/required-method/
        required: function( value, element, param ) {
            // check if dependency is met
            if ( !this.depend( param, element ) ) {
                return "dependency-mismatch";
            }
            if ( element.nodeName.toLowerCase() === "select" ) {
                // could be an array for select-multiple or a string, both are fine this way
                var val = $( element ).val();
                return val && val.length > 0;
            }
            if ( this.checkable( element ) ) {
                return this.getLength( value, element ) > 0;
            }
            return value.length > 0;
        },

        // http://jqueryvalidation.org/email-method/
        email: function( value, element ) {
            // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            // Retrieved 2014-01-14
            // If you have a problem with this implementation, report a bug against the above spec
            // Or use custom methods to implement your own email validation
            return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
        },

        // http://jqueryvalidation.org/url-method/
        url: function( value, element ) {

            // Copyright (c) 2010-2013 Diego Perini, MIT licensed
            // https://gist.github.com/dperini/729294
            // see also https://mathiasbynens.be/demo/url-regex
            // modified to allow protocol-relative URLs
            return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
        },

        // http://jqueryvalidation.org/date-method/
        date: function( value, element ) {
            return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
        },

        // http://jqueryvalidation.org/dateISO-method/
        dateISO: function( value, element ) {
            return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
        },

        // http://jqueryvalidation.org/number-method/
        number: function( value, element ) {
            return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
        },

        // http://jqueryvalidation.org/digits-method/
        digits: function( value, element ) {
            return this.optional( element ) || /^\d+$/.test( value );
        },

        // http://jqueryvalidation.org/creditcard-method/
        // based on http://en.wikipedia.org/wiki/Luhn_algorithm
        creditcard: function( value, element ) {
            if ( this.optional( element ) ) {
                return "dependency-mismatch";
            }
            // accept only spaces, digits and dashes
            if ( /[^0-9 \-]+/.test( value ) ) {
                return false;
            }
            var nCheck = 0,
                nDigit = 0,
                bEven = false,
                n, cDigit;

            value = value.replace( /\D/g, "" );

            // Basing min and max length on
            // http://developer.ean.com/general_info/Valid_Credit_Card_Types
            if ( value.length < 13 || value.length > 19 ) {
                return false;
            }

            for ( n = value.length - 1; n >= 0; n--) {
                cDigit = value.charAt( n );
                nDigit = parseInt( cDigit, 10 );
                if ( bEven ) {
                    if ( ( nDigit *= 2 ) > 9 ) {
                        nDigit -= 9;
                    }
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return ( nCheck % 10 ) === 0;
        },

        // http://jqueryvalidation.org/minlength-method/
        minlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength( value, element );
            return this.optional( element ) || length >= param;
        },

        // http://jqueryvalidation.org/maxlength-method/
        maxlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength( value, element );
            return this.optional( element ) || length <= param;
        },

        // http://jqueryvalidation.org/rangelength-method/
        rangelength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength( value, element );
            return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
        },

        // http://jqueryvalidation.org/min-method/
        min: function( value, element, param ) {
            return this.optional( element ) || value >= param;
        },

        // http://jqueryvalidation.org/max-method/
        max: function( value, element, param ) {
            return this.optional( element ) || value <= param;
        },

        // http://jqueryvalidation.org/range-method/
        range: function( value, element, param ) {
            return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
        },

        // http://jqueryvalidation.org/equalTo-method/
        equalTo: function( value, element, param ) {
            // bind to the blur event of the target in order to revalidate whenever the target field is updated
            // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
            var target = $( param );
            if ( this.settings.onfocusout ) {
                target.off( ".tc_validate-equalTo" ).on( "blur.tc_validate-equalTo", function() {
                    $( element ).tc_valid();
                });
            }
            return value === target.val();
        },

        // http://jqueryvalidation.org/remote-method/
        remote: function( value, element, param ) {
            if ( this.optional( element ) ) {
                return "dependency-mismatch";
            }

            var previous = this.previousValue( element ),
                tc_validator, data;

            if (!this.settings.messages[ element.name ] ) {
                this.settings.messages[ element.name ] = {};
            }
            previous.originalMessage = this.settings.messages[ element.name ].remote;
            this.settings.messages[ element.name ].remote = previous.message;

            param = typeof param === "string" && { url: param } || param;

            if ( previous.old === value ) {
                return previous.valid;
            }

            previous.old = value;
            tc_validator = this;
            this.startRequest( element );
            data = {};
            data[ element.name ] = value;
            $.ajax( $.extend( true, {
                mode: "abort",
                port: "tc_validate" + element.name,
                dataType: "json",
                data: data,
                context: tc_validator.currentForm,
                success: function( response ) {
                    var valid = response === true || response === "true",
                        errors, message, submitted;

                    tc_validator.settings.messages[ element.name ].remote = previous.originalMessage;
                    if ( valid ) {
                        submitted = tc_validator.formSubmitted;
                        tc_validator.prepareElement( element );
                        tc_validator.formSubmitted = submitted;
                        tc_validator.successList.push( element );
                        delete tc_validator.invalid[ element.name ];
                        tc_validator.showErrors();
                    } else {
                        errors = {};
                        message = response || tc_validator.defaultMessage( element, "remote" );
                        errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
                        tc_validator.invalid[ element.name ] = true;
                        tc_validator.showErrors( errors );
                    }
                    previous.valid = valid;
                    tc_validator.stopRequest( element, valid );
                }
            }, param ) );
            return "pending";
        }
    }

});

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
    ajax;
// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
    $.ajaxPrefilter(function( settings, _, xhr ) {
        var port = settings.port;
        if ( settings.mode === "abort" ) {
            if ( pendingRequests[port] ) {
                pendingRequests[port].abort();
            }
            pendingRequests[port] = xhr;
        }
    });
} else {
    // Proxy ajax
    ajax = $.ajax;
    $.ajax = function( settings ) {
        var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
            port = ( "port" in settings ? settings : $.ajaxSettings ).port;
        if ( mode === "abort" ) {
            if ( pendingRequests[port] ) {
                pendingRequests[port].abort();
            }
            pendingRequests[port] = ajax.apply(this, arguments);
            return pendingRequests[port];
        }
        return ajax.apply(this, arguments);
    };
}

}));

/*!
 * jQuery pagination plugin v1.2.6
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 *
 * Modified version
 */
;
(function ($) {

    'use strict';

    var Pagination = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.tcPagination.defaults, options);

        if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
            // Wrong startPage
            console.log("Wrong startPage");
            return;
        }

        this.options.totalPages = parseInt(this.options.totalPages);
        if (isNaN(this.options.totalPages)) {
            // Wrong totalPages
            console.log("Wrong totalPages");
            return;
        }

        this.options.visiblePages = parseInt(this.options.visiblePages);
        if (isNaN(this.options.visiblePages)) {
            // Wrong visiblePages
            console.log("Wrong visiblePages");
            return;
        }

        if (this.options.totalPages < this.options.visiblePages) {
            this.options.visiblePages = this.options.totalPages;
        }

        if (this.options.onPageClick instanceof Function) {
            this.$element.first().on('page', this.options.onPageClick);
        }

        var tagName = (typeof this.$element.prop === 'function') ?
            this.$element.prop('tagName') : this.$element.attr('tagName');

        if (tagName === 'UL') {
            this.$listContainer = this.$element;
        } else {
            this.$listContainer = $('<ul></ul>');
        }

        if (tagName !== 'UL') {
            this.$element.append(this.$listContainer);
        }

        this.render(this.getPages(this.options.startPage));
        this.setupEvents();

        if (this.options.initiateStartPageClick) {
            this.$element.trigger('page', this.options.startPage);
        }

        return this;
    };

    Pagination.prototype = {

        constructor: Pagination,

        destroy: function () {
            this.$element.empty();
            this.$element.removeData('tc-pagination');
            this.$element.off('page');
            return this;
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                // Wrong page
                console.log("Wrong page");
                return;
            }

            this.render(this.getPages(page));
            this.setupEvents();

            this.$element.trigger('page', page);
            return this;
        },

        buildListItems: function (pages) {
            var $listItems = $();

            if (this.options.first) {
                $listItems = $listItems.add(this.buildItem('first', 1));
            }

            if (this.options.prev) {
                var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages  : 1;
                $listItems = $listItems.add(this.buildItem('prev', prev));
            }

            for (var i = 0; i < pages.numeric.length; i++) {
                $listItems = $listItems.add(this.buildItem('page', pages.numeric[i]));
            }

            if (this.options.next) {
                var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
                $listItems = $listItems.add(this.buildItem('next', next));
            }

            if (this.options.last) {
                $listItems = $listItems.add(this.buildItem('last', this.options.totalPages));
            }

            return $listItems;
        },

        buildItem: function (type, page) {
            var itemContainer = $('<li></li>'),
                itemContent = $('<a></a>'),
                itemText = null;

            switch (type) {
                case 'page':
                    itemText = page;
                    itemContainer.addClass(this.options.pageClass);
                    break;
                case 'first':
                    itemText = this.options.first;
                    itemContainer.addClass(this.options.firstClass);
                    break;
                case 'prev':
                    itemText = this.options.prev;
                    itemContainer.addClass(this.options.prevClass);
                    break;
                case 'next':
                    itemText = this.options.next;
                    itemContainer.addClass(this.options.nextClass);
                    break;
                case 'last':
                    itemText = this.options.last;
                    itemContainer.addClass(this.options.lastClass);
                    break;
                default:
                    break;
            }

            itemContainer.data('page', page);
            itemContainer.data('page-type', type);
            itemContainer.append(itemContent.attr('href', '#').html(itemText));
            return itemContainer;
        },

        getPages: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = this.options.visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - this.options.visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            var that = this;
            this.$listContainer.children().remove();
            this.$listContainer.append(this.buildListItems(pages));

            this.$listContainer.children().each(function () {
                var $this = $(this),
                    pageType = $this.data('page-type');

                switch (pageType) {
                    case 'page':
                        if ($this.data('page') === pages.currentPage) {
                            $this.addClass(that.options.activeClass);
                        }
                        break;
                    case 'first':
                            $this.toggleClass(that.options.disabledClass, pages.currentPage === 1);
                        break;
                    case 'last':
                            $this.toggleClass(that.options.disabledClass, pages.currentPage === that.options.totalPages);
                        break;
                    case 'prev':
                            $this.toggleClass(that.options.disabledClass, !that.options.loop && pages.currentPage === 1);
                        break;
                    case 'next':
                            $this.toggleClass(that.options.disabledClass,
                                !that.options.loop && pages.currentPage === that.options.totalPages);
                        break;
                    default:
                        break;
                }

            });
        },

        setupEvents: function () {
            var base = this;
            this.$listContainer.find('li').each(function () {
                var $this = $(this);
                $this.off();
                if ($this.hasClass(base.options.disabledClass) || $this.hasClass(base.options.activeClass)) {
                    $this.click(function (evt) {
                        evt.preventDefault();
                    });
                    return;
                }
                $this.click(function (evt) {
                    evt.preventDefault();
                    base.show(parseInt($this.data('page'), 10));
                });
            });
        }

    };

    $.fn.tcPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1),
            methodReturn,
            $this = $(this),
            data = $this.data('tc-pagination'),
            options = typeof option === 'object' && option;

        if (!data){
            $this.data('tc-pagination', (data = new Pagination(this, options) ));
        }
        
        if (typeof option === 'string'){
            methodReturn = data[ option ].apply(data, args);
        }

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.tcPagination.defaults = {
        totalPages: 0,
        startPage: 1,
        visiblePages: 5,

        initiateStartPageClick: true,

        loop: false,

        onPageClick: null,

        first: '<i class="tcfa tcfa-angle-double-left"></i>',
        prev: '<i class="tcfa tcfa-angle-left"></i>',
        next: '<i class="tcfa tcfa-angle-right"></i>',
        last: '<i class="tcfa tcfa-angle-double-right"></i>',

        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first',

        pageClass: 'page',

        activeClass: 'active',
        disabledClass: 'disabled'
    };

    $.fn.tcPagination.Constructor = Pagination;

})(jQuery);
