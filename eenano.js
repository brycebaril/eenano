module.exports = EENano

function EENano() {
  if (!(this instanceof EENano)) return new EENano()
  this._listeners = {}
  this.hasListeners = false
}
EENano.prototype.emit = function noop() {}

function emit(event, metadata) {
  var handlers = this._listeners[event]
  var returnVal
  if (handlers != null) {
    for (var i = 0; i < handlers.length; i++) {
      var fn = handlers[i].handler
      var thisArg = handlers[i].thisArg || this
      returnVal = true
      fn.call(thisArg, metadata)
    }
  }
  return returnVal
}
EENano.prototype.on = function (event, handler, thisArg) {
  if (!this.hasListeners) {
    this.emit = emit
    this.hasListeners = true
  }
  this._listeners[event] = this.listeners(event).concat({handler: handler, thisArg: thisArg})
}
EENano.prototype.events = function () {
  return Object.keys(this._listeners)
}
EENano.prototype.listeners = function (event) {
  return this._listeners[event] || []
}
