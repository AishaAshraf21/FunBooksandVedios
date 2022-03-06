var login = "";
var user = [];

var values = [
    { book: "BOOK1", author: "Author1", img: "/Images/9780425285176.jpg" ,proIs:"free"},
    { book: "BOOK2", author: "Author2", img: "/Images/9780060555665.jpg" ,proIs:"paid"},
    { book: "BOOK3", author: "Author22", img: "/Images/9780307279187.jpg",proIs:"paid" },
    { book: "BOOK4", author: "Author3", img: "/Images/9780316468978.jpg" ,proIs:"paid"},
    { book: "Vedio1", author: "Vedio Desc", img: "/Images/9780374300210.jpg" ,proIs:"free"},
    { book: "Vedio2", author: "Vedio Desc", img: "/Images/9780385376716.jpg" ,proIs:"paid"},
    { book: "Vedio3", author: "Vedio Desc", img: "/Images/9780385537353.jpg" ,proIs:"free"},
    { book: "Vedio4", author: "Vedio Desc", img: "/Images/9780399255373.jpg" ,proIs:"free"},
]
var loginSE = '';
var roleSE = '';

function check() {
    loginSE = $("#loginSe").text();
    roleSE = $("#roleSe").text();

    if (loginSE != undefined && loginSE != "") {
        login = "true";
    }

}
function showadd() {
    $("#address").show();
}
$(document).ready(function () {

   
    check();
    //Gpdf()
   
    var append = "";
    var i = 0;
    values.forEach(element => {
        // console.log(element);
        append += '<div class="col-sm-6 col-lg-3"><div class="card card-cascade card-ecommerce wider shadow mb-5 ">';
        append += '<div class="view view-cascade overlay text-center"> <img class="card-img-top" src="' + element.img + '" alt=""> <a>';
        append += '<div class="mask rgba-white-slight"></div></a><div class="card-body card-body-cascade text-center">';
        append += '<h4 class="card-title"><strong><a href="">' + element.book + '</a></strong></h4>';
        append += '<p class="card-text"></p>';
        append += '<p class="price">' + element.proIs + '</p>';
        append += '<div class="card-footer" onclick="addProduct('+i+')"><p>View</p></div>';
        append += '</div></div></div></div>';
        i++;
        $("#indexrow").empty().append(append);
    });


});

function addProduct(e) {
    if (values[e].proIs == "paid") {
        if (roleSE == "paid") {
            //alert('done')
            $.ajax({
                type: "GET",
                url: "/Home/Product",
                contentType: "application/json;charset=utf-8",
                data: { Name: values[e].book, Author: values[e].author, url: values[e].img },
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data == "done") {

                        window.location.href = "/Home/SpeProduct";
                    }
                },
                error: function (errordata) {
                    console.log(errordata);
                }
            });

        }
        else {
            alert("Premium Required");
            console.log(values[e]);
        }
    }
    else {
        //alert('done')
        $.ajax({
            type: "GET",
            url: "/Home/Product",
            contentType: "application/json;charset=utf-8",
            data: { Name: values[e].book, Author: values[e].author, url: values[e].img, pro: values[e].proIs },
            dataType: "json",
            async: false,
            success: function (data) {
                if (data == "done") {

                    window.location.href = "/Home/SpeProduct";
                }

            },
            error: function (errordata) {
                console.log(errordata);
            }
        });

    }
}


function Gpdf() {
    var doc = new jsPDF({
        orientation: 'landscape'
    });

    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript to generate a PDF.');

    // Add new page
    doc.addPage();
    doc.text(20, 20, 'Visit CodexWorld.com');

    // Save the PDF
    doc.save('document.pdf');
}
$(document).ready(function () {
    $("#login").click(function (e) { 
    e.preventDefault();
    var Guser = $("#user").val();
    var Gpass = $("#pass").val();

    
        $.ajax({
            type: "GET",
            url: "/Home/CheckUser",
            contentType: "application/json;charset=utf-8",
            data: { user: Guser, pass: Gpass },
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data)

                if (data != null) {
                    user = data;
                    login="true"
                }

                window.location.href = "/Home/Index";
            },
            error: function (errordata) {
                console.log(errordata);
            }
        });
});
});

function pdf() {
    var doc = new jsPDF({
        orientation: 'landscape'
    });

    var imgSrc = $('#pimage').attr('src');

    var imgData ;
   
    doc.text(20, 20, 'Name: ' + $("#loginid").val());
    doc.text(20, 30, 'Country: ' + $("#country").val());    
    doc.text(20, 40, 'City: ' + $("#city").val());
    doc.text(20, 50, 'Address: ' + $("#adress").val());
    doc.text(20, 60, 'Product Name: ' + $("#pname").text());
    doc.text(20, 70, 'BY : ' + $("#aname").text());

    var img = new Image();
    img.src = imgSrc;
            doc.addImage(img, 'JPG', 90, 40, 180, 160);
    


    // Save the PDF
    doc.save('document.pdf');
}