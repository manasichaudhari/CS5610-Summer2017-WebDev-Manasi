(function(){
    angular.module('WebAppMaker')
            .controller('EditPageController',editPageController);

    function editPageController($routeParams,$location,PageService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init(){
            model.page = angular.copy(PageService.findPageById(model.pid));
        }

        init();

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
        }
        
        function updatePage(pageId,page) {
            if(page !== null && typeof page !== 'undefined' && page.name !== '') {
                PageService.updatePage(pageId,page);
                $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
            }
            else {
                model.alert = "*Page name is required";
                //console.log(page);
            }
        }

    }
})();