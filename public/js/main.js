$(function(){

    $(".box").on("click" , function(e){
        var url = $(this).attr("data-link");
        e.preventDefault();
        $.ajax({

            url:url,
            method: "get",
            success: function(response){

                $("#data").html(response);

                $('html, body').animate({
                    scrollTop: $(".data").offset().top
                }, 1500);

                $(window).on('mousewheel', function() {
                    $('html, body').stop();
                });

            }

        })
    })


    var name,phone,email;
    $("#submit").click(function(e){
        e.preventDefault();
        name =$("#name").val();
        phone =$("#phone").val();
        email =$("#email").val();

        $.post("/kesher/submit",{
            name: name,
            phone: phone,
            email:email}, function(data){
            if(data==='done')
            {
                alert("login success");
            }
        });
    });




});

$(document).ready(function(){

    $.ajax({

        url:"/home.html",
        method: "get",
        success: function(response){

            $("#data").html(response);

//            $('html, body').animate({
//                scrollTop: $("#data").offset().top
//            }, 1500);
//
//            $(window).on('mousewheel', function() {
//                $('html, body').stop();
//            });

        }

    })   


});

