var youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';


function getApiData(searchTerm, callback, pageToken) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyCR1A18yeOJ8ngGXDMB3F2S3hfS2JB2Q1E',
    q: searchTerm,
    per_page: 5,
    pageToken: pageToken
  }

  return $.getJSON(youtubeSearchURL, query, callback);


};


function showResults(results) {
  console.log(results);
  $.each(results.items, function(videosArrayKey, videosArrayValue) {
  	$('.formatted-results').removeClass('invisible');
  	$('footer').removeClass('invisible');
    $('.theresults').append(`<div class="singleResults"><a class="result-name text-danger" 
    	href="https://www.youtube.com/watch?v=${videosArrayValue.id.videoId}
		 target="_blank"}>${videosArrayValue.snippet.title}
		 <img class="w-100" src="${videosArrayValue.snippet.thumbnails.high.url}" 
		 href="https://www.youtube.com/watch?v=${videosArrayValue.id.videoId} 
		 target="_blank"}></a></div><div class="description">${videosArrayValue.snippet.description}</div><Br>`);
  });


};

function formReset() {
  $('.theresults').empty();
};

function clickSubmit() {
  $('.search').on('click', event => {
    event.preventDefault();
    formReset();
    var searchCriteria = $('input[type=text]').val();
    getApiData(searchCriteria, showResults).then(function(response) {

      console.log("this is the first token: ", response.nextPageToken);
      getNextPage(response.nextPageToken);
    });

    //getNextPage();

  });
};


function getNextPage(nextPageToken) {
  $('.next').on('click', event => {
    console.log("This is the next token: ", nextPageToken);
    event.preventDefault();
    formReset();
    var searchCriteria = $('input[type=text]').val();
    getApiData(searchCriteria, showResults, nextPageToken);
  });
}

$(clickSubmit);
