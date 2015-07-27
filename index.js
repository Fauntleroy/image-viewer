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

var ImageViewer = function (element, images) {
    var image_viewer = this;
    this.el = element;
    this.previous_el = element.querySelector('.image-viewer__previous');
    this.next_el = element.querySelector('.image-viewer__next');
    this.image_el = element.querySelector('.image-viewer__image');
    this.name_el = element.querySelector('.image-viewer__name');

    this.images = images;
    this.current_image_index = 0;
    this.displayImage(this.current_image_index);

    this.previous_el.addEventListener('click', function (event) {
        event.preventDefault();
        image_viewer.previousImage();
    });
    this.next_el.addEventListener('click', function (event) {
        event.preventDefault();
        image_viewer.nextImage();
    });
};

ImageViewer.prototype = {
    previousImage: function () {
        var previous_image_index = this.current_image_index > 0 ?
            this.current_image_index - 1 :
            this.images.length - 1;
        this.displayImage(previous_image_index);
    },
    nextImage: function () {
        var next_image_index = this.current_image_index < this.images.length - 1 ?
            this.current_image_index + 1 :
            0;
        this.displayImage(next_image_index);
    },
    displayImage: function (image_index) {
        var image = this.images[image_index];
        this.image_el.src = image.image_url;
        this.name_el.textContent = image.name;
        this.current_image_index = image_index;
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