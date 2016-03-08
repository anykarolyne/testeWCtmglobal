(function($) {
    "use strict";

    // Start Section popup
    if (!$().tmsectionpoplink) {
        $.fn.tmsectionpoplink = function() {
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
                    id=t.attr('data-sectionid'),
                    title=t.attr('data-title')?t.attr('data-title'):tm_epo_js.i18n_addition_options,
                    section = $('div[data-uniqid="'+id+'"]'),
                    html_clone=section.tm_clone(),
                    $_html = floatbox_template({
                        "id": "temp_for_floatbox_insert",
                        "html": '',
                        "title": title
                    }),
                    clicked=false,
                    _ovl = $('<div class="fl-overlay"></div>').css({
                        zIndex: (t.zIndex - 1),
                        opacity: .8
                    });

                var cancelfunc=function(){
                    var pop=$('#tm-section-pop-up');
                    pop.parents().each(function(i,el){
                        var el=$(el),z= el.data('tm_zindex_fix');
                        if (z){
                            el.css( "z-Index" ,z);
                        }
                    });
                    _ovl.unbind().remove();
                    pop.find('.header').remove();
                    pop.find('.footer').remove();
                    section.unwrap();
                    section.unwrap();
                    section.find('.tm-section-link').show();
                    section.find('.tm-section-pop').hide();

                }

                t.on("click.tmsectionpoplink",function(e){
                    
                    e.preventDefault();
                    clicked=false;
                    _ovl.appendTo("body").click(cancelfunc);
                    
                    section.wrap('<div id="tm-section-pop-up" class="flasho tm_wrapper tm-section-pop-up single tm-animated appear">');
                    section.wrap('<div class="float_editbox" id="temp_for_floatbox_insert">');
                    $('#tm-section-pop-up')
                    .prepend("<div class=\'header\'><h3>" + title + "<\/h3><\/div>")
                    .append("<div class=\'footer\'><div class=\'inner\'><span class=\'tm-button button button-secondary button-large details_cancel\'>" + tm_epo_js.i18n_close + "<\/span><\/div><\/div>");
                    section.find('.tm-section-link').hide();
                    section.find('.tm-section-pop').show();
                    var pop=$('#tm-section-pop-up');
                    pop.parents().each(function(i,el){
                        var el=$(el),z= el.css( "z-Index" );
                        if (z!="auto"){
                            el.data('tm_zindex_fix',z);
                            el.css( "z-Index" ,"auto !important");
                        }
                    });

                    pop.find(".details_cancel").click(function() {
                        if (clicked){
                            return;
                        }
                        clicked=true;
                        cancelfunc();                        
                    });
                    $(window).trigger("tmlazy");
                });
                
            });
        };
    }// End Section popup

    // Start Conditional logic
    if (!$().cpfdependson) {
        
        $.fn.cpfdependson = function(fields, toggle, what) {
            var elements    = this,
                matches     = 0;
            
            if (elements.length==0 || !typeof fields =="object"){
                return;
            }

            if (!toggle){
                toggle="show";
            }
            if (!what){
                what="all";
            }
            
            $.each(fields,function(i,field){
                if (!typeof fields == "object"){
                    return true;
                }
                var element=get_element_from_field(field.element);
                if (element && !$(element).data('tmhaslogicevents')){
                    if ($(element).is(".tm-epo-variation-element")){
                        add_variation_event('change.tmlogic', 'input[name="variation_id"]', function(event, variation) {
                            run_cpfdependson();
                        });
                    }else{
                        var _events="change.cpflogic";
                        if ($(element).is(":text") || $(element).is("textarea")){
                            _events="change.cpflogic keyup.cpflogic";
                        }
                        $(element).off(_events).on(_events,function(e){
                            run_cpfdependson();
                        });                        
                    }
                    $(element).data('tmhaslogicevents',1);
                }
                matches++;
            });
            
            elements.each(function(i,el){
                var $this=$(this);
                $this.data("matches",matches)
                    .data("toggle",toggle)
                    .data("what",what)
                    .data("fields",fields);
                var show=false;
                switch (toggle){
                    case "show":
                        show=false;
                    break;
                    case "hide":
                        show=true;
                    break;
                }
                if (show){
                    $this.show();
                }else{
                    $this.hide();
                }                
                $this.data('isactive',show);
            });

            elements.addClass('iscpfdependson').data('iscpfdependson',1);
            return elements.each(function(){
                $(this).addClass("is-epo-depend");
            });
        };
    }

    function run_cpfdependson(obj){
        if (!$(obj).length){
            obj="body";
        }
        var iscpfdependson = $(obj).find('.iscpfdependson');
        iscpfdependson.each(function(i,elements){
            $(elements).each(function(j,el){                
                tm_check_rules($(el));
            });            
        });
        iscpfdependson.each(function(i,elements){
            $(elements).each(function(j,el){                
                tm_check_rules($(el),'cpflogic');                
            });            
        });
        if ($().selectric){
            $('.tm-extra-product-options select').selectric('init');
        }

        $(window).trigger("tmlazy");
    }

    function tm_check_rules(o,theevent){
        o.each(function(theindex,theelement){
            var matches = $(this).data("matches"),
                toggle  = $(this).data("toggle"),
                what    = $(this).data("what"),
                fields  = $(this).data("fields"),
                checked = 0,
                show    = false;

            switch (toggle){
                case "show":
                    show=false;
                break;
                case "hide":
                    show=true;
                break;
            }

            $.each(fields,function(i,field){
                var fia=true;
                if (theevent=='cpflogic'){
                    fia=field_is_active($(field.element));
                }
                if (fia && tm_check_field_match(field)){
                    checked++;
                }
            });

            if (what=="all"){
                if (matches==checked){
                    show=!show;
                }
            }else{
                if (checked>0){
                    show=!show;
                }

            }
            if (show){
                $(this).show();
            }else{
                $(this).hide();
            }
            $(this).data('isactive',show);
        });
    }

    function tm_check_field_match(f){
        var element     = $(f.element),
            operator    = f.operator,
            value       = f.value,
            val;
            if (!element.length){
                return false;
            }
            var _class      = element.attr("class").split(' ')
            .map(function(cls) {
                if (cls.indexOf("cpf-type-", 0) !== -1) {
                    return cls;
                }
            })
            .filter(function(v, k, el) {
                if (v !== null && v !== undefined) {
                    return v;
                }
            });
                
        if (_class.length>0){
            _class=_class[0];
            switch (_class){
                case "cpf-type-radio" :
                    var radio           = element.find("input.tm-epo-field.tmcp-radio"),
                        radio_checked   = element.find("input.tm-epo-field.tmcp-radio:checked");

                    if (operator=='is' || operator=='isnot'){
                        if (radio_checked.length==0){
                            return false;
                        }
                        var eq=radio.index(radio_checked),
                            builder_addition="_"+eq;

                        builder_addition=builder_addition.length;                        
                        val=element.find("input.tm-epo-field.tmcp-radio:checked").val();
                        if(val){
                            val=val.slice(0,-builder_addition); 
                        }
                    }else if (operator=='isnotempty'){
                        return radio_checked.length>0
                    }else if (operator=='isempty'){
                        return radio_checked.length==0
                    }
                    break;
                case "cpf-type-checkbox" :
                    var checkbox            = element.find("input.tm-epo-field.tmcp-checkbox"),
                        checkbox_checked    = element.find("input.tm-epo-field.tmcp-checkbox:checked");

                    if (operator=='is' || operator=='isnot'){
                        if (checkbox_checked.length==0){
                            return false;
                        }
                        var ret=false;
                        checkbox_checked.each(function(i,el){
                            var eq                  = checkbox.index($(el)),
                                builder_addition    = "_"+eq;

                            builder_addition=builder_addition.length;
                            val=$(el).val();
                            if(val){
                                val=val.slice(0,-builder_addition); 
                            }
                            if (tm_check_match(val,value,operator)){
                                ret=true;
                            }
                        });
                        return ret;
                    }else if (operator=='isnotempty'){
                        return checkbox_checked.length>0
                    }else if (operator=='isempty'){
                        return checkbox_checked.length==0
                    } 
                    break;
                case "cpf-type-select" :
                    var select = element.find("select.tm-epo-field.tmcp-select"),
                        options = element.find("select.tm-epo-field.tmcp-select").children('option'),
                        selected = element.find("select.tm-epo-field.tmcp-select").children('option:selected');
                    var eq=options.index(selected);
                        
                    if (options.eq(0).val()==="" && options.eq(0).attr('data-rulestype')===""){
                        eq=eq-1;
                    }

                    var builder_addition="_"+eq;

                    builder_addition=builder_addition.length;
                    val=element.find("select.tm-epo-field.tmcp-select").val();
                    if(val){
                        val=val.slice(0,-builder_addition); 
                    }

                    break;
                case "cpf-type-textarea" :
                    val=element.find("textarea.tm-epo-field.tmcp-textarea").val();

                    break;
                case "cpf-type-textfield" :
                    val=element.find("input.tm-epo-field.tmcp-textfield").val();
                    break;

                case "cpf-type-variations" :
                    return tm_variation_check_match(element,value,operator);
                    break;


                }
            return tm_check_match(val,value,operator);

        }else{
            return false;
        }

        return false;
                    
    }

    function tm_variation_check_match(element, val2, operator){
        if (element!=null && val2!=null){
            val2 = val2 ? parseInt(val2) : -1;
        }
        var variations_form=$(element).closest(".variations_form"),
            val1,
            variation_id_selector='input[name^="variation_id"]';
        if ( variations_form.find( 'input.variation_id' ).length > 0 ){
            variation_id_selector='input.variation_id';
        }
        val1=variations_form.find( variation_id_selector ).val();
        
        switch(operator){
        case "is" :
            return (val1!="" && val1 == val2);
            break;

        case "isnot" :
            return (val1!="" && val1 != val2);
            break;

        case "isempty" :
            return ( val1 == "" );
            break;

        case "isnotempty" :
            return ( !(val1 == "") );
            break;

        }
        return false;
    }
    function tm_check_match(val1, val2, operator){
        if (val1!=null && val2!=null){
            
            val1=encodeURIComponent(val1);
            //val2=encodeURIComponent(decodeURIComponent(val2));//backwards compatible

            if ($.qtranxj_split){
                val2=encodeURIComponent( $.qtranxj_split(decodeURIComponent(val2))[tm_epo_q_translate_x_clogic_js['language']] );//backwards compatible
            }else{
                val2=encodeURIComponent(decodeURIComponent(val2));//backwards compatible
            }

            val1 = val1 ? val1.toLowerCase() : "";
            val2 = val2 ? val2.toLowerCase() : "";
        }
        switch(operator){
        case "is" :
            return (val1!=null && val1 == val2);
            break;

        case "isnot" :
            return (val1!=null && val1 != val2);
            break;

        case "isempty" :
            return !( (val1 != undefined && val1!='') );
            break;

        case "isnotempty" :
            return ( (val1 != undefined && val1!='') );
            break;

        }
        return false;
    }    

    function field_is_active(field){
        var hide_element;
        if (!$(field).is('.cpf_hide_element')){
            hide_element=$(field).closest('.cpf_hide_element');
        }else{
            hide_element=$(field);
        }

        if ($(hide_element).data('isactive')!==false && $(hide_element).closest('.cpf-section').data('isactive')!==false){
            $(field).prop('disabled',false);
            return true;
        }
        if (!$(field).is('.cpf_hide_element')){
            $(field).prop('disabled',true);
        }
        return false;
    }

    function get_element_from_field(element){

        if ($(element).length==0){
            return;
        }
        
        var _class=element.attr("class").split(' ')
            .map(function(cls) {
                if (cls.indexOf("cpf-type-", 0) !== -1) {
                    return cls;
                }
            })
            .filter(function(v, k, el) {
                if (v !== null && v !== undefined) {
                    return v;
                }
            });

        if (_class.length>0){
            _class=_class[0];
            
            switch (_class){
                case "cpf-type-radio" :
                    return element.find(".tm-epo-field.tmcp-radio");
                    break;
                case "cpf-type-checkbox" :
                    return element.find(".tm-epo-field.tmcp-checkbox");
                    break;
                case "cpf-type-select" :
                    return element.find(".tm-epo-field.tmcp-select");
                    break;
                case "cpf-type-textarea" :
                    return element.find(".tm-epo-field.tmcp-textarea");
                    break;
                case "cpf-type-textfield" :
                    return element.find(".tm-epo-field.tmcp-textfield");
                    break;
                case "cpf-type-date" :
                    return element.find(".tm-epo-field.tmcp-date");
                    break;
                case "cpf-type-variations" :
                    return element.closest('.cpf-section').find(".tm-epo-field.tm-epo-variation-element");
                    break;
            }
            return;
        }
        return;
    }

    var validate_logic=function(l){
        return (typeof l =="object") && ("toggle" in l) && ("what" in l) && ("rules" in l) && (l.rules.length>0);
    }

    /* Following loops are required for the logic to work on composite products that have custom variations */
    var cpf_section_logic=function(obj){
        
        var root_element=$(obj),
            all_sections=root_element.find(".cpf-section"),
            search_obj;
        
        if (root_element.is('.cpf-section')){
            search_obj = false;
        }else{
            search_obj = all_sections;
        }
        
        root_element.each(function(j,obj_el){            
            var cpf_section;
            if ($(obj_el).is('.cpf-section')){
                cpf_section = $(obj_el);
            }else{
                cpf_section = $(obj_el).find(".cpf-section");
            }
            
            cpf_section.each(function(index,el){
                var sect = $(el),
                    id = sect.data("uniqid"),
                    logic = sect.data("logic"),
                    haslogic = parseInt(sect.data("haslogic")),
                    fields=[];

                if (haslogic==1 && validate_logic(logic)){

                    $.each(logic.rules,function(i,rule){
                        var section     = rule.section,
                            element     = rule.element,
                            operator    = rule.operator,
                            value       = rule.value,
                            obj_section,
                            obj_element;

                        if (search_obj){
                            obj_section = search_obj.filter('[data-uniqid="'+section+'"]'),
                            obj_element = obj_section.find(".cpf_hide_element").eq(element);
                        }else{
                            obj_element = root_element.find(".cpf_hide_element").eq(element);
                        }

                        fields.push({
                            "element":obj_element,
                            "operator":operator,
                            "value":value
                        });
                    });
                    if (!sect.data('iscpfdependson')){
                        sect.cpfdependson(fields,logic.toggle,logic.what);
                    }
                }

            });

        });
        
    }

    var cpf_element_logic=function(obj){

        var root_element=$(obj), 
            all_sections=root_element.find(".cpf-section"),
            search_obj;
        
        if (root_element.is('.cpf-section')){
            search_obj = false;
        }else{
            search_obj = all_sections;
        }

        root_element.find(".cpf_hide_element").each(function(index,el){
            var current_element = $(el),
                id              = current_element.data("uniqid"),
                logic           = current_element.data("logic"),
                haslogic        = parseInt(current_element.data("haslogic"));

            if (haslogic==1 && validate_logic(logic)){
                var fields=[];
                $.each(logic.rules,function(i,rule){
                    var section     = rule.section,
                        element     = rule.element,
                        operator    = rule.operator,
                        value       = rule.value,
                        obj_section,
                        obj_element;

                    if (search_obj){
                        obj_section = search_obj.filter('[data-uniqid="'+section+'"]');
                        obj_element = obj_section.find(".cpf_hide_element").eq(element);
                    }else{
                        obj_element = root_element.find(".cpf_hide_element").eq(element);
                    }

                    fields.push({
                        "element":obj_element,
                        "operator":operator,
                        "value":value
                    });
                });
                if (!current_element.data('iscpfdependson')){
                    current_element.cpfdependson(fields,logic.toggle,logic.what);
                }
            }
        });
        
    }// End Conditional logic
    
    // Taxes setup
    function tm_set_tax_price(value, _cart) {
        if (_cart){
            var taxable = _cart.attr("data-taxable"),
                tax_rate = _cart.attr("data-tax-rate"),
                tax_string = _cart.attr("data-tax-string"),
                tax_display_mode = _cart.attr("data-tax-display-mode"),
                prices_include_tax = _cart.attr("data-prices-include-tax");

            if ( taxable ) {
                if ( tax_display_mode== 'excl' ) {// Display without taxes
                    if (prices_include_tax=="1"){
                        value = parseFloat(value)/(1+(tax_rate/100));
                    }else{
                        
                    }                    

                } else {// Display with taxes
                    if (prices_include_tax=="1"){
                        
                    }else{
                        value = parseFloat(value)*(1+(tax_rate/100));
                    }

                }
            }

        }
        return value;
    }

    /**
     * Return a formatted currency value
     */
    function tm_set_price(value, _cart, notax, taxstring) {
        if(!notax){
            value=tm_set_tax_price(value, _cart);
        }
        var inc_tax_string="";
        if (_cart && taxstring){
            inc_tax_string = _cart.attr("data-tax-string")
        }
        if (inc_tax_string==undefined){
            inc_tax_string='';
        }
        return accounting.formatMoney(value, {
            symbol: tm_epo_js.currency_format_symbol,
            decimal: tm_epo_js.currency_format_decimal_sep,
            thousand: tm_epo_js.currency_format_thousand_sep,
            precision: tm_epo_js.currency_format_num_decimals,
            format: tm_epo_js.currency_format
        }) + inc_tax_string;
    }

    function tm_update_price(obj,price,formated_price){
        if ((tm_epo_js.tm_epo_auto_hide_price_if_zero=="yes" && price>0) || tm_epo_js.tm_epo_auto_hide_price_if_zero!="yes"){
            $(obj).html(formated_price);
        }else{
            $(obj).empty();
        }
    }
    
    var late_variation_event = [];
    function add_variation_event(name,selector,func){
        late_variation_event[late_variation_event.length] = {
            "name" : name,
            "selector" : selector,
            "func" : func
        };        
    }
    
    function tm_init_epo(main_product){
        
        main_product=$(main_product);    

        // Range picker setup
        function tm_set_range_pickers(){
            main_product.find('.tm-range-picker').each(function(i,el){
                var el=$(el),
                    $decimals=el.attr('data-step').split("."),
                    $tmfid=main_product.find('#'+el.attr('data-field-id')),
                    $min=parseFloat(el.attr('data-min')),
                    $max=parseFloat(el.attr('data-max')),
                    $start=parseFloat(el.attr('data-start')),
                    $step=parseFloat(el.attr('data-step')),
                    $show_picker_value=el.attr('data-show-picker-value'),
                    $show_label=el.closest("li").find(".tm-show-picker-value");

                if ($decimals.length==1){
                    $decimals=0;
                }else{
                    $decimals=$decimals[1].length;
                }
                if (isNaN($min)){
                    $min=0;
                }
                if (isNaN($max)){
                    $max=0;
                }
                if ($max<=$min){
                    $max++;
                }
                if (isNaN($start)){
                    $start=0;
                }
                if (isNaN($step)){
                    $step=0;
                }

                el.noUiSlider({
                    start: $start,
                    step: $step,
                    connect: 'lower',            
                    // Configure tapping, or make the selected range dragable.
                    behaviour: 'snap',            
                    // Full number format support.
                    format: wNumb({
                        mark: ".",
                        decimals: $decimals,
                        thousand: "",
                    }),            
                    // Support for non-linear ranges by adding intervals.
                    range: {
                        'min': $min,
                        'max': $max
                    }
                }).on("slide",function(){
                    if ($show_picker_value!="left" && $show_picker_value!="right"){
                        $tmh.attr('title',$tmfid.val());
                    }
                    $tmh.trigger('tmmovetooltip');
                    $tmfid.trigger('change.cpf');
                    if ($show_picker_value!=""){
                        $show_label.html($tmfid.val());
                    }                    
                }).on("set",function(){
                    if ($show_picker_value!="left" && $show_picker_value!="right"){
                        $tmh.attr('title',$tmfid.val());
                    }
                    if ($show_picker_value!=""){
                        $show_label.html($tmfid.val());
                    }
                });

                var $tmh=el.find('.noUi-handle-lower');
                if ($show_picker_value!="left" && $show_picker_value!="right"){
                    $tmh.attr('title',el.attr('data-start'));
                    $.tm_tooltip($tmh);
                }
                if ($show_picker_value!=""){
                    $show_label.html($start);
                }

                if (el.attr('data-pips')=="yes"){
                    el.noUiSlider_pips({
                        mode: 'count',
                        values: 5,
                        density: 2,
                        stepped: true
                    });
                }
                el.Link('lower').to($tmfid);            
            });
            
        }

        // Date picker setup
        function tm_set_datepicker(){
            if (!$.datepicker){
                return;
            }

            var inputIds = $('input').map(function() {
                    return this.id;
                }).get().join(' '),

                update_date_fields = function(input, inst){
                    var id = main_product.find(input).attr("id"),
                        day = main_product.find('#' + id + '_day'),
                        month = main_product.find('#' + id + '_month'),
                        year = main_product.find('#' + id + '_year');
                        
                    day.val(inst.selectedDay);
                    month.val(inst.selectedMonth + 1);
                    year.val(inst.selectedYear);
                };

            main_product.find( ".tm-epo-datepicker" ).each(function(i,el){
                var $this=$(el),
                    startDate=parseInt($this.attr('data-start-year')),
                    endDate=parseInt($this.attr('data-end-year')),
                    minDate=$this.attr('data-min-date'),
                    maxDate=$this.attr('data-max-date'),
                    disabled_dates=$this.attr('data-disabled-dates'),
                    enabled_only_dates=$this.attr('data-enabled-only-dates'),
                    disabled_weekdays=$this.attr('data-disabled-weekdays').split(","),
                    format=$this.attr('data-date-format'),
                    show=$this.attr('data-date-showon');

                if (disabled_dates!=""){
                    var $split=disabled_dates.split(','),
                        $index=disabled_dates.indexOf(',');

                    if ($index!=-1 && $split.length>0){
                        disabled_dates=$split;
                    }
                }
                if (enabled_only_dates!=""){
                    var $split=enabled_only_dates.split(','),
                        $index=enabled_only_dates.indexOf(',');

                    if ($index!=-1 && $split.length>0){
                        enabled_only_dates=$split;
                    }
                }

                if (minDate==""){
                    if(startDate==""){
                        minDate=null;
                    }else{
                        minDate=new Date(startDate, 1 - 1, 1);
                    }
                }
                if (maxDate==""){
                    if(endDate==""){
                        endDate=null;
                    }else{
                        maxDate=new Date(endDate, 12 - 1, 31);
                    }
                }
                $this.datepicker({
                    monthNames: tm_epo_js.monthNames,
                    monthNamesShort: tm_epo_js.monthNamesShort,
                    dayNames: tm_epo_js.dayNames,
                    dayNamesShort: tm_epo_js.dayNamesShort,
                    dayNamesMin: tm_epo_js.dayNamesMin,
                    isRTL: tm_epo_js.isRTL,

                    showOn: show,
                    buttonText:"",
                    showButtonPanel: true,
                    closeText:tm_epo_js.closeText,
                    currentText:tm_epo_js.currentText,
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: format,
                    minDate: minDate,
                    maxDate: maxDate,
                    onSelect: function (dateText, inst) {
                       update_date_fields(this, inst);
                    },
                    beforeShow: function(input, inst) {
                        $('#ui-datepicker-div').removeClass(inputIds).addClass(this.id+ ' tm-epo-skin');
                        $("body").addClass("tm-static");
                        $this.prop("readonly",true);
                        //$this.blur();
                    },
                    onClose: function(dateText, inst) {
                        $("body").removeClass("tm-static");                    
                        $this.prop("readonly",false);
                        $this.trigger("change");
                    },
                    beforeShowDay: function(date){
                        var day = date.getDay();
                        if (enabled_only_dates!=""){
                            var string = $.datepicker.formatDate(format, date);
                            return [ enabled_only_dates.indexOf(string) != -1 ];
                        }else{
                            
                            if (disabled_weekdays.indexOf(day.toString())!=-1){
                                return [false];
                            }
                            if (disabled_dates!=""){
                                var string = $.datepicker.formatDate(format, date);
                                return [ disabled_dates.indexOf(string) == -1 ];
                            }else{
                                return [true];
                            }

                        }
                    }
                }).on('change.tmdate', function(e){
                    var input=$(this),
                        id='#' + input.attr("id"),
                        format=input.attr('data-date-format'),
                        date = input.datepicker('getDate'),
                        day='',
                        month='',
                        year='',
                        day_field=main_product.find(id + '_day'),
                        month_field=main_product.find(id + '_month'),
                        year_field=main_product.find(id + '_year');

                    if (date){
                        day  = date.getDate();
                        month = date.getMonth() + 1;
                        year =  date.getFullYear();
                        var string = $.datepicker.formatDate(format, date);
                        if (disabled_weekdays.indexOf(date.getDay().toString())!=-1 
                            || disabled_dates.indexOf(string) != -1 
                            || (enabled_only_dates!="" && enabled_only_dates.indexOf(string) == -1)
                        ){                        
                            var ld=input.data('tm-last-date');
                            if (input.data('tm-last-date')){
                                ld=input.data('tm-last-date');
                            }else{
                                ld='';
                            }
                            input.val(ld);
                            input.datepicker('setDate',ld);
                            if (ld){
                                date = input.datepicker('getDate');
                                day  = date.getDate();
                                month = date.getMonth() + 1;
                                year =  date.getFullYear();
                            }else{
                                day='';
                                month='';
                                year='';
                            }
                        }

                    }

                    day_field.val(day);
                    month_field.val(month);
                    year_field.val(year);

                    input.data('tm-last-date',input.val());
                    
                });
                $('#ui-datepicker-div').hide();
            });
            
            main_product.find('.tmcp-date-select').on('change.cpf',function(e){

                var id='#' + $(this).attr("data-tm-date"),
                    input=main_product.find(id),
                    format=input.attr('data-date-format'),
                    day=main_product.find(id + '_day').val(),
                    month=main_product.find(id + '_month').val(),
                    year=main_product.find(id + '_year').val(),
                    dateFormat = $.datepicker.formatDate(format, new Date( year, month-1, day));
                if (day>0 && month>0 && year>0){
                    input.datepicker( "setDate", dateFormat );
                    input.trigger("change");
                }else{
                    input.val("");
                    input.trigger("change.cpf");
                }


            });       

            $(window).on("resizestart",function() {            
                var field = $(document.activeElement);
                if (field.is('.hasDatepicker')) {
                    field.data("resizestarted",true);
                    if ($(window).width()<768){
                        field.data("resizewidth",true);
                        return;
                    }
                    field.datepicker('hide');                
                }
            });
            $(window).on("resizestop",function() {            
                var field = $(document.activeElement);
                if (field.is('.hasDatepicker') && field.data("resizestarted")) {
                    if (field.data("resizewidth")){
                        field.datepicker('hide');
                    }
                    field.datepicker('show');                
                }
                field.data("resizestarted",false);
                field.data("resizewidth",false);
            });

        };        

        // URL replacement setup
        function tm_set_url_fields(){
            $(document).on("click.cpfurl change.cpfurl tmredirect", ".use_url_containter .tmcp-radio, .use_url_containter .tmcp-radio+label", function(e) {
                var data_url=$(this).attr("data-url");
                if (data_url){
                    if (window.location!=data_url){
                        e.preventDefault();                
                        window.location=data_url;
                    }
                }
            });
            $(document).on("change.cpfurl tmredirect", ".use_url_containter .tmcp-select", function(e) {
                var selected=$(this).children('option:selected'),
                    data_url=selected.attr("data-url");
                if (data_url){
                    if (window.location!=data_url){
                        e.preventDefault();                
                        window.location=data_url;
                    }
                }
            });
        }

        function tm_form_submit_event(){

            if (!main_cart){
                 main_cart = main_product.find('.cart:last');
            }
            var form;
            if (main_cart.is("form.cart")){
                form=main_cart;
            }else{
                form=main_cart.closest("form");
            }

            if (tm_epo_js.tm_epo_global_enable_validation=="yes"){
                var validation_rules={};
                main_product.find(".tmcp-ul-wrap").each(function(loop_index,tmcpulwrap){
                    tmcpulwrap=$(tmcpulwrap);
                    var has_rules=tmcpulwrap.data('tm-validation');
                    if (has_rules && $.tmType(has_rules)==="object"){
                        var field=tmcpulwrap.find(".tm-epo-field"),
                            field_name=field.first().attr("name");
                        if (tmcpulwrap.is(".tm-extra-product-options-radio.tm-element-ul-radio")){
                            field_name=field.last().attr("name");
                        }    
                        if (tmcpulwrap.is(".tm-extra-product-options-checkbox.tm-element-ul-checkbox")){
                            field.each(function(f,fname){
                                if ("required" in has_rules){
                                    has_rules["required"]=function(elem){
                                        var len=tmcpulwrap.find("input.tm-epo-field.tmcp-checkbox:checked").length;
                                        if (len==0){
                                            if(field.last().attr("name")==$(elem).attr("name")){
                                                return true;
                                            }else{
                                                return false;
                                            }                                            
                                        }
                                        return len <= 0;
                                    };
                                }
                                validation_rules[$(fname).attr("name")]=has_rules;
                            });
                            
                        }else{
                            validation_rules[field_name]=has_rules;
                        }                        
                    }
                });
                
                form.validate({
                    ignore: ".ignore,.variations select,.tm-extra-product-options-variations input,.tm-extra-product-options-variations select",
                      rules: validation_rules,
                      errorClass: "tm-error",
                      validClass: "tm-valid",
                      errorElement: "label",
                    errorPlacement: function(error, element) {
                        if (element.is('.tm-epo-field.tmcp-radio')){
                            error.appendTo( element.closest(".tmcp-ul-wrap").find(".tmcp-field-wrap").last() );
                        }else{
                            error.appendTo( element.closest(".tmcp-field-wrap") );
                        }                        
                    },
                    invalidHandler: function(event, validator) {
                        setTimeout(function() {
                            main_product.find('.single_add_to_cart_button').removeAttr('disabled');
                        }, 100 );
                    }
                });                
            }

            if (form_submit_events.length){

                form.on("submit",function(e){
                    var form_is_submit = true;
                    for (var i = 0; i < form_submit_events.length; i++) {
                        var form_event = form_submit_events[i],
                            type = typeof(form_event);
                        if(type=="object"){
                            var trigger = typeof(form_event.trigger)=="function" || false;

                            if(trigger){
                                if (!form_event.trigger()){
                                    form_is_submit = false;
                                    break;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < form_submit_events.length; i++) {
                        var form_event = form_submit_events[i],
                            type = typeof(form_event);
                        if(type=="object"){
                            var on_true = typeof(form_event.on_true)=="function" || false,
                                on_false = typeof(form_event.on_false)=="function" || false;

                            if(form_is_submit){
                                form_event.on_true();
                            }else{
                                form_event.on_false();
                            }
                        }

                    }
                    if(!form_is_submit){
                        setTimeout(function() {
                            main_product.find('.single_add_to_cart_button').removeAttr('disabled');
                        }, 100 );
                    }
                    return form_is_submit;
                });
            }
        }

        function tm_floating_totals(){
            if (tm_epo_js.floating_totals_box && tm_epo_js.floating_totals_box!='disable'){

                var $tm_epo_totals=main_product.find(".tm-epo-totals");
                if ( main_cart && $tm_epo_totals.length ) {
                    // append div container
                    var $tm_floating_box=$('<div class="tm-floating-box '+tm_epo_js.floating_totals_box+'"></div>');
                    $tm_floating_box.appendTo("body").hide();
                    
                    var tm_epo_totals_main=main_cart.find(".tm-epo-totals");

                    var tm_update_epo_pop = function(){
                        var tm_epo_totals_html=tm_epo_totals_main.data('tm-html'),
                            tm_floating_box_data=tm_epo_totals_main.data('tm-floating-box-data'),
                            tm_floating_box_data_html='';
                        if (tm_floating_box_data && tm_floating_box_data.length){
                            tm_floating_box_data_html='<dl class="tm-fb">';
                            $.each(tm_floating_box_data,function(i,row){
                                if(row.title==''){
                                    row.title='&nbsp;';
                                }
                                if(row.value==''){
                                    row.value='&nbsp;';
                                }
                                if (!row.title){
                                    row.title='&nbsp;';
                                }else{
                                    row.title=$('<div>'+row.title+'</div>');
                                    row.title.find('span').remove();
                                    row.title=row.title.html();
                                }
                                
                                tm_floating_box_data_html +='<dt class="tm-fb-title">'+row.title+'</dt><dd class="tm-fb-value">'+row.value+'</dd>';
                            });
                            tm_floating_box_data_html +='</dl>';
                        }
                        if (tm_epo_totals_html && tm_epo_totals_html!=''){
                            $tm_floating_box.fadeIn();
                        }else{
                            $tm_floating_box.fadeOut();
                        }
                        $tm_floating_box.html(tm_floating_box_data_html+tm_epo_totals_html);
                    }
                    tm_update_epo_pop();
                    
                    main_cart.on('tm-epo-after-update',  function() {  
                        tm_update_epo_pop();
                    });

                    var tm_update_epo_pop_scroll = function(){
                        if ( $(window).scrollTop() > 100 ) {
                            if ($tm_floating_box.is(":hidden") && !$tm_floating_box.is(":empty")){
                                $tm_floating_box.fadeIn();
                            }
                            tm_update_epo_pop();
                        }else{
                            if (!$tm_floating_box.is(":hidden")){
                                $tm_floating_box.fadeOut();
                            }
                        }                    
                    }
                    tm_update_epo_pop_scroll();

                    $(window).on( 'scroll', function () {
                        tm_update_epo_pop_scroll();
                    });

                }

            }
        }        
        /**
         * Holds the main cart when using Composite Products
         */
        var main_cart=false,        
            main_epo_inside_form=false,
            form_submit_events = [],
            all_epo = main_product.find(epo_selector),
            has_epo = all_epo.length,
            composite_selector = '.bto_item,.component',
            all_composites = main_product.find(composite_selector),
            has_composite = all_composites.length,
            one_option_is_selected=false;
        if(!has_epo){
            if (main_product.is(".product")){
                main_product=$("body");
                all_epo = main_product.find(epo_selector),
                has_epo = all_epo.length;
                all_composites = main_product.find(composite_selector);
                has_composite = all_composites.length;
            }            
        }

        if(!has_epo && tm_epo_js.tm_epo_enable_final_total_box_all=="no"){
            return;
        }

        function tm_check_main_cart(){
            if (!main_cart){
                 main_cart = main_product.find('.cart').last();
            }
            var form;
            if (main_cart.is("form.cart")){
                form=main_cart;
            }else{
                form=main_cart.closest("form");
            }
            var main_epo_inside_form_check=form.find(".tm-extra-product-options.tm-cart-main").length;
            
            if (main_epo_inside_form_check>0){
                main_epo_inside_form=true;
            }

            // todo:identify by product id as if multiple carts are on page appends are wrong.
            if (!main_epo_inside_form){
                var product_id = main_product.find('input[name="add-to-cart"]').val();
                form_submit_events[form_submit_events.length] = {
                    "trigger":function(){return true;},
                    "on_true":function(){
                        // visible fields
                        var epos=$('.tm-extra-product-options.tm-cart-main[data-product-id="'+product_id+'"]').tm_clone();
                        // hidden fields see totals.php
                        var epos_hidden=$('.tm-totals-form-main[data-product-id="'+product_id+'"]').tm_clone();
                        var formepo=$('<div class="tm-hidden tm-formepo"></div>');
                        formepo.append(epos);
                        formepo.append(epos_hidden);
                        form.append(formepo);
                        return true;
                    },
                    "on_false":function(){
                        setTimeout(function() {
                            $('.tm-formepo').remove();
                        }, 100 );
                    }
                };
            }
        }
        tm_check_main_cart();

        function tm_show_hide_add_to_cart_button(){
            //Hide cart button check
            if (has_epo && tm_epo_js.tm_epo_hide_add_cart_button=="yes"){
                var button_selector='.single_add_to_cart_button',button=main_product.find(button_selector);
                if(one_option_is_selected){
                    button.show();
                }else{
                    button.hide();
                }
            }

        }
        var add_late_fields_prices=function(product_price,bid,_cart){
            var total=0;
            $.each(late_fields_prices,function(i,field){
                var price=field["price"],
                    setter=field["setter"],
                    id,
                    hidden,
                    bundleid=field["bundleid"],
                    real_setter=setter;

                if (setter.is("option")){
                    real_setter=setter.closest("select");                    
                }
                id=real_setter.attr("name");
                hidden=main_product.find('#'+id+'_hidden');
                
                if (bundleid==bid){
                    
                    price=(price/100)*product_price;
                    if(real_setter.data('tm-quantity')){
                        price=price*parseFloat(real_setter.data('tm-quantity'));
                    }
                    if (setter.data('isset')==1 && field_is_active(setter)){
                        total=total+price;
                    }
                    var formatted_price = tm_set_price(price,_cart);
                    setter.data('price', tm_set_tax_price(price,_cart));
                    setter.data('pricew', tm_set_tax_price(price,_cart));
                    
                    tm_update_price(setter.closest('.tmcp-field-wrap').find('.amount'),price,formatted_price);
                    
                    if (hidden.length==0){
                        real_setter.before('<input type="hidden" id="'+id+'_hidden" name="'+id+'_hidden" value="'+price+'" />');                        
                    }
                    if (setter.is(".tm-epo-field.tmcp-radio")){
                        if(setter.is(":checked")){
                            hidden.val(price);
                        }
                    }else{
                        hidden.val(price);
                    }
                }else{
                    if (setter.data('pricew')!==undefined){
                        var formatted_price = tm_set_price(setter.data('pricew'),_cart,true);
                        tm_update_price(setter.closest('.tmcp-field-wrap').find('.amount'),setter.data('pricew'),formatted_price);                        
                    }
                }
            });
            late_fields_prices=[];

            return total;
        }

        /**
         * Limit checkbox selection
         */
        main_product.find(".tm-extra-product-options").on('change.cpflimit', 'input.tm-epo-field.tmcp-checkbox', function () {            
            var allowed=parseInt($(this).attr('data-limit'));
            if (allowed>0){
                var checked = $(this).closest(".tm-extra-product-options-checkbox").find("input.tm-epo-field[type='checkbox']:checked").length;
                if (checked>allowed){
                    $(this).prop("checked", "").trigger("change");
                }
            }
            allowed=parseInt($(this).attr('data-exactlimit'));
            if (allowed>0){
                var checked = $(this).closest(".tm-extra-product-options-checkbox").find("input.tm-epo-field[type='checkbox']:checked").length;
                if (checked>allowed){
                    $(this).prop("checked", "").trigger("change");
                }
            }
        });

        /**
         * Exact value checkbox check (Todo:check for isvisible)
         */
        var exactlimit_cont=main_product.find('.tm-exactlimit');
        function tm_exactlimit_cont(){
            var checkall=true;
            exactlimit_cont.each(function(){
                 var exactlimit=$(this).find("[type='checkbox'][data-exactlimit]");
                 if (exactlimit.length && field_is_active(exactlimit)){
                    var eln=parseInt(exactlimit.attr('data-exactlimit'));
                    var checked = parseInt($(this).find("input.tm-epo-field[type='checkbox']:checked").length);
                    if (eln!==checked){
                        checkall=false;
                    }
                 }                 
            });
            return checkall;
        }
        function tm_check_exactlimit_cont(){        

            form_submit_events[form_submit_events.length] = {
                "trigger" : function(){
                    var check=tm_exactlimit_cont();
                    return check;
                },
                "on_true" : function(){return true;},
                "on_false" : function(){return true;}
            };
            
        }
        if (exactlimit_cont.length){
            tm_check_exactlimit_cont();
        }        

        function tm_set_fee_prices(){
            main_product.find(".tmcp-sub-fee-field,.tmcp-fee-field").each(function(i, e) {
                var setter = $(e);
                if ($(e).is('select')) {
                    setter = $(e).find('option:selected');
                }
                var price=setter.data('rules');
                if (price && price[0]){
                    var _cart = main_product.find('.tm-epo-totals.tm-cart-'+setter.closest(".tm-extra-product-options").attr("data-cart-id"));
                    var formatted_price = tm_set_price(price,_cart);
                    setter.data('price',tm_set_tax_price(price,_cart));
                    tm_update_price(setter.closest('.tmcp-field-wrap').find('.amount'),price,formatted_price);
                }
            });
        }

        function tm_set_subscription_period(){
            main_product.find('.tm-epo-totals').each(function(){
                var cart_id=$(this).attr('data-cart-id'),
                    $cart=main_product.find('.tm-extra-product-options.tm-cart-'+cart_id),
                    subscription_period=$(this).data('subscription-period'),
                    variations_subscription_period=$(this).data('variations-subscription-period'),
                    base=$cart.find('.tmcp-field').closest('.tmcp-field-wrap'),
                    is_subscription=$(this).data('is-subscription');

                if (is_subscription){
                    base.find('.tmperiod').remove();
                    
                    var is_hidden=base.find('.amount').is(".hidden");
                    if (is_hidden){
                        is_hidden=" hidden";
                    }else{
                        is_hidden="";
                    }


                    var variation_id_selector='input[name^="variation_id"]',
                        $_cart=$(this).data('tm_for_cart');

                    if ($_cart){
                        if ( $_cart.find( 'input.variation_id' ).length > 0 ){
                            variation_id_selector='input.variation_id';
                        }
                        var current_variation=$_cart.find(variation_id_selector).val();
                        if (!current_variation) {
                            current_variation = 0;
                        }
                        if(variations_subscription_period[current_variation]){
                            subscription_period=variations_subscription_period[current_variation];    
                        }
                    }

                    base.find('.amount').after('<span class="tmperiod'+is_hidden+'"> / '+subscription_period+'</span>');
                    
                    $(this).find('.tmperiod').remove();
                    $(this).find('.amount.options').after('<span class="tmperiod"> / '+subscription_period+'</span>');
                    $(this).find('.amount.final').after('<span class="tmperiod"> / '+subscription_period+'</span>');
                }
            });

        }

        function get_composite_container_id(bto){
            var container_id = bto.attr('data-container-id');
            if (!container_id){
                var $composite_form=$(bto).closest('.composite_form'),
                    container_id=$composite_form.find( '.composite_data' ).data( 'container_id' );
            }
            return container_id;
        }
        function get_composite_price_data(container_id){
            var price_data = main_product.find( '.bto_form_' + container_id + ',#composite_form_' + container_id + ',#composite_data_' + container_id ).data( 'price_data' );
            return price_data;
        }

        function tm_apply_dpd(totals,price,apply){
            if(apply!=1){
                return price;
            }
            var rules=totals.data('product-price-rules'),
                $cart=totals.data('tm_for_cart');

            if (!rules || !$cart){
                return price;
            }else{
                var variation_id_selector='input[name^="variation_id"]';
                if ( $cart.find( 'input.variation_id' ).length > 0 ){
                    variation_id_selector='input.variation_id';
                }
                var qty_element = $cart.find('input.qty'),
                    qty = parseFloat(qty_element.val()),
                    current_variation=$cart.find(variation_id_selector).val();

                if (!current_variation) {
                    current_variation = 0;
                }
                if (isNaN(qty)){
                    if (totals.attr("data-is-sold-individually") || qty_element.length==0){
                        qty=1;
                    }
                }
                if (rules[current_variation]){
                    $(rules[current_variation]).each(function(id,rule){
                        var min=parseFloat(rule['min']),
                            max=parseFloat(rule['max']),
                            type=rule['type'],
                            value=parseFloat(rule['value']);

                        if (min <= qty && qty <= max){
                            switch (type){
                                case "percentage":
                                    price= price*(1-value/100);
                                    return false;
                                break;
                                case "price":
                                    price= price-value;
                                    return false;
                                break;
                                case "fixed":
                                    price= value;
                                    return false;
                                break;
                            }
                            
                        }
                    });    
                }
                
            }
            if (price<0){
                price=0;
            }
            return price;

        }

        function tm_get_dpd(totals,apply){
            if(apply!=1){
                return false;
            }
            var price=[false,false],
                rules=totals.data('product-price-rules'),
                $cart=totals.data('tm_for_cart');

            if (!rules || !$cart){
                return false;
            }else{
                var variation_id_selector='input[name^="variation_id"]';
                if ( $cart.find( 'input.variation_id' ).length > 0 ){
                    variation_id_selector='input.variation_id';
                }
                var qty_element = $cart.find('input.qty'),
                    qty = parseFloat(qty_element.val()),
                    current_variation=$cart.find(variation_id_selector).val();

                if (!current_variation) {
                    current_variation = 0;
                }
                if (isNaN(qty)){
                    if (totals.attr("data-is-sold-individually") || qty_element.length==0){
                        qty=1;
                    }
                }
                if (rules[current_variation]){
                    $(rules[current_variation]).each(function(id,rule){
                        var min=parseFloat(rule['min']),
                            max=parseFloat(rule['max']),
                            type=rule['type'],
                            value=parseFloat(rule['value']);

                        if (min <= qty && qty <= max){
                            switch (type){
                                case "percentage":
                                    price= [value,type];
                                    return false;
                                break;
                                case "price":
                                    price= [value,type];
                                    return false;
                                break;
                                case "fixed":
                                    price= [value,type];
                                    return false;
                                break;
                            }
                            
                        }
                    });    
                }
                
            }

            return price;

        }

        function tm_calculate_product_price(totals){
            var rules=totals.data('product-price-rules'),
                price=parseFloat(totals.data('price')),
                $cart=totals.data('tm_for_cart');

            if (!rules || !$cart){
                return price;
            }else{
                var variation_id_selector='input[name^="variation_id"]';
                if ( $cart.find( 'input.variation_id' ).length > 0 ){
                    variation_id_selector='input.variation_id';
                }
                var qty_element = $cart.find('input.qty'),
                    qty = parseFloat(qty_element.val()),
                    current_variation=$cart.find(variation_id_selector).val();

                if (!current_variation) {
                    current_variation = 0;
                }
                if(!rules[current_variation]){
                    current_variation = 0;
                }
                if (isNaN(qty)){
                    if (totals.attr("data-is-sold-individually") || qty_element.length==0){
                        qty=1;
                    }
                }
                if (rules[current_variation]){
                    $(rules[current_variation]).each(function(id,rule){
                        var min=parseFloat(rule['min']),
                            max=parseFloat(rule['max']),
                            type=rule['type'],
                            value=parseFloat(rule['value']);

                        if (min <= qty && qty <= max){
                            switch (type){
                                case "percentage":
                                    price= price*(1-value/100);
                                    price = Math.ceil(price * Math.pow(10, tm_epo_js.currency_format_num_decimals) - 0.5) * Math.pow(10, -( parseInt(tm_epo_js.currency_format_num_decimals) ));
                                    if(price < 0){
                                        price=0;
                                    }
                                    return false;
                                break;
                                case "price":
                                    price= price-value;
                                    price = Math.ceil(price * Math.pow(10, tm_epo_js.currency_format_num_decimals) - 0.5) * Math.pow(10, -( parseInt(tm_epo_js.currency_format_num_decimals) ));
                                    if(price < 0){
                                        price=0;
                                    }
                                    return false;
                                break;
                                case "fixed":
                                    price= value;
                                    price = Math.ceil(price * Math.pow(10, tm_epo_js.currency_format_num_decimals) - 0.5) * Math.pow(10, -( parseInt(tm_epo_js.currency_format_num_decimals) ));
                                    if(price < 0){
                                        price=0;
                                    }
                                    return false;
                                break;
                            }
                            
                        }
                    });    
                }
                
            }
            return price;
        }
        /**
         * Set field price rules
         */
        function tm_element_epo_rules(obj,args){
            var element=$(obj),
                setter = element,
                bto,
                cart,
                current_variation,
                is_bto,
                bundleid,
                $totals,
                apply_dpd;
            if (!args){                
                bto = element.closest(composite_selector);
                cart=element.closest('.cart');
                var variation_id_selector='input[name^="variation_id"]';
                if ( cart.find( 'input.variation_id' ).length > 0 ){
                    variation_id_selector='input.variation_id';
                }
                current_variation=cart.find(variation_id_selector).val();
                is_bto=(bto.length>0);
                bundleid=cart.attr( 'data-product_id' );
                if (!bundleid){
                    bundleid=cart.closest('.component_content').attr( 'data-product_id' );
                    if (!bundleid){
                        bundleid=0;
                    }
                }
                // get current woocommerce variation
                if (!current_variation) {
                    current_variation = 0;
                }
                if (!is_bto){
                    $totals = main_product.find('.tm-epo-totals.tm-cart-main');
                }else{
                    $totals = main_product.find('.tm-epo-totals.tm-cart-'+bundleid);
                }
                apply_dpd=$totals.data('fields-price-rules');
            }else{
                bto=args["bto"];
                cart=args["cart"];
                current_variation=args["current_variation"];
                is_bto=args["is_bto"];
                bundleid=args["bundleid"];
                $totals=args["totals"];
                apply_dpd=args["apply_dpd"];
            }
            if (element.is('select')) {
                setter = element.find('option:selected');
            }
            var rules = setter.data('rules'),
                rulestype = setter.data('rulestype'),
                _rules, 
                _rulestype, 
                pricetype, 
                price, 
                formatted_price,
                product_price,
                cpf_bto_price = cart.find('.cpf-bto-price');
                            
            // Composite Products                    
            if (is_bto){                  
                if (cpf_bto_price.length>0){
                    if (cpf_bto_price.data('per_product_pricing')){
                        product_price = cpf_bto_price.val();
                    }else{
                        product_price = 0;
                    }
                    cpf_bto_price.val(product_price);                        
                }
            }else{
                if ($totals.length){
                    product_price = tm_calculate_product_price($totals);
                }
            }
                                           
            pricetype='';
            if (typeof rules === "object") {

                if (current_variation in rules) {
                    price = rules[current_variation];
                } else {
                    _rules = element.closest('.tmcp-ul-wrap').data('rules');

                    if (typeof _rules === "object") {
                        if (current_variation in _rules) {
                            price = _rules[current_variation];
                        } else {
                            price = rules[0];
                        }
                    } else {
                        price = rules[0];
                    }
                }

                if (typeof rulestype === "object") {
                    if (current_variation in rulestype) {
                        pricetype = rulestype[current_variation];
                    }else{
                        _rulestype = element.closest('.tmcp-ul-wrap').data('rulestype');
                        if (typeof _rulestype === "object") {
                            if (current_variation in _rulestype) {
                                pricetype = _rulestype[current_variation];
                            }else{
                                pricetype = rulestype[0];
                            }
                        }else{
                            pricetype = rulestype[0];
                        }
                    }
                }else{
                    rulestype = element.closest('.tmcp-ul-wrap').data('rulestype');
                    if (typeof rulestype === "object") {
                        if (current_variation in rulestype) {
                            pricetype = rulestype[current_variation];
                        } else {
                            pricetype = rulestype[0];
                        }
                    }
                }
                if(typeof pricetype=="object"){
                    pricetype=pricetype[0];
                }
                
                if (element.is('select')) {
                    element.find('option').each(function(){
                        var $t=$(this);
                        $t.removeData('tm-price-for-late');
                        $t.removeData('islate');
                        $t.removeClass('tm-epo-late-field');
                    });
                }else{
                    setter.removeData('tm-price-for-late');
                    setter.removeData('islate');
                    setter.removeClass('tm-epo-late-field');
                }

                console.log('switch here ' + pricetype);
                switch(pricetype){
                    case '':
                        price=tm_apply_dpd($totals,price,apply_dpd);
                    break;
                    case 'biggest':
                        price =  Math.max(price, product_price) > product_price ? price - product_price : 0;
                    break;
                    case 'percent':
                        price=(price/100)*product_price;
                    break;
                    case 'percentcurrenttotal':
                        late_fields_prices.push({"setter":setter,"price":price,"bundleid":bundleid});                    
                        setter.data('tm-price-for-late',price).data('islate', 1).addClass('tm-epo-late-field');
                        price=0;
                    break;
                    case 'char':
                        price=tm_apply_dpd($totals,price,apply_dpd)*setter.val().length;
                    break;
                    case 'charpercent':
                        price=(price/100)*product_price*setter.val().length;
                    break;
                    case 'charnofirst':
                        var textlength=setter.val().length-1;
                        if (textlength<0){
                            textlength=0;
                        }
                        price=tm_apply_dpd($totals,price,apply_dpd)*textlength;
                    break;
                    case 'charpercentnofirst':
                        var textlength=setter.val().length-1;
                        if (textlength<0){
                            textlength=0;
                        }
                        price=(price/100)*product_price*textlength;
                    break;
                    case 'step':
                        price=tm_apply_dpd($totals,price,apply_dpd)*setter.val();
                    break;
                    case 'currentstep':
                        price=tm_apply_dpd($totals,setter.val(),apply_dpd);
                    break;
                }
                if(element.data('tm-quantity')){
                    price=price*parseFloat(element.data('tm-quantity'));
                }

                formatted_price = tm_set_price(price, $totals);
                setter.data('price', tm_set_tax_price(price,$totals));
                tm_update_price(setter.closest('.tmcp-field-wrap').find('.amount'),price,formatted_price);

            } else {
                var _tmcpulwrap = element.closest('.tmcp-ul-wrap');
                rules = _tmcpulwrap.data('rules');

                if (typeof rules === "object") {
                    if (current_variation in rules) {
                        price = rules[current_variation];
                    } else {
                        price = rules[0];
                    }

                    if (typeof rulestype === "object") {
                        if (current_variation in rulestype) {
                            pricetype = rulestype[current_variation];
                        }else{
                            _rulestype = _tmcpulwrap.data('rulestype');
                            if (typeof _rulestype === "object") {
                                if (current_variation in _rulestype) {
                                    pricetype = _rulestype[current_variation];
                                }else{
                                    pricetype = rulestype[0];
                                }
                            }else{
                                pricetype = rulestype[0];
                            }
                        }
                    }else{
                        rulestype = _tmcpulwrap.data('rulestype');
                        if (typeof rulestype === "object") {
                            if (current_variation in rulestype) {
                                pricetype = rulestype[current_variation];
                            } else {
                                pricetype = rulestype[0];
                            }
                        }
                    }
                    if(typeof pricetype=="object"){
                        pricetype=pricetype[0];
                    }
                    
                    if (element.is('select')) {
                        element.find('option').each(function(){
                            var $t=$(this);
                            $t.removeData('tm-price-for-late');
                            $t.removeData('islate');
                            $t.removeClass('tm-epo-late-field');
                        });
                    }else{
                        setter.removeData('tm-price-for-late');
                        setter.removeData('islate');
                        setter.removeClass('tm-epo-late-field');
                    }

                    switch(pricetype){
                        case '':
                            price=tm_apply_dpd($totals,price,apply_dpd);
                        break;
                        case 'percent':
                            price=(price/100)*product_price;
                        break;
                        case 'percentcurrenttotal':
                            late_fields_prices.push({"setter":setter,"price":price,"bundleid":bundleid});                    
                            setter.data('tm-price-for-late',price).data('islate', 1).addClass('tm-epo-late-field');
                            price=0;
                        break;
                        case 'char':
                            price=tm_apply_dpd($totals,price,apply_dpd)*setter.val().length;
                        break;
                        case 'charpercent':
                            price=(price/100)*product_price*setter.val().length;
                        break;
                        case 'step':
                            price=tm_apply_dpd($totals,price,apply_dpd)*setter.val();
                        break;
                        case 'currentstep':
                            price=tm_apply_dpd($totals,setter.val(),apply_dpd);
                        break;
                    }
                    if(element.data('tm-quantity')){
                        price=price*parseFloat(element.data('tm-quantity'));
                    }

                    formatted_price = tm_set_price(price, $totals);
                    setter.data('price', tm_set_tax_price(price,$totals));
                    tm_update_price(setter.closest('.tmcp-field-wrap').find('.amount'),price,formatted_price);
                }
            }
        }         
        function tm_epo_rules($thecart) {
            late_fields_prices=[];
            var all_carts;
            if (!$thecart){
               all_carts = main_product.find('.cart');
            }else{
               all_carts = $thecart; 
            }
            if (!all_carts.length>0){
                return;
            }
            all_carts.each(function(cart_index,cart){
                cart=$(cart); 
                var variation_id_selector='input[name^="variation_id"]';
                if ( cart.find( 'input.variation_id' ).length > 0 ){
                    variation_id_selector='input.variation_id';
                }
                var per_product_pricing=true,
                    bto = $(this).closest(composite_selector),
                    current_variation=cart.find(variation_id_selector).val(),
                    is_bto=false,
                    bundleid=cart.attr( 'data-product_id' );
                if (!bundleid){
                    bundleid=cart.closest('.component_content').attr( 'data-product_id' );
                    if (!bundleid){
                        bundleid=0;
                    }
                }

                if (bto.length>0){
                    is_bto=true;
                    var container_id = get_composite_container_id(bto);
                    var price_data = get_composite_price_data(container_id);
                    if(price_data){
                        per_product_pricing = price_data[ 'per_product_pricing' ];    
                    }                    
                }
                // get current woocommerce variation
                if (!current_variation) {
                    current_variation = 0;
                }
                var $cart;
                if (!is_bto){
                    $cart=main_product.find('.tm-extra-product-options.tm-cart-main');
                    var $totals = main_product.find('.tm-epo-totals.tm-cart-main');
                }else{
                    $cart=main_product.find('.tm-extra-product-options.tm-cart-'+bundleid);
                    var $totals = main_product.find('.tm-epo-totals.tm-cart-'+bundleid);
                }
                // WooCommerce Dynamic Pricing & Discounts 
                var apply_dpd=$totals.data('fields-price-rules');
                // set initial prices for all fields
                if (!$cart.data('tm_rules_init_done')){
                    if ($totals.data('force-quantity')){
                        cart.find('input.qty').val($totals.data('force-quantity'));
                    }
                    $cart.find('.tm-quantity .tm-qty').each(function(){
                        var $this=$(this),field = $this.closest('.tmcp-field-wrap').find('.tm-epo-field');
                        field.data('tm-quantity',$this.val());
                    });//tmaddquantity
                    $cart.find('.tmcp-attributes, .tmcp-elements').each(function(index, element) {
                        var element = $(element),rules = element.data('rules');
                        // if rule doesn't exit then init an empty rule
                        if (typeof rules !== "object") {
                            rules = {
                                0: "0"
                            };
                        }
                        if (typeof rules === "object") {
                            // we skip price validation test so that every field has at least a price of 0
                            var price = tm_apply_dpd($totals,rules[current_variation],apply_dpd),
                                formatted_price = tm_set_price(price, $totals);

                            element.find('.tmcp-field').each(function(i, e) {
                                var f=$(e);
                                if (per_product_pricing){
                                    f.data('price', tm_set_tax_price(price,$totals));
                                    tm_update_price(f.closest('.tmcp-field-wrap').find('.amount'),price,formatted_price);
                                }else{
                                    f.data('price', 0);
                                    f.closest('.tmcp-field-wrap').find('.amount').empty();
                                }
                            });
                        }
                    });
                    $cart.data('tm_rules_init_done',1);
                }
                // skip specific field rules if per_product_pricing is false
                if (!per_product_pricing){
                    return true;
                }
                var args={
                    "bto":bto,
                    "cart":cart,
                    "current_variation":current_variation,
                    "is_bto":is_bto,
                    "bundleid":bundleid,
                    "totals":$totals,
                    "apply_dpd":apply_dpd
                };
                //  apply specific field rules
                $cart.find('.tmcp-field').each(function(index, element) {
                    tm_element_epo_rules(element,args);
                });

            });
            
        }

        function tm_get_native_prices_block(obj){
            return obj.find('.single_variation .price,.bundle_price .price,.bto_item_wrap .price,.component_wrap .price,.composite_wrap .price');
        }

        /**
         * Set event handlers
         */
        function tm_epo_init($form,$formcart) {
            var container_id,item_id="main";
            if (!$form){
                main_cart = main_product.find('.cart:last');
                $form = main_cart.parent();                
            }else{
                // Composite bundle id
                container_id = get_composite_container_id($form);
                item_id = $form.attr('data-item-id');
                if(!item_id){
                    item_id = $form.attr('data-item_id');
                }
            }
            var $epo_holder=main_product.find('.tm-extra-product-options.tm-cart-'+item_id);
            var $totals_holder = main_product.find('.tm-epo-totals.tm-cart-'+item_id);
            $totals_holder.data('tm_for_cart',$form.find('.cart'));
            var this_product_type = $totals_holder.data('type');
            var $variation_form = $form.find('.variations_form');
            $epo_holder.on( 'change.cpf', '.tm-quantity .tm-qty', function() {
                var $this=$(this),field = $this.closest('.tmcp-field-wrap').find('.tm-epo-field');
                field.data('tm-quantity',$this.val()).trigger('change.cpf');
            });
            $epo_holder.on( 'tmaddquantity', '.tm-quantity .tm-qty', function() {
                var $this=$(this),field = $this.closest('.tmcp-field-wrap').find('.tm-epo-field');
                field.data('tm-quantity',$this.val());
            });
            $epo_holder.on( 'click.cpf', '.tm-quantity .plus, .tm-quantity .minus', function() {

                // Get values
                var $qty        = $( this ).closest( '.tm-quantity' ).find( '.tm-qty' ),
                    currentVal  = parseFloat( $qty.val() ),
                    max         = parseFloat( $qty.attr( 'max' ) ),
                    min         = parseFloat( $qty.attr( 'min' ) ),
                    step        = $qty.attr( 'step' );                    

                // Format values
                if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
                if ( max === '' || max === 'NaN' ) max = '';
                if ( min === '' || min === 'NaN' ) min = 0;
                if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

                // Change the value
                if ( $( this ).is( '.plus' ) ) {

                    if ( max && ( max == currentVal || currentVal > max ) ) {
                        $qty.val( max );
                    } else {
                        $qty.val( currentVal + parseFloat( step ) );
                    }

                } else {

                    if ( min && ( min == currentVal || currentVal < min ) ) {
                        $qty.val( min );
                    } else if ( currentVal > 0 ) {
                        $qty.val( currentVal - parseFloat( step ) );
                    }

                }

                // Trigger change event
                $qty.trigger( 'change' );
            });

            // Custom variation events
            $epo_holder.find('.tm-epo-reset-variation')
            .off('click.cpfv')
            .on('click.cpfv', function(e) {
                var t=$(this),
                    id=t.attr('data-tm-for-variation'),
                    v="",section=t.closest('.cpf-type-variations'),
                    inputs=t.closest('.cpf_hide_element').find('.tm-epo-variation-element');

                inputs.removeAttr("checked").prop("checked",false);
                $variation_form.find('#'+id).val(v).change();
                $variation_form.find('#'+id).trigger('focusin');

                main_product.find('.cpf-type-variations').not(section).each(function(i,el){
                    $variation_form.find('#'+$(el).find('.tm-epo-variation-element').first().attr('data-tm-for-variation')).trigger('focusin');
                });
                $(this).blur();
                $variation_form.trigger( 'woocommerce_update_variation_values_tmlogic' );
            });
            $epo_holder.find('input.tm-epo-variation-element,input.tm-epo-variation-element + label')
            .off('mouseup.cpfv')
            .on('mouseup.cpfv', function(e) {
                var t=$(this);
                if (t.is("label")){
                    t=t.prev("input");
                }
                var id=t.attr('data-tm-for-variation');
                $variation_form.find('#'+id).trigger('focusin');
            });
            $epo_holder.find('.tm-epo-variation-element')
            .off('change.cpfv tm_epo_variation_element_change')
            .on('change.cpfv tm_epo_variation_element_change', function(e) {
                var t=$(this),
                    id=t.attr('data-tm-for-variation'),
                    v=t.val(),section=t.closest('.cpf-type-variations'),
                    native_select=$variation_form.find('#'+id);
                
                if (e && e.type && e.type=='tm_epo_variation_element_change'){

                }else{
                    var exists = false;
                    native_select.each(function(){
                        if (this.value == v) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists){
                        native_select.trigger('focusin');
                    }
                    native_select.val(v).change();
                }
                                
                if(!v){
                    native_select.trigger('focusin');
                }

                main_product.find('.cpf-type-variations').not(section).each(function(i,el){
                    $variation_form.find('#'+$(el).find('.tm-epo-variation-element').first().attr('data-tm-for-variation')).trigger('focusin');
                });

                $(this).blur();
                $variation_form.trigger( 'woocommerce_update_variation_values_tmlogic' );
            })
            .off('focusin.cpfv')
            .on('focusin.cpfv', function() {
                if (!$(this).is('select')){
                    return;
                }
                var t=$(this),
                    id=t.attr('data-tm-for-variation'),
                    v=t.val();

                $variation_form.find('#'+id).trigger('focusin');
                
                $variation_form
                    .trigger( 'woocommerce_update_variation_values_tmlogic' );
            });
            // update price amount for select elements
            $epo_holder.find('select.tm-epo-field')
            .off('tm-select-change-html')
            .on('tm-select-change-html', function() {
                if ($formcart && main_cart && main_cart.data('per_product_pricing')!=undefined && !main_cart.data('per_product_pricing')){
                    return;
                }
                var field=$(this), 
                    formatted_price = tm_set_price(field.find('option:selected').data('price'), $totals_holder);
                
                tm_update_price(field.closest('.tmcp-field-wrap').find('.amount') ,field.find('option:selected').data('price') ,formatted_price);
            });
            $epo_holder.find('select.tm-epo-field')
            .off('tm-select-change')
            .on('tm-select-change', function() {
                if ($formcart && main_cart && main_cart.data('per_product_pricing')!=undefined && !main_cart.data('per_product_pricing')){
                    return;
                }
                var $cart = $formcart || main_cart;
                $(this).trigger('tm-select-change-html');
                 
                $cart.trigger({
                    "type":"tm-epo-update",
                    "norules":1,
                    "element":$(this)
                });
            });

            $epo_holder.find('.tm-epo-field')
            .off('tm_trigger_product_image')
            .on('tm_trigger_product_image',  function(pass) {
                var $cart = $formcart || main_cart, $this=$(this),field=$(this);

                if (field.is('.tm-product-image:checkbox, .tm-product-image:radio, select.tm-product-image')){
                    var uic=field.closest('.tmcp-field-wrap').find('label img');
                    if(field.is('select.tm-product-image')){
                        $this=field.children('option:selected');
                    }
                    if ($(uic).length>0 || $this.attr('data-image')!='' || $this.attr('data-imagep')!=''){
                        if (field.is(':checked') || field.is('select.tm-product-image')){
                            var src=$(uic).first().attr('data-original');
                            if (!src){
                                src=$(uic).first().attr('src');
                            }
                            if (!src){
                                src=$this.attr('data-image');
                            }
                            if($this.attr('data-imagep')){
                                src=$this.attr('data-imagep');
                            }
                            if (src){
                                main_product.trigger({
                                    "type":"tm_change_product_image",
                                    "src":src,
                                    "element":field,
                                    "main_product":main_product
                                });
                            }
                        }else{
                            main_product.trigger({
                                "type":"tm_restore_product_image",
                                "element":field,
                                "main_product":main_product
                            });
                        }
                    }else{
                        main_product.trigger({
                            "type":"tm_restore_product_image",
                            "element":field,
                            "main_product":main_product
                        });
                    }
                }else{
                    main_product.trigger({
                        "type":"tm_attempt_product_image",
                        "element":field,
                        "main_product":main_product
                    });
                }
            });
            if (tm_epo_js.tm_epo_show_only_active_quantities=='yes'){                
                $epo_holder.find('.tm-quantity')
                .off('showhide.cpfcustom')
                .on('showhide.cpfcustom',  function(event) {
                    var quantity_selector=$(this),
                        field=quantity_selector.closest('.tmcp-field-wrap').find('.tm-epo-field'),
                        show=false;
                    if (!field.is('.tm-epo-variation-element')){
                        if (field.is('select')){
                            if (field.val()!==''){
                                show=true;
                            }
                        }else if (field.is(':checkbox')) {                      
                            if (field.is(':checked')) {
                                show=true;
                            }
                        }else if (field.is(':radio')) {                      
                            if (field.is(':checked')) {
                                show=true;
                                var radios = field.closest('.cpf_hide_element').find(".tm-epo-field.tmcp-radio");
                                radios.each(function(){
                                    $(this).closest('.tmcp-field-wrap').find('.tm-quantity').hide();
                                });
                            }
                        }else{
                            if (field.val()) {
                                show=true;
                            }
                        }
                        if(show){
                            quantity_selector.show();
                        }else{
                            quantity_selector.hide();
                        }
                    }
                });
                $epo_holder.find('.tm-quantity').trigger('showhide.cpfcustom');
                $epo_holder.find('.tm-epo-field')
                .off('change.cpfcustom')
                .on('change.cpfcustom',  function(event) {
                    var field=$(this),
                        quantity_selector=field.closest('.tmcp-field-wrap').find('.tm-quantity'),
                        show=false;
                    quantity_selector.trigger('showhide.cpfcustom');
                });
            }
            // trigger global custom update event for every field
            $epo_holder.find('.tm-epo-field')
            .off('change.cpf')
            .on('change.cpf',  function(pass) {
                var $cart = $formcart || main_cart, $this=$(this),field=$(this);
                if (!field.is('.tm-epo-variation-element')){
                    if (field.is('select')){
                        field.trigger('tm-select-change');
                    }else{
                        if(field.is(".tmcp-radio")){
                            field.closest('.cpf-type-radio').find('.tm-quantity .tm-qty').each(function(){
                                if (!$(this).closest('li.tmcp-field-wrap').find('.tmcp-radio').is(":checked")){
                                    $(this).attr("disabled","disabled");
                                }else{
                                    $(this).removeAttr("disabled");
                                }
                            });
                        }
                        $cart.trigger({
                            "type":"tm-epo-update",
                            "norules":1,
                            "element":field
                        });
                    }                    
                }
                field.trigger('tm_trigger_product_image');
                main_product.trigger({
                    "type":"tm_attempt_product_image",
                    "main_product":main_product                      
                });
            });
            
            $epo_holder.find('.tm-epo-reset-radio')
            .off('click.cpf')
            .on('click.cpf',  function() {
                var t=$(this),c=t.closest('.cpf_hide_element'),r=c.find('.tm-epo-field.tmcp-radio:checked');
                if (r.length){
                    r.removeAttr("checked").prop("checked",false);
                    r.trigger('change.cpf').trigger("change.cpflogic");
                }
            });

            $epo_holder.find('.tm-epo-field.tmcp-textarea,.tm-epo-field.tmcp-textfield')
            .off('keyup.cpf')
            .on('keyup.cpf',  function() {
                $(this).trigger('change.cpf');
            });

            $form.find('.cart input.qty')
            .off('change.cpf')
            .on('change.cpf',  function() {              
                var $cart = $formcart || $(this).closest('.cart');

                $cart.trigger('tm-epo-check-dpd');

                $(this).data('tm-prev-value', $(this).val());

                $cart.trigger({
                    "type":"tm-epo-update",
                    "norules":2
                });
            }).data('tm-prev-value', 1);

            // measurement price calculator compatibility
            $form.find('.cart .total_price').on('wc-measurement-price-calculator-total-price-change', function(e,d,v) {
                $totals_holder.parent().find('.cpf-product-price').val(v);  
                $(this).closest('.cart').trigger('tm-epo-update');
            });
            $form.find('.cart .product_price').on('wc-measurement-price-calculator-product-price-change', function(e,d,v) {
                $totals_holder.parent().find('.cpf-product-price').val(v);
                $totals_holder.data('price',v);
                $(this).closest('.cart').trigger('tm-epo-update');
            });

            /* DPD update displayed values when rules change */
            $form.find('.cart')
            .off("tm-epo-check-dpd")
            .on('tm-epo-check-dpd', function(pass) {
                var $totals=$totals_holder,apply_dpd=$totals.data('fields-price-rules');

                if(apply_dpd!=1){
                    return;
                }
                var rules=$totals.data('product-price-rules'),
                    $cart=$totals.data('tm_for_cart');

                if (!rules || !$cart){
                    return;
                }else{
                    var variation_id_selector='input[name^="variation_id"]';
                    if ( $cart.find( 'input.variation_id' ).length > 0 ){
                        variation_id_selector='input.variation_id';
                    }
                    var qty_element = $cart.find('input.qty'),
                        qty = parseFloat(qty_element.val()),
                        qty_prev = parseFloat(qty_element.data('tm-prev-value')),
                        current_variation=$cart.find(variation_id_selector).val();

                    if (!current_variation) {
                        current_variation = 0;
                    }
                    if (isNaN(qty)){
                        if ($totals.attr("data-is-sold-individually") || qty_element.length==0){
                            qty=1;
                        }
                    }

                    if (rules[current_variation]){
                        $(rules[current_variation]).each(function(id,rule){
                            var min=parseFloat(rule['min']),
                                max=parseFloat(rule['max']),
                                type=rule['type'],
                                value=parseFloat(rule['value']);

                            if (min <= qty && qty <= max){
                                if (min <= qty_prev && qty_prev <= max){
                                    
                                }else{
                                    tm_epo_rules($cart);
                                }
                            }
                        });    
                    }
                    
                }
            });

            // global custom update event
            $form.find('.cart')
            .off("tm-epo-update")
            .on('tm-epo-update', function(pass) {
                
                var check_for_bto_internal_show,
                    $cart       = $(this),
                    $_formcart  = $formcart || $cart,
                    bundleid=$_formcart.attr( 'data-product_id' );

                if (!bundleid){
                    bundleid=$_formcart.closest('.component_content').attr( 'data-product_id' );
                    if (!bundleid){
                        bundleid=0;
                    }
                }

                if ($formcart){
                    $totals_holder.addClass("cpf-bto-totals");
                }
                if(!pass.norules){
                    tm_epo_rules($cart);
                }else{
                    if(pass.norules==1){
                        tm_element_epo_rules(pass.element);
                    }
                    late_fields_prices=[];
                    $epo_holder.find('.tm-epo-late-field').each(function(){
                        var setter=$(this), price=setter.data('tm-price-for-late');
                        setter.data('price',0);
                        late_fields_prices.push({"setter":setter,"price":price,"bundleid":bundleid});
                    });
                }
                var variation_id_selector='input[name^="variation_id"]';
                if ( $cart.find( 'input.variation_id' ).length > 0 ){
                    variation_id_selector='input.variation_id';
                }
                var product_price       = 0,
                    total               = 0,
                    product_type        = $totals_holder.data('type'),
                    show_total          = false,
                    qty_element         = $cart.find('input.qty'),
                    qty                 = parseFloat(qty_element.val()),
                    cpf_bto_price       = $_formcart.find('.cpf-bto-price'),
                    per_product_pricing = true,
                    is_bto=false,
                    current_variation=$cart.find(variation_id_selector).val(),
                    tm_floating_box_data=[];

                if (isNaN(qty)){
                    if ($totals_holder.attr("data-is-sold-individually") || qty_element.length==0){
                        qty=1;
                    }
                }
                
                if ($totals_holder.length){
                    product_price = tm_calculate_product_price($totals_holder);
                }else{
                    if (cpf_bto_price.length>0){
                        product_price = cpf_bto_price.val();
                    }
                }

                // Composite Products
                if ($formcart && $cart.find('.cpf-bto-price').length>0){
                    is_bto=true;
                    product_price=parseFloat($cart.find('.cpf-bto-price').val());
                    per_product_pricing=$cart.find('.cpf-bto-price').data('per_product_pricing');

                }else if (!$formcart && main_product.find('.cpf-bto-price').length>0){
                    
                    check_for_bto_internal_show=1;                   
                    
                    main_product.find('.cpf-bto-price').each(function(){                        
                        if (!isNaN( parseFloat($(this).val()))){
                            var _qty=$(this).closest('.cart').find('input.qty');
                            if (_qty.length>0){
                                _qty=parseFloat(_qty.val());
                            }else{
                                _qty=1;
                            }
                            product_price=parseFloat(product_price)+parseFloat($(this).val()*_qty);
                        }
                    });
                    
                    main_product.find('.cpf-bto-optionsprice').each(function(){
                        if (!isNaN( parseFloat($(this).val()))){
                            product_price=parseFloat(product_price)+parseFloat($(this).val());
                        }
                    });
                    
                }
                if ($formcart || (main_epo_inside_form && tm_epo_js.tm_epo_totals_box_placement=="woocommerce_before_add_to_cart_button")){
                    if ( (product_type == 'variable' || product_type == 'variable-subscription')  && !$totals_holder.data("moved_inside")) {
                        $cart.find('.variations_button').before($totals_holder);
                        $totals_holder.data("moved_inside",1);
                    }
                }
                /* move total box of main cart if is composite */
                if (main_epo_inside_form && tm_epo_js.tm_epo_totals_box_placement=="woocommerce_before_add_to_cart_button"){
                    if ((product_type == 'bto' || product_type == 'composite') && !$totals_holder.data("moved_inside")) {
                        $cart.find('.bundle_price,.composite_price').after($totals_holder);
                        $totals_holder.data("moved_inside",1);
                    }
                }
                $epo_holder.find('.tmcp-field').each(function() {
                    var field=$(this),field_title=field.closest('.cpf_hide_element').find('.tm-epo-field-label').html();
                    if (field.is(':checkbox, :radio, :input')) {
                        if ( field_is_active( field ) ){ 
                            var option_price = 0;
                            if (field.is('.tmcp-checkbox, .tmcp-radio')) {
                                if (field.is(':checked')) {
                                    option_price = field.data('price');
                                    show_total = true;
                                    field.data('isset',1);
                                    var _value=field.closest('li.tmcp-field-wrap').find('.checkbox_image_label');
                                    if (_value.length){
                                        _value=_value.html();
                                    }else{
                                        _value=field.closest('li.tmcp-field-wrap').find('label').html();                                        
                                    }
                                    tm_floating_box_data.push({title:field_title,value:_value,price:option_price});
                                }else{
                                    field.data('isset',0);
                                }
                            } else if (field.is('.tmcp-select')) {
                                option_price = field.find('option:selected').data('price');
                                show_total = true;
                                field.find('option').data('isset',0);
                                field.find('option:selected').data('isset',1);
                                if(option_price){
                                    tm_floating_box_data.push({title:field_title,value:field.find('option:selected').text(),price:option_price});
                                }
                            } else {
                                if (field.val()) {
                                    if (field.is(".tmcp-range") && field.val()=="0"){
                                        field.data('isset',0);
                                    }else{
                                        option_price = field.data('price');
                                        show_total = true;
                                        field.data('isset',1);
                                        tm_floating_box_data.push({title:field_title,value:field.val(),price:option_price});
                                    }
                                }else{
                                    field.data('isset',0);
                                }
                            }
                            if (!option_price) {
                                option_price = 0;
                            }

                            total = parseFloat(total) + parseFloat(option_price);
                        }
                    }
                });
                
                $totals_holder.data('tm-floating-box-data',tm_floating_box_data);
                
                var subscription_options_total=0;
                var cart_fee_options_total=0;
                $epo_holder.find('.tmcp-sub-fee-field,.tmcp-fee-field').each(function() {
                    var field=$(this);
                    if (field.is(':checkbox, :radio, :input')) {
                        if ( field_is_active( field ) ){ 
                            var option_price = 0;
                            if (field.is('.tmcp-checkbox, .tmcp-radio')) {
                                if (field.is(':checked')) {
                                    option_price = field.data('price');
                                    show_total = true;
                                    field.data('isset',1);
                                }else{
                                    field.data('isset',0);
                                }
                            } else if (field.is('.tmcp-select')) {
                                option_price = field.find('option:selected').data('price');
                                show_total = true;
                                field.find('option').data('isset',0);
                                field.find('option:selected').data('isset',1);
                            } else {
                                if (field.val()) {
                                    option_price = field.data('price');
                                    show_total = true;
                                    field.data('isset',1);
                                }else{
                                    field.data('isset',0);
                                }
                            }
                            if (!option_price) {
                                option_price = 0;
                            }

                            if (field.is('.tmcp-sub-fee-field')){
                                subscription_options_total = parseFloat(subscription_options_total) + parseFloat(option_price);
                            }
                            if (field.is('.tmcp-fee-field')){
                                cart_fee_options_total = parseFloat(cart_fee_options_total) + parseFloat(option_price);
                            }
                        }
                    }
                });

                one_option_is_selected=show_total;
                tm_show_hide_add_to_cart_button();

                if(cart_fee_options_total>0){                    
                    show_total=true;
                }

                if ($totals_holder.attr('data-type')=="bto" || $totals_holder.attr('data-type')=="composite"){
                    var bto_show=main_product.find('.tm-epo-totals.tm-cart-main').data('btois');
                    if (bto_show==='show'){
                        show_total=true;
                    }
                }
                
                if (check_for_bto_internal_show){
                    show_total=true;
                }
                
                if ($formcart && !per_product_pricing){
                    show_total=false;
                }

                if(tm_epo_js.tm_epo_final_total_box=='pxq'){
                    show_total=true;
                }

                if (qty > 1){
                    show_total=true;
                }
                if ( (product_type == 'variable' || product_type == 'variable-subscription') && !current_variation){
                    show_total=false;
                }

                if (show_total && qty > 0) {
                    /* hide native prices */
                    tm_get_native_prices_block($cart).hide();
                    
                    var _total=total;

                    total = parseFloat(total * qty);

                    var formatted_options_total,// = tm_set_price(total),
                        formatted_final_total,
                        extra_fee=0;
                    
                    if (tm_epo_js.extra_fee){
                        extra_fee=parseFloat(tm_epo_js.extra_fee);
                        if (isNaN(extra_fee)){
                            extra_fee=0;
                        }
                    }
                    product_price=tm_set_tax_price(product_price,$totals_holder);
                    var product_total_price = parseFloat(product_price * qty);                        
                    var late_total_price= add_late_fields_prices(parseFloat(product_price) + parseFloat(_total),bundleid,$totals_holder);                                                
                    _total = _total + late_total_price;
                    total = parseFloat(_total * qty);
                    var total_plus_fee=parseFloat(total)+parseFloat(cart_fee_options_total);
                    formatted_options_total = tm_set_price(total_plus_fee,$totals_holder,true,true);
                    product_total_price = parseFloat(product_total_price + total_plus_fee + extra_fee);
                    formatted_final_total = tm_set_price(product_total_price,$totals_holder,true,true);
                    
                    var html;
                    if ((tm_epo_js.tm_epo_final_total_box=='hideifoptionsiszero' && total_plus_fee==0) || tm_epo_js.tm_epo_final_total_box=='hide'){
                        html='';
                        $totals_holder.html(html).hide();
                        $totals_holder.closest(".tm-totals-form-main").hide();
                        if (formatted_final_total){
                            tm_get_native_prices_block($_formcart).html('<span class="amount">'+formatted_final_total+'</span>').show();
                        }
                        $totals_holder.data('tm-html',html);
                    }else{
                        html = '<dl class="tm-extra-product-options-totals tm-custom-price-totals">';
                        if (tm_epo_js.tm_epo_final_total_box!='pxq' && tm_epo_js.tm_epo_final_total_box!='final' && tm_epo_js.tm_epo_final_total_box!='hide' && (!(total_plus_fee==0 && tm_epo_js.tm_epo_final_total_box=='hideoptionsifzero')) ){                        
                            html = html + '<dt class="tm-options-totals">' + tm_epo_js.i18n_options_total + '</dt><dd class="tm-options-totals"><span class="amount options">' + formatted_options_total + '</span></dd>';
                        }
                        if (extra_fee) {
                            var formatted_extra_fee=tm_set_price(extra_fee,$totals_holder,true,true);
                            html = html + '<dt class="tm-extra-fee">' + tm_epo_js.i18n_extra_fee + '</dt><dd class="tm-extra-fee"><span class="amount options extra-fee">' + formatted_extra_fee + '</span></dd>';
                        }
                        if (formatted_final_total) {// && tm_epo_js.tm_epo_final_total_box!='hide'
                            html = html + '<dt class="tm-final-totals">' + tm_epo_js.i18n_final_total + '</dt><dd class="tm-final-totals"><span class="amount final">' + formatted_final_total + '</span></dd>';
                        }
                        if ($totals_holder.data('is-subscription') ) {
                            var subscription_total=parseFloat($totals_holder.data('subscription-sign-up-fee'))+parseFloat(subscription_options_total);
                            if(subscription_total){
                                var formatted_subscription_fee_total=tm_set_price(subscription_total,$totals_holder,true,true);
                                html = html + '<dt class="tm-subscription-fee">' + tm_epo_js.i18n_sign_up_fee + '</dt><dd class="tm-subscription-fee"><span class="amount subscription-fee">' + formatted_subscription_fee_total + '</span></dd>';
                            }
                        }
                        html = html + '</dl>';
                        $totals_holder.data('tm-html',html);
                        $totals_holder.html(html).show();
                        $totals_holder.closest(".tm-totals-form-main").show();

                        var apply_dpd=$totals_holder.data('fields-price-rules'),
                            dpd_prefix=$totals_holder.data('tm-epo-dpd-prefix'),
                            dpd_suffix=$totals_holder.data('tm-epo-dpd-suffix');
                        if (apply_dpd==1){
                            var dpd_discount=tm_get_dpd($totals_holder,apply_dpd),
                                dpd_string='';
                            if (dpd_discount[0] && dpd_discount[1] && (dpd_prefix || dpd_suffix)){
                                var dpd_discount_type=dpd_discount[1],
                                    dpd_discount_string='';
                                switch(dpd_discount_type){
                                    case 'percentage':
                                        dpd_discount_string = dpd_discount[0] +'%';
                                    break;
                                    case 'price':
                                        dpd_discount_string = tm_set_price(dpd_discount[0]*qty,$totals_holder,false,false);
                                    break;
                                    case 'fixed':
                                        dpd_discount_string = tm_set_price(dpd_discount[0],$totals_holder,false,false);
                                    break;
                                }
                                dpd_string = dpd_prefix + ' ' + dpd_discount_string + ' ' + dpd_suffix;
                            }
                            if(dpd_string){
                                $totals_holder.find('.tm-final-totals .amount.final').after('<span class="tm_dpd_label">'+dpd_string+'</span>');
                            }
                        }
                    }                    

                    if ($formcart){
                        if (per_product_pricing){
                            $cart.find('.cpf-bto-optionsprice').val(parseFloat(total));
                        }
                        main_cart.trigger("tm-epo-update");
                    }else{
                        main_product.find('.tm-epo-totals.tm-cart-main').data('is_active',true);
                        tm_set_subscription_period();
                    }
                } else {
                    /* show native prices */
                    tm_get_native_prices_block($cart)
                    .show()
                    .each(function(){
                        if (!$(this).data('tm-original-html')){
                            $(this).data('tm-original-html',$(this).html());
                        }else{
                            $(this).html($(this).data('tm-original-html'));
                        }

                    });

                    $totals_holder.empty().hide();
                    $totals_holder.data('tm-html','');
                    if ($formcart){
                        if (per_product_pricing){
                            $cart.find('.cpf-bto-optionsprice').val(parseFloat(total*qty));    
                        }                        
                        main_cart.trigger("tm-epo-update");
                    }
                    tm_set_subscription_period();
                }
                if (container_id){
                    main_product.find( '.bto_form_' + container_id + ',#composite_form_' + container_id + ',#composite_data_' + container_id ).trigger('cpf_bto_review');
                }
                main_cart.trigger("tm-epo-after-update");
            });

            $form.find('.variations_form').on('show_variation.tmepo tm_fix_stock', '.single_variation_wrap', function(event, variation) {
                tm_fix_stock_tmepo($(this),$form);
            });
            if(this_product_type=='variable' || this_product_type=='variable-subscription'){
                // update prices when a variation is found
                $form.find('.variations_form').on('found_variation.tmepo', function(event, variation) {
                    found_variation_tmepo(event, variation);
                });
            }           
            function found_variation_tmepo(event, variation) {
                var variation_form = $(this), //$(event.target);                   
                    variations      = $totals_holder.data('variations'),
                    variations_subscription_sign_up_fee = $totals_holder.data('variations-subscription-sign-up-fee'),
                    variations_subscription_period = $totals_holder.data('variations-subscription-period'),
                    product_price;
                
                if (variations && variation.variation_id && variations_subscription_sign_up_fee[variation.variation_id]){
                    $totals_holder.data('subscription-sign-up-fee', variations_subscription_sign_up_fee[variation.variation_id]);
                }
                if (variations && variation.variation_id && variations_subscription_period[variation.variation_id]){
                    $totals_holder.data('subscription-period', variations_subscription_period[variation.variation_id]);
                }

                if (variations && variation.variation_id && variations[variation.variation_id]){
                    product_price=variations[variation.variation_id];
                    $totals_holder.data('price', product_price);
                }
                else if ($(variation.price_html).find('.amount:last').size()) {
                    product_price = $(variation.price_html).find('.amount:last').text();
                    product_price = product_price.replace(tm_epo_js.currency_format_thousand_sep, '');
                    product_price = product_price.replace(tm_epo_js.currency_format_decimal_sep, '.');
                    product_price = product_price.replace(/[^0-9\.]/g, '');
                    product_price = parseFloat(product_price);
                    $totals_holder.data('price', product_price);
                }
                main_product.find('.tm-totals-form-'+item_id).find('.cpf-product-price').val(product_price);
                  
                //variation_form.trigger('tm-epo-update');
            };
            $form.find('.variations select').on('blur',function() {
                var variation_form = $(this).closest('.cart');
                variation_form.trigger('tm-epo-update');
            });

            tm_custom_variations($form,item_id,main_product);
            main_product.find('.tm-variation-ul-color .tmhexcolorimage-li-nowh').each(function(i,el){
                var el=$(el),w=el.width()*0.9,im=el.find("img");
                im.css({"min-width":w+"px","min-height":w+"px"});
            });
        }

        function bto_support(){
            var $totals = main_product.find('.tm-epo-totals.tm-cart-main');

            // support to listen to after post success event for purchasable prodcuts (2.4)
            $(composite_selector).find( '.cart' ).append('<input type="hidden" class="tm-post-support addon">');
            main_product.find('.tm-post-support.addon').on('change', function(event) {
                $(this).closest(composite_selector).trigger('wc-composite-item-updated.cpf');
            });

            $(composite_selector)
            .on('found_variation.cpf', function(event, variation) {
                var item            = $(this),
                    container_id    = get_composite_container_id(item),
                    price_data      = get_composite_price_data(container_id),
                    product_price,
                    item_id         = item.attr('data-item-id');

                if(!price_data){
                    return;
                }
                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).removeData('cpf_review_price');
                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).find('.amount').empty();

                if ( price_data[ 'per_product_pricing' ] == true ) {                   
                    product_price = parseFloat(variation.price);
                }
                item.find('.cpf-bto-price').data('per_product_pricing',price_data[ 'per_product_pricing' ] );
                item.find('.cpf-bto-price').val(product_price);
                main_cart.data('per_product_pricing',price_data[ 'per_product_pricing' ] );

                item.find('.cart').trigger('tm-epo-update');
                $totals.data('btois','none');

            })
            .on('wc-composite-component-loaded.cpf', function() {
                $(this).trigger('wc-composite-item-updated.cpf');
            })
            .on( 'wc-composite-item-updated.cpf', function() {
                tm_lazyload();
                main_product.find(".tm-collapse").tmtoggle();
                var item = $(this),tm_extra_product_options=item.find(".tm-extra-product-options");
                tm_css_styles(item);
                tm_set_color_pickers();
                /**
                 * Start Condition Logic
                 */
                cpf_section_logic(tm_extra_product_options);
                cpf_element_logic(tm_extra_product_options);
                run_cpfdependson(tm_extra_product_options);

                var container_id    = get_composite_container_id(item),
                    price_data      = get_composite_price_data(container_id),
                    product_price,
                    item_id         = item.attr('data-item-id');

                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).removeData('cpf_review_price');
                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).find('.amount').empty();

                if (!price_data){
                    return;
                }
                if ( price_data[ 'per_product_pricing' ] == true ) {                   
                    product_price = parseFloat(item.find( '.bto_item_data,.component_data' ).data( 'price' ));
                }
                item.find('.cpf-bto-price').data('per_product_pricing',price_data[ 'per_product_pricing' ] );
                item.find('.cpf-bto-price').val(product_price);
                main_cart.data('per_product_pricing',price_data[ 'per_product_pricing' ] );

                tm_epo_init(item,item.find('.cart'));
                item.find('.cart').trigger('tm-epo-update');
                main_cart.trigger('tm-epo-update');
                tm_fix_stock_tmepo(item.find('.cart'),item);
            })
            .on( 'change', '.bto_item_options select,.component_options_select', function( event ) {
                var item            = $(this),
                    container_id    = get_composite_container_id(item),
                    item_id         = item.attr('data-item-id');

                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).removeData('cpf_review_price');
                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).find('.amount').empty();
                if (item.val() === ''){                                                         
                    $totals.data('passed',false);
                    $totals.data('btois','none');
                }else{
                    main_cart.trigger('tm-epo-update');
                }
            } )
            .on( 'woocommerce_variation_select_change.cpf', function( event ) {
                var item            = $(this),
                    container_id    = get_composite_container_id(item),
                    item_id         = item.attr('data-item-id');

                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).removeData('cpf_review_price');
                main_product.find(".bto_form,#composite_form_"+ container_id + ',#composite_data_' + container_id).find( ' .review .price_' + item_id ).find('.amount').empty();
                if (item.find( '.variations .attribute-options select' ).val()===''){                                                     
                    $totals.data('passed',false);
                    $totals.data('btois','none');
                }
            });

            main_product.find('.bundle_wrap').on('show_bundle.cpf,wc-composite-show-add-to-cart.cpf',function(){
                var id=$(this).closest('.cart').attr('data-container-id');
                check_bto(id);                
            });

            main_product.find('.composite_data .composite_wrap').on('wc-composite-show-add-to-cart.cpf',function(){
                var $composite_form=$(this).closest('.composite_form'),
                    id=$composite_form.find( '.composite_data' ).data( 'container_id' );
                check_bto(id);
                main_product.find( '#composite_data_' + id ).trigger('cpf_bto_review');
            });

            main_product.find( '.bto_form,.composite_form'  )
            .off( 'woocommerce-product-addons-update.cpf cpf_bto_review')
            .on( 'woocommerce-product-addons-update.cpf cpf_bto_review', function() {
                var bto_form=$(this);
                $(this).parent().find( composite_selector ).each( function(){
                    var item        = $(this),
                        item_id     = item.attr('data-item-id'),
                        html        = bto_form.find( ' .review .price_' + item_id ),
                        value,
                        options     = item.find(".cpf-bto-optionsprice").val();

                    if (html.data('cpf_review_price')){
                        value = accounting.unformat(html.data('cpf_review_price'));
                    }else{
                        value = accounting.unformat(html.find('.amount').html());
                        html.data('cpf_review_price',value);
                    }

                    if (options){
                        var total = parseFloat(value)+parseFloat(options);
                        html.find('.amount').html(tm_set_price(total,false));
                    }
                });                        

            } );

            $(composite_selector).trigger('wc-composite-component-loaded.cpf');

        }

        function check_bto(id){
            var show=true;
            var $totals = main_product.find('.tm-epo-totals.tm-cart-main');
            main_product.find( '.bto_form_' + id + ',#composite_form_' + id + ',#composite_data_' + id ).parent().find( composite_selector ).each( function(){
                var item        = $(this),
                    item_id         = item.attr('data-item-id'),
                    form_data       = main_product.find( '.bto_form_' + id + ' .bundle_wrap .bundle_button .form_data_' + item_id + ',#composite_form_' + id + ' .bundle_wrap .bundle_button .form_data_' + item_id + ',#composite_data_' + id + ' .composite_wrap .composite_button .form_data_' + item_id),
                    product_input   = form_data.find( 'input.product_input' ).val(),
                    quantity_input  = form_data.find( 'input.quantity_input' ).val(),
                    variation_input = form_data.find( 'input.variation_input' ).val(),
                    product_type    = item.find( '.bto_item_data,.component_data' ).data( 'product_type' );
                
                if ( product_type == undefined || product_type == '' || product_input === '' ){
                    show = false;
                }
                else if ( product_type != 'none' && quantity_input == '' ){
                    show = false;
                }
                else if ( product_type == 'variable' && variation_input == undefined ) {
                    show = false;
                }
            });
            
            if (show){
                $totals.data('btois','show');
            }else{
                $totals.data('btois','none');
            }
            main_cart.trigger('tm-epo-update');
        }

        function tm_lazyload(){
            if (tm_epo_js.tm_epo_no_lazy_load=="yes"){
                return;
            }
            if (tm_lazyload_container){
                $(tm_lazyload_container).find("img.tmlazy").lazyLoadXT();
            }else{
                $(window).lazyLoadXT();
            }
        }

        function tm_css_styles(obj){
            if (tm_epo_js.css_styles=='on'){
                if (!obj){
                    main_product.find('.tm-extra-product-options .tm-epo-field.tmcp-checkbox').not('.use_images,.tm-styled').addClass('tm-styled').prettyCheckable({color:tm_epo_js.css_styles_style});
                    main_product.find('.tm-extra-product-options .tm-epo-field.tmcp-radio').not('.use_images,.tm-styled').addClass('tm-styled').prettyCheckable({color:tm_epo_js.css_styles_style});
                }else{
                    if ($(obj).is(".component")){
                        var bto_animate_height_fix = window.setTimeout(function() {
                            $(obj).find('.tm-extra-product-options .tm-epo-field.tmcp-checkbox').not('.use_images,.tm-styled').addClass('tm-styled').prettyCheckable({color:tm_epo_js.css_styles_style});
                            $(obj).find('.tm-extra-product-options .tm-epo-field.tmcp-radio').not('.use_images,.tm-styled').addClass('tm-styled').prettyCheckable({color:tm_epo_js.css_styles_style});
                        }, 600);
                    }else{
                        $(obj).find('.tm-extra-product-options .tm-epo-field.tmcp-checkbox').not('.use_images,.tm-styled').addClass('tm-styled').prettyCheckable({color:tm_epo_js.css_styles_style});
                        $(obj).find('.tm-extra-product-options .tm-epo-field.tmcp-radio').not('.use_images,.tm-styled').addClass('tm-styled').prettyCheckable({color:tm_epo_js.css_styles_style});
                    }
                }
            }
        }

        function tm_set_color_pickers(obj){
            if (!obj){
                obj=main_product.find('.tm-color-picker');
            }
            if ($(obj).length){
                $(obj).spectrum({});
            }            
        }

        function tm_product_image(){
            var img=main_product.find(".images img").not('.thumbnails img');
            if ($(img).length>1){
                img=$(img).first();
            }
            var is_yith_wcmg=false,yith_wcmg = $('.images');
            if (window.yith_magnifier_options && yith_wcmg.data('yith_magnifier')){
                is_yith_wcmg = true;
            }
            var is_iosSlider=false,is_iosSlider_element=$('.iosSlider.product-gallery-slider');
            if(is_iosSlider_element.length && is_iosSlider_element.iosSlider){
                is_iosSlider = true;
            }
            if ($(img).length>0){
                img.data('tm-current-image',false);
                var a=img.closest("a");
                var a_href_original=a.attr('href');
                main_product.on('tm_change_product_image',function(e){
                    var tm_current_image_element_id=e.element.attr('name'),
                        $main_product=e.main_product;
                    
                    var clone_image=img.tm_clone(),
                        preload_img = new Image();
                    
                    preload_img.onload = function() {
                        $main_product.find('#'+tm_current_image_element_id+'_tmimage').remove();
                        $main_product.find('.tm-clone-product-image').hide();
                        clone_image.prop('src',preload_img.src).hide();
                        img.hide().after(clone_image);
                        clone_image.show();
                        if(is_iosSlider){
                            setTimeout(function() {
                                is_iosSlider_element.iosSlider('update');
                            }, 150);
                        }
                    };

                    clone_image
                    .attr('id',tm_current_image_element_id+'_tmimage')
                    .addClass('tm-clone-product-image').hide();//.show();

                    preload_img.src = e.src;

                    

                    a.attr('href',e.src);

                    img.data('tm-current-image',tm_current_image_element_id);

                    if (is_yith_wcmg){
                        yith_wcmg.yith_magnifier('destroy');
                        yith_wcmg.yith_magnifier(yith_magnifier_options);
                    }

                });
                main_product.on('tm_restore_product_image',function(e){
                    var tm_current_image_element_id=e.element.attr('name'),
                        $main_product=e.main_product;
                    $main_product.find('#'+tm_current_image_element_id+'_tmimage').remove();
                    if($main_product.find('.tm-clone-product-image').length==0){
                        img.show();
                        a.attr('href',a_href_original);
                        img.data('tm-current-image',false);                        
                    }else{
                        var len=$main_product.find('.tm-clone-product-image').length;
                        var current_element,found=false;
                        var tm_current_image_element_id=img.data('tm-current-image');
                        for (var i = len - 1; i >= 0; i--) {
                            current_element=$main_product.find('.tm-clone-product-image').eq(i).attr('id').replace('_tmimage','');
                            
                            if ($main_product.find('[name="'+current_element+'"]').closest(".cpf_hide_element").is(":visible")){
                                $main_product.find('.tm-clone-product-image').eq(i).show();
                                a.attr('href',$main_product.find('.tm-clone-product-image').eq(i).prop('src'));
                                img.data('tm-current-image',current_element);
                                found=true;
                                break;
                            }else{
                                $main_product.find('.tm-clone-product-image').eq(i).hide();
                            }
                        };
                        if(!found){
                            img.show();
                            a.attr('href',a_href_original);
                            img.data('tm-current-image',false);
                        }else{
                            $main_product.find('#'+tm_current_image_element_id+'_tmimage').remove();
                        }                        
                    }
                    if (is_yith_wcmg){
                        yith_wcmg.yith_magnifier('destroy');
                        yith_wcmg.yith_magnifier(yith_magnifier_options);
                    }
                    if(is_iosSlider){
                        setTimeout(function() {
                            is_iosSlider_element.iosSlider('update');
                        }, 150);
                    }

                });
                main_product.on('tm_attempt_product_image',function(e){
                    var $main_product=e.main_product,
                        tm_last_visible_image_element=$main_product.find('.prettycheckbox:visible .tm-product-image:checked,.tm-product-image:checked,select.tm-product-image');
                    var last_activate_field=[];
                    tm_last_visible_image_element.each(function(){
                        var t=$(this);
                        if(field_is_active(t)){
                            last_activate_field.push(t);
                        }
                    });
                    var tm_last_visible_image_element_id='';
                    if (last_activate_field.length){
                        tm_last_visible_image_element=last_activate_field[last_activate_field.length-1];
                        tm_last_visible_image_element_id=tm_last_visible_image_element.attr('name');
                    }

                    var tm_current_image_element_id=img.data('tm-current-image');
                    
                    if (tm_last_visible_image_element.length && (!tm_current_image_element_id || tm_last_visible_image_element_id!=tm_current_image_element_id)){
                        tm_last_visible_image_element.trigger('tm_trigger_product_image');
                        return;
                    }else{
                        
                        if (!tm_current_image_element_id || $main_product.find('[name="'+tm_current_image_element_id+'"]').closest(".cpf_hide_element").is(":visible")){
                            return;
                        }else{
                            $main_product.find('#'+tm_current_image_element_id+'_tmimage').remove();
                            var len=$main_product.find('.tm-clone-product-image').length;
                            if(len==0){
                                img.show();
                                a.attr('href',a_href_original);
                                img.data('tm-current-image',false);
                            }else{                               
                                var current_element,found=false;
                                for (var i = len - 1; i >= 0; i--) {
                                    current_element=$main_product.find('.tm-clone-product-image').eq(i).attr('id').replace('_tmimage','');
                                    
                                    if ($main_product.find('[name="'+current_element+'"]').closest(".cpf_hide_element").is(":visible")){
                                        $main_product.find('.tm-clone-product-image').eq(i).show();
                                        a.attr('href',$main_product.find('.tm-clone-product-image').eq(i).prop('src'));
                                        img.data('tm-current-image',current_element);
                                        found=true;
                                        break;
                                    }else{
                                        $main_product.find('.tm-clone-product-image').eq(i).hide();
                                    }
                                };
                                if(!found){
                                    img.show();
                                    a.attr('href',a_href_original);
                                    img.data('tm-current-image',false);
                                }
                            }
                        }

                    }
                    if (is_yith_wcmg){
                        yith_wcmg.yith_magnifier('destroy');
                        yith_wcmg.yith_magnifier(yith_magnifier_options);
                    }
                    if(is_iosSlider){
                        setTimeout(function() {
                            is_iosSlider_element.iosSlider('update');
                        }, 150);
                    }

                });

                var last_activate_field=[];
                main_product.find('.tm-product-image:checked,select.tm-product-image').each(function(){
                    var t=$(this);
                    if(field_is_active(t)){
                        last_activate_field.push(t);
                    }
                });
                if (last_activate_field.length){
                    last_activate_field[last_activate_field.length-1].trigger('tm_trigger_product_image');
                }
                              
            }

            $(window).trigger('tm_product_image_loaded')
        }

        function tm_custom_variations(form,item_id,$main_product){

            var $epo_holder=$main_product.find('.tm-extra-product-options.tm-cart-'+item_id),
                variation_id_selector='input[name^="variation_id"]';
            if ( form.find( 'input.variation_id' ).length > 0 ){
                variation_id_selector='input.variation_id';
            }
            if ($epo_holder.find('.tm-epo-variation-element').length){
                var tm_epo_variation_section = form.find(".tm-epo-variation-section");
                if(!main_epo_inside_form){
                    tm_epo_variation_section = $main_product.find('.tm-extra-product-options.tm-cart-'+item_id).find(".tm-epo-variation-section");
                }

                if (item_id && item_id!="main"){// on composite
                    var li_variations=tm_epo_variation_section.closest("li.tm-extra-product-options-field");
                    form.find('.variations').hide().after(tm_epo_variation_section.addClass("tm-extra-product-options nopadding"));
                    if (li_variations.is(":empty")){
                        li_variations.hide();
                    }
                    form.on('wc_variation_form.tmlogic', function() {
                        form.find(".variations_form").on("click.tmlogic",".reset_variations",function(e){
                            form.find('.tm-epo-variation-element').closest("li").show();
                            form.find('select.tm-epo-variation-element').val("").children('option').removeAttr("disabled").show();
                            form.find('.tm-epo-variation-element')
                                .removeAttr("disabled").removeClass("tm-disabled")
                                .removeAttr("checked").prop("checked",false);
                            $(window).trigger("tmlazy");
                            $main_product.find('.tm-epo-variation-element').trigger('tm_trigger_product_image');
                        });
                        // Disable option fields that are unavaiable for current set of attributes 
                        form.on("woocommerce_update_variation_values_tmlogic",function(e,variations){
                            tm_custom_variations_update(form);
                        });
                        for (var i = 0; i < late_variation_event.length; i++) {
                            var form_event = late_variation_event[i],
                                type = typeof(form_event);
                            if(type=="object"){
                                var name = typeof(form_event.name)=="string" || false,
                                    selector = typeof(form_event.selector)=="string" || false,
                                    func = typeof(form_event.func)=="function" || false;
                                if(name && selector && func){
                                    if(selector=='input[name="variation_id"]'){
                                        selector=variation_id_selector;
                                    }
                                    form.on(form_event.name,form_event.selector,form_event.func);
                                }
                            }
                        };
                        late_variation_event = [];
                        form.find('.tm-epo-variation-element').last().trigger('tm_epo_variation_element_change');
                    });
                }else{
                    form = form.find(".variations_form");
                    //form.find('.variations').hide();
                    var li_variations=tm_epo_variation_section.closest("li.tm-extra-product-options-field");
                    form.find('.variations').hide().after(tm_epo_variation_section.addClass("tm-extra-product-options nopadding"));
                    if (li_variations.is(":empty")){
                        li_variations.hide();
                    }
                    form.on("click.tmlogic",".reset_variations",function(e){
                        form.find('.tm-epo-variation-element').closest("li").show();
                        form.find('select.tm-epo-variation-element').val("").children('option').removeAttr("disabled").show();
                        form.find('.tm-epo-variation-element')
                            .removeAttr("disabled").removeClass("tm-disabled")
                            .removeAttr("checked").prop("checked",false);
                        $(window).trigger("tmlazy");
                        $main_product.find('.tm-epo-variation-element').trigger('tm_trigger_product_image');
                    });
                    // Disable option fields that are unavaiable for current set of attributes 
                    form.on("woocommerce_update_variation_values_tmlogic",function(e,variations){
                        tm_custom_variations_update(form);
                    });
                    for (var i = 0; i < late_variation_event.length; i++) {
                        var form_event = late_variation_event[i],
                            type = typeof(form_event);
                        if(type=="object"){
                            var name = typeof(form_event.name)=="string" || false,
                                selector = typeof(form_event.selector)=="string" || false,
                                func = typeof(form_event.func)=="function" || false;
                            if(name && selector && func){
                                if(selector=='input[name="variation_id"]'){
                                    selector=variation_id_selector;
                                }
                                form.on(form_event.name,form_event.selector,form_event.func);
                            }
                        }
                    };
                    late_variation_event = [];                
                    form.find('.tm-epo-variation-element').last().trigger('tm_epo_variation_element_change');
                }

                // global event for custom variations
                form_submit_events[form_submit_events.length] = {
                    "trigger":function(){return true;},
                    "on_true":function(){
                        $main_product.find('.tm-epo-variation-element').attr("disabled","disabled");
                        return true;
                    },
                    "on_false":function(){
                        $main_product.find('.tm-epo-variation-element').removeAttr("disabled");
                    }
                };
                var uls=$main_product.find('.tm-variation-ul-color').find("li");
                uls.each(function(i,el){
                    var el=$(el),w=el.width()*0.9,im=el.find("img");
                    im.css({"min-width":w+"px","min-height":w+"px"});
                });                
            }
        }
        function tm_theme_specific_actions(){
            var totals=main_product.find('#tm-epo-totals'),
                theme_name=totals.data('theme-name');

            if (theme_name){
                var all_epo_selects = main_product.find('.tm-extra-product-options select');
                switch (theme_name){
                    case 'Flatsome':
                        all_epo_selects.wrap('<div class="custom select-wrapper"/>');
                        break;

                    case 'Avada':
                        all_epo_selects.wrap('<div class="avada-select-parent tm-select-parent"></div>');
                        $('<div class="select-arrow">&#xe61f;</div>').appendTo(main_product.find('.tm-select-parent'));
                        if (window.calc_select_arrow_dimensions){
                            calc_select_arrow_dimensions();
                        }
                        break;
                }
            }        
            
        }

        tm_set_datepicker();
        tm_set_range_pickers();

        tm_set_url_fields();
        tm_set_fee_prices();
        tm_set_subscription_period();
        $.tm_tooltip();

        main_product.find(".tm-collapse").tmtoggle();
        main_product.find(".tm-section-link").tmsectionpoplink();

        /**
         * Holds the active precentage of total current price type fields
         */
        var late_fields_prices=[],
            tm_extra_product_options=main_product.find(".tm-extra-product-options"),
            variations_form=main_product.find('.variations_form'),
            wc_variation_form_run_once=false;

        if (variations_form.length > 0) {
            var run_wc_variation_form_cpf=function(){
                variations_form.on('wc_variation_form.cpf', function() {
                    if (wc_variation_form_run_once){
                        return;
                    }
                    /**
                     * Start Condition Logic
                     */
                    cpf_section_logic(tm_extra_product_options);
                    cpf_element_logic(tm_extra_product_options);
                    run_cpfdependson(tm_extra_product_options);
                    
                    late_fields_prices=[];
        
                    tm_epo_init();
                    tm_product_image();
                    wc_variation_form_run_once = true;
                    // no need to trigger tm-epo-update for variations on init
                });

            }
            var detect_variation_swatches=false;
            if ($('.variation_form_section .variations-table').length){
                detect_variation_swatches=true;
            }
            if (detect_variation_swatches){
                var detect_variation_swatches_interval = function(){
                    var $id=requestAnimationFrame(detect_variation_swatches_interval);
                    var bound=variations_form.data('bound');
                    if (bound){
                        cancelAnimationFrame($id);
                        run_wc_variation_form_cpf();
                        variations_form.trigger('wc_variation_form.cpf');
                    }
                };
                detect_variation_swatches_interval();
            }else{
                run_wc_variation_form_cpf();
            }
        } else {
            setTimeout(function() {
            /**
             * Start Condition Logic
             */            
            cpf_section_logic(tm_extra_product_options);
            cpf_element_logic(tm_extra_product_options);
            run_cpfdependson(tm_extra_product_options);
            
            // Init field price rules
            tm_epo_rules();
            late_fields_prices=[];

            tm_epo_init();
            tm_product_image();
            bto_support();
            main_product.find('.cart').trigger('tm-epo-check-dpd');
            main_product.find('.cart').trigger({
                "type":"tm-epo-update",
                "norules":"init"
            });
            
            }, 20 );
        }

        tm_lazyload();
        
        tm_css_styles();
        tm_set_color_pickers();

        /* */
        tm_floating_totals();
        tm_form_submit_event();

        tm_show_hide_add_to_cart_button();

        tm_theme_specific_actions();
    }

    function get_variation_current_settings(form){
        var current_settings={};
        form.find( '.variations select' ).each( function() {
            var attribute_name,value;
            // Get attribute name from data-attribute_name, or from input name if it doesn't exist
            if ( typeof( $( this ).data( 'attribute_name' ) ) != 'undefined' )
                attribute_name = $( this ).data( 'attribute_name' );
            else
                attribute_name = $( this ).attr( 'name' );

            // Encode entities
            value = $( this ).val();

            // Add to settings array
            current_settings[ attribute_name ] = value;

        });
        return current_settings;
    }

    function tm_custom_variations_update(form){
        var all_variations = form.data( 'product_variations' ),
            current_settings={};
        // Fallback to window property if not set - backwards compat
        if ( ! all_variations ){
            all_variations = window.product_variations.product_id;
        }
        if ( ! all_variations ){
            all_variations = window.product_variations;
        }
        if ( ! all_variations ){
            all_variations = window['product_variations_' + product_id ];
        }

        form.find('.cpf-type-variations').each(function(i,el){
            var t=$(el).find('.tm-epo-variation-element'),
                id,
                v,
                exists = false;

            if(t.is("select")){
                id=t.attr('data-tm-for-variation');
                v=t.val();
    
                t.children('option').each(function(x,o){
    
                    exists = false;
                    form.find('#'+id).children('option').each(function(){
                        if ($(this).attr("value") == $(o).attr("value")) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists){
                        $(o).attr("disabled","disabled").hide();
                    }else{
                        $(o).removeAttr("disabled").show();
                    }

                });

            }else{
                
                t.each(function(x,o){
                    var o=$(o),
                        li=o.closest("li"),
                        input=li.find(".tm-epo-variation-element");
                    id=o.attr('data-tm-for-variation');
                    v=o.val();                   
                    
                    var this_settings=get_variation_current_settings(form);
                    this_settings[ 'attribute_'+id ] = v;
                    
                    var matching_variations = $.fn.wc_variation_form.find_matching_variations( all_variations, this_settings );
                    var variation = matching_variations.shift();
                    
                    if (!variation){
                        o.attr("disabled","disabled").addClass("tm-disabled");
                        
                        input.attr("disabled","disabled");
                        input.attr("data-tm-disabled","disabled");
                        input.prettyCheckable('disable');
                        li.fadeTo( "fast" , 0.5);
                    }else{
                        o.removeAttr("disabled").removeClass("tm-disabled");
                        li.fadeTo( "fast" , 1,function(){$(this).css("opacity", "");});
                        input.removeAttr("disabled");
                        input.removeAttr("data-tm-disabled");
                        input.prettyCheckable('enable');
                    }
                });

            }

        });
    }

    function tm_fix_stock(cart,html){
        if (html==undefined){
            return false;
        }
        var cart=$(cart),
            custom_variations = cart.find('.tm-epo-variation-element'),
            section = custom_variations.closest('.tm-epo-variation-section');

        if (custom_variations.length){
            section.find('.tm-stock').remove();
            section.append('<div class="tm-stock">'+html+'</div>');
            return true;
        }else{
            cart.find('.tm-stock').remove();
            cart.find('table.variations').after('<div class="tm-stock">'+html+'</div>');
            return true;
        }
        return false;
    }

    function tm_fix_stock_tmepo($this,form){
        //fix stock        
        var stock = $this.find( '.stock' );
        if (stock.length){
            form.find('.tm-stock').remove();
            if (tm_fix_stock(form, stock.prop('outerHTML'))){
                stock.remove();    
            }
        }
    }   
    
    var tm_lazyload_container=false,
        epo_selector = '.tm-extra-product-options';

    $.extend($.validator.messages, {
        required: tm_epo_js.tm_epo_global_validator_messages["required"],
        email: tm_epo_js.tm_epo_global_validator_messages["email"],
        url: tm_epo_js.tm_epo_global_validator_messages["url"],
        number: tm_epo_js.tm_epo_global_validator_messages["number"],
        digits: tm_epo_js.tm_epo_global_validator_messages["digits"],
        maxlength: $.validator.format( tm_epo_js.tm_epo_global_validator_messages["maxlength"] ),
        minlength: $.validator.format( tm_epo_js.tm_epo_global_validator_messages["minlength"] ),
        max: $.validator.format( tm_epo_js.tm_epo_global_validator_messages["max"] ),
        min: $.validator.format( tm_epo_js.tm_epo_global_validator_messages["min"] )
    });

    $(document).ready(function() {

        $('.tm-has-options, .tm-no-options-pxq, .tm-no-options-composite').each(function(loop_index,product_wrap){

            var j_product_wrap=$(product_wrap);            

            tm_init_epo(j_product_wrap);

        });

        $(".tm-cart-link").tmpoplink();
        $( 'body' ).on('updated_checkout' ,function(){$(".tm-cart-link").tmpoplink();});

        $(window).trigger("tmlazy");

        $(document).ajaxSuccess(function(event, xhr, settings) {
            
            var theme_flatsome=$('.product-lightbox'),
                theme_kleo=$('#productModal'),
                quick_view_plugin=$('.woocommerce.quick-view'),
                yith_quick_view_plugin=$('#yith-quick-view-modal'),
                venedor_quick_view_plugin=$('.quickview-wrap');
            
            if(quick_view_plugin.length){
                tm_lazyload_container=quick_view_plugin;
                tm_init_epo(tm_lazyload_container);
            }else{
                if(theme_flatsome.length){
                    tm_lazyload_container=theme_flatsome;
                    tm_init_epo(tm_lazyload_container);
                    $(window).trigger("tmlazy");
                }
                else if(theme_kleo.length){
                    tm_lazyload_container=theme_kleo;
                    tm_init_epo(tm_lazyload_container);
                    $(window).trigger("tmlazy");
                }
                else if(yith_quick_view_plugin.length){
                    tm_lazyload_container=yith_quick_view_plugin;
                    tm_init_epo(tm_lazyload_container);
                    $(window).trigger("tmlazy");
                }
                else if(venedor_quick_view_plugin.length){
                    tm_lazyload_container=venedor_quick_view_plugin;
                    tm_init_epo(tm_lazyload_container);
                    $(window).trigger("tmlazy");
                }

            }
            return;
        });

        $(window).trigger('tm_epo_loaded');

        // bulk variations forms plugin
        $('#wholesale_form').on('submit',function(){
            var product_id = $('form.cart').find('input[name="add-to-cart"]').val();
            // visible fields
            var epos=$('.tm-extra-product-options.tm-cart-main[data-product-id="'+product_id+'"]').tm_clone();
            // hidden fields see totals.php
            var epos_hidden=$('.tm-totals-form-main[data-product-id="'+product_id+'"]').tm_clone();
            var formepo=$('<div class="tm-hidden tm-formepo"></div>');
            formepo.append(epos);
            formepo.append(epos_hidden);
            $(this).append(formepo);
            return true;
        });
    });
})(jQuery);