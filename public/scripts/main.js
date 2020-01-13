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

function add() {

    event.preventDefault();

    if ($(".namn").val() == "" && $(".url").val() == "" && $(".bild").val() == "") {
        $(".result").html("Vänligen fyll i åtminstone ett fält");
    }
    else {
        $.ajax({
            type: 'POST',
            url: '/add',
            data: $(".addform").serialize(),

            success: function() {
                $(".result").html("Julklapp tillagd");
            },

            error: function() {
                $(".result").html("Julklapp kunde inte läggas till");
            }
        });
    }

}

$(document).ready(function() {
    $('.content').load("views/home.html");
    $('.music').prop("volume", 0.5);
});

$(".nav-home").click(function() {
    $(".content").load("views/home.html")
    $(this).addClass('active');
    $(".nav").not(this).removeClass('active');
});

$(".nav-generator").click(function() {
    $(".content").load("views/generator.html")
    $(this).addClass('active');
    $(".nav").not(this).removeClass('active');
});

$(".nav-add").click(function() {
    $(".content").load("views/add.html");
    $(this).addClass('active');
    $(".nav").not(this).removeClass('active');
});

function generate() {
	getAll(function() {
		$('.output').html(JSON.stringify(cache, undefined, 4));
	});
}