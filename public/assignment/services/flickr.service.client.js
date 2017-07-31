(function(){
    angular.module('WebAppMaker')
        .service('FlickrService',flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "7f025e685443189bcd830ff2a53a82ef";
        var secret = "1b96862a5da18e58";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
