(function() {
    agileApp.controller('agileController', ['$scope', 'storageFactory', 'eventHandlerService', function ($scope, storage, eventHandler) {

        // Sortable Configuration
        $scope.sortableOptions = {
            placeholder: 'app',
            connectWith: '.apps-container'
        };

        $scope.sortableOptionsTrash = {
            connectWith: '.apps-container'
        };

        $scope.init = function() {
            $scope.lists = storage.getLists();

            $scope.list1 = $scope.lists[0] || [];
            $scope.list2 = $scope.lists[1] || [];
            $scope.list3 = $scope.lists[2] || [];

            $scope.trashList = storage.getTrashList();

        };

        $scope.addCard = function(column) {
            $scope['list' + column].push({
                title: 'Story #' + ($scope['list' + column].length + 1),
                color: '#ffffff'
            });
        };

        $scope.clearBoard = function() {
            $scope.trashList = $scope.trashList.concat($scope.list1);
            $scope.trashList = $scope.trashList.concat($scope.list2);
            $scope.trashList = $scope.trashList.concat($scope.list3);
            storage.updateTrashList($scope.trashList);

            storage.clearLists();
            $scope.init();
        };

        $scope.deleteCard = function(listName, index) {
            var trash = $scope[listName].splice(index, 1);
            $scope.trashList.push(trash[0]);
        };

        $scope.purgeTrashBox = function() {
            storage.clearTrashList();
            $scope.trashList = storage.getTrashList();
        };

        $scope.showMessagePopup = function() {
            eventHandler.publish();
        };

        $scope.$on('updateList', function(el, config) {
            $scope[config.listName][config.index].title = config.title;
            $scope[config.listName][config.index].color = config.color;
            storage.updateList($scope.lists);
        });



        // Watching the Lists

        $scope.$watchCollection(function() {
            return $scope.list1;
        }, function(oldVal, newVal) {
            if (oldVal !== newVal) {
                storage.updateList($scope.lists);
            }
        });

        $scope.$watchCollection(
            function() {
                return $scope.list2;
            }, 
            function(oldVal, newVal) {
                if (oldVal !== newVal) {
                    storage.updateList($scope.lists);
                }
            }
        );

        $scope.$watchCollection(
            function() {
                return $scope.list3;
            }, 
            function(oldVal, newVal) {
                if (oldVal !== newVal) {
                    storage.updateList($scope.lists);
                }
            }
        );

        $scope.$watchCollection(
            function() {
                return $scope.trashList;
            }, 
            function(oldVal, newVal) {
                if (oldVal !== newVal) {
                    storage.updateTrashList($scope.trashList);
                }
            }
        );
    }]);
}());