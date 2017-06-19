(function(){
    angular.module('WebAppMaker')
            .controller('NewWebsiteController',newWebsiteController);

    function newWebsiteController($routeParams,$location,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init(){
            model.websites =  WebsiteService.findWebsitesByUser(model.uid);
        }

        init();

        function createWebsite(uid,website) {
            website=WebsiteService.createWebsite(uid,website);
            if(website === null || typeof website === 'undefined') {
                model.alert= "Fill out all fields";
            }
            else {
                $location.url('/user/'+model.uid+'/website');
            }

        }

    }
})();