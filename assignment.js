var category_template,animal_template,info_template;

//With this var we will store data when you click a specific animal to go to its category
var current_category;


function showTemplate(whichTemplate,data){
    var html= whichTemplate(data);
    //Put in id content in html what you want
    $("#content").html(html);
}


$(document).ready(function(){

    var source =$("#category-template").html();
    category_template= Handlebars.compile(source);
    source=$("#animal-template").html();
    animal_template=Handlebars.compile(source);
    source = $("#info-template").html();
    info_template=Handlebars.compile(source);

    //Main page display
    showTemplate(category_template,animals_data);

    var categoriesIndex = 0;


    $(".menu").click( function(){
        $(".active").removeClass("active");
        $(this).addClass("active");

    //Switch works like C# switch
        switch(this.id){
            case "mainPage":
                showTemplate(category_template, animals_data);
                break;
            case "reptiles":
                categoriesIndex = 0;
                showTemplate(animal_template, animals_data.category[0]);
                break;
            case "mammals":
                categoriesIndex = 1;
                showTemplate(animal_template, animals_data.category[1]);

                break;
            case "birds":
                categoriesIndex = 2;
                showTemplate(animal_template, animals_data.category[2]);

                break;
        }
    });


    //We use $(document).on("click",.... since it behaves differently than $(selector).click(function(){})
    //http://stackoverflow.com/questions/24591973/jquery-onclick-element-function-simplifying-doesnt-work
     $(document).on("click", ".categories-thumbnail", function(){
        categoriesIndex = $(this).data("id");
        current_category = animals_data.category[categoriesIndex];

        /* changing menu tab */
        $(".active").removeClass("active");
        var idName = "#" + current_category.name.toLowerCase();
        $(idName).addClass("active");
         showTemplate(animal_template, current_category);
    });

    $(document).on('click', ".info-thumbnail", function(){
        var animalsIndex = $(this).data("id");
        var current_animal = animals_data.category[categoriesIndex].animals[animalsIndex];
        showTemplate(info_template, current_animal);
    });



});

