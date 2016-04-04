angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($window, $timeout, ScanHistory) {
    try {
      this.lastScan = ScanHistory.findLast();
    } catch (e) {
      this.lastScan = undefined;
    }
    this.scan = function () {
      $window.cordova.plugins.barcodeScanner.scan(
        function (result) {
          if (! result.cancelled) {
            ScanHistory.add(result.text);
            $timeout(function () {
              this.lastScan = ScanHistory.findLast();
            }.bind(this));
          }
        }.bind(this), 
        function (error) {
          alert("Scanning failed: " + error);
        }
      );
    }.bind(this);
  })
  .controller('HistoryCtrl', function ($scope, ScanHistory) {
    this.scanList = [];
    $scope.$on('$ionicView.enter', function () {
      this.scanList = ScanHistory.findAll().reverse();
    }.bind(this));
  });

//
// .controller('DashCtrl', function($scope) {})
//
// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })
//
// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
//
// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
