agileApp.service("eventHandlerService", function() {
    var listeners = [];
    return {
        subscribe: function(callback) {
            listeners.push(callback);
        },
        publish: function(msg) {
            angular.forEach(listeners, function(value, key) {
                value(msg);
            });
        }
    };
});