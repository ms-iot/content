$(function () {
    $('img:not(.nr)').addClass('img-responsive');
    $("a[href='" + window.location.pathname + "'] h3").toggleClass('active');
});
