$(function () {
    $('img:not(.nr)').addClass('img-responsive');

    var currentUrl = $(location).attr('pathname');
    console.log(currentUrl);

    var urlArray = $('.steps').parent();
    // .attr('href');

    for(var i = 0; i < urlArray.length; i++) {
        if($(urlArray[i]).attr('href') == currentUrl) {
            console.log($(urlArray[i]).attr('href'));
            $(urlArray[i]).removeClass('inactive').addClass('active');
        }
    };

});
