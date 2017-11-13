const youtubeSearchURL ='https://www.googleapis.com/youtube/v3/search';

function getApiData (searchTerm, callback){
	const query={
		part: 'snippet',
		key: 'AIzaSyCR1A18yeOJ8ngGXDMB3F2S3hfS2JB2Q1E',
		q: `${searchTerm}`,
		per_page: 6
		
	}
	$.getJSON(youtubeSearchURL, query, callback);
	console.log(query);
	
};

function showResults(results){
	 $.each(results.items, function (videosArrayKey, videosArrayValue) {
	$('.theresults').append(`<div class="singleResults"><a class="result-name" href="https://www.youtube.com/watch?v=${videosArrayValue.id.videoId}
		 target="_blank"}>${videosArrayValue.snippet.title}<Br><img src="${videosArrayValue.snippet.thumbnails.default.url}" 
		 href="https://www.youtube.com/watch?v=${videosArrayValue.id.videoId} target="_blank"}></a></div><Br>`); 
	});
	console.log(results);


};

function clickSubmit () {
	$('button').on('click', event => {
		event.preventDefault();

				var searchCriteria= $('input[type=text]').val();
		console.log('here is the search criteria: ' + searchCriteria);
		getApiData(searchCriteria, showResults);
		
	});
};

$(clickSubmit);