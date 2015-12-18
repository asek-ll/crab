angular.module('crab', ['angular-meteor', 'ui.router']);

angular.module('crab').controller('ItemListCtrl', ['$scope', '$meteor',
  function ($scope, $meteor) {
    $scope.items = $meteor.collection(Items);
  }
]);

angular.module('crab').controller('ItemCreateFormCtrl', ['$scope', '$meteor',
  function ($scope, $meteor) {
    $scope.items = $meteor.collection(Items);

    $scope.create = function (item) {
      if (item.name !== '') {
        $scope.items.push(item);
        $scope.item = {
          name: ''
        };
      }
    };
  }
]);

angular.module('crab').controller('ItemCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
    console.log('in item ctrl', $stateParams);
  }
]);

angular.module('crab').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    console.log(UiRouter);

    $stateProvider.state('item', {
      url: '/item/:itemName',
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
