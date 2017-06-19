(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController',loginController);
    
    function loginController($location,UserService) {

        var model = this;
        model.login = login;

        function login (username,password) {
            var user = UserService.findUserByCredentials(username,password);
            if(user !== null){
                $location.url('/user/' + user._id)
            }else {
                model.message = "Unable to login. Please try with valid credentials";
            }
        }
    }
})();