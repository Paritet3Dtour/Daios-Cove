$(function() {
// For video banner (muted)
  vid = document.getElementById("video-banner");
  function bg_video_mutedOn(){
    vid.muted = true;  
    $('#mutedVideo').addClass('mutedOn');
  };
  function bg_video_mutedOff(){
    vid.muted = false;
    $('#mutedVideo').removeClass('mutedOn');
  };
  $('#mutedVideo').click(function(){  
    var parent = $(this);
    if (!parent.hasClass('mutedOn')) {
       bg_video_mutedOn();
    }else{
      bg_video_mutedOff();
    }
  });

// For button "scrollTop"
$(window).scroll(function() {
  if ($(this).scrollTop() > $('.banner').height()) {
    $('#btn-scrolltop').addClass("active");
    //$('#video-banner').get(0).pause();
    bg_video_mutedOn(); 
  } else {  
    $('#btn-scrolltop').removeClass("active");
    //$('#video-banner').get(0).play(); 
  }; 
});
$('#btn-scrolltop').click(function() {
  $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
});

// For progress-bar
  const progress = document.querySelector('.progressBar');
  window.addEventListener('scroll', progressBar);
  function progressBar(e){
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;
    progress.style.width = per + '%'; 
  }

// For smooth scrolling to anchors
$(document).ready(function() {
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if ( 
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 700, function() {
          var $target = $(target); 
          if ($target.is(":focus")) { 
            return false;
          } else {
            $target.attr('tabindex','-1'); 
          };
        });
      }
    }
  }); });

// Animations on scroll
  var $animation_elements = $('.animation-element');
  var $window = $(window);
  var check_if_in_view = function() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position - 100 <= window_bottom_position)) {
            $element.addClass('in-view');
      } else {
        // $element.removeClass('in-view');
      }
    });
  }
  check_if_in_view();
  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

// For slider (number-card)
var numSlick = 0;
$('.hotel-rooms__item__media__list').each( function() {
  numSlick++;
  $(this).addClass( 'slider-' + numSlick ).slick({
    arrows: true,
    prevArrow: $(this).parent().find('.hotel-rooms__item__media__btn.sPrev'),    
    nextArrow: $(this).parent().find('.hotel-rooms__item__media__btn.sNext'), 
    fade: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    dots: true,
    responsive: [{
          breakpoint: 500,
          settings: {
          arrows: false,
          dots: true,  
      }
  }] 
  });
}); 

// For forms  
$('.hotel-rooms__item__btn').bind('click', function(){
  console.log('true'); 
  var parent = $(this).parent();
  var text = "";
  text += parent.children('.hotel-rooms__item__heading').text()+"\r\n"; 
  text += parent.children('.hotel-rooms__item__price').text()+"\r\n";
  $('textarea[name=comment]').html(text);  
});
$('.about-curort__linkForm__btn').bind('click', function(){
  $('textarea[name=comment]').html('Форма под видео - Забронировать сейчас'); 
});
$('.header__btn').bind('click', function(){
  $('textarea[name=comment]').html('Форма в хедере - Забронировать сейчас'); 
});
$('#footer-form button').bind('click', function(){
  $('textarea[name=commentFooter]').html('Форма в футере'); 
});   

function removeAnimateInputLabel(){
  $('.mainModalForm form label').text('Ваш телефон').css('color','#7e7e7e').removeClass('animation-fadeInOut');
};

$('.hotel-rooms__item__btn').click(function(){
  $('input[name="mainModalForm-typeNumber"]').val($(this).parent().find('.hotel-rooms__item__heading').text());
  removeAnimateInputLabel();
});
$('.header__btn').click(function(){
  $('input[name="mainModalForm-typeNumber"]').val('форма в хедере, без типа номера');
  removeAnimateInputLabel();
});
$('.about-curort__linkForm__btn').click(function(){
  $('input[name="mainModalForm-typeNumber"]').val('форма под видео-галереей, без типа номера');
  removeAnimateInputLabel(); 
}); 

