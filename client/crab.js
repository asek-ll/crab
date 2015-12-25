angular.module('crab', ['angular-meteor', 'ui.router']);

angular.module('crab').controller('ItemListCtrl', ['$scope', '$meteor',
  function ($scope, $meteor) {
    //$scope.$meteorSubscribe('items');

    $meteor.autorun($scope, function () {
      $meteor.subscribe('items', {
        query: $scope.getReactively('filter.query')
      }).then(function () {
        console.log('after autorun');
      });
    });

    $scope.items = $meteor.collection(Items);

    $scope.getItemIcon = function (item) {
      var nameParts = item.name.split(':');
      var modName = nameParts[0].replace('|', '_');
      return 'mods/' + modName + '/' + item.id + '_' + item.meta + '.png';
    };
  }
]);

angular.module('crab').controller('ItemCreateFormCtrl', ['$scope', '$meteor',
  function ($scope, $meteor) {
    $scope.$meteorSubscribe('items');

    $scope.create = function (item) {};
  }
]);

angular.module('crab').controller('ItemCtrl', ['$scope', '$stateParams', '$meteor',
  function ($scope, $stateParams, $meteor) {
    $meteor.subscribe('recipes', {
      id: parseInt($stateParams.id, 10),
    }).then(function () {
      console.log(arguments);
    });

    $scope.recipes = $meteor.collection(Recipes);
  }
]);

angular.module('crab').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('item', {
        url: '/item/:id/:meta',
        templateUrl: 'client/templates/item.html',
        controller: 'ItemCtrl',
      })
      .state('itemList', {
        url: '/items',
        templateUrl: 'client/templates/items.html',
        controller: 'ItemListCtrl',
      });
  }
]);

angular.module('crab').controller('NavBarCtrl', ['$scope', '$meteor',
  function ($scope, $meteor) {
    $scope.doImport = function () {
      $meteor.call('import', 'fuh');
    };
  }
]);
