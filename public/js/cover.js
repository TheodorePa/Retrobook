$( document ).ready(function() {
    $( "<h3>RETROBOOK</h3>" ).appendTo( ".hardcover_front " );
});

$(document).ready(function(){
    $(".btn1").hover(function() {
        $(".btn1").addClass('transition');
        
    }, function() {
        $(".btn1").removeClass('transition');
    });

    $(".btn2").hover(function() {
        $(".btn2").addClass('transition');
        
    }, function() {
        $(".btn2").removeClass('transition');
    });
    
    $('a.btn1').fancybox({
        type: 'iframe',
        fitToView: true,
        autoSize: true,
        openEffect: 'fade',
        openSpeed: 'slow'
    });

    $('a.btn2').fancybox({
        type: 'iframe',
        fitToView: true,
        autoSize: true,
        openEffect: 'fade',
        openSpeed: 'slow'
    });
    
});


