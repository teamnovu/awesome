responsive-iframe
=================
This how you can make an iframe responsive.
It solves the problem with where the height of the inner frame content is not applied to the iframe.

The inner frame updates the outer frame with postMessage about its height.

The `WindowMessenger.js` is a wrapper class for the messaging with postMessage.

See [out-frame.html](./out-frame.html) as example of a page implementing the responsive iframe.
