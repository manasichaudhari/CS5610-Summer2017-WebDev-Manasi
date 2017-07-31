(function(){
    angular.module('WebAppMaker')
        .service('PageService',pageService);

    function pageService() {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;
    }
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];
    
    function findPageByWebsiteId(websiteId) {
        var results = [];

        for(p in pages){
            if(pages[p].websiteId === websiteId) {
              results.push(pages[p]);
            }
        }
        return results;
    }

    function createPage(websiteId, page) {
        if(typeof page !== 'undefined') {
            page._id = (new Date().getTime()) + "";
            page.websiteId = websiteId;
            pages.push(page);
        }
        return page;
    }
    
    function findPageById(pageId) {
        return pages.find(function (page) {
            return page._id === pageId;
        });
        if (typeof page === 'undefined') {
            return null;
        }
        return page;
    }
    
    function updatePage(pageId, page) {
        var pageToBeUpdated = findPageById(pageId);
        var index = pages.indexOf(pageToBeUpdated);
        pages[index] = page;
        return;
    }
    
    function deletePage(pageId) {
        var page = findPageById(pageId);
        var index = pages.indexOf(page);
        pages.splice(index,1);
    }

})();