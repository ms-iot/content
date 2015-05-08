$(function () {
    $('img:not(.nr)').addClass('img-responsive');

    var currentUrl = $(location).attr('pathname');

    var urlArray = $('.steps').parent();
    // .attr('href');

    console.log(urlArray);

    // for(var i = 0; i < urlArray.length; i++) {
    //     if((urlArray[i]).closest('a').attr('href') == currentUrl) {
    //         var targetUrl = (urlArray[i]).closest('a').attr('href');
    //         (targetUrl).removeClass('inactive').addClass('active');
    //     }
    // };

});
