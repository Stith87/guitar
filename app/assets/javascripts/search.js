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
    order: 'relevance',
    type: 'video'
  });

  $('#searchContainer').html('');

  request.execute(function(response) {
    console.log(response.result);
  
    for(var i = 0, len = response.result.items.length; i < len; i++){
      console.log(response.result.items[i]);
      this.resultId = response.result.items[i].id.videoId;
      this.resultTitle = response.result.items[i].snippet.title;
      this.resultImg = response.result.items[i].snippet.thumbnails.medium.url;
      this.divId = "ytplayer" + i;
     
       
      showDetails(resultTitle, resultImg, divId, resultId);
      buildEvent(resultId, divId);
    }



    function showDetails(resultTitle, resultImg, divId, videoId){

      $('#searchContainer').append('<div id="' + divId + '" " class="lesson span10"></div>');
      $("#" + divId).html("</div><h4 class='pull-left'>" + resultTitle + "</h4><img src='" + resultImg + "' class='pull-right'>");
      
    }

 
    
   
   

  });

  function buildEvent(videoId, divId){
    $('#' + divId).one("click",function(){
     
      $('#' + divId).append('<div class="videoContainer_' + videoId +'"></div>');

        playResults(videoId, divId);
    });
  }
}



  function playResults(videoId, videoDiv){
    $('.videoContainer_' + videoId +'').html('<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen>');
      $('.videoContainer_' + videoId +'').click(function(){
        $('.videoContainer_' + videoId +'').remove()
        
      })
    }