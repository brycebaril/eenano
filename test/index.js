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
  t.deepEqual(e.listeners("test"), [{handler: h, thisArg: undefined}])
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

test("thisArg", function (t) {
  t.plan(9)
  var e = EE()
  var foo = {hi: "there"}
  e.on("foo", function (md) {
    t.equals(md, "abc")
    t.equals(this, foo)
  }, foo)

  e.on("foo", function (md) {
    t.equals(md, "abc")
    t.equals(this, foo)
  }.bind(foo))

  e.on("foo", function (md) {
    t.equals(md, "abc")
    t.equals(this, foo)
  }.bind(foo), e)

  e.on("foo", function (md) {
    t.equals(md, "abc")
    t.equals(this, e)
  })

  t.equals(e.listeners("foo").length, 4)

  e.emit("foo", "abc")
})
