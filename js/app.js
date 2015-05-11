$(function () {
    $('img:not(.nr)').addClass('img-responsive');

    var currentUrl = $(location).attr('pathname');

    var urlArray = $('.steps').parent();

    for(var i = 0; i < urlArray.length; i++) {
        if($(urlArray[i]).attr('href') == currentUrl) {
            $(urlArray[i]).children().removeClass('inactive').addClass('active');
        };
    };

});
