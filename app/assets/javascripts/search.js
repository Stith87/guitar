// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a given string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    order: 'relevance'
  });

  $('#searchContainer').html('');

  request.execute(function(response) {
    console.log(response.result);
  
    for(var i = 0, len = response.result.items.length; i < len; i++){
      console.log(response.result.items[i]);
      var resultId = response.result.items[i].id.videoId;
      var resultTitle = response.result.items[i].snippet.title;
      var resultImg = response.result.items[i].snippet.thumbnails.medium.url;
      var divId = "ytplayer" + i;
     
      showDetails(resultTitle, resultImg, divId);


    }

     
    function showDetails(resultTitle, resultImg, divId){

      $('#searchContainer').append('<div id="' + divId + '" " class="lesson span10">></div>');
      $("#" + divId).html("</div><h2 class='pull-left'>" + resultTitle + "</h2><img src='" + resultImg + "' class='pull-right'>");
    }

   function playResults(videoId, divId){
    player = new YT.Player(divId, {
        height: '390',
        width: '640',
        videoId: videoId
      });

}
    
   
   

  });


}


