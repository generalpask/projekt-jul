var cache;

function getAll(callback) {
    $.ajax({
        type: 'GET',
        url: '/generate',

        success: function(result) {
            cache = result;
            callback && callback();
        }
    });
}

$(document).ready(function() {
    $('.content').load("views/home.html");
});

$(".nav-home").click(function() {
    $(".content").load("views/home.html")
    $(this).addClass('active');
    $(".nav-generator").removeClass('active');
});

$(".nav-generator").click(function() {
    $(".content").load("views/generator.html")
    $(this).addClass('active');
    $(".nav-home").removeClass('active');
});

function generate() {
	getAll(function() {
		$('.output').html(JSON.stringify(cache, undefined, 4));
	});
}