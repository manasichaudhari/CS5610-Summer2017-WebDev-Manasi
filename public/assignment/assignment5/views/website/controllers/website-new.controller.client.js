(function(){
    angular.module('WebAppMaker')
        .controller('NewWebsiteController',newWebsiteController);

    function newWebsiteController($routeParams,$location,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites,error);

        }
        init();

        function createWebsite(uid,website) {
            if(website === null || typeof website === 'undefined' || typeof website.name === 'undefined' || website.name === '') {
                model.alert= "*Website name is mandatory";
            }
            else {
                WebsiteService
                    .createWebsite(uid, website)
                    .then(function () {
                        $location.url('/user/' + model.uid + '/website');
                    })
            }
        }

        function error() {
            model.error = "Something went wrong. Please try again later";
        }

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();