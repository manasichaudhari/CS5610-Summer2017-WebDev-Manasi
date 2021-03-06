(function(){
    angular.module('WebAppMaker')
        .service('WidgetService',WidgetService);

    function WidgetService(){
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
    }

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function findWidgetsByPageId(pageId) {
        var results = [];

        for(w in widgets){
            if(widgets[w].pageId === pageId) {
                results.push(widgets[w]);
            }
        }
        return results;
    }
    
    function createWidget(pageId, widget) {
        widget._id = (new Date().getTime()) + "";
        widget.pageId = pageId;
        widgets.push(widget);
        return widget._id;
    }

    function findWidgetById(widgetId)  {
        return widgets.find(function (widget) {
            return widget._id === widgetId;
        });

        if (typeof widget === 'undefined') {
            return null;
        }
        return widget;
    }
    
    function updateWidget(widgetId, widget) {
        var widgetToBeUpdated = findWidgetById(widgetId);
        var index = widgets.indexOf(widgetToBeUpdated);
        widgets[index] = widget;
        return;
    }

    function deleteWidget(widgetId){
        var widget = findWidgetById(widgetId);
        var index = widgets.indexOf(widget);
        widgets.splice(index,1);
        return;
    }


})();