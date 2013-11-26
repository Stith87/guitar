// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a given string.
function search() {
  var q = "guitar" + $('#keyword').val() + " " +  $('#skill').val() + " " + $('#lessonType').val() + " " + $('#technique').val() + " " + "lesson" ;
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    order: 'relevance',
    type: 'video',
    maxResults: '50'
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
     
      $('#' + divId).data("id:", response.result.items[i].id.videoId);
      $('#' + divId).data("title:", response.result.items[i].snippet.title);
      $('#' + divId).data("img:", response.result.items[i].id.videoId);
      $('#' + divId).data("id:" , response.result.items[i].snippet.thumbnails.medium.url);
      $('#' + divId).data("divId:","ytplayer" + i);

       console.log($('#' + divId).data())
      showDetails(resultTitle, resultImg, divId, resultId);
      buildEvent(resultId, divId);

    }



    function showDetails(resultTitle, resultImg, divId, videoId){

      $('#searchContainer').append('<a href="#"><div  id="' + divId + '" " class="lesson span10"></div></a>');
      $("#" + divId).html("<h4 class='pull-left'>" + resultTitle + "</h4><img src='" + resultImg + "' class='pull-right'><br />");
      $('#' + divId).after('<div class="videoContainer_' + videoId +' span10 video"></div>'); 
       $('.videoContainer_' + videoId +'').hide();  
    }

  });

  function buildEvent(videoId, divId){
    $('#' + divId).toggle(function(){
          
          $('.videoContainer_' + videoId +'').slideDown('fast', function(){
            playResults(videoId, divId);
          });
                    
        }, function(){
         
           $('.videoContainer_' + videoId +'').slideUp('slow',function(){
              $('.videoContainer_' + videoId +'').html('');
           });
            
        });

        
    $('#' + divId).mouseenter(function(){
      $(this).fadeTo("fast", 1.00);
    })    
    
    $('#' + divId).mouseleave(function(){
      $(this).fadeTo("fast", .75);
    })   
  }
}



  function playResults(videoId, videoDiv){

    $('.videoContainer_' + videoId +'').append('<center><iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></center>');
    
    }

