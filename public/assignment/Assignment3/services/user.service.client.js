(function () {
    angular
        .module('WebAppMaker')
        .service('UserService',userService);
    
    function userService() {
        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
    }

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    ];

    function findUserByCredentials(username,password) {
        var found = null;
        for (u in users){
            var user = users[u];
            if((user.username === username) && (user.password === password)){
                // console.log(user);
                return user;
            }
        }
        return null;
        return found;
    }
    function findUserById(userId) {
        for(var u in users) {
            if(users[u]._id === userId){
                return users[u]
            }
        }
        return null;
    }
    function findUserByUsername(username) {
        var user = users.find(function (user) {
            return user.username === username;
        });
        if(typeof user === 'undefined'){
            return null;
        }
        return user;
    }

    function createUser(user) {
        var newId = new Date().getTime() + "";
        user.created = new Date();
        user.accessed=new Date();
        var newUser = {
            _id: newId,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        users.push(newUser);
        return newUser;
    }

    function updateUser(userId, user) {
        var u = findUserById(userId);
        var index = users.indexOf(u);

        users.splice(index,1);
        u.username = user.username
        u.firstName = user.firstName;
        u.lastName = user.lastName;
        u.email = user.email;
        users.push(u);
        return;

    }

    function deleteUser(userId){
        var user = findUserById(userId);
        var index = users.indexOf(user);
        users.splice(index,1);
        return;
    }
})();