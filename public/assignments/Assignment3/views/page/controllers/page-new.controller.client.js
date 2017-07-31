(function(){
    angular.module('WebAppMaker')
            .controller('NewPageController',newPageController);

    function newPageController($routeParams,$location,PageService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.createPage = createPage;


        function createPage(uid,page) {
            page = PageService.createPage(uid,page);
            if (page !== null && typeof page !== 'undefined' && page.name !== '') {
                $location.url('/user/'+model.uid+'/website/'+ model.wid + '/page');
            }
            else {
                model.alert="*Page name is required";
            }


        }

    }
})();