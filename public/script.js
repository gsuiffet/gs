$("document").ready(function() {
    $( function() {
        $( "#sortable" ).sortable({ //Jquery UI DragNDrop
            stop: function( event, ui ) {
                //update: action si déplacement uniquement
                var sortedIDs = JSON.stringify($( ".list-group" ).sortable( "toArray" )); //-> return un objet
                //var sortedIDs = $( ".selector" ).sortable( "toArray" );
                $.getJSON("./updatePosition?tri="+sortedIDs, function(data) {
                    //$.get("./updatePosition?tri="+sortedIDs, function(data) { //-> on n'utilise pas le retour
                    // (AJAX client/serveur)
                    console.log(data);
                });
                console.log(sortedIDs);
            }
        });
        //$( "#sortable" ).disableSelection();
    });

    //Leaflet map
   var map = L.map('mapid');
   map.setView([51.505, -0.09], 13);

   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   //Leaflet marker
  $(".list-group-item").each(function() {
      map.setView([$(this).data("positionlat"), $(this).data("positionlon")], 13);//centre la map sur chaque dernier élément
      L.marker([$(this).data("positionlat"), $(this).data("positionlon")]).addTo(map)
      //console.log($(this).data("positionlat") +" "+ $(this).data("positionlon"));
          .bindPopup("Latitude: " + $(this).data("positionlat") +" <br> "+ "Longitude: " + $(this).data("positionlon"))
          .openPopup()
  });

  //Leaflet clic sur item pour centrer la map
  $(".list-group-item").click(function(){
      $("#mapid").val(map.setView([$(this).data("positionlat"), $(this).data("positionlon")], 13));
      $("#mapid").val(L.marker([$(this).data("positionlat"), $(this).data("positionlon")]).addTo(map)
          .bindPopup("Latitude: " + $(this).data("positionlat") +" <br> "+ "Longitude: " + $(this).data("positionlon"))
          .openPopup())
  });
});
