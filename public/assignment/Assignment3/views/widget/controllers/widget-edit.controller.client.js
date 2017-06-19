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
            model.widget = angular.copy(WidgetService.findWidgetById(model.wgid));
        }

        init();

        function deleteWidget(wgid) {
            WidgetService.deleteWidget(wgid);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
        }

        function updateWidget(wgid, widget) {
            if(widget.widgetType === "HEADING") {
                if(widget.text !== '' && typeof widget !== undefined && widget.text !== undefined) {
                    WidgetService.updateWidget(wgid, widget);
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
                }
                else
                    model.alert = "*Name is required";
            }
            else if (widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") {
                if(widget.url !== '' && typeof widget !== undefined && widget.url !== undefined) {
                    WidgetService.updateWidget(wgid, widget);
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
                }
                else
                    model.alert = "*URL is required";
            }

            else if (widget.widgetType === "HTML") {
                if (widget.text !== '' && typeof widget !== undefined && widget.text !== undefined) {
                    WidgetService.updateWidget(wgid, widget);
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
                }
                else
                    model.alert = "*Text is required";
            }
        }

    }
})();