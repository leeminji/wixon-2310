/*
    author : wixon
    date : 2021-01-30
    file : ui.js
*/
$(document).ready(function(){
   UI.init();
});
var UI = (function(){
    return{
        init : function(){
            //메뉴
            this.totalMenu().init();

            //로딩중
            this.loading();
            this.datepicker();
            this.fixedHeader();
            this.productList();

            //스크롤 바로가기
            $(".scrollTo").on('click', function(e){
                var href = $(this).attr('href');
                if( $(href).length == 0 ) return;
                var top = $(href).offset().top;

                $('html, body').animate({
                    scrollTop : top
                },500);
            });
        },
        featureClass : function(_id){
            var el = $("#"+_id);
            var item = el.find(".FeatureClass__item");
            var img = el.find(".FeatureClass__img");
 
            return {
                currentIndex : 0,
                currentImg : null,
                init : function(_currentIndex){
                    var that = this;

                    item.each(function(){
                        $(this).on("click", function(e){
                            e.preventDefault();
                            var href = $(this).attr('href');
                            that.img_on(href);
                            that.item_on($(this));
                        });
                    });

                    that.currentIndex = _currentIndex;
                    that.on();
                },

                on : function(){
                    var that = this;    
                    item.removeClass("active");
                    item.eq(this.currentIndex).addClass("active");                    
                    
                    img.removeClass("active");
                    img.eq(this.currentIndex).addClass("active");
                },
                item_on : function(_this){                    
                    item.removeClass("active");
                    _this.addClass("active");
                },
                img_on : function(_id){
                    var that = this;
                    img.removeClass("active");
                    $(_id).addClass("active");
                }
            }
        },
        productList : function(){
            var that = this;
            var product_item = $(".ProductList__item");
            
            //리스트 온(css 효과를 위해)
            product_item.on("mouseenter", function(){
                $(this).addClass('on');
            }).on("mouseleave", function(){
                $(this).removeClass('on');
            });
        },
        productView : function(){
            var that = this;

            //컨텐츠 위로 나타내기
            $(".Layout__container").css('z-index', '10');

            //fixed
            var product_quick = $(".ProductView__quick");
            var product_content = $(".ProductView__content");
            var quickTop = product_content.offset().top;
            var contentH = $(".ProductView__inner").height();
            var footerTop = $(".Footer").offset().top;

            $(window).on("scroll", function(){
                scrollEvent();
            });
            $(window).on("load", function(){
                scrollEvent();
            });
            function scrollEvent(){
                var scrollTop = $('html, body').scrollTop();
                if( scrollTop > quickTop ) {
                    product_quick.addClass("isFixed");
                }else{
                    product_quick.removeClass("isFixed");
                }
            }

        },
        main : function(){
            var swiper = new Swiper('#VisualArea', {
                spaceBetween: 0,
                centeredSlides: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet : function (index, className) {
                        return '<span class="' + className + '">0' + (index + 1) + '</span>';
                    },
                    bulletClass : "swiper-pagination-custom",
                    clickableClass : "swiper-pagination-clickable",
                    currentClass : "swiper-pagination-current",
                },
                effect : "fade"
            });

			//메인비쥬얼
			$('#MainVisual').slick({
				dots: true,
				infinite: true,
				speed: 1000,
				pause : 1000,
				slidesToShow: 1,
				fade: true,
				autoplay : true,
				arrows : false	
			});

            this.featureClass("FeatureClass").init(0);
        }, 
        datepicker : function(){
            $(".datepicker").datepicker();
        },
        loading : function(){
            var loading = $("#loading");
            $(window).on("load", function(){
                loading.addClass("inactive");
            });           
        },
        totalMenu : function(){
            var totalMenu =  $("#TotalGnb");
            var btn_totalMenuClose = $("#TotalGnbClose");
            var btn_totalMenuOpen = $("#TotalGnbOpen");
            return {
                currentActive : -1,
                isActive : false,
                init : function(){
                    var thisObj = this;
                    btn_totalMenuOpen.off("click").on("click", function(e){
                        e.preventDefault();
                        thisObj.open();
                    });
                    btn_totalMenuClose.off("click").on("click", function(e){
                        e.preventDefault();
                        thisObj.close();
                    });
                },
                close: function(){
                    totalMenu.removeClass("active");
                },
                open : function(){
                    totalMenu.addClass("active"); 
                }
            }
        },
        loadMotion : function(){
            var $motion = $('.n-motion');
            var windowT;
            if($motion.length){
                $motion.each(function(i){
                    var $this = $(this);
                    var thisT = $this.offset().top;
                    var thisH = $this.height() / 2;
                    var thisP = thisT + thisH;
                    var event = 'load.'+i+' scroll.'+i;
                    $(window).on(event, function(){
                        windowT = $(window).scrollTop() + $(window).outerHeight();
                        if(windowT > thisP){
                            $this.addClass('n-active');
                            $(window).off(event);
                        }
                    });
                });
            }
        },
        windowPopup : function(_url, _width, _height, _left, _top){
            var popupX = _left != null ? _left : (window.screen.width / 2) - (_width / 2);
            var popupY = _top != null ? _top : (window.screen.height / 2) - (_height / 2);	
            var option="resizable=no, scrollbas=yes,status=no,width="+_width+",height="+_height+",left="+popupX+",top="+popupY;
            window.open(_url, 'portData', option);          
        },
        checkBroswer : function(){
            var agent = navigator.userAgent.toLowerCase(),
                name = navigator.appName,
                browser = '';
         
            // MS 계열 브라우저를 구분
            if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
                browser = 'ie';
                if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
                    agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
                    browser += parseInt(agent[1]);
                } else { // IE 11+
                    if(agent.indexOf('trident') > -1) { // IE 11
                        browser += 11;
                    } else if(agent.indexOf('edge/') > -1) { // Edge
                        browser = 'edge';
                    }
                }
            } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
                if(agent.indexOf('opr') > -1) { // Opera
                    browser = 'opera';
                } else if(agent.indexOf('chrome') > -1) { // Chrome
                    browser = 'chrome';
                } else { // Safari
                    browser = 'safari';
                }
            } else if(agent.indexOf('firefox') > -1) { // Firefox
                browser = 'firefox';
            }
            return browser;
        },
		fixedHeader : function(){
			var header = $(".Layout__header");
			$(window).on("scroll", function(){
				if( $(window).scrollTop() > 50) {
					header.addClass("isScroll");
				}else{
					header.removeClass("isScroll");
				}
			});
		},        
    }
})();

//팝업
var uiPopup = (function(){
    return {
        open : function(_el){
            var thisObj = this;
            var popup = _el == null ? null : $("#"+_el);
            if( popup == null ) return;
            
            popup.addClass("active");
        },
        close : function(_el){
            var popup = _el == null ? null : $("#"+_el);
            if( popup == null ) return;
            popup.removeClass("active");
        }
    }
})();
