(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController',profileController);

    function profileController($location,currentUser,UserService) {

        var model = this;

        model.uid = currentUser._id;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id,user)
                .then(
                    function(){
                        model.message = "User updated successfully";
                    });
        }

        function unregister() {
            UserService
                .unregister()
                .then(
                    function () {
                        $location.url('/login');
                    },
                    function (err) {
                        model.error("Unable to unregister user");
                    }
                );
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();