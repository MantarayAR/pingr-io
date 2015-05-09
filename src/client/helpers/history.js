this._userHistory = null;

Meteor.subscribe('histories', {
  userId: Meteor.userId()
}, function() {
  var _location, _userHistory;
  _userHistory = new this.userHistory(Meteor.userId());
  this.setUserHistory(_userHistory);
  _location = window.location.pathname;
  if (_location === "/") {
    return _userHistory.resetHistory();
  }
});

this.setUserHistory = function(_uh) {
  return this._userHistory = _uh;
};

this.userHistory = (function() {
  function userHistory(userId) {
    this.historyId = null;
    if (userId != null) {
      this.setUserId(userId);
    }
  }

  userHistory.prototype.setUserId = function(userId) {
    var _history;
    this.userId = userId;
    _history = Histories.find({
      userId: userId
    }).fetch();
    if (_history.length !== 0) {
      return this.historyId = _history[0]._id;
    } else {
      return this.historyId = Histories.insert({
        userId: userId,
        locations: []
      });
    }
  };

  userHistory.prototype.goToUrl = function(url) {
    var _history;
    if (this.historyId != null) {
      _history = Histories.findOne({
        _id: this.historyId
      });
      _history.locations.push(url);
      delete _history._id;
      Histories.update({
        _id: this.historyId
      }, {
        $set: _history
      });
    }
    return Router.go(url);
  };

  userHistory.prototype.goBack = function() {
    var _history;

    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');

    if (this.historyId != null) {
      _history = Histories.findOne({
        _id: this.historyId
      });
      _history.locations.pop();
      delete _history._id;
      Histories.update({
        _id: this.historyId
      }, {
        $set: _history
      });
      Router.go(_history.locations.last());
    } else {      
      window.history.back();
    }
  };

  userHistory.prototype.currentUrl = function() {
    var _currentUrl, _history;
    if (this.historyId != null) {
      _history = Histories.findOne({
        _id: this.historyId
      });
      if (Object.isArray(_history.locations)) {
        _currentUrl = _history.locations.last();
      } else {
        _currentUrl = _history.locations;
      }
      if (_currentUrl == null) {
        return window.location.pathname;
      } else {
        return _currentUrl;
      }
    } else {
      return window.location.pathname;
    }
  };

  userHistory.prototype.replaceLastUrl = function(newUrl) {
    var _history;
    if (this.historyId != null) {
      _history = Histories.findOne({
        _id: this.historyId
      });
      _history.locations.pop();
      _history.locations.push(newUrl);
      window.history.replaceState({}, "", newUrl);
      delete _history._id;
      return Histories.update({
        _id: this.historyId
      }, {
        $set: _history
      });
    }
  };

  userHistory.prototype.history = function() {
    var _history;
    if (this.historyId != null) {
      _history = Histories.findOne({
        _id: this.historyId
      });
      return _history.locations;
    } else {
      return window.history;
    }
  };

  userHistory.prototype.resetHistory = function() {
    var _history;
    console.log("Resetting History");
    if (this.historyId != null) {
      _history = Histories.findOne({
        _id: this.historyId
      });
      _history.locations = ["/"];
      delete _history._id;
      return Histories.update({
        _id: this.historyId
      }, {
        $set: _history
      });
    }
  };

  return userHistory;

})();