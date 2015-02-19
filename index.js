var CoreObj = require('./coreobj.js');

var Store = CoreObj.extend({
  constructor: function(data) {
    CoreObj.apply(this, arguments);

    this._data = {};
    this._prevdata = {};

    if (this.setup) this.run(this.setup);
    
    setTimeout(function(self) {
      if (data) self.set(data);
    }, this);
  }
});

Store.prototype.set = function(key, val) {
  if (typeof arguments[0] === 'object') {
    arguments[0].forEach(function(val, key) {
      this.set(key, val);
    }, this);
    this.emit('set', key, this);
  } else {
    this._data[key] = val;
    this.emit('set:' + key, val, key, this);
  }

  return this;
};

Store.prototype.get = function(key) {
  this.emit('get', this._data);
  this.emit('get:' + key, this._data[key]);
  return this._data[key];
};

Store.prototype.destroy = function() {

};


module.exports = Store;

