$(function () {
    $('img:not(.nr)').addClass('img-responsive');
    var filename = window.location.pathname.split('/').pop();
    $("a[href*='" + filename + "'] h3").toggleClass('active');

    var url = window.location.pathname;

    if(! url.includes('en-US')){
        var newUrl = url.replace('content', 'content/en-US');
        window.location.replace(newUrl);
    };
});
