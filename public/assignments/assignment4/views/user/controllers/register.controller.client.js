(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController',registerController);

    function registerController($location,UserService) {

        var model = this;
        model.register = register;

        function register (username,password,password2) {
            if (username === null || username === '' || typeof username ==='undefined') {
                model.error = 'Username is required';
                return;
            }
            if(password == null || password!== password2 || typeof password === 'undefined') {
                model.error = 'Please check if password fields are filled correctly';
            }
            else {
                UserService
                    .findUserByUsername(username)
                    .then(
                        function () {
                            showErrorMessage()
                        },
                        function () {
                            registerNewUser(username, password)
                        }
                    )
            }

        };

            function showErrorMessage(){
                model.error = 'Sorry this username is taken';
                return;
            }

            function registerNewUser(username,password) {
                var newUser = {
                    username: username,
                    password: password
                };
                return UserService.createUser(newUser)
                    .then(function (newUser) {
                        $location.url('/user/'+ newUser._id);
                    });
            }
    }
})();