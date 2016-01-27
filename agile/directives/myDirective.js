(function() {
    agileApp.directive('cardDirective', function(eventHandlerService) {
        return {
            restrict: 'C',
            scope: true,
            transclude: true,
            templateUrl: function(elem, attr) {
                return 'directives/template-card.html';
            },
            link: function (scope, element, attr) {

                if (attr.listName) {
                    $(element).parent().hover(function() {
                        $(this).find('.close').show();
                    }, function() {
                        $(this).find('.close').hide();
                    });

                    scope.listName = attr.listName;
                }

                scope.editItem = function(listName, index) {
                    var offset = $(element).offset();
                    eventHandlerService.publish({
                        top: offset.top,
                        left: offset.left,
                        listName: listName,
                        index: index,
                        title: scope[listName][index].title,
                        color: scope[listName][index].color
                    });
                };
            }
        };
    });

    agileApp.directive('quickEditorDirective', function(eventHandlerService, storageFactory) {
        return {
            restrict: 'C',
            scope: {},
            templateUrl: function() {
                return 'directives/template-popup-edit.html';
            },
            link: function(scope, element, attr) {
                var myConfig = {
                        listName: '',
                        index: ''
                    };

                scope.isPopupVisible = false;

                scope.closePopup = function($event) {
                    scope.isPopupVisible = false;
                };

                scope.save = function() {
                    scope.$emit('updateList', {
                        title: scope.title,
                        color: scope.color,
                        listName: myConfig.listName,
                        index: myConfig.index
                    });
                    scope.closePopup();
                };


                function showPopup(config) {
                    if (!config) return;

                    myConfig.listName = config.listName;
                    myConfig.index = config.index;

                    scope.isPopupVisible = true;
                    scope.title = config.title;
                    scope.color = config.color;
                }

                eventHandlerService.subscribe(showPopup);


                // Pressing ESC key hides Popup
                $(document).bind('keydown keypress', function (event) {
                    if(event.which === 27 && scope.isPopupVisible) { // 27 = esc key
                        scope.$apply(function() {
                            scope.closePopup();
                        });

                        event.preventDefault();
                    }
                });
            }
        };
    });

    agileApp.directive('popupMessageDirective', function(eventHandlerService, storageFactory) {
        return {
            restrict: 'C',
            scope: {},
            transclude: true,
            templateUrl: function() {
                return 'directives/template-popup-message.html';
            },
            link: function(scope, element, attr) {
                scope.closePopup = function($event) {
                    scope.isPopupVisible = false;

                    storageFactory.setMessagePopupFlag(false);
                };

                if (storageFactory.getMessagePopupFlag() === true) {
                    scope.isPopupVisible = true;
                } else {
                    scope.closePopup();
                }

                function showPopup(config) {
                    if (config) return;

                    scope.isPopupVisible = true;
                }

                eventHandlerService.subscribe(showPopup);

                // Pressing ESC key hides Popup
                $(document).bind('keydown keypress', function (event) {
                    if(event.which === 27 && scope.isPopupVisible) { // 27 = esc key
                        scope.$apply(function() {
                            scope.closePopup();
                        });

                        event.preventDefault();
                    }
                });
            }
        };
    });
}());