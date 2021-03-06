eenano
=====

[![NPM](https://nodei.co/npm/eenano.png)](https://nodei.co/npm/eenano/)

It's an EventEmitter! Like the one provided by core, but it does a **whole lot less!!** And it should be faster when there is nothing to do.

This EventEmitter is optimized for no listeners on any event. It should be plenty fast if there are listeners, of course...

It doesn't do most of what the core EventEmitter library does. If you need features, just use core.

A list of things this doesn't do:
  * Remove listeners
  * `once`
  * Special case the `error` event
  * domains
  * polymorphic event handlers
  * and more! (less?)

A list of what it does the core library doesn't:
  * Optimized for no listeners at all
  * Allows you to specify a `this` with `.on` to avoid `Function#bind`

```javascript

var EENano = require("eenano")

var ee = EENano()
ee.on("msg", function (foo) {
  console.log(foo)
})
ee.emit("msg", "hi")
// hi

```

API
===

`var ee = require("eenano")()`
---

Create an event emitter instance.

`.on(event, handler[, thisArg])`
---

On `event` synchronously call `handler()` if provided, call `handler` with `this` set to `thisArg`

`.emit(event, message)`
---

Call all handlers listening for `event` with `handler(metadata)`

`.events()`
---

List events that have any handlers

`.listeners(event)`
---

List handlers for a given event

LICENSE
=======

MIT
