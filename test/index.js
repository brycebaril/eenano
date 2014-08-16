var test = require("tape")

var EE = require("../eenano")

test("no listeners", function (t) {
  var e = EE()
  e.emit("foo")
  t.deepEqual(e.events(), [])
  t.end()
})

test("single handler", function (t) {
  var e = new EE()
  var h = function (md) {
    t.equals(md, "yo", "got metadata")
    t.end()
  }
  e.on("test", h)
  t.deepEqual(e.listeners("test"), [h])
  e.emit("test", "yo")
})

test("multi", function (t) {
  t.plan(2)
  var e = EE()
  e.on("foo", function (md) {
    t.equals(md, "abc")
  })
  e.on("foo", function (md) {
    t.equals(md, "abc")
  })
  e.on("bar", function (md) {
    t.fail()
  })
  e.emit("foo", "abc")
})
