
(function () {
    angular
        .module('WebAppMaker')
        .service('UserService',userService);
    
    function userService($http) {

        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;


        function findUserByCredentials(username, password) {
            var url = "/api/assignment4/user?&username=" + username + '&password=' + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment4/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment4/user?username="+username;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/assignment4/user";
            return $http.post(url,user)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment4/user/"+userId;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment4/user/"+userId;
            return $http.delete(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

    }
})();
