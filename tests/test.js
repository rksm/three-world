/*global process, beforeEach, afterEach, describe, it, expect*/

describe('three world', function() {

  var world;
  beforeEach(function() { world = THREE.World.create(document.querySelector("#three-area")); });
  afterEach(function() { world.destroy(); });

  it("creates a scene", function() {
    expect(world.scene).to.be.an("object");
  });

  describe("animation", function() {
    
    it("schedules and invokes callbacks", function(done) {
      var calls = 0;
      world.addAnimationCallback(function() { calls++; });
      (function waitForCallback() {
        if (calls > 1) done();
        else setTimeout(waitForCallback, 20);
      })();
    });

    it("schedules named callbacks and removes them", function(done) {
      var calls = 0;
      world.addAnimationCallback("test callback", function() {
        calls++;
        world.removeAnimationCallback("test callback");
      });
      setTimeout(function() {
        expect(calls).equals(1);
        done();
      }, 100);
    });

    it("schedules callbacks using time intervals and removes them", function(done) {
      var calls = 0;
      world.addAnimationCallback("test callback", 50, function(timeDelta) {
        expect(timeDelta).to.be.within(30,70);
        if (++calls === 2) world.removeAnimationCallback("test callback");
      });
      setTimeout(function() {
        expect(calls).equals(2);
        done();
      }, 200);
    });

  })
});
