var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
});

$(document).ready(function(){

  if(localStorage.getItem("cards") != null){
    document.getElementById("cards").innerHTML = localStorage.getItem("cards");
  }
  if(localStorage.getItem("doneCards") != null){
    document.getElementById("doneCards").innerHTML = localStorage.getItem("doneCards");
  }

  dragDrop();

  $( "#todo" ).keypress(function( event ) {
    if ( event.which == 13 ) {
      content = $("#todo").val();
      $("#todo").val("");
      if(content.length <= 20){
        fontSize="30px";
      }else{
        fontSize="16px";
      }
      if(content.length > 0){
        card= "<div class='card' style='font-size:"+fontSize+";background-color:"+getRandomColor()+"'>"+content+"<span class='close'><svg class='icon icon-cross'><use xlink:href='#icon-cross'></use></svg></span></div>" ;
        $( ".col-left-container" ).prepend(card);

        cards= localStorage.getItem("cards");
        localStorage.setItem("cards",card+cards);
        var highestCol = Math.max($('.col-left').height(),$('.col-right').height());
        $('.col').css("min-height",highestCol);
      }
      dragDrop();
      event.preventDefault();

    }
  });


});

$(document).on('click', '.close', function(){
 $(this).parent().remove();
 cards=$("#cards").html();
 localStorage.setItem("cards",cards);
});


function getRandomColor() {
  var colors = ["#E77E23", "#27AE61", "#D64A4B","2A80B9","F39C11","#7519FF","#FF6666","#75A319"];
  color = colors[Math.floor(Math.random() * 8)];
  return color;
}

function dragDrop(){

 $( ".col-left-container .card" ).draggable();
 $( ".col-left-container .card" ).on( "dragstop", function( event, ui ) { 
  if(currentMousePos.x < $(".col-right").position().left){
    $(this).css("left",ui.originalPosition.left);
    $(this).css("top",ui.originalPosition.top);
  }else{
    console.log(event.target);
    obj=$(".col-right-container").append(event.target);
    $(event.target).removeClass("ui-draggable ui-draggable-handle").css("position","static").css("background-color","white");
    $(event.target).children(".close").remove();
    doneCards=$("#doneCards").html();
    localStorage.setItem("doneCards",doneCards);
    cards=$("#cards").html();
    localStorage.setItem("cards",cards);

    console.log(event.target);
  }
} );


}