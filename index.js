var youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';
var nextPageToken = null;

function getApiData (){
  console.log("here is nextPageToken", nextPageToken);
  var searchCriteria = $('input[type=text]').val();
  _getApiData(searchCriteria, showResults, nextPageToken)
    .then((response) => nextPageToken = response.nextPageToken)
};

var clickSubmit = event => {
  event.preventDefault();
  formReset();
  getApiData();
};

var goToNextPage = event => {
  event.preventDefault();
  formReset();
  // get the next page token
  // call getAPIDATA
  getApiData();
};

var formReset = () => {
  $('.theresults').empty();
};

// Register listeners
$('.search').on('click', clickSubmit);
$('.next').on('click', goToNextPage);

//
function _getApiData(searchTerm, callback, pageToken) {
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
    $('.invisible').removeClass('invisible');
    $('footer').removeClass('invisible');
    $('.theresults').append(`<div class="singleResult"><a class="result-name text-danger" 
      href="https://www.youtube.com/watch?v=${videosArrayValue.id.videoId}
     target="_blank"}>${videosArrayValue.snippet.title}
     <img class="w-100" src="${videosArrayValue.snippet.thumbnails.high.url}" 
     href="https://www.youtube.com/watch?v=${videosArrayValue.id.videoId} 
     target="_blank"}></a><div class="description">
     ${videosArrayValue.snippet.description}</div><div>`);
  });
};
