var fetchJSON = function (url, callback) {
    var request = new XMLHttpRequest();
    request.onload = function (progressEvent) {
        var responseJSON;
        var error;
        try {
            responseJSON = JSON.parse(request.response);
        } catch (err) {
            error = new Error('Could not parse response as JSON');
        }
        callback(error, responseJSON, request);
    };
    request.open('get', url, true);
    request.send();
};

var photosURL = 'https://api.500px.com/v1/photos'
    +'?feature=user'
    +'&username=fauntle'
    +'&sort=created_at'
    +'&image_size=3'
    +'&consumer_key=caIubSYfdDLoEpy0Q0uxuIpeAoBXdseD6NmfHFYL';

fetchJSON(photosURL, function(err, response, xhr){
    console.log(err, response, xhr);
});