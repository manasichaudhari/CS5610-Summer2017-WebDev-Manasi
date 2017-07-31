(function(){
    angular.module('WebAppMaker')
        .service('PageService',pageService);

    function pageService($http) {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function findPageByWebsiteId(websiteId) {
            var url = '/api/assignment5/website/' + websiteId + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(websiteId, page) {
            var url = '/api/assignment5/website/' + websiteId + '/page';
            return $http.post(url,page)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findPageById(pageId) {
            var url = '/api/assignment5/page/'+pageId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });

        }

        function updatePage(pageId, page) {
            var url = '/api/assignment5/page/'+pageId;
            return $http.put(url,page)
                .then(function (response) {
                    return response.data;
                });

        }

        function deletePage(websiteId, pageId) {
            var url = '/api/assignment5/website/'+websiteId+'/page/' +pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();