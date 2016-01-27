(function() {
	agileApp.factory('storageFactory', function() {
		var storage = localStorage,
			obj;

		function setter(prop, val) {
			storage[prop] = JSON.stringify(val);
		}

		function getter(prop) {
			return JSON.parse(storage[prop]);
		}

		function initialize() {
			if (!storage.Lists) {
				setter('Lists', [[], [], []])
			}

			if (!storage.TrashList) {
				setter('TrashList', []);
			}

			if (!storage.MessagePopupFlag) {
				setter('MessagePopupFlag', true);
			}
		}

		obj = {
			updateList: function(list) {
				setter('Lists', list)
			},
			getLists: function() {
				return getter('Lists');
			},
			getTrashList: function() {
				return getter('TrashList');
			},
			clearLists: function() {
				setter('Lists', [[], [], []])
			},
			clearTrashList: function() {
				setter('TrashList', []);
			},
			updateTrashList: function(list) {
				setter('TrashList', list)
			},
			getMessagePopupFlag: function() {
				return getter('MessagePopupFlag');
			},
			setMessagePopupFlag: function(val) {
				setter('MessagePopupFlag', val);
			}
		};

		initialize();

		return obj;
	});
}());

