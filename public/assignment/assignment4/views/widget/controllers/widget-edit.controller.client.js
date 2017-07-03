(function(){
    angular.module('WebAppMaker')
        .controller('EditWidgetController',editWidgetController);

    function editWidgetController($routeParams,$location,WidgetService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init(){
            WidgetService.findWidgetById(model.wgid)
                .then(renderWidget);
        }

        init();

        function renderWidget(widget) {
            model.widget = widget;
        }

        function deleteWidget(wgid) {
            WidgetService.deleteWidget(wgid)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
                });
        }

        function updateWidget(wgid, widget) {
            if((widget.widgetType === "HEADING" || widget.widgetType === "HTML") &&
                (widget.text === '' || widget.text === undefined || typeof widget === undefined )) {
                    model.alert = "*Text is required";
            }
            else if ((widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") &&
                (widget.url === '' || typeof widget === undefined || widget.url === undefined)) {
                    model.alert = "*URL is required. First click extract URL and then click upload if uploading image from system";
            }
            else {
                WidgetService.updateWidget(wgid, widget)
                    .then(function () {
                        $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
                    });
            }
        }

    }
})();