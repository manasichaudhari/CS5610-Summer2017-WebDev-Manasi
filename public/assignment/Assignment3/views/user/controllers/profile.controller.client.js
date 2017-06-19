(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController',profileController);
    
    function profileController($location,$routeParams,UserService) {

        var model = this;

        var uid = $routeParams['uid'];
        model.uid = uid;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = angular.copy(UserService.findUserById(uid));
        }
        init();

        function updateUser(uid,user) {
            UserService.updateUser(uid,user);
            $location.url('/user/' + uid);
            model.alert= 'Profile updated!';
        }

        function deleteUser(uid) {
            UserService.deleteUser(uid);
            $location.url('/');
        }

    }
})();