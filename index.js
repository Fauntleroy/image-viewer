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

var ImageViewer = function (element, photos) {
    this.el = element;
    this.previous_el = element.querySelector('.image-viewer__previous');
    this.next_el = element.querySelector('.image-viewer__next');
    this.image_el = element.querySelector('.image-viewer__image');
    this.name_el = element.querySelector('.image-viewer__name');

    var initial_photo = photos[0];
    this.displayImage(initial_photo.image_url, initial_photo.name);
};

ImageViewer.prototype = {
    previousImage: function () {

    },
    nextImage: function () {

    },
    displayImage: function (url, name) {
        this.image_el.src = url;
        this.name_el.textContent = name;
    }
};

var photosURL = 'https://api.500px.com/v1/photos'
    +'?feature=user'
    +'&username=fauntle'
    +'&sort=created_at'
    +'&image_size=4'
    +'&consumer_key=caIubSYfdDLoEpy0Q0uxuIpeAoBXdseD6NmfHFYL';

document.addEventListener('DOMContentLoaded', function () {
    var image_viewer_el = document.querySelector('#image-viewer');

    fetchJSON(photosURL, function(err, response, xhr){
        var image_viewer = new ImageViewer(image_viewer_el, response.photos);
    });
});