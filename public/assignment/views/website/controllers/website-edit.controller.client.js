(function(){
    angular.module('WebAppMaker')
        .controller('EditWebsiteController',editWebsiteController);

    function editWebsiteController($routeParams,currentUser,$location,WebsiteService) {

        var model = this;

        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites);
            WebsiteService
                .findWebsiteById(model.wid)
                .then(renderWebsite);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = angular.copy(website);
        }

        function deleteWebsite(userId,websiteId) {
            WebsiteService
                .deleteWebsite(userId,websiteId)
                .then(
                    function () {
                        $location.url('/website');
                    },
                    function () {
                        model.alert = "Unable to delete website";
                    });

        }

        function updateWebsite(websiteId,website) {
            if(typeof website === "undefined" || typeof website.name === "undefined" ||
                website.name === null || website.name === '') {
                model.alert = "Website name is required";
            }
            else {
                WebsiteService
                    .updateWebsite(websiteId, website)
                    .then(function () {
                            $location.url('/website');
                        },
                        function () {
                            model.alert = "Website was not updated successfully"
                        });
            }
        }

    }
})();