angular.module('starter.services', [])
.service('ScanHistory', function ($window, Scan) {
  this.add = function (code) {
    var item = Scan(code);
    var list = this.findAll();
    list.push(item);
    var data = JSON.stringify(list);
    $window.localStorage.setItem('scanHistory', data);
    return item;
  };
  this.findAll = function () {
    var output = [];
    var storedData = $window.localStorage.getItem('scanHistory');
    if (storedData !== null) {
      var itemList = JSON.parse(storedData);
      output = itemList.map(function (item) {
        return Scan(item);
      });
    }
    return output;
  };
  this.findLast = function () {
    var list = this.findAll();
    if (list.length === 0) {
      throw 'No codes read yet!';
    }
    return list[list.length-1];
  };
})
.factory('Scan', function () {
  return function (data) {
    var item = {
      code: undefined,
      created_on: new Date()
    }
    if (typeof data === 'string') {
      item.code = data;
    } else {
      if (typeof data.code === 'undefined') {
        throw 'ScanFactory: A code must be specified';
      }
      item.code = data.code;
      if (typeof data.created_on === 'string') {
        item.created_on = new Date(data.created_on);
      }
    }
    return item;
  };
});
