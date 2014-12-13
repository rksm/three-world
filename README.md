## Scene setup for THREE

Create a THREE "world" -- that is it packages the boilerplate code you usually
need when setting up a THREE scene, including mouse and keyboard events.

See the [simple.html example](examples.simple.html).

### API

#### `THREE.World.create(parentElement, options, callback)`

- `parentElement` DOM element to append the 3D render canvas to.
- `options`: optional, OBJECT with:
  - `useOrbitControl` BOOLEAN, requires THREE.OrbitControls to be loaded
  - `useVR` BOOLEAN, requires THREE.VREffect and THREE.VRControls to be loaded
