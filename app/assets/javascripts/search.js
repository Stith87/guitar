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
      this.desc = response.result.items[i].snippet.description;
     
      $('#' + divId).data("id:", response.result.items[i].id.videoId);
      $('#' + divId).data("title:", response.result.items[i].snippet.title);
      $('#' + divId).data("img:", response.result.items[i].id.videoId);
      $('#' + divId).data("id:" , response.result.items[i].snippet.thumbnails.medium.url);
      $('#' + divId).data("desc:" , response.result.items[i].snippet.description);
      $('#' + divId).data("divId:","ytplayer" + i);

     
      showDetails(resultTitle, resultImg, divId, resultId, desc);
      buildEvent(resultId, divId);

    }



    function showDetails(resultTitle, resultImg, divId, videoId, desc){

      $('#searchContainer').append('<div id="' + divId + '" " class="lesson col-xs-12 col-sm-12 col-md-12" style="cursor: pointer"></div>');
      $("#" + divId).html("<div class='videoImg'><img src='" + resultImg + "' class='img-polaroid img-responsive'></div><div class='details' ><h4>" + resultTitle + "</h4><p>" + desc + "</p></div></div>");
      $('#' + divId).after('<div class="videoContainer_' + videoId +'  video col-xs-12 col-sm-12 col-md-12"></div>'); 
      $('.videoContainer_' + videoId +'').hide();  
      
    }

  });

  function buildEvent(videoId, divId){

    $.fn.clicktoggle = function(a, b) {
        return this.each(function() {
            var clicked = false;
            $(this).click(function() {
                if (clicked) {
                    clicked = false;
                    return b.apply();
                }
                clicked = true;
                return a.apply();
            });
        });
    };


    $('#' + divId).clicktoggle(function(){
          
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
      $(this).css({ boxShadow: '0px 5px 6px #444' })
    })    
    
    $('#' + divId).mouseleave(function(){
      $(this).fadeTo("fast", .8);
      $(this).css({ boxShadow: '0px 0px 0px #444' })
    }) 

    
  }
}
    


  function playResults(videoId, videoDiv){

    $('.videoContainer_' + videoId +'').append('<center><iframe id="ytplayer" type="text/html" width="640" height="360" style="max-width: 100%;" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></center>');
      

    }


