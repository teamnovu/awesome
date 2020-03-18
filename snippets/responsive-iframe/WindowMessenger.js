(function (root) {
  var $selfFrame;
  var $otherFrame;
  var subs = [];

  var WindowMessenger = function (self, other) {
    $selfFrame = self;
    $otherFrame = other;

    $selfFrame.addEventListener('message', messageHandler)
  };

  var messageHandler = function (event) {
    // doesn't check origins

    // check if message is valid
    try {
      var message = JSON.parse(event.data);
    } catch (e) {
      return;
    }
    if (typeof message.topic === 'undefined') {
      return;
    }

    // check if its from other frame
    if (event.source !== $otherFrame) {
      return;
    }

    // notify subscribers
    subs.forEach(function (subscriber) {
      if (subscriber.topic === message.topic) {
        try {
          subscriber.callback(message.payload, event);
        } catch (e) {
          console.error('WindowMessenger subscriber error', e);
        }
      }
    });
  };

  WindowMessenger.prototype.pub = function (topic, payload) {
    // no origin restriction
    $otherFrame.postMessage(JSON.stringify({
      topic: topic,
      payload: payload,
    }), '*');
  };

  WindowMessenger.prototype.sub = function (topic, callback) {
    subs.push({
      topic: topic,
      callback: callback,
    })
  };

  root.WindowMessenger = WindowMessenger;
})(window);
