$(function() {
    // 公共的效果
    var mApp = (function() {
        function init() {
            navHideShow();
        }

        //导航效果
        function navHideShow() {
            var $mToggleClose = $(".m_toggle_close"),
                $menuList = $(".menu_list");

            $mToggleClose.on('click', function() {
                $(this).toggleClass('active');
                $menuList.toggleClass('isMenuHide');
            })
        }

        return {
            init: init
        }
    })();
    mApp.init();

    //登录
    var loginModel = (function() {

        var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

        var $submitSend = $('.submitSend'),
            $dlemail = $('.dlemail'),
            $dpass = $('.dlpass');

        var $errWrap = $('.errorMsg'),
            $tips = $errWrap.find('.tips'),
            $errHead = $errWrap.find('.ferrorhead');

        function init() {
            checkForm();
        }

        function checkForm() {
            $dlemail.add($dpass).on('focus', function() {
                setTimeout(function() {
                    !$errWrap.hasClass('f-dn') && $errWrap.addClass('f-dn');
                }, 1000)
            })

            $submitSend.on('click', function() {

                if ($dlemail.val() == '') {
                    $errWrap.removeClass('f-dn');
                    $tips.addClass('ferrortail');
                    $errHead.html('请输入帐号');
                    return false;
                }

                if (!regEmail.test($dlemail.val())) {
                    $errWrap.removeClass('f-dn');
                    $tips.addClass('ferrortail');
                    $errHead.html('您输入的账号格式有误')
                    return false;
                }

                if ($dpass.val() == '') {
                    $errWrap.removeClass('f-dn');
                    $errWrap.removeClass('f-dn');
                    $tips.addClass('ferrortail');
                    $errHead.html('请输入密码');
                    return false;
                }
                return true;
            })
        }

        return {
            init: init
        }
    })();
    loginModel.init();


    bannerMoule(); //内容页轮播图效果
    function bannerMoule() {
        if (!$('.swiper-container').length) return;
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationType: 'custom',
            preloadImages: false,
            lazyLoading: true,
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            lazyLoadingOnTransitionStart: true,
            lazyLoadingInPrevNext: true,
            paginationCustomRender: function(swiper, current, total) {
                return current + '/' + total;
            }
        });
    }

    //img lazyload
    lazyLoad();

    function lazyLoad() {
        $(".m_lazy_pic img").length && $(".m_lazy_pic img").lazyload({
            effect: "fadeIn"
        });
    }

    // addCarts 商品的规格数量选择
    var addCarts = (function() {

        var $yyTimeSel = $('#yy_time_sel');
        var $backToDetail = $('#back-to-detail');
        var $detailContent = $('#detail-content'),
            $mDtParamSelect = $('#m-dtParam-select'),
            viewHeight = $(window).height();
        var $dtBtnsCartsBefore = $('#detail-content').find('.dt-btnsCarts'),
            $showCarts = $('#m-dtParam-select').find('.dt-btnsCarts');

        var $slectCheckTime = $('#select_check_time');

        var $goodsCateData = $('#goods_cate_data');

        var goodDate = null;

        var $price_check = $('#price_check'),
            $goods_cate = $('#goods_cate');

        function init() {
            showCateList();
            getGoodsData();
            tabContentChange();
            rP.init(); // 商品数量添加
            toShowDetail();
        }

        function toShowDetail() {
            $backToDetail.on('click', function() {
                $detailContent.show();
                $mDtParamSelect.hide();
            })
        }

        function showCateList() {
            $dtBtnsCartsBefore.on('click', '.addCarts a', CartsShow);
            $('#specSelect').on('click', CartsShow);

            function CartsShow() {
                $detailContent.hide();
                $mDtParamSelect.css({
                    'height': viewHeight - $('#m_topbar').height() - $('.dt-btnsCarts').height()
                }).show();

            }
        }

        // get商品数据
        function getGoodsData() {
            //console.log($goodsCateData.attr('data-goods'));
            goodDate = eval('(' + $goodsCateData.attr('data-goods') + ')');
        }

        function tabContentChange() {
            var $tab = $('.dt-spec-con').find('.tab');
            $tab.each(function(index, ele) {
                $(this).click(function() {
                    change.call(this, index);
                });
            })

            function change(index) {
                $(this).addClass('tab_select').siblings().removeClass('tab_select');
                // 图片内容的展示切换
                $price_check.html(goodDate[index].price);
                $goods_cate.html(goodDate[index].name);
            }
        }

        function addDateTime(str) {
            //-> str 今天 2017.02.0909:15-10:15  医时医刻体验中中心
            var reg = /(\d{4})\.(\d{2})\.(\d{2})(\d{1,2}):(\d{1,2})-(\d{1,2}):(\d{1,2})/;
            str.replace(reg, function($0, $1, $2, $3, $4, $5, $6, $7) {
                var strDate = $1 + '-' + $2 + '-' + $3 + ' ' + $4 + ':' + $5 + '-' + $6 + ':' + $7;
                $yyTimeSel.val(strDate);
                $slectCheckTime.val(strDate);
            });
        }

        //->商品数量添加
        var rP = (function reducePlus() {
            var $mSaleNum = $('#m-saleNum'),
                $reduce = $('#reduce'),
                $plus = $('#plus'),
                $selectNum = $('#selectNum'),
                $sign = $('.sign'),
                $addNums = $('.addNums');
            var Num = 1;

            function init() {
                $('#selectNum').val(Num);
                reduce();
                plus();
                inputChange();
                show();
            }

            function reduce() {
                $reduce.on('click', function() {
                    Num = parseInt($selectNum.val());
                    if (Num <= 2) {
                        $reduce.removeClass('active');
                    }
                    if (Num > 1) {
                        Num--;
                    }
                    $selectNum.val(Num);
                    Num = $selectNum.val();
                    sign(Num);
                });
            }

            function plus() {
                $plus.on('click', function() {
                    Num++;
                    if (Num > 1) {
                        $reduce.addClass('active');
                    }
                    $selectNum.val(Num);
                    Num = $selectNum.val();
                    sign(Num);
                })

            }

            function sign(Num) {
                if (isNaN($selectNum.val()) || $selectNum.val() == '') return;
                if (Num <= 1) {
                    $sign.add($addNums).hide();
                    $addNums.html('');
                } else {
                    $sign.show();
                    $addNums.show().html(Num);
                }
            }

            function inputChange() {
                $selectNum.on('keyup', function() {
                    var val = $(this).val();
                    if (isNaN(val)) {
                        $(this).val(Num);
                        sign(Num);
                        return;
                    }
                    if (parseInt(val) <= 0) {
                        val = 1;
                    }
                    $(this).val(val);
                    Num = val;
                    Num2 = parseInt($(this).val());
                    if (Num2 <= 2) {
                        $reduce.removeClass('active');
                    }
                    if (Num2 > 1) {
                        $reduce.addClass('active');
                    }
                    sign(Num2);
                })
            }

            function show() {
                $yyTimeSel.on('focus', function() {
                    datePicker.show();
                })
            }

            return {
                init: init
            }

        })();

        return {
            init: init,
            addDateTime: addDateTime
        }
    })();
    addCarts.init();

    //-> 弹出层date-picker
    var datePicker = (function() {

        var swiperContainer = null;
        var $swiperWrapper = $('.swiper-container-date-picker').find('.swiper-wrapper');
        var $tab = $('.date-picker-header').find('.tab');

        var $datePicker = $('#date-picker'),
            dateOk = $('#date_ok');

        var $todyLi = $('#select-today-torm').find('li');

        var iNow = 0;

        var timeStr = '';

        var $selectDay = $('#select-day').find('li');

        var prevDateIndex = 0;

        var $layerMark = $('.layer-mark'); //蒙层

        function init() {
            if (!$('.swiper-container-date-picker').length) return;
            swiperScroll();
            TodayChange();
            tabSwitch();
            hide();
        }

        $datePicker.on('click', function(ev) {
            ev.stopPropagation();
        });

        function swiperScroll() {
            swiperContainer = new Swiper('.swiper-container-date-picker', {
                followFinger: false,
                preventLinksPropagation: false,
                onSlideChangeEnd: function(swiper) {
                    $tab.each(function(index, el) {
                        index == swiper.activeIndex ? $(this).addClass('active') : $(this).removeClass('active');
                    });
                }
            });
        }

        function tabSwitch() {
            $tab.each(function(index, el) {
                $(this).click(function() {
                    swiperContainer.slideTo(index);
                })
            });
        }


        var timeData = ['9:15-10:15  医时医刻体验中中心', '10:15-11:15 吴中人民医院']; // 获取时间数据

        function creatTime() {
            var $swiperSilde = $('<div class="swiper-slide panel"></div>');
            var $selectDayUl = $('<ul class="list-time" id="select-day"></div>');
            var str = '';
            $.each(timeData, function(i, item) {
                str += '<li>' + item + '</li>';
            });
            $selectDayUl.append(str);
            $swiperSilde.append($selectDayUl);
            $swiperWrapper.append($swiperSilde);
            $tab.removeClass('disabled');
        }



        function getTimerStr(dateIndex, dayIndex) {
            timeStr = '';
            var $span = $todyLi.eq(dateIndex).find('span');
            var $day = $('#select-day li').eq(dayIndex);
            timeStr = $span.html() + $day.html();
            return timeStr
        }

        $swiperWrapper.on('click', '#select-day li', function() {
            var index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            addCarts.addDateTime(getTimerStr(prevDateIndex, index));
            hideDatePicker();
        });

        function TodayChange() {
            $todyLi.each(function(index, ele) {
                $(this).on('click', function() {
                    timeStr = '';
                    prevDateIndex = 0;
                    creatTime();
                    var $swiperSilde = $('.swiper-container-date-picker').find('.swiper-slide');
                    if ($swiperSilde.length >= 2) {
                        swiperContainer.removeSlide(1);
                    }
                    swiperContainer.updateSlidesSize();
                    swiperContainer.slideNext();
                    iNow = index;
                    prevDateIndex = index;
                    $(this).addClass('on').siblings().removeClass('on');
                })
            })
        }

        function show() {
            $layerMark.css({
                'height': $(window).height(),
            }).show()
            $('body').addClass('f-stopScoll');
            $datePicker.removeClass('date-picker-hide');
        }

        function hideDatePicker() {
            $layerMark.hide();
            $('body').removeClass('f-stopScoll');
            $datePicker.addClass('date-picker-hide');
        }

        function hide() {
            dateOk.on('click', function() {
                hideDatePicker();
            });
            $(document).on('click', function() {
                hideDatePicker();
                return false;
            })
        }

        return {
            init: init,
            show: show
        }
    })();

    datePicker.init();

    // 购物车页面效果
    var editCarts = (function() {

        var $checkAllBtn = $('.checkAllBtn'),
            $addCartsLabel = $('.addCartsLabel'),
            $removeCartsLabel = $('.removeCartsLabel'),
            $cartCheckGoods = null,
            $removeCheckGoods = null,
            $checkAll = $('.checkAll');
        var $m_cart_good = $('.m_cart_good'),
            $allPrice = $('.allPrice'),
            $allNum = $('.allNum');

        var $addFixedBar = $('.addFixedBar'),
            $removeFixedBar = $('.removeFixedBar');

        var $removeAllBtn = $('.removeAllBtn'),
            $removeAllNum = $('.removeAllNum'),
            $removeFromList = $('.removeFromList');

        // var $cart_reduce = $('.cart_reduce'),
        // 	$selectCartNum = $('.selectCartNum')
        // 	$cart_plus = $('.cart_plus');

        var arr = []; //购物车选中元素

        var num = 0;

        function init() {
            checkAll();
            selectCheck();
        }

        function selectCheck() {
            $cartCheckGoods = $('.cart_list_detail').find('.addCartsLabel').find('.cart_check_goods');
            $cartCheckGoods.click(function() {
                console.log($cartCheckGoods.length);
                var checked = $(this).prop('checked');
                if (checked) {
                    var onOff = true;
                    $cartCheckGoods.each(function() {
                        //console.log($(this).prop('checked'));
                        if (!$(this).prop('checked')) {
                            onOff = false;
                        }
                    })
                    if (onOff) {
                        $checkAllBtn.prop('checked', true);
                    }

                } else {
                    $checkAllBtn.prop('checked', false);
                }
                getCount();
                getAllNum();
            })
        }

        function checkAll() {
            $cartCheckGoods = $('.cart_list_detail').find('.addCartsLabel .cart_check_goods');
            $checkAllBtn.on('click', function() {
                var checked = $(this).prop('checked');
                $checkAllBtn.prop('checked', checked);
                $cartCheckGoods.prop('checked', checked);
                getCount();
                getAllNum();
            })
        }

        function getCount() {
            var iCount = 0;
            $m_cart_good = $('.m_cart_good');
            $m_cart_good.each(function() {
                var checked = $(this).find('.addCartsLabel .cart_check_goods').prop('checked');
                if (checked) {
                    var danjia = parseInt($(this).find('.c_price').html());
                    var num = parseInt($(this).find('.num').html().substring(1));
                    iCount += danjia * num;
                }
            });
            $allPrice.html('￥' + iCount);
        }

        function getAllNum() {
            var allnum = 0;
            $m_cart_good = $('.m_cart_good');
            $m_cart_good.each(function() {
                var checked = $(this).find('.addCartsLabel .cart_check_goods').prop('checked');
                if (checked) {
                    var checkNum = parseInt($(this).find('.num').html().substring(1));
                    allnum += checkNum;
                }
            });
            $allNum.html(allnum);
            allnum == 0 && $('.checkAllBtn').prop('checked', false);
        }

        function removeCarts() {
            var $editCart = $('.edit_cart');
            var btn = true;
            $editCart.on('click', function() {
                if (btn) {
                    initBeforeAfter.initBefore();
                    $addFixedBar.hide();
                    $removeFixedBar.show();
                    $(this).html('完成');
                    checkAll();
                    selectCheck();
                    maleNum.show();
                } else {
                    initBeforeAfter.initAfter();
                    $addFixedBar.show();
                    $removeFixedBar.hide();
                    $(this).html('编辑');
                    checkAll();
                    selectCheck();
                    updateCart();
                    getAllNum();
                    maleNum.hide();
                }
                btn = !btn;
            })
        }

        var maleNum = (function() {
            function show() {
                $('.m-saleNum-cart').show();
            }

            function hide() {
                $('.m-saleNum-cart').hide();
            }

            return {
                show: show,
                hide: hide
            }
        })()


        function cartredPlus() {
            $('.m-saleNum-cart').on('click', function(ev) {
                if ($(ev.target).hasClass('cart_reduce')) {
                    //alert('reduce');
                    //console.log($(this).find('.selectCartNum').());
                    numNow = parseInt($(this).find('.selectCartNum').val());
                    cartReduce(numNow, this);
                    num = parseInt($(this).find('.selectCartNum').val());
                }

                if ($(ev.target).hasClass('cart_plus')) {
                    //alert('cart_plus');
                    numNow = parseInt($(this).find('.selectCartNum').val());
                    plusReduce(numNow, this);
                    num = parseInt($(this).find('.selectCartNum').val());
                }
                getRemoveNum();
            });
        }

        function midChange() {
            $('.m-saleNum-cart').find('.selectCartNum').each(function() {
                num = parseInt($(this).parent().find('.selectCartNum').val());
                inputChange($(this));
            })
        }

        function cartReduce(num, obj) {
            if (num > 1) {
                num--;
            }
            $(obj).find('.selectCartNum').val(num);
            stateChange(num, obj);
        }

        function plusReduce(num, obj) {
            if (num < 20) {
                num++;
            }
            $(obj).find('.selectCartNum').val(num);
            stateChange(num, obj);
        }

        function inputChange(obj) {
            obj.on('keyup', function() {
                var val = $(this).val();
                if (isNaN(val)) {
                    $(this).val(num);
                    return;
                }
                if (parseInt(val) <= 0) {
                    val = 1;
                }
                if (parseInt(val) >= 20) {
                    val = 20;
                }
                $(this).val(val);
            })
        }


        function updateCart() {
            $m_cart_good.each(function() {
                var val = $(this).find('.selectCartNum').val();

                $(this).find('.num').html('x' + val);
            })
            getAllNum();
            getCount();
        }


        function stateChange(num, obj) {
            num != 1 ? $(obj).find('.cart_reduce').addClass('active') : $(obj).find('.cart_reduce').removeClass('active')
        }

        var initBeforeAfter = (function() {
            function initBefore() {
                arr = [];
                $cartCheckGoods.each(function() {

                    if ($(this).prop('checked')) {
                        arr.push($(this));
                    }
                });
                $addCartsLabel.hide();
                $removeCheckGoods.prop('checked', false);
                $removeAllBtn.prop('checked', false);
                $removeAllNum.html(0);
                $removeFromList.addClass('disable');
                $removeCartsLabel.show();
            }


            function initAfter() {
                // console.log(arr);
                $addCartsLabel.show();
                $removeCartsLabel.hide();
                /*$.each(arr, function(index, el) {

                 });*/
            }

            return {
                initBefore: initBefore,
                initAfter: initAfter
            }
        })();

        // 删除购物车
        var cartList = [];
        var checkNow = 0;

        function removeFormCart() {
            $('.removeFromList').on('click', function() {
                $.each(cartList, function() {
                    $(this).remove();
                    updateCart();
                    updateAfterRemove();
                    selectRemoveCheck();
                    selectCheck();
                    $('.removeAllNum').html() == 0 && $('.removeAllBtn').prop('checked', false);
                });
            });
        }

        function getRemoveNum() {
            var allnum = 0;
            $m_cart_good = $('.m_cart_good');
            $m_cart_good.each(function() {
                var checked = $(this).find('.removeCartsLabel .cart_check_goods').prop('checked');
                if (checked) {
                    var checkNum = parseInt($(this).find('.selectCartNum').val());
                    allnum += checkNum;
                }
            });
            $removeAllNum.html(allnum);
            parseInt($removeAllNum.html()) > 0 ? $('.removeFromList').removeClass('disable') : $('.removeFromList').addClass('disable');
        }

        function checkRemoveAll() {
            $removeAllBtn.on('click', function() {
                var checked = $(this).prop('checked');
                $removeAllBtn.prop('checked', checked);
                $removeCheckGoods.prop('checked', checked);
                if (checked) {
                    $('.cartList').each(function(index) {
                        cartList.push($(this))
                    });
                } else {
                    cartList = [];
                }
                getRemoveNum();
            });

        }

        $('.cartList').each(function(index) {
            $(this).attr('data-index', index);
        });

        function selectRemoveCheck() {
            $removeCheckGoods = $('.cart_list_detail').find('.removeCartsLabel').find('.cart_check_goods');
            $removeCheckGoods.on('click', function() {
                var index = $(this).closest('.cartList').index();
                $(this).closest('.cartList').attr('data-index', $(this).closest('.cartList').index());
                var checked = $(this).prop('checked');
                var _this = this;
                if (checked) {
                    cartList.push($(this).closest('.cartList'));
                    var onOff = true;
                    $removeCheckGoods.each(function() {
                        //console.log($(this).prop('checked'));
                        if (!$(this).prop('checked')) {
                            onOff = false;
                        }
                    })
                    if (onOff) {
                        $removeAllBtn.prop('checked', true);
                    }

                } else {

                    $.each(cartList, function(i) {
                        if ($(this).attr('data-index') == index) {
                            cartList.splice(i, 1);
                        }
                    })

                    $('.removeFromList').addClass('disable');
                    $removeAllBtn.prop('checked', false);
                }

                getRemoveNum();
            })
        }

        function updateAfterRemove() {
            $('.removeAllNum').html(0);
            $m_cart_good = $('.m_cart_good');
        }


        function removeInit() {
            removeCarts();
            cartredPlus();
            midChange();
            selectRemoveCheck();
            checkRemoveAll();
            removeFormCart();
        }

        return {
            init: init,
            removeInit: removeInit
        }
    })();
    // -> 编辑购物车商品选项效果
    editCarts.init();
    editCarts.removeInit();
});