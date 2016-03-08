/* Image click fix */
(function($) {
    "use strict";
    $(document).on("click", ".tm-extra-product-options .use_images_containter .tmcp-field-wrap label", function() {
        return false;
    });
    $(document).on("click", ".tm-extra-product-options label img", function() {
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
                    label=label.find('.checkbox_image_label,.tm-tip-html');
                    var tip=$(label).html();
                    current_element.data('tm-tip-html',tip);
                    $(label).hide();
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
                tooltip = $( '<div id="tm-tooltip" class="tm-tip"></div>' );
                
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
                    //tooltip.html(target.offset().top-u[1]);
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
                    var speed=100;
                    if (nofx){
                        tooltip.css( { left: pos_left, top: (pos_top) } ); 
                        target.data('is_moving',false);                       
                    }else{
                        tooltip.css( { left: pos_left, top: pos_top } )
                           .animate( { top: pos_top, opacity: 1 }, speed );
                    }
                };
         
                init_tooltip();
                $( window ).resize( init_tooltip );
                target.data('is_moving',false);
                var remove_tooltip = function(){
                    if (target.data('is_moving')){
                        return;
                    }
                    var speed=100;
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
                //$(t.floatboxID).removeClass("tm-animated appear");
                $(t.floatboxID).removeClass("fadeInDown").addClass("fadeOutDown");
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
                   
                    $(t.floatboxID).addClass("tm-animated fadeInDown");
                    if (t.refresh=="fixed"){
                        var top = parseInt( (o[3] - $(t.floatboxID).height()) / 2);
                        $(t.floatboxID).css({
                            position: "fixed",
                            top: top + "px",
                        });
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
        $.fn.tmtabs = function() {
            var elements = this;
            
            if (elements.length==0){
                return;
            }

            return elements.each(function(){
                var t=$(this),
                    headers = t.find(".tm-tab-headers .tab-header");
                if (headers.length==0){
                    return;
                }
                var init_open=0,
                    last=false,
                    current="";
                headers.each(function(i,header){
                    
                    var id="."+$(header).attr("data-id");
                    $(header).data("tab",id);
                    t.find(id).hide().data("state","closed");
                    if (!init_open && $(header).is(".open")){
                        $(header).removeClass("closed open").addClass("open").data("state","open");
                        $(header).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-up");
                        t.find(id).data("state","open").show();
                        init_open=1;
                        current=id;
                        last=$(header);
                    }else{
                        $(header).removeClass("closed open").addClass("closed").data("state","closed");
                    }
                    
                    $(header).on("closetab.tmtabs",function(e){
                        var _tab=t.find($(this).data("tab"));
                        $(this).removeClass("closed open").addClass("closed");
                        $(this).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-down");
                        _tab.hide().removeClass("tm-animated fadeInDown");
                    });

                    $(header).on("opentab.tmtabs",function(e){
                        $(this).removeClass("closed open").addClass("open");
                        $(this).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-up");
                        t.find($(this).data("tab")).show().removeClass("tm-animated fadeInDown").addClass("tm-animated fadeInDown");
                        current=$(this).data("tab");
                    });
                    
                    $(header).on("click.tmtabs",function(e){
                        e.preventDefault();
                        if (current==$(this).data("tab")){
                            return;
                        }
                        if (last){
                            $(last).trigger("closetab.tmtabs");
                        }
                        $(this).trigger("opentab.tmtabs");
                        last=$(this);
                        Cookies.set('tmadmintab', $(this).attr("data-id"), { expires: 7, path: '' });
                    });

                });
                var _selected_tab = Cookies.get('tmadmintab');
                $('.tab-header[data-id="'+_selected_tab+'"]').trigger('click.tmtabs');
            });
        };
    }
    
    if (!$().tmtoggle) {
        $.fn.tmtoggle = function() {
            var elements = this;
            
            if (elements.length==0){
                return;
            }

            return elements.each(function(){
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
                        $(headers).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-down");
                    }else{
                        $(wrap).removeClass("closed open").addClass("open").show();
                        $(headers).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-up");
                    }

                    headers.each(function(i,header){
                                            
                        $(header).on("closewrap.tmtoggle",function(e){
                            if (t.is('.tmaccordion') && $(wrap).is(".closed")){
                                return;
                            }                                            
                            $(wrap).removeClass("closed open").addClass("closed");
                            $(this).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-down");
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
                            $(this).find(".tm-arrow").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-up");
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
                var t=$(this),
                    id=$(this).attr('href'),
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
    maskElements: '#tm-extra-product-options input'
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
 *  Project: prettyCheckable
 *  Description: jQuery plugin to replace checkboxes and radios for custom images
 *  Author: Arthur Gouveia
 *  License: Licensed under the MIT License
 */
/* global jQuery:true, ko:true */
;(function ( $, window, document, undefined ) {
    'use strict';

    var pluginName = 'prettyCheckable',
        dataPlugin = 'plugin_' + pluginName,
        defaults = {
            label: '',
            labelPosition: 'right',
            customClass: '',
            color: 'blue',
            nolabel:true
        };

    var addCheckableEvents = function (element) {
        if (window.ko) {
            $(element).on('change', function(e) {
                e.preventDefault();
                //only changes from knockout model
                if (e.originalEvent === undefined) {
                    var clickedParent = $(this).closest('.clearfix'),
                        fakeCheckable = $(clickedParent).find('a:first'),
                        isChecked = fakeCheckable.hasClass('checked');
                    if (isChecked === true) {
                        fakeCheckable.addClass('checked');
                    } else {
                        fakeCheckable.removeClass('checked');
                    }
                }
            });
        }

        element.find('a:first, label').on('touchstart click', function(e){
            e.preventDefault();
            var clickedParent = $(this).closest('.clearfix'),
                input = clickedParent.find('input'),
                fakeCheckable = clickedParent.find('a:first');

            if (fakeCheckable.hasClass('disabled') === true) {
                return;
            }

            if (input.prop('type') === 'radio') {
                $('input[name="' + input.attr('name') + '"]').each(function(index, el){
                    $(el).prop('checked', false).parent().find('a:first').removeClass('checked');
                });
            }

            if (window.ko) {
                ko.utils.triggerEvent(input[0], 'click');
            } else {
                if (input.prop('checked')) {
                    input.prop('checked', false).change();
                } else {
                    input.prop('checked', true).change();
                }
            }
            fakeCheckable.toggleClass('checked');
        });

        element.find('a:first').on('keyup', function(e){
            if (e.keyCode === 32) {
                $(this).click();
            }
        });
    };

    var Plugin = function ( element ) {
        this.element = element;
        this.options = $.extend( {}, defaults );
    };

    Plugin.prototype = {
        init: function ( options ) {
            $.extend( this.options, options );
            var el = $(this.element);
            el.parent().addClass('has-pretty-child');
            el.css('display', 'none');
            var classType = el.data('type') !== undefined ? el.data('type') : el.attr('type');
            var label = null,
                elLabelId = el.attr('id');
            if (elLabelId !== undefined && !this.options.nolabel) {
                var elLabel = $('label[for=' + elLabelId + ']');
                if (elLabel.length > 0) {
                    label = elLabel.text();
                    elLabel.remove();
                }
            }
            if (this.options.label === '') {
                this.options.label = label;
            }
            label = el.data('label') !== undefined ? el.data('label') : this.options.label;
            var labelPosition = el.data('labelposition') !== undefined ? 'label' + el.data('labelposition') : 'label' + this.options.labelPosition;
            var customClass = el.data('customclass') !== undefined ? el.data('customclass') : this.options.customClass;
            var color =  el.data('color') !== undefined ? el.data('color') : this.options.color;
            //var disabled = el.prop('disabled') === true ? 'disabled' : '';
            // temp fix
            var disabled = el.prop('disabled') === true ? '' : '';
            var containerClasses = ['pretty' + classType, labelPosition, customClass, color].join(' ');
            el.wrap('<div class="clearfix ' + containerClasses + '"></div>').parent().html();
            var dom = [];
            var isChecked = el.prop('checked') ? 'checked' : '';
            if (labelPosition === 'labelright') {
                dom.push('<a href="#" class="' + isChecked + ' ' + disabled + '"></a>');
                if(!this.options.nolabel)dom.push('<label for="' + el.attr('id') + '">' + label + '</label>');
            } else {
                dom.push('<label for="' + el.attr('id') + '">' + label + '</label>');
                if(!this.options.nolabel)dom.push('<a href="#" class="' + isChecked + ' ' + disabled + '"></a>');
            }
            el.parent().append(dom.join('\n'));
            addCheckableEvents(el.parent());
        },

        check: function () {
            if ($(this.element).prop('type') === 'radio') {
                $('input[name="' + $(this.element).attr('name') + '"]').each(function(index, el){
                    $(el).prop('checked', false).attr('checked', false).parent().find('a:first').removeClass('checked');
                });
            }
            $(this.element).prop('checked', true).attr('checked', true).parent().find('a:first').addClass('checked');
        },
        uncheck: function () {
            $(this.element).prop('checked', false).attr('checked', false).parent().find('a:first').removeClass('checked');
        },
        enable: function () {
            $(this.element).removeAttr('disabled').parent().find('a:first').removeClass('disabled');
        },
        disable: function () {
            $(this.element).attr('disabled', 'disabled').parent().find('a:first').addClass('disabled');
        },
        destroy: function () {
            var el = $(this.element),
                clonedEl = el.clone(),
                label = null,
                elLabelId = el.attr('id');

            if (elLabelId !== undefined && !this.options.nolabel) {
                var elLabel = $('label[for=' + elLabelId + ']');
                if (elLabel.length > 0) {
                    elLabel.insertBefore(el.parent());
                }
            }
            clonedEl.removeAttr('style').insertAfter(elLabel);
            el.parent().remove();
        }
    };

    $.fn[ pluginName ] = function ( arg ) {
        var args, instance;
        if (!( this.data( dataPlugin ) instanceof Plugin )) {
            this.data( dataPlugin, new Plugin( this ) );
        }
        instance = this.data( dataPlugin );
        if (instance){
            instance.element = this;
            if (typeof arg === 'undefined' || typeof arg === 'object') {
                if ( typeof instance.init === 'function' ) {
                    instance.init( arg );
                }
            } else if ( typeof arg === 'string' && typeof instance[arg] === 'function' ) {
                args = Array.prototype.slice.call( arguments, 1 );
                return instance[arg].apply( instance, args );
            } else {
                $.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);
            }
        }
    };
}(jQuery, window, document));

/*
 *  Project: nouislider (http://refreshless.com/nouislider/)
 *  Description: noUiSlider is a range slider without bloat
 *  License: http://www.wtfpl.net/about/
 */
/*! noUiSlider - 7.0.10 - 2014-12-27 14:50:47 */
!function(){"use strict";function a(a){return a.split("").reverse().join("")}function b(a,b){return a.substring(0,b.length)===b}function c(a,b){return a.slice(-1*b.length)===b}function d(a,b,c){if((a[b]||a[c])&&a[b]===a[c])throw new Error(b)}function e(a){return"number"==typeof a&&isFinite(a)}function f(a,b){var c=Math.pow(10,b);return(Math.round(a*c)/c).toFixed(b)}function g(b,c,d,g,h,i,j,k,l,m,n,o){var p,q,r,s=o,t="",u="";return i&&(o=i(o)),e(o)?(b!==!1&&0===parseFloat(o.toFixed(b))&&(o=0),0>o&&(p=!0,o=Math.abs(o)),b!==!1&&(o=f(o,b)),o=o.toString(),-1!==o.indexOf(".")?(q=o.split("."),r=q[0],d&&(t=d+q[1])):r=o,c&&(r=a(r).match(/.{1,3}/g),r=a(r.join(a(c)))),p&&k&&(u+=k),g&&(u+=g),p&&l&&(u+=l),u+=r,u+=t,h&&(u+=h),m&&(u=m(u,s)),u):!1}function h(a,d,f,g,h,i,j,k,l,m,n,o){var p,q="";return n&&(o=n(o)),o&&"string"==typeof o?(k&&b(o,k)&&(o=o.replace(k,""),p=!0),g&&b(o,g)&&(o=o.replace(g,"")),l&&b(o,l)&&(o=o.replace(l,""),p=!0),h&&c(o,h)&&(o=o.slice(0,-1*h.length)),d&&(o=o.split(d).join("")),f&&(o=o.replace(f,".")),p&&(q+="-"),q+=o,q=q.replace(/[^0-9\.\-.]/g,""),""===q?!1:(q=Number(q),j&&(q=j(q)),e(q)?q:!1)):!1}function i(a){var b,c,e,f={};for(b=0;b<l.length;b+=1)if(c=l[b],e=a[c],void 0===e)f[c]="negative"!==c||f.negativeBefore?"mark"===c&&"."!==f.thousand?".":!1:"-";else if("decimals"===c){if(!(e>=0&&8>e))throw new Error(c);f[c]=e}else if("encoder"===c||"decoder"===c||"edit"===c||"undo"===c){if("function"!=typeof e)throw new Error(c);f[c]=e}else{if("string"!=typeof e)throw new Error(c);f[c]=e}return d(f,"mark","thousand"),d(f,"prefix","negative"),d(f,"prefix","negativeBefore"),f}function j(a,b,c){var d,e=[];for(d=0;d<l.length;d+=1)e.push(a[l[d]]);return e.push(c),b.apply("",e)}function k(a){return this instanceof k?void("object"==typeof a&&(a=i(a),this.to=function(b){return j(a,g,b)},this.from=function(b){return j(a,h,b)})):new k(a)}var l=["decimals","thousand","mark","prefix","postfix","encoder","decoder","negativeBefore","negative","edit","undo"];window.wNumb=k}(),function(a){"use strict";function b(b){return b instanceof a||a.zepto&&a.zepto.isZ(b)}function c(b,c){return"string"==typeof b&&0===b.indexOf("-inline-")?(this.method=c||"html",this.target=this.el=a(b.replace("-inline-","")||"<div/>"),!0):void 0}function d(b){if("string"==typeof b&&0!==b.indexOf("-")){this.method="val";var c=document.createElement("input");return c.name=b,c.type="hidden",this.target=this.el=a(c),!0}}function e(a){return"function"==typeof a?(this.target=!1,this.method=a,!0):void 0}function f(a,c){return b(a)&&!c?(a.is("input, select, textarea")?(this.method="val",this.target=a.on("change.liblink",this.changeHandler)):(this.target=a,this.method="html"),!0):void 0}function g(a,c){return b(a)&&("function"==typeof c||"string"==typeof c&&a[c])?(this.method=c,this.target=a,!0):void 0}function h(b,c,d){var e=this,f=!1;if(this.changeHandler=function(b){var c=e.formatInstance.from(a(this).val());return c===!1||isNaN(c)?(a(this).val(e.lastSetValue),!1):void e.changeHandlerMethod.call("",b,c)},this.el=!1,this.formatInstance=d,a.each(k,function(a,d){return f=d.call(e,b,c),!f}),!f)throw new RangeError("(Link) Invalid Link.")}function i(a){this.items=[],this.elements=[],this.origin=a}function j(b,c,d,e){0===b&&(b=this.LinkDefaultFlag),this.linkAPI||(this.linkAPI={}),this.linkAPI[b]||(this.linkAPI[b]=new i(this));var f=new h(c,d,e||this.LinkDefaultFormatter);f.target||(f.target=a(this)),f.changeHandlerMethod=this.LinkConfirm(b,f.el),this.linkAPI[b].push(f,f.el),this.LinkUpdate(b)}var k=[c,d,e,f,g];h.prototype.set=function(a){var b=Array.prototype.slice.call(arguments),c=b.slice(1);this.lastSetValue=this.formatInstance.to(a),c.unshift(this.lastSetValue),("function"==typeof this.method?this.method:this.target[this.method]).apply(this.target,c)},i.prototype.push=function(a,b){this.items.push(a),b&&this.elements.push(b)},i.prototype.reconfirm=function(a){var b;for(b=0;b<this.elements.length;b+=1)this.origin.LinkConfirm(a,this.elements[b])},i.prototype.remove=function(){var a;for(a=0;a<this.items.length;a+=1)this.items[a].target.off(".liblink");for(a=0;a<this.elements.length;a+=1)this.elements[a].remove()},i.prototype.change=function(a){if(this.origin.LinkIsEmitting)return!1;this.origin.LinkIsEmitting=!0;var b,c=Array.prototype.slice.call(arguments,1);for(c.unshift(a),b=0;b<this.items.length;b+=1)this.items[b].set.apply(this.items[b],c);this.origin.LinkIsEmitting=!1},a.fn.Link=function(b){var c=this;if(b===!1)return c.each(function(){this.linkAPI&&(a.map(this.linkAPI,function(a){a.remove()}),delete this.linkAPI)});if(void 0===b)b=0;else if("string"!=typeof b)throw new Error("Flag must be string.");return{to:function(a,d,e){return c.each(function(){j.call(this,b,a,d,e)})}}}}(window.jQuery||window.Zepto),function(a){"use strict";function b(b){return a.grep(b,function(c,d){return d===a.inArray(c,b)})}function c(a,b){return Math.round(a/b)*b}function d(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function e(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function f(a,b,c){a.addClass(b),setTimeout(function(){a.removeClass(b)},c)}function g(a){return Math.max(Math.min(a,100),0)}function h(b){return a.isArray(b)?b:[b]}function i(a){var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){return 100/(b-a)}function k(a,b){return 100*b/(a[1]-a[0])}function l(a,b){return k(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function m(a,b){return b*(a[1]-a[0])/100+a[0]}function n(a,b){for(var c=1;a>=b[c];)c+=1;return c}function o(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=n(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+l([d,e],c)/j(f,g)}function p(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=n(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],m([d,e],(c-f)*j(f,g))}function q(a,b,d,e){if(100===e)return e;var f,g,h=n(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):b[h-1]?a[h-1]+c(e-a[h-1],b[h-1]):e}function r(a,b,c){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!d(e)||!d(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(e),c.xVal.push(b[0]),e?c.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(c.xSteps[0]=b[1])}function s(a,b,c){return b?void(c.xSteps[a]=k([c.xVal[a],c.xVal[a+1]],b)/j(c.xPct[a],c.xPct[a+1])):!0}function t(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)r(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)s(e,this.xNumSteps[e],this)}function u(a,b){if(!d(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function v(b,c){if("object"!=typeof c||a.isArray(c))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===c.min||void 0===c.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");b.spectrum=new t(c,b.snap,b.dir,b.singleStep)}function w(b,c){if(c=h(c),!a.isArray(c)||!c.length||c.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");b.handles=c.length,b.start=c}function x(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function y(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function z(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function A(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function B(a,b){if(!d(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function C(a,b){if(!d(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function D(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function E(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function F(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function G(b){var c,d={margin:0,limit:0,animate:!0,format:Z};return c={step:{r:!1,t:u},start:{r:!0,t:w},connect:{r:!0,t:z},direction:{r:!0,t:D},snap:{r:!1,t:x},animate:{r:!1,t:y},range:{r:!0,t:v},orientation:{r:!1,t:A},margin:{r:!1,t:B},limit:{r:!1,t:C},behaviour:{r:!0,t:E},format:{r:!1,t:F}},b=a.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},b),a.each(c,function(a,c){if(void 0===b[a]){if(c.r)throw new Error("noUiSlider: '"+a+"' is required.");return!0}c.t(d,b[a])}),d.style=d.ort?"top":"left",d}function H(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[g(d),g(e)]):[d,e]}function I(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),a.originalEvent&&(a=a.originalEvent),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(f||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=document.documentElement.scrollTop),b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e,g}function J(b,c){var d=a("<div><div/></div>").addClass(Y[2]),e=["-lower","-upper"];return b&&e.reverse(),d.children().addClass(Y[3]+" "+Y[3]+e[c]),d}function K(a,b,c){switch(a){case 1:b.addClass(Y[7]),c[0].addClass(Y[6]);break;case 3:c[1].addClass(Y[6]);case 2:c[0].addClass(Y[7]);case 0:b.addClass(Y[6])}}function L(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(J(b,d).appendTo(c));return e}function M(b,c,d){return d.addClass([Y[0],Y[8+b],Y[4+c]].join(" ")),a("<div/>").appendTo(d).addClass(Y[1])}function N(b,c,d){function e(){return C[["width","height"][c.ort]]()}function j(a){var b,c=[E.val()];for(b=0;b<a.length;b+=1)E.trigger(a[b],c)}function k(a){return 1===a.length?a[0]:c.dir?a.reverse():a}function l(a){return function(b,c){E.val([a?null:c,a?c:null],!0)}}function m(b){var c=a.inArray(b,N);E[0].linkAPI&&E[0].linkAPI[b]&&E[0].linkAPI[b].change(J[c],D[c].children(),E)}function n(b,d){var e=a.inArray(b,N);return d&&d.appendTo(D[e].children()),c.dir&&c.handles>1&&(e=1===e?0:1),l(e)}function o(){var a,b;for(a=0;a<N.length;a+=1)this.linkAPI&&this.linkAPI[b=N[a]]&&this.linkAPI[b].reconfirm(b)}function p(a,b,d,e){return a=a.replace(/\s/g,W+" ")+W,b.on(a,function(a){return E.attr("disabled")?!1:E.hasClass(Y[14])?!1:(a=I(a),a.calcPoint=a.points[c.ort],void d(a,e))})}function q(a,b){var c,d=b.handles||D,f=!1,g=100*(a.calcPoint-b.start)/e(),h=d[0][0]!==D[0][0]?1:0;c=H(g,b.positions,d.length>1),f=v(d[0],c[h],1===d.length),d.length>1&&(f=v(d[1],c[h?0:1],!1)||f),f&&j(["slide"])}function r(b){a("."+Y[15]).removeClass(Y[15]),b.cursor&&a("body").css("cursor","").off(W),U.off(W),E.removeClass(Y[12]),j(["set","change"])}function s(b,c){1===c.handles.length&&c.handles[0].children().addClass(Y[15]),b.stopPropagation(),p(X.move,U,q,{start:b.calcPoint,handles:c.handles,positions:[F[0],F[D.length-1]]}),p(X.end,U,r,null),b.cursor&&(a("body").css("cursor",a(b.target).css("cursor")),D.length>1&&E.addClass(Y[12]),a("body").on("selectstart"+W,!1))}function t(b){var d,g=b.calcPoint,h=0;b.stopPropagation(),a.each(D,function(){h+=this.offset()[c.style]}),h=h/2>g||1===D.length?0:1,g-=C.offset()[c.style],d=100*g/e(),c.events.snap||f(E,Y[14],300),v(D[h],d),j(["slide","set","change"]),c.events.snap&&s(b,{handles:[D[h]]})}function u(a){var b,c;if(!a.fixed)for(b=0;b<D.length;b+=1)p(X.start,D[b].children(),s,{handles:[D[b]]});a.tap&&p(X.start,C,t,{handles:D}),a.drag&&(c=C.find("."+Y[7]).addClass(Y[10]),a.fixed&&(c=c.add(C.children().not(c).children())),p(X.start,c,s,{handles:D}))}function v(a,b,d){var e=a[0]!==D[0][0]?1:0,f=F[0]+c.margin,h=F[1]-c.margin,i=F[0]+c.limit,j=F[1]-c.limit;return D.length>1&&(b=e?Math.max(b,f):Math.min(b,h)),d!==!1&&c.limit&&D.length>1&&(b=e?Math.min(b,i):Math.max(b,j)),b=G.getStep(b),b=g(parseFloat(b.toFixed(7))),b===F[e]?!1:(a.css(c.style,b+"%"),a.is(":first-child")&&a.toggleClass(Y[17],b>50),F[e]=b,J[e]=G.fromStepping(b),m(N[e]),!0)}function w(a,b){var d,e,f;for(c.limit&&(a+=1),d=0;a>d;d+=1)e=d%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=c.format.from(f),(f===!1||isNaN(f)||v(D[e],G.toStepping(f),d===3-c.dir)===!1)&&m(N[e]))}function x(a){if(E[0].LinkIsEmitting)return this;var b,d=h(a);return c.dir&&c.handles>1&&d.reverse(),c.animate&&-1!==F[0]&&f(E,Y[14],300),b=D.length>1?3:1,1===d.length&&(b=1),w(b,d),j(["set"]),this}function y(){var a,b=[];for(a=0;a<c.handles;a+=1)b[a]=c.format.to(J[a]);return k(b)}function z(){return a(this).off(W).removeClass(Y.join(" ")).empty(),delete this.LinkUpdate,delete this.LinkConfirm,delete this.LinkDefaultFormatter,delete this.LinkDefaultFlag,delete this.reappend,delete this.vGet,delete this.vSet,delete this.getCurrentStep,delete this.getInfo,delete this.destroy,d}function A(){var b=a.map(F,function(a,b){var c=G.getApplicableStep(a),d=i(String(c[2])),e=J[b],f=100===a?null:c[2],g=Number((e-c[2]).toFixed(d)),h=0===a?null:g>=c[1]?c[2]:c[0]||!1;return[[h,f]]});return k(b)}function B(){return d}var C,D,E=a(b),F=[-1,-1],G=c.spectrum,J=[],N=["lower","upper"].slice(0,c.handles);if(c.dir&&N.reverse(),b.LinkUpdate=m,b.LinkConfirm=n,b.LinkDefaultFormatter=c.format,b.LinkDefaultFlag="lower",b.reappend=o,E.hasClass(Y[0]))throw new Error("Slider was already initialized.");C=M(c.dir,c.ort,E),D=L(c.handles,c.dir,C),K(c.connect,E,D),u(c.events),b.vSet=x,b.vGet=y,b.destroy=z,b.getCurrentStep=A,b.getOriginalOptions=B,b.getInfo=function(){return[G,c.style,c.ort]},E.val(c.start)}function O(a){var b=G(a,this);return this.each(function(){N(this,b,a)})}function P(b){return this.each(function(){if(!this.destroy)return void a(this).noUiSlider(b);var c=a(this).val(),d=this.destroy(),e=a.extend({},d,b);a(this).noUiSlider(e),this.reappend(),d.start===e.start&&a(this).val(c)})}function Q(){return this[0][arguments.length?"vSet":"vGet"].apply(this[0],arguments)}function R(b,c,d,e){if("range"===c||"steps"===c)return b.xVal;if("count"===c){var f,g=100/(d-1),h=0;for(d=[];(f=h++*g)<=100;)d.push(f);c="positions"}return"positions"===c?a.map(d,function(a){return b.fromStepping(e?b.getStep(a):a)}):"values"===c?e?a.map(d,function(a){return b.fromStepping(b.getStep(b.toStepping(a)))}):d:void 0}function S(c,d,e,f){var g=c.direction,h={},i=c.xVal[0],j=c.xVal[c.xVal.length-1],k=!1,l=!1,m=0;return c.direction=0,f=b(f.slice().sort(function(a,b){return a-b})),f[0]!==i&&(f.unshift(i),k=!0),f[f.length-1]!==j&&(f.push(j),l=!0),a.each(f,function(b){var g,i,j,n,o,p,q,r,s,t,u=f[b],v=f[b+1];if("steps"===e&&(g=c.xNumSteps[b]),g||(g=v-u),u!==!1&&void 0!==v)for(i=u;v>=i;i+=g){for(n=c.toStepping(i),o=n-m,r=o/d,s=Math.round(r),t=o/s,j=1;s>=j;j+=1)p=m+j*t,h[p.toFixed(5)]=["x",0];q=a.inArray(i,f)>-1?1:"steps"===e?2:0,!b&&k&&(q=0),i===v&&l||(h[n.toFixed(5)]=[i,q]),m=n}}),c.direction=g,h}function T(b,c,d,e,f,g){function h(a){return["-normal","-large","-sub"][a]}function i(a,c,d){return'class="'+c+" "+c+"-"+k+" "+c+h(d[1],d[0])+'" style="'+b+": "+a+'%"'}function j(a,b){d&&(a=100-a),b[1]=b[1]&&f?f(b[0],b[1]):b[1],l.append("<div "+i(a,"noUi-marker",b)+"></div>"),b[1]&&l.append("<div "+i(a,"noUi-value",b)+">"+g.to(b[0])+"</div>")}var k=["horizontal","vertical"][c],l=a("<div/>");return l.addClass("noUi-pips noUi-pips-"+k),a.each(e,j),l}var U=a(document),V=a.fn.val,W=".nui",X=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},Y=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];t.prototype.getMargin=function(a){return 2===this.xPct.length?k(this.xVal,a):!1},t.prototype.toStepping=function(a){return a=o(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},t.prototype.fromStepping=function(a){return this.direction&&(a=100-a),e(p(this.xVal,this.xPct,a))},t.prototype.getStep=function(a){return this.direction&&(a=100-a),a=q(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},t.prototype.getApplicableStep=function(a){var b=n(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},t.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var Z={to:function(a){return a.toFixed(2)},from:Number};a.fn.val=function(b){function c(a){return a.hasClass(Y[0])?Q:V}if(!arguments.length){var d=a(this[0]);return c(d).call(d)}var e=a.isFunction(b);return this.each(function(d){var f=b,g=a(this);e&&(f=b.call(this,d,g.val())),c(g).call(g,f)})},a.fn.noUiSlider=function(a,b){switch(a){case"step":return this[0].getCurrentStep();case"options":return this[0].getOriginalOptions()}return(b?P:O).call(this,a)},a.fn.noUiSlider_pips=function(b){var c=b.mode,d=b.density||1,e=b.filter||!1,f=b.values||!1,g=b.format||{to:Math.round},h=b.stepped||!1;return this.each(function(){var b=this.getInfo(),i=R(b[0],c,f,h),j=S(b[0],d,c,i);return a(this).append(T(b[1],b[2],b[0].direction,j,e,g))})}}(window.jQuery||window.Zepto);

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.13
 */
;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));

// Spectrum Colorpicker v1.6.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT
!function(t){"use strict";"function"===typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports&&"object"==typeof module?module.exports=t:t(jQuery)}(function(t,e){"use strict";var r={beforeShow:p,move:p,change:p,show:p,hide:p,color:!1,flat:!1,showInput:!1,allowEmpty:!1,showButtons:!0,clickoutFiresChange:!1,showInitial:!1,showPalette:!1,showPaletteOnly:!1,hideAfterPaletteSelect:!1,togglePaletteOnly:!1,showSelectionPalette:!0,localStorageKey:!1,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",togglePaletteMoreText:"more",togglePaletteLessText:"less",clearText:"Clear Color Selection",noColorSelectedText:"No Color Selected",preferredFormat:!1,className:"",containerClassName:"",replacerClassName:"",showAlpha:!1,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:!1,offset:null},a=[],n=!!/msie/i.exec(window.navigator.userAgent),i=function(){function t(t,e){return!!~(""+t).indexOf(e)}var e=document.createElement("div");var r=e.style;return r.cssText="background-color:rgba(0,0,0,.5)",t(r.backgroundColor,"rgba")||t(r.backgroundColor,"hsla")}(),s=function(){var e=t("<input type='color' value='!' />")[0];return"color"===e.type&&"!"!==e.value}(),o=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),l=function(){var t="";if(n)for(var e=1;e<=6;e++)t+="<div class='sp-"+e+"'></div>";return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","<div class='sp-palette-button-container sp-cf'>","<button type='button' class='sp-palette-toggle'></button>","</div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",t,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button type='button' class='sp-choose'></button>","</div>","</div>","</div>"].join("")}();function c(e,r,a,n){var s=[];for(var o=0;o<e.length;o++){var l=e[o];if(l){var c=tinycolor(l);var f=c.toHsl().l<.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";f+=tinycolor.equals(r,l)?" sp-thumb-active":"";var u=c.toString(n.preferredFormat||"rgb");var h=i?"background-color:"+c.toRgbString():"filter:"+c.toFilter();s.push('<span title="'+u+'" data-color="'+c.toRgbString()+'" class="'+f+'"><span class="sp-thumb-inner" style="'+h+';" /></span>')}else{var d="sp-clear-display";s.push(t("<div />").append(t('<span data-color="" style="background-color:transparent;" class="'+d+'"></span>').attr("title",n.noColorSelectedText)).html())}}return"<div class='sp-cf "+a+"'>"+s.join("")+"</div>"}function f(){for(var t=0;t<a.length;t++)a[t]&&a[t].hide()}function u(e,a){var n=t.extend({},r,e);return n.callbacks={move:v(n.move,a),change:v(n.change,a),show:v(n.show,a),hide:v(n.hide,a),beforeShow:v(n.beforeShow,a)},n}function h(r,h){var p=u(h,r),v=p.flat,y=p.showSelectionPalette,w=p.localStorageKey,_=p.theme,x=p.callbacks,k=m($e,10),S=!1,C=0,P=0,A=0,M=0,H=0,R=0,F=0,T=0,O=0,N=0,j=0,q=1,D=[],E=[],I={},z=p.selectionPalette.slice(0),B=p.maxSelectionSize,L="sp-dragging",K=null;var V=r.ownerDocument,$=V.body,W=t(r),X=!1,Y=t(l,V).addClass(_),G=Y.find(".sp-picker-container"),Q=Y.find(".sp-color"),J=Y.find(".sp-dragger"),U=Y.find(".sp-hue"),Z=Y.find(".sp-slider"),te=Y.find(".sp-alpha-inner"),ee=Y.find(".sp-alpha"),re=Y.find(".sp-alpha-handle"),ae=Y.find(".sp-input"),ne=Y.find(".sp-palette"),ie=Y.find(".sp-initial"),se=Y.find(".sp-cancel"),oe=Y.find(".sp-clear"),le=Y.find(".sp-choose"),ce=Y.find(".sp-palette-toggle"),fe=W.is("input"),ue=fe&&s&&"color"===W.attr("type"),he=fe&&!v,de=he?t(o).addClass(_).addClass(p.className).addClass(p.replacerClassName):t([]),pe=he?de:W,ge=de.find(".sp-preview-inner"),ve=p.color||fe&&W.val(),be=!1,me=p.preferredFormat,ye=me,we=!p.showButtons||p.clickoutFiresChange,_e=!ve,xe=p.allowEmpty&&!ue;function ke(){if(p.showPaletteOnly&&(p.showPalette=!0),ce.text(p.showPaletteOnly?p.togglePaletteMoreText:p.togglePaletteLessText),p.palette){D=p.palette.slice(0),E=t.isArray(D[0])?D:[D],I={};for(var e=0;e<E.length;e++)for(var r=0;r<E[e].length;r++){var a=tinycolor(E[e][r]).toRgbString();I[a]=!0}}Y.toggleClass("sp-flat",v),Y.toggleClass("sp-input-disabled",!p.showInput),Y.toggleClass("sp-alpha-enabled",p.showAlpha),Y.toggleClass("sp-clear-enabled",xe),Y.toggleClass("sp-buttons-disabled",!p.showButtons),Y.toggleClass("sp-palette-buttons-disabled",!p.togglePaletteOnly),Y.toggleClass("sp-palette-disabled",!p.showPalette),Y.toggleClass("sp-palette-only",p.showPaletteOnly),Y.toggleClass("sp-initial-disabled",!p.showInitial),Y.addClass(p.className).addClass(p.containerClassName),$e()}function Se(){if(n&&Y.find("*:not(input)").attr("unselectable","on"),ke(),he&&W.after(de).hide(),xe||oe.hide(),v)W.after(Y).hide();else{var e="parent"===p.appendTo?W.parent():t(p.appendTo);1!==e.length&&(e=t("body")),e.append(Y)}Ce(),pe.bind("click.spectrum touchstart.spectrum",function(e){X||Oe(),we&&Ve(!0),e.stopPropagation(),t(e.target).is("input")||e.preventDefault()}),(W.is(":disabled")||p.disabled===!0)&&Ge(),Y.click(g),ae.change(Te),ae.bind("paste",function(){setTimeout(Te,1)}),ae.keydown(function(t){13==t.keyCode&&Te()}),se.text(p.cancelText),se.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),De(),qe()}),oe.attr("title",p.clearText),oe.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),_e=!0,Be(),v&&Ve(!0)}),le.text(p.chooseText),le.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),n&&ae.is(":focus")&&ae.trigger("change"),ze()&&(Ve(!0),qe())}),ce.text(p.showPaletteOnly?p.togglePaletteMoreText:p.togglePaletteLessText),ce.bind("click.spectrum",function(t){t.stopPropagation(),t.preventDefault(),p.showPaletteOnly=!p.showPaletteOnly,p.showPaletteOnly||v||Y.css("left","-="+(G.outerWidth(!0)+5)),ke()}),b(ee,function(t,e,r){q=t/R,_e=!1,r.shiftKey&&(q=Math.round(10*q)/10),Be()},Re,Fe),b(U,function(t,e){O=parseFloat(e/M),_e=!1,p.showAlpha||(q=1),Be()},Re,Fe),b(Q,function(t,e,r){if(r.shiftKey){if(!K){var a=N*C;var n=P-j*P;var i=Math.abs(t-a)>Math.abs(e-n);K=i?"x":"y"}}else K=null;var s=!K||"x"===K;var o=!K||"y"===K;s&&(N=parseFloat(t/C)),o&&(j=parseFloat((P-e)/P)),_e=!1,p.showAlpha||(q=1),Be()},Re,Fe),ve?(Ee(ve),Le(),ye=me||tinycolor(ve).format,Pe(ve)):Le(),v&&Ne();function r(e){return e.data&&e.data.ignore?(Ee(t(e.target).closest(".sp-thumb-el").data("color")),Be()):(Ee(t(e.target).closest(".sp-thumb-el").data("color")),Be(),Ve(!0),p.hideAfterPaletteSelect&&qe()),!1}var a=n?"mousedown.spectrum":"click.spectrum touchstart.spectrum";ne.delegate(".sp-thumb-el",a,r),ie.delegate(".sp-thumb-el:nth-child(1)",a,{ignore:!0},r)}function Ce(){if(w&&window.localStorage){try{var e=window.localStorage[w].split(",#");e.length>1&&(delete window.localStorage[w],t.each(e,function(t,e){Pe(e)}))}catch(r){}try{z=window.localStorage[w].split(";")}catch(r){}}}function Pe(e){if(y){var r=tinycolor(e).toRgbString();if(!I[r]&&-1===t.inArray(r,z))for(z.push(r);z.length>B;)z.shift();if(w&&window.localStorage)try{window.localStorage[w]=z.join(";")}catch(a){}}}function Ae(){var t=[];if(p.showPalette)for(var e=0;e<z.length;e++){var r=tinycolor(z[e]).toRgbString();I[r]||t.push(z[e])}return t.reverse().slice(0,p.maxSelectionSize)}function Me(){var e=Ie();var r=t.map(E,function(t,r){return c(t,e,"sp-palette-row sp-palette-row-"+r,p)});Ce(),z&&r.push(c(Ae(),e,"sp-palette-row sp-palette-row-selection",p)),ne.html(r.join(""))}function He(){if(p.showInitial){var t=be;var e=Ie();ie.html(c([t,e],e,"sp-palette-row-initial",p))}}function Re(){(P<=0||C<=0||M<=0)&&$e(),Y.addClass(L),K=null,W.trigger("dragstart.spectrum",[Ie()])}function Fe(){Y.removeClass(L),W.trigger("dragstop.spectrum",[Ie()])}function Te(){var t=ae.val();if(null!==t&&""!==t||!xe){var e=tinycolor(t);e.isValid()?(Ee(e),Ve(!0)):ae.addClass("sp-validation-error")}else Ee(null),Ve(!0)}function Oe(){S?qe():Ne()}function Ne(){var e=t.Event("beforeShow.spectrum");return S?void $e():(W.trigger(e,[Ie()]),void(x.beforeShow(Ie())===!1||e.isDefaultPrevented()||(f(),S=!0,t(V).bind("click.spectrum",je),t(window).bind("resize.spectrum",k),de.addClass("sp-active"),Y.removeClass("sp-hidden"),$e(),Le(),be=Ie(),He(),x.show(be),W.trigger("show.spectrum",[be]))))}function je(t){2!=t.button&&(we?Ve(!0):De(),qe())}function qe(){S&&!v&&(S=!1,t(V).unbind("click.spectrum",je),t(window).unbind("resize.spectrum",k),de.removeClass("sp-active"),Y.addClass("sp-hidden"),x.hide(Ie()),W.trigger("hide.spectrum",[Ie()]))}function De(){Ee(be,!0)}function Ee(t,e){if(tinycolor.equals(t,Ie()))return void Le();var r,a;!t&&xe?_e=!0:(_e=!1,r=tinycolor(t),a=r.toHsv(),O=a.h%360/360,N=a.s,j=a.v,q=a.a),Le(),r&&r.isValid()&&!e&&(ye=me||r.getFormat())}function Ie(t){return t=t||{},xe&&_e?null:tinycolor.fromRatio({h:O,s:N,v:j,a:Math.round(100*q)/100},{format:t.format||ye})}function ze(){return!ae.hasClass("sp-validation-error")}function Be(){Le(),x.move(Ie()),W.trigger("move.spectrum",[Ie()])}function Le(){ae.removeClass("sp-validation-error"),Ke();var t=tinycolor.fromRatio({h:O,s:1,v:1});Q.css("background-color",t.toHexString());var e=ye;q<1&&(0!==q||"name"!==e)&&("hex"===e||"hex3"===e||"hex6"===e||"name"===e)&&(e="rgb");var r=Ie({format:e}),a="";if(ge.removeClass("sp-clear-display"),ge.css("background-color","transparent"),!r&&xe)ge.addClass("sp-clear-display");else{var s=r.toHexString(),o=r.toRgbString();if(i||1===r.alpha?ge.css("background-color",o):(ge.css("background-color","transparent"),ge.css("filter",r.toFilter())),p.showAlpha){var l=r.toRgb();l.a=0;var c=tinycolor(l).toRgbString();var f="linear-gradient(left, "+c+", "+s+")";n?te.css("filter",tinycolor(c).toFilter({gradientType:1},s)):(te.css("background","-webkit-"+f),te.css("background","-moz-"+f),te.css("background","-ms-"+f),te.css("background","linear-gradient(to right, "+c+", "+s+")"))}a=r.toString(e)}p.showInput&&ae.val(a),p.showPalette&&Me(),He()}function Ke(){var t=N;var e=j;if(xe&&_e)re.hide(),Z.hide(),J.hide();else{re.show(),Z.show(),J.show();var r=t*C;var a=P-e*P;r=Math.max(-A,Math.min(C-A,r-A)),a=Math.max(-A,Math.min(P-A,a-A)),J.css({top:a+"px",left:r+"px"});var n=q*R;re.css({left:n-F/2+"px"});var i=O*M;Z.css({top:i-T+"px"})}}function Ve(t){var e=Ie(),r="",a=!tinycolor.equals(e,be);e&&(r=e.toString(ye),Pe(e)),fe&&W.val(r),t&&a&&(x.change(e),W.trigger("change",[e]))}function $e(){C=Q.width(),P=Q.height(),A=J.height(),H=U.width(),M=U.height(),T=Z.height(),R=ee.width(),F=re.width(),v||(Y.css("position","absolute"),Y.offset(p.offset?p.offset:d(Y,pe))),Ke(),p.showPalette&&Me(),W.trigger("reflow.spectrum")}function We(){W.show(),pe.unbind("click.spectrum touchstart.spectrum"),Y.remove(),de.remove(),a[Je.id]=null}function Xe(r,a){return r===e?t.extend({},p):a===e?p[r]:(p[r]=a,void ke())}function Ye(){X=!1,W.attr("disabled",!1),pe.removeClass("sp-disabled")}function Ge(){qe(),X=!0,W.attr("disabled",!0),pe.addClass("sp-disabled")}function Qe(t){p.offset=t,$e()}Se();var Je={show:Ne,hide:qe,toggle:Oe,reflow:$e,option:Xe,enable:Ye,disable:Ge,offset:Qe,set:function(t){Ee(t),Ve()},get:Ie,destroy:We,container:Y};return Je.id=a.push(Je)-1,Je}function d(e,r){var a=0;var n=e.outerWidth();var i=e.outerHeight();var s=r.outerHeight();var o=e[0].ownerDocument;var l=o.documentElement;var c=l.clientWidth+t(o).scrollLeft();var f=l.clientHeight+t(o).scrollTop();var u=r.offset();return u.top+=s,u.left-=Math.min(u.left,u.left+n>c&&c>n?Math.abs(u.left+n-c):0),u.top-=Math.min(u.top,u.top+i>f&&f>i?Math.abs(i+s-a):a),u}function p(){}function g(t){t.stopPropagation()}function v(t,e){var r=Array.prototype.slice;var a=r.call(arguments,2);return function(){return t.apply(e,a.concat(r.call(arguments)))}}function b(e,r,a,i){r=r||function(){},a=a||function(){},i=i||function(){};var s=document;var o=!1;var l={};var c=0;var f=0;var u="ontouchstart"in window;var h={};h.selectstart=d,h.dragstart=d,h["touchmove mousemove"]=p,h["touchend mouseup"]=v;function d(t){t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.returnValue=!1}function p(t){if(o){if(n&&s.documentMode<9&&!t.button)return v();var a=t.originalEvent&&t.originalEvent.touches;var i=a?a[0].pageX:t.pageX;var h=a?a[0].pageY:t.pageY;var p=Math.max(0,Math.min(i-l.left,f));var g=Math.max(0,Math.min(h-l.top,c));u&&d(t),r.apply(e,[p,g,t])}}function g(r){var n=r.which?3==r.which:2==r.button;n||o||a.apply(e,arguments)!==!1&&(o=!0,c=t(e).height(),f=t(e).width(),l=t(e).offset(),t(s).bind(h),t(s.body).addClass("sp-dragging"),u||p(r),d(r))}function v(){o&&(t(s).unbind(h),t(s.body).removeClass("sp-dragging"),i.apply(e,arguments)),o=!1}t(e).bind("touchstart mousedown",g)}function m(t,e,r){var a;return function(){var n=this,i=arguments;var s=function(){a=null,t.apply(n,i)};r&&clearTimeout(a),(r||!a)&&(a=setTimeout(s,e))}}var y="spectrum.id";t.fn.spectrum=function(e,r){if("string"==typeof e){var n=this;var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var r=a[t(this).data(y)];if(r){var s=r[e];if(!s)throw new Error("Spectrum: no such method: '"+e+"'");"get"==e?n=r.get():"container"==e?n=r.container:"option"==e?n=r.option.apply(r,i):"destroy"==e?(r.destroy(),t(this).removeData(y)):s.apply(r,i)}}),n}return this.spectrum("destroy").each(function(){var r=t.extend({},e,t(this).data());var a=h(this,r);t(this).data(y,a.id)})},t.fn.spectrum.load=!0,t.fn.spectrum.loadOpts={},t.fn.spectrum.draggable=b,t.fn.spectrum.defaults=r,t.spectrum={},t.spectrum.localization={},t.spectrum.palettes={},t.fn.spectrum.processNativeColorInputs=function(){s||t("input[type=color]").spectrum({preferredFormat:"hex6"})},function(){var t=/^[\s,#]+/,e=/\s+$/,r=0,a=Math,n=a.round,i=a.min,s=a.max,o=a.random;var l=function $(t,e){if(t=t?t:"",e=e||{},t instanceof $)return t;if(!(this instanceof $))return new $(t,e);var a=c(t);this._originalInput=t,this._r=a.r,this._g=a.g,this._b=a.b,this._a=a.a,this._roundA=n(100*this._a)/100,this._format=e.format||a.format,this._gradientType=e.gradientType,this._r<1&&(this._r=n(this._r)),this._g<1&&(this._g=n(this._g)),this._b<1&&(this._b=n(this._b)),this._ok=a.ok,this._tc_id=r++};l.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},setAlpha:function(t){return this._a=O(t),this._roundA=n(100*this._a)/100,this},toHsv:function(){var t=d(this._r,this._g,this._b);return{h:360*t.h,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=d(this._r,this._g,this._b);var e=n(360*t.h),r=n(100*t.s),a=n(100*t.v);return 1==this._a?"hsv("+e+", "+r+"%, "+a+"%)":"hsva("+e+", "+r+"%, "+a+"%, "+this._roundA+")"},toHsl:function(){var t=u(this._r,this._g,this._b);return{h:360*t.h,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=u(this._r,this._g,this._b);var e=n(360*t.h),r=n(100*t.s),a=n(100*t.l);return 1==this._a?"hsl("+e+", "+r+"%, "+a+"%)":"hsla("+e+", "+r+"%, "+a+"%, "+this._roundA+")"},toHex:function(t){return g(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(){return v(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:n(this._r),g:n(this._g),b:n(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+n(this._r)+", "+n(this._g)+", "+n(this._b)+")":"rgba("+n(this._r)+", "+n(this._g)+", "+n(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:n(100*N(this._r,255))+"%",g:n(100*N(this._g,255))+"%",b:n(100*N(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+n(100*N(this._r,255))+"%, "+n(100*N(this._g,255))+"%, "+n(100*N(this._b,255))+"%)":"rgba("+n(100*N(this._r,255))+"%, "+n(100*N(this._g,255))+"%, "+n(100*N(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:F[g(this._r,this._g,this._b,!0)]||!1},toFilter:function(t){var e="#"+v(this._r,this._g,this._b,this._a);var r=e;var a=this._gradientType?"GradientType = 1, ":"";if(t){var n=l(t);r=n.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+a+"startColorstr="+e+",endColorstr="+r+")"},toString:function(t){var e=!!t;t=t||this._format;var r=!1;var a=this._a<1&&this._a>=0;var n=!e&&a&&("hex"===t||"hex6"===t||"hex3"===t||"name"===t);return n?"name"===t&&0===this._a?this.toName():this.toRgbString():("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),("hex"===t||"hex6"===t)&&(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString())},_applyModification:function(t,e){var r=t.apply(null,[this].concat([].slice.call(e)));return this._r=r._r,this._g=r._g,this._b=r._b,this.setAlpha(r._a),this},lighten:function(){return this._applyModification(w,arguments)},brighten:function(){return this._applyModification(_,arguments)},darken:function(){return this._applyModification(x,arguments)},desaturate:function(){return this._applyModification(b,arguments)},saturate:function(){return this._applyModification(m,arguments)},greyscale:function(){return this._applyModification(y,arguments)},spin:function(){return this._applyModification(k,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(M,arguments)},complement:function(){return this._applyCombination(S,arguments)},monochromatic:function(){return this._applyCombination(H,arguments)},splitcomplement:function(){return this._applyCombination(A,arguments)},triad:function(){return this._applyCombination(C,arguments)},tetrad:function(){return this._applyCombination(P,arguments)}},l.fromRatio=function(t,e){if("object"==typeof t){var r={};for(var a in t)t.hasOwnProperty(a)&&(r[a]="a"===a?t[a]:z(t[a]));t=r}return l(t,e)};function c(t){var e={r:0,g:0,b:0};var r=1;var a=!1;var n=!1;return"string"==typeof t&&(t=V(t)),"object"==typeof t&&(t.hasOwnProperty("r")&&t.hasOwnProperty("g")&&t.hasOwnProperty("b")?(e=f(t.r,t.g,t.b),a=!0,n="%"===String(t.r).substr(-1)?"prgb":"rgb"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("v")?(t.s=z(t.s),t.v=z(t.v),e=p(t.h,t.s,t.v),a=!0,n="hsv"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("l")&&(t.s=z(t.s),t.l=z(t.l),e=h(t.h,t.s,t.l),a=!0,n="hsl"),t.hasOwnProperty("a")&&(r=t.a)),r=O(r),{ok:a,format:t.format||n,r:i(255,s(e.r,0)),g:i(255,s(e.g,0)),b:i(255,s(e.b,0)),a:r}}function f(t,e,r){return{r:255*N(t,255),g:255*N(e,255),b:255*N(r,255)}}function u(t,e,r){t=N(t,255),e=N(e,255),r=N(r,255);var a=s(t,e,r),n=i(t,e,r);var o,l,c=(a+n)/2;if(a==n)o=l=0;else{var f=a-n;switch(l=c>.5?f/(2-a-n):f/(a+n),a){case t:o=(e-r)/f+(e<r?6:0);break;case e:o=(r-t)/f+2;break;case r:o=(t-e)/f+4}o/=6}return{h:o,s:l,l:c}}function h(t,e,r){var a,n,i;t=N(t,360),e=N(e,100),r=N(r,100);function s(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*(e-t)*r:r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}if(0===e)a=n=i=r;else{var o=r<.5?r*(1+e):r+e-r*e;var l=2*r-o;a=s(l,o,t+1/3),n=s(l,o,t),i=s(l,o,t-1/3)}return{r:255*a,g:255*n,b:255*i}}function d(t,e,r){t=N(t,255),e=N(e,255),r=N(r,255);var a=s(t,e,r),n=i(t,e,r);var o,l,c=a;var f=a-n;if(l=0===a?0:f/a,a==n)o=0;else{switch(a){case t:o=(e-r)/f+(e<r?6:0);break;case e:o=(r-t)/f+2;break;case r:o=(t-e)/f+4}o/=6}return{h:o,s:l,v:c}}function p(t,e,r){t=6*N(t,360),e=N(e,100),r=N(r,100);var n=a.floor(t),i=t-n,s=r*(1-e),o=r*(1-i*e),l=r*(1-(1-i)*e),c=n%6,f=[r,o,s,s,l,r][c],u=[l,r,r,o,s,s][c],h=[s,s,l,r,r,o][c];return{r:255*f,g:255*u,b:255*h}}function g(t,e,r,a){var i=[I(n(t).toString(16)),I(n(e).toString(16)),I(n(r).toString(16))];return a&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function v(t,e,r,a){var i=[I(B(a)),I(n(t).toString(16)),I(n(e).toString(16)),I(n(r).toString(16))];return i.join("")}l.equals=function(t,e){return t&&e?l(t).toRgbString()==l(e).toRgbString():!1},l.random=function(){return l.fromRatio({r:o(),g:o(),b:o()})};function b(t,e){e=0===e?0:e||10;var r=l(t).toHsl();return r.s-=e/100,r.s=j(r.s),l(r)}function m(t,e){e=0===e?0:e||10;var r=l(t).toHsl();return r.s+=e/100,r.s=j(r.s),l(r)}function y(t){return l(t).desaturate(100)}function w(t,e){e=0===e?0:e||10;var r=l(t).toHsl();return r.l+=e/100,r.l=j(r.l),l(r)}function _(t,e){e=0===e?0:e||10;var r=l(t).toRgb();return r.r=s(0,i(255,r.r-n(255*-(e/100)))),r.g=s(0,i(255,r.g-n(255*-(e/100)))),r.b=s(0,i(255,r.b-n(255*-(e/100)))),l(r)}function x(t,e){e=0===e?0:e||10;var r=l(t).toHsl();return r.l-=e/100,r.l=j(r.l),l(r)}function k(t,e){var r=l(t).toHsl();var a=(n(r.h)+e)%360;return r.h=a<0?360+a:a,l(r)}function S(t){var e=l(t).toHsl();return e.h=(e.h+180)%360,l(e)}function C(t){var e=l(t).toHsl();var r=e.h;return[l(t),l({h:(r+120)%360,s:e.s,l:e.l}),l({h:(r+240)%360,s:e.s,l:e.l})]}function P(t){var e=l(t).toHsl();var r=e.h;return[l(t),l({h:(r+90)%360,s:e.s,l:e.l}),l({h:(r+180)%360,s:e.s,l:e.l}),l({h:(r+270)%360,s:e.s,l:e.l})]}function A(t){var e=l(t).toHsl();var r=e.h;return[l(t),l({h:(r+72)%360,s:e.s,l:e.l}),l({h:(r+216)%360,s:e.s,l:e.l})]}function M(t,e,r){e=e||6,r=r||30;var a=l(t).toHsl();var n=360/r;var i=[l(t)];for(a.h=(a.h-(n*e>>1)+720)%360;--e;)a.h=(a.h+n)%360,i.push(l(a));return i}function H(t,e){e=e||6;var r=l(t).toHsv();var a=r.h,n=r.s,i=r.v;var s=[];var o=1/e;for(;e--;)s.push(l({h:a,s:n,v:i})),i=(i+o)%1;return s}l.mix=function(t,e,r){r=0===r?0:r||50;var a=l(t).toRgb();var n=l(e).toRgb();var i=r/100;var s=2*i-1;var o=n.a-a.a;var c;c=s*o==-1?s:(s+o)/(1+s*o),c=(c+1)/2;var f=1-c;var u={r:n.r*c+a.r*f,g:n.g*c+a.g*f,b:n.b*c+a.b*f,a:n.a*i+a.a*(1-i)};return l(u)},l.readability=function(t,e){var r=l(t);var a=l(e);var n=r.toRgb();var i=a.toRgb();var s=r.getBrightness();var o=a.getBrightness();var c=Math.max(n.r,i.r)-Math.min(n.r,i.r)+Math.max(n.g,i.g)-Math.min(n.g,i.g)+Math.max(n.b,i.b)-Math.min(n.b,i.b);return{brightness:Math.abs(s-o),color:c}},l.isReadable=function(t,e){var r=l.readability(t,e);return r.brightness>125&&r.color>500},l.mostReadable=function(t,e){var r=null;var a=0;var n=!1;for(var i=0;i<e.length;i++){var s=l.readability(t,e[i]);var o=s.brightness>125&&s.color>500;var c=3*(s.brightness/125)+s.color/500;(o&&!n||o&&n&&c>a||!o&&!n&&c>a)&&(n=o,a=c,r=l(e[i]))}return r};var R=l.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};var F=l.hexNames=T(R);function T(t){var e={};for(var r in t)t.hasOwnProperty(r)&&(e[t[r]]=r);return e}function O(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function N(t,e){D(t)&&(t="100%");var r=E(t);return t=i(e,s(0,parseFloat(t))),r&&(t=parseInt(t*e,10)/100),a.abs(t-e)<1e-6?1:t%e/parseFloat(e)}function j(t){return i(1,s(0,t))}function q(t){return parseInt(t,16)}function D(t){return"string"==typeof t&&-1!=t.indexOf(".")&&1===parseFloat(t)}function E(t){return"string"===typeof t&&-1!=t.indexOf("%")}function I(t){return 1==t.length?"0"+t:""+t}function z(t){return t<=1&&(t=100*t+"%"),t}function B(t){return Math.round(255*parseFloat(t)).toString(16)}function L(t){return q(t)/255}var K=function(){var t="[-\\+]?\\d+%?";var e="[-\\+]?\\d*\\.\\d+%?";var r="(?:"+e+")|(?:"+t+")";var a="[\\s|\\(]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")\\s*\\)?";var n="[\\s|\\(]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")\\s*\\)?";return{rgb:new RegExp("rgb"+a),rgba:new RegExp("rgba"+n),hsl:new RegExp("hsl"+a),hsla:new RegExp("hsla"+n),hsv:new RegExp("hsv"+a),hsva:new RegExp("hsva"+n),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();function V(r){r=r.replace(t,"").replace(e,"").toLowerCase();var a=!1;if(R[r])r=R[r],a=!0;else if("transparent"==r)return{r:0,g:0,b:0,a:0,format:"name"};var n;return(n=K.rgb.exec(r))?{r:n[1],g:n[2],b:n[3]}:(n=K.rgba.exec(r))?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=K.hsl.exec(r))?{h:n[1],s:n[2],l:n[3]}:(n=K.hsla.exec(r))?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=K.hsv.exec(r))?{h:n[1],s:n[2],v:n[3]}:(n=K.hsva.exec(r))?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=K.hex8.exec(r))?{a:L(n[1]),r:q(n[2]),g:q(n[3]),b:q(n[4]),format:a?"name":"hex8"}:(n=K.hex6.exec(r))?{r:q(n[1]),g:q(n[2]),b:q(n[3]),format:a?"name":"hex"}:(n=K.hex3.exec(r))?{r:q(n[1]+""+n[1]),g:q(n[2]+""+n[2]),b:q(n[3]+""+n[3]),format:a?"name":"hex"}:!1}window.tinycolor=l}(),t(function(){t.fn.spectrum.load&&t.fn.spectrum.processNativeColorInputs()})});

/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 JΓ¶rn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});
