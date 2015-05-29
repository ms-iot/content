$(function () {

    $('img:not(.nr)').addClass('img-responsive');

    var filename = window.location.pathname.split('/').pop();
    $("a[href*='" + filename + "'] h3").toggleClass('active');
    
});
