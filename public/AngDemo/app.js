(function () {
    angular
        .module("courseApp", [])
        .controller("myController", myController);

    function myController($scope) {
        $scope.hello = "Angular JS Hello World!";
    }
})();