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

            //fixed
            setTimeout(function(){
                var product_quick = $(".ProductView__quick");
                var quickTop = product_quick.offset().top;
     
                $(window).on("scroll", function(){
                    var scrollTop = $(window).scrollTop();
                    if( scrollTop > quickTop ) {
                        product_quick.addClass("isFixed");
                    }else{
                        product_quick.removeClass("isFixed");
                    }
                });                
            }, 1000);

            //제품상세 소개
            var productScroll = new Swiper('.ProductScroll', {
                navigation: { 
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev' 
                },
                slidesPerView: 1,
                spaceBetween: 32,
                slidesPerGroup: 1,
                loopFillGroupWithBlank: true,     
            });

            //리뷰
            var reviewScroll = new Swiper('.ReviewScroll', {
                navigation: { 
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev' 
                },
                slidesPerView: 1,
                spaceBetween: 32,
                slidesPerGroup: 1,
                loopFillGroupWithBlank: true,    
            });
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