$("#mainModalForm").validate({ 
    rules: {
    'sender_phone': {               
        minlength: 4 
    }  
    }  
});
$("#footer-form").validate({
    rules: {
    'sender_phone': {               
        minlength: 4    
    }
    } 
});

// Для событий
$('.header__btn').click(function(){
  mainFormBtnVal = $(this).val();
  gevent('button_pressed', 'Форма в хедере', mainFormBtnVal); 
});
$('.about-curort__linkForm__btn').click(function(){
  formAfterVideo = $(this).val();
  gevent('button_pressed', 'Форма под видео', formAfterVideo);
});
$('.hotel-rooms__item__btn').click(function(){  
  roomsFormBtnVal = $(this).val();
  gevent('button_pressed', 'Форма с типом номера', roomsFormBtnVal);   
});


$("#footer-form button").bind('click', function () { 
  if ($("#footer-form").valid()) {
    gevent('request', 'Форма в футере','none'); //отправка формы    
    sended($(this).attr('formid'));
    $('.footer-form__sl-ty').slideDown();         
    $('.footer-form__sl-one').slideUp();     
    }else{
      $('.footer-form form label').text('Введите корректный номер!').css('color','#fff').addClass('animation-fadeInOut');
      $("#footer-form input[name=sender_phone]").focus();
    }   
});
  
$("#mainModalForm button").bind('click', function () { 
  if ($("#mainModalForm").valid()) {
      valueMainform = $('input[name="mainModalForm-typeNumber"]').val();
  gevent('request', 'Основная форма', valueMainform); //отправка формы   
  sended($(this).attr('formid'));
    $('.mainModalForm__sl-ty').slideDown(); 
    $('.mainModalForm__sl-one').slideUp();     
    }else{
      $('.mainModalForm form label').text('Введите корректный номер!').css('color','#000').addClass('animation-fadeInOut');
      $("#mainModalForm input[name=sender_phone]").focus();        
    }      
});

function sended(idform) {
      AjaxFormRequest(/*'messegeResult',*/ idform, 'sendmessage.php'); 
  }
    function AjaxFormRequest(/*result_id,*/idform, url) {
       jQuery.ajax({
          url:     url,
          type:     "POST",
          dataType: "html",
          data: jQuery("#"+idform).serialize(),
          success: function(response) {
        //document.getElementById('envelope').style.display='block';
        //document.getElementById('fade').style.display='block'
            //document.getElementById(result_id).innerHTML = response;
        //envelope_h1_change('Спасибо за обращение');
        //document.getElementById('env_form').style.backgroundColor='rgba(40,32,16,0.8)';
        //window.location.href = "/thanks";
          }/*,
          error: function(response) {
            document.getElementById(result_id).innerHTML = "Возникла ошибка при отправке формы. Попробуйте еще раз";
        document.getElementById('envelope').style.display='block';
        document.getElementById('fade').style.display='block'
          }*/
       });} 
    function gevent(action, category='', label='', value=''){
        var params = {};
        if (category !=='') { params.event_category = category; }
        if (label !=='') { params.event_label = label; }
        if (value !=='') { params.value = value; }
        gtag('event', action, params);
    }  

// For mobile video show
$('#casesList li:nth-child(1) .projects-list__item__img').click(function(){
   $('.videoModalForm__content video').attr('src', $('.projects-preview-fixed-container li:nth-child(1) video').attr('src'));     
});
$('#casesList li:nth-child(2) .projects-list__item__img').click(function(){
   $('.videoModalForm__content video').attr('src', $('.projects-preview-fixed-container li:nth-child(2) video').attr('src'));     
});
$('#casesList li:nth-child(3) .projects-list__item__img').click(function(){
   $('.videoModalForm__content video').attr('src', $('.projects-preview-fixed-container li:nth-child(3) video').attr('src'));     
});
$('#casesList li:nth-child(4) .projects-list__item__img').click(function(){
   $('.videoModalForm__content video').attr('src', $('.projects-preview-fixed-container li:nth-child(4) video').attr('src'));     
}); 

$(document).on('closing', '.videoModalForm', function (e) {
  $(this).find('video').get(0).pause(); 
});


});  
