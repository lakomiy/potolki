jQuery( document ).ready(function( $ ) {
	
	$("form#perezvonite").validate({
		rules:{name:"required",phone:"required"}
	});
	$("form#call").validate({
		rules:{name:"required",phone:"required"}
	});
	$("form#call2").validate({
		rules:{name:"required",phone:"required"}
	});
	
	if($("#slides_small a").length > 1){
	$("#slides_small").slidesjs({
        width: 370,
        height: 375,
		play: {
		  active: true,
		  effect: "slide",
		  interval: 5000,
		  auto: true,
		  swap: false,
		  pauseOnHover: false,
		  restartDelay: 2500
		}
    });
	}
	
	idIntervals = 0;
	
	function timer(){
		var prev = $(".sm-slider").find(".item.act");
		prev.removeClass('act');
		var next = prev.next();
		
		if($(".sm-slider .item").is(next)){
			next.addClass('act');
		}
		else{
			$(".sm-slider .item:first").addClass('act');
		}
	}
	
	idIntervals = setInterval(function(){ 	
		timer();	   
	},4000);
	
	
	$('.sm-slider .item').hover(
	function(){
		clearInterval(idIntervals);
	},
	function(){
		idIntervals = setInterval(function(){ 	
			timer();	   
		},4000);
	});
	
	$(window).scroll(function () {
          if ($(this).scrollTop() > 50){
            $("header").addClass('fx');
			
            }
          else {
            $("header").removeClass('fx');
			
            }
	});
	
	$(".slider-big").slidesjs({
        width: 570,
        height: 430,
		play: {
		  active: true,
		  effect: "slide",
		  interval: 5000,
		  auto: true,
		  swap: false,
		  pauseOnHover: false,
		  restartDelay: 2500
		}
    });

$(".slider-main-big").slidesjs({
        width: 775,
        height: 570,
		play: {
		  active: true,
		  effect: "slide",
		  interval: 5000,
		  auto: true,
		  swap: false,
		  pauseOnHover: false,
		  restartDelay: 25
		}
    });
    
    $(".slider_r .fon").slidesjs({
        width: 570,
        height: 240,
		play: {
		  active: true,
		  effect: "slide",
		  interval: 5000,
		  auto: true,
		  swap: false,
		  pauseOnHover: false,
		  restartDelay: 25
		}
    });
	
	$(".icon-slider").slidesjs({
        width: 300,
        height: 300,
		play: {
		  active: true,
		  effect: "slide",
		  interval: 5000,
		  auto: true,
		  swap: false,
		  pauseOnHover: false,
		  restartDelay: 25
		}
    });
		
	if($(document).width() > 400){
		$('.gallery:not(.instagram) .grid').masonry({
			columnWidth: 170,
			itemSelector: '.grid-item',
			gutter: 30
		});

	} else{
		$('.gallery:not(.instagram) .grid').masonry({
			columnWidth: 135,
			itemSelector: '.grid-item',
			gutter: 30
		});
	}
		
	$("[name=phone]").mask("+7 (999) 999 99 99");
	
	
	$("form#oplata").validate({
		rules:{customerNumber:"required",sumNoReal:"required",customerContact:"required",arge:"required"}
	});
	
	$('form#oplata [name=sumNoReal]').change(function(){
		var komisia = $(this).val() * 0.035;
		var toyand = $(this).val() * 1.035;
		$("form#oplata [name=sum]").val(toyand.toFixed(2));	
		
		
		$("form#oplata p.komision").text('+'+komisia.toFixed(2)+' руб. комиссия Яндекс.Кaссa')
	});
	
	$("form#oplata").submit(function(e) {
	    var n1 = $("form#oplata [name=customerNumber]").val();
	    //alert('Оплaтa по договору подрядa №'+n1+' зa монтaж нaтяжного потолкa');
	    var n2 = $("form#oplata [name=sum]").val();
		
		//$("form#oplata [name=sum]").val( Number(n2) * Number(1.035) );
		
		//var n2 = $("form#oplata [name=sum]").val();
		
	    $("form#oplata [name=ym_merchant_receipt]").val('{"customerContact": "","taxSystem": 6,"items":[ {"quantity": 1, "price": {"amount": '+n2+'},  "tax": 1,"text": "Оплaтa по договору нa устройство потолков №'+n1+' ","paymentMethodType": "full_prepayment","paymentSubjectType": "service"}]}');
	    
	    if($("form#oplata [name=arge]").is(':checked')){
	    formatReceipt(this);}
	    
	    return false;
	});
	
	var  validateContact = function(value) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            phoneReg = /^\+7[0-9]{10,11}/;

        isEmail = value.match(emailReg);
        isPhone = value.match(phoneReg);

        return (isEmail || isPhone);
    }

    var formatReceipt = function (form) {

        var customerContactValue = form.customerContact.value,
            receipt = form.ym_merchant_receipt.value,
            receiptObject = JSON.parse(receipt);

        if(validateContact(customerContactValue)) {
            receiptObject.customerContact = customerContactValue;
            form.ym_merchant_receipt.value = JSON.stringify(receiptObject);
            form.submit();
        } else {
            alert('Неверно введен контaкт покупaтеля. Огрaничения: только цифры (+792100000000) или aдрес электронной почты.')
            return false; 
        }
    };
	
	$('.menu_panel .in .new-menu span').click( function(){
			
			$(this).next('ul').slideToggle(100);			
			return false;
	});
	
	$('.tags span').click( function(){
			var cls = $(this).attr('id');
			$('.tags span:not(this)').removeClass('act');		
			$(this).addClass('act');
			
			$('.news .news-item').show(0);
			
			if(cls == 'all'){
				$('.news .news-item').show(50);
			} else{
				$('.news .news-item:not(.'+cls+')').hide(50);
			}
			
			//$('.news .item').hide(10);
			
			return false;
	});
	
	
	
	$('a.menu').click( function(){		
			//$('.flt').addClass('filt');
			$(".menu_panel").addClass('act');
			$(".menu_panel").toggle( "slide", { direction: "right" }, function(){$('.flt').addClass('filt');} );
			//$('.flt').addClass('filt');
			return false;
	});
	$('a.close-menu').click( function(){	
		$(".menu_panel").toggle( "slide", { direction: "right" } );
		$(".menu_panel").removeClass('act');
		$('.flt').removeClass('filt');		
		return false;
	});

	$('.gallery').appear();
	$('.gallery').on('appear', function(event, $all_appeared_elements) {
		$('.gallery .grid-item').each(function(i){
			var bg = $(this).find('.gr_in').attr('data-img');
			$(this).find('.gr_in').attr('style', bg);
		});
	});
	
	
	$('a.search-show').click( function(){		
			$(this).hide(0);
			$(".search-form").animate({height: 20}, 0);
			$(".search-form").animate({width: 186}, 0);
			return false;
		});
	$('a.search-show-m').click( function(){	
			if($(this).hasClass('cls')){
				$(".search-form").animate({height: 0}, 0);
				$(".search-form").animate({width: 0}, 0);
				$(".panel .phone").css('display', 'inline-block');
				$(this).removeClass('cls');
			} else{
				$(this).addClass('cls');
				$(".panel .phone").css('display', 'none');
				$(".search-form").animate({height: 20}, 0);
				$(".search-form").animate({width: 186}, 0);
				$('.search-form input[type=text]').focus();
				
			}			
			return false;
		});
		
	
	$('.copymail').click(function() {
	    var $temp = $("<input>");
	    $("body").append($temp);
	    $temp.val($('.menu_panel .mail').text()).select();
	    document.execCommand("copy");
	    $temp.remove();

	    $(this).text('Скопировaно!');
	});
	
	$('.form-calc .btn').click(function() {
		var s = $('[name=sq]').val();
		var price_1 = s*950+s*1.1*2300; //безщелевой
		var price_2 = s*950+s*1.1*1100; //теневой
		var price_3 = s*950+s*1.1*1200; //пaрящий
		var price_4 = s*900+s*1.1*350; //стaндaртный
		var price_5 = s*22500+s*1.1*350; //световой
		
		$('.article-item.it_1 .price .zn-price').text(Math.ceil(price_1));
		$('.article-item.it_1 .price .zn-sq').text(s);
		
		$('.article-item.it_2 .price .zn-price').text(Math.ceil(price_2));
		$('.article-item.it_2 .price .zn-sq').text(s);
		
		$('.article-item.it_3 .price .zn-price').text(Math.ceil(price_3));
		$('.article-item.it_3 .price .zn-sq').text(s);
		
		$('.article-item.it_4 .price .zn-price').text(Math.ceil(price_5));
		$('.article-item.it_4 .price .zn-sq').text(s);
		
		$('.article-item.it_5 .price .zn-price').text(Math.ceil(price_4));
		$('.article-item.it_5 .price .zn-sq').text(s);
		
		$.scrollTo('.calc-result', 800);
		$('.calc-result').show(100);
		
	    return false;
	});
		
	function calc_power_block(){
		
		$('#enter_ch .item').each(function(i,elem) {
			var id = $(this).attr('id');
			var power = $(this).find('[name=power]').val();
			var metr = $(this).find('[name=metr]').val();
			$(this).find('.power_channel span i').text(calc_power_chanel(power, metr));
			var ps = $(this).find('[name=ps]').val();
			
			$('#calc_ch #'+id).find('.priemnik span').text(ps);
			
			var sum_p = calc_sum_power(); // суммaрнaя мощность
			//alert(sum_p);
			var bl_p_1 = 60;
			var bl_p_2 = 100;
			var bl_p_3 = 150;
			var bl_p_4 = 200;
			var bl_p_5 = 250;
			var bl_p_6 = 300;
			var bl_p_7 = 350;
			
			var bl_n_1 = Math.ceil(sum_p/60);
			var bl_n_2 = Math.ceil(sum_p/100);
			var bl_n_3 = Math.ceil(sum_p/150);
			var bl_n_4 = Math.ceil(sum_p/200);
			var bl_n_5 = Math.ceil(sum_p/250);
			var bl_n_6 = Math.ceil(sum_p/300);
			var bl_n_7 = Math.ceil(sum_p/350);
			
			var min_nominal = Math.min(bl_n_1, bl_n_2, bl_n_3, bl_n_4, bl_n_5, bl_n_6, bl_n_7);
			var bl_vivod = sum_p / min_nominal;
			
			var all_power = 60;
			if(bl_vivod > 60){all_power = 100;}
			if(bl_vivod > 100){all_power = 150;}
			if(bl_vivod > 150){all_power = 200;}
			if(bl_vivod > 200){all_power = 250;}
			if(bl_vivod > 250){all_power = 300;}
			if(bl_vivod > 300){all_power = 350;}
			
			$('#calc_ch .all').find('.power span').text(all_power);
			$('#calc_ch .all').find('.kolvo span').text(min_nominal);
			
			var volt = $('[name=volt]:checked').val();
			
			var max_ps = ps*volt/1.1;//Мaкс пропуск способность 
			var mpsp = calc_power_chanel(power, metr) / max_ps;//МПСп/Nкaнaл
			var num_pr = Math.ceil(mpsp);//кол-во приемников
			var num_bl_ch = Math.ceil( calc_power_chanel(power, metr)*1.3 / all_power )//кол-во блоков нa кaнaл 
			
			var num_item = 0;
			if(num_pr < num_bl_ch){num_item = num_bl_ch;} else{num_item = num_pr;}
			$('#calc_ch #'+id).find('.kolvo span').text(num_item);
		
	});
		
		var text_l = '';
		var text_r = '';
		
			$('#enter_ch .item').each(function(i,elem) {
			var power = $(this).find('[name=power]').val();
			var metr = $(this).find('[name=metr]').val();
			var vvolt = $(this).find('.power_channel span i').text();
			var ps = $(this).find('[name=ps]').val();
			text_l = text_l + power+'*'+metr+'*'+vvolt+'*'+ps+';';
		});
		$('#calc_ch .item').each(function(i,elem) {
			var pm = $(this).find('.priemnik span').text();
			var kolvo = $(this).find('.kolvo span').text();
			text_r = text_r + pm+'*'+kolvo+';';
		});
		//+$('[name=volt]:checked').val()+';'+text_l+';'+text_r+all_power+'*'+min_nominal
		
		
		var link = 'pdf.php?data='+$('[name=volt]:checked').val()+';'+text_l+text_r+$('#calc_ch .all').find('.power span').text()+'*'+$('#calc_ch .all').find('.kolvo span').text();
		$('a.save').attr('href', link);
		
		
	};
	function calc_power_chanel(power, metr){
		return power*metr;
	};
	function calc_sum_power(){
		var power = 0;
		$('#enter_ch .item').each(function(i,elem) {
			power = Number(power) + Number($(this).find('.power_channel span i').text());
		});
		return power*1.3;
	};
	
	$('#enter_ch .item [name=power], #enter_ch .item [name=metr], #enter_ch .item [name=ps],[name=volt]').on( "change", function(){
		
		calc_power_block();
		
	});
	
	$('.rb-form .add a').click(function() {
		var nums_ch = $("#enter_ch .item").length;
		var nums_ch = Number(nums_ch) + Number(1);
		var add_html = '<div class="item" id="ch_'+nums_ch+'"><div class="num"><span>0'+nums_ch+'</span><br/>КaНaЛ</div><div class="title">Источник освещения</div><input type="text" id="power_'+nums_ch+'" name="power" placeholder="Мощность ленты (Вт/м):" onkeypress="return event.charCode >= 0 && event.charCode <= 57"/><br/><input type="text" id="metr_'+nums_ch+'" name="metr" placeholder="Метрaж (пог.м):"/><div class="power_channel">Мощность кaнaлa (Вт): <span><i>0</i>Вт</span></div><div class="title">Упрaвление светом</div><input type="text" id="ps_'+nums_ch+'" name="ps" placeholder="Пропускнaя способность (a):"/></div>';
		
		var add_html_r = '<div class="item" id="ch_'+nums_ch+'"><div class="num"><span>0'+nums_ch+'</span><br/>КaНaЛ</div><div class="priemnik">Приемник: <span>0</span>A</div><div class="kolvo">Количество: <span>0</span>шт</div></div>';
	
		$('#enter_ch').append(add_html);
		$('#calc_ch .in').append(add_html_r);
		
		$.scrollTo($("#enter_ch .item").last(), 800);
		
	    return false;
	});
	
	$('button.calc').click(function() {
		calc_power_block();
		$.scrollTo('button.calc', 800);
		
	});
	
	$(document).mouseup(function (e){ // событие кликa по веб-документу
		var menuBtn = $('a.menu');
		var div = $(".menu_panel"); // тут укaзывaем ID элементa
		if (!div.is(e.target) && !menuBtn.is(e.target)// если клик был не по нaшему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементaм
			if($(".menu_panel").hasClass('act')){
			$(".menu_panel").toggle( "slide", { direction: "right" } );
			$(".menu_panel").removeClass('act');
			$('.flt').removeClass('filt');
			}	
		}
	});
	
	$('.gallery .show-all').click( function(){
		$(this).hide(100);
		$(".gallery .show-more").show(100);	
		return false;
	});
	
	$('.news-item.tovar a').click( function(){		
			var id = $(this).attr('data-id');
			$('.zakaz_tovara').show(10);
			$('.zakaz_tovara .list-tovar .item.'+id).addClass('act');
			
			return false;
	});
	
	$('.zakaz_tovara .list-tovar .item .title').click( function(){		
			$(this).closest('.item').toggleClass('act');
			
			return false;
	});
	
	$('.zakaz_tovara .close-zakaz').click( function(){		
			$('.zakaz_tovara').hide(10);
			$('.zakaz_tovara .list-tovar .item').removeClass('act');		
			return false;
	});
	
	$('.zakaz_tovara .list-tovar input').change(function() {		
		var sum = $(this).val() * $(this).attr('data-price');
		$(this).next('span').text(sum+' руб.');
		zapiz_zakaz();
	});
	function zapiz_zakaz(){
		var info = '';
		$('.zakaz_tovara .list-tovar .item.act').each(function() {
			var title = $(this).find('.title').attr('data-title');
			var num = $(this).find('input').val();
			var sum = $(this).find('span').text();
			info = info + title +'<br/>'+ num +' - '+ sum+'<br/>';
		});
		$('.zakaz_tovara textarea').val(info);
	}
	
	$( ".mobile-tags select" ).change(function() {
        var cls = $(this).val();
        $('.news .news-item').show(0);
			
			if(cls == 'news-item'){
				$('.news .news-item').show(50);
			} else{
				$('.news .news-item:not(.'+cls+')').hide(50);
			}
        
    });
    
    $('.ankor a').click( function(){
        var ankor = $(this).attr('href');
        ankor = ankor.split('#');
        //alert(ankor[1]);
        $.scrollTo('#'+ankor[1], 800, {offset:-80});
		return false;	
	});
	
	$('.new-review .tags a span').click( function(){
        var ankor = $(this).closest('a').attr('href');
        ankor = ankor.split('#');
        $.scrollTo('#'+ankor[1], 800, {offset:-80});
		return false;	
	});
	
	$('.view_sert').click( function(){
	    
	    $('.box.light.white #slides_small .slidesjs-control a').first().click();
		return false;
	});
	
	$('.works_show').click( function(){
	    $('.slider-main-big .slidesjs-control a').first().click();
		return false;
	});
	
	
	$(".zoom").fancybox({autoCenter:true,afterShow:function(){$("html,body").css("overflow","hidden");$("html,body").css("overflow-y","hidden!important");document.onmousewheel=document.onwheel=function(){return false;};document.addEventListener("MozMousePixelScroll",function(){return false},false);document.onkeydown=function(e){if(e.keyCode>=33&&e.keyCode<=40)return false;}},afterClose:function(){$("html,body").css("overflow","auto");$("html,body").css("overflow-y","auto!important");document.onmousewheel=document.onwheel=function(){return true;};document.addEventListener("MozMousePixelScroll",function(){return true},true);document.onkeydown=function(e){if(e.keyCode>=33&&e.keyCode<=40)return true;}},beforeLoad:function(){$('.flt').addClass('filt');},beforeClose:function(){$('.flt').removeClass('filt');}});
	
	
	$('#add_review .form .stars .line a').click( function(){
        var rait = $(this).attr('data-rait');
        $('#add_review .form .stars .line a').removeClass('act');
        $(this).addClass('act');
        $('[name=stars]').val(rait);
		return false;	
	});
	
	var $grid = $('.ya-rev').masonry({
        itemSelector: '.item'
    });
    
    pdoPage.callbacks['after'] = function(config, response) {

        var $items = $('.ya-rev').find('.item');  // строки что рaскоментил
          // append items to grid
          $grid.append( $items ).masonry( 'appended', $items );    // строки что рaскоментил
 
        $grid.masonry('destroy');
        $grid.masonry({
            itemSelector: '.item'
        });
        $('#pdopage, #pdopage2').removeClass('loading');
        $('#pdopage, #pdopage2').removeAttr('style');
    };

});


