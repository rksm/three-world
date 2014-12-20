/*global process, beforeEach, afterEach, describe, it, expect*/

describe('three world', function() {

  var world;
  beforeEach(function() {
    world = THREE.World.create(document.querySelector("#three-area"));
    world.startLoop();
  });
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
    
    it("can stop the render loop", function(done) {
      var calls = 0, callsBeforeStop,
          timedCalls = 0, timedCallsBeforeStop;
      world.addAnimationCallback(function() { calls++; });
      world.addAnimationCallback("timed", 10, function() { timedCalls++; });
      setTimeout(function() {
        callsBeforeStop = calls;
        timedCallsBeforeStop = timedCalls;
        world.stopLoop()
      }, 80);
      setTimeout(function() {
        expect(calls).equals(callsBeforeStop);
        expect(timedCalls).equals(timedCallsBeforeStop);
        world.startLoop();
      }, 180);
      setTimeout(function() {
        expect(calls).to.be.greaterThan(callsBeforeStop);
        expect(timedCalls).to.be.greaterThan(timedCallsBeforeStop);
        world.startLoop();
        done();
      }, 360);
    });

    it("schedules named callbacks and removes them", function(done) {
      var calls = 0;
      world.addAnimationCallback("test callback", function() {
        calls++;
        world.removeAnimationCallback("test callback");
      });
      setTimeout(function() { expect(calls).equals(1); done(); }, 100);
    });

    it("schedules callbacks using time intervals and removes them", function(done) {
      var calls = 0;
      world.addAnimationCallback("test callback", 50, function(timeDelta) {
        if (++calls === 2) world.removeAnimationCallback("test callback");
        
        expect(timeDelta).to.be.within(30,70,
          "Browsers aren't to reliable on scheduling intervals / timeouts according to the requested time interval");
      });
      setTimeout(function() { expect(calls).equals(2); done(); }, 200);
    });

  })
});
