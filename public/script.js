$("document").ready(function() {
    $( function() {
        $( "#sortable" ).sortable({
            //update: action si déplacement uniquement
            stop: function( event, ui ) {
                //var sortedIDs = $( ".selector" ).sortable( "toArray" );
                var sortedIDs = JSON.stringify($( ".list-group" ).sortable( "toArray" ));
                //-> return un objet
                //-> on transforme un objet en chaine de caractère
                $.getJSON("./updatePosition?tri="+sortedIDs, function(data) {
                    //-> on sélectionne une nouvelle chaine de caractère (root)
                    // (AJAX client/serveur)
                    // et on injecte la nouvelle chaine
                    console.log(data);
                });

                console.log(sortedIDs);
            }
        });
        //$( "#sortable" ).disableSelection();
    } );

/*
  $("li").each(function(i) {
    console.log(i);
  });
  $("li").click(function(){
    $("#content").html( "<p>new content !!!</p>" );
    $("#btn-valide").remove();
    $(this).fadeOut().delay(5000).fadeIn();
  });
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Lyon&APPID=9b754f1f40051783e4f72c176953866e&units=metric&lang=fr", function(data) {
    console.log(data);
  });
*/
});
