'use strict';

import Debug from 'debug';
import videojs from 'video.js';

import IOV from '~/iov/IOV';

const Component = videojs.getComponent('Component');

export default class MqttHandler extends Component {
  constructor (source, tech, conduits, options) {
    super(tech, options.mqtt);

    this.debug = Debug('skyline:clsp:plugin:MqttHandler');
    this.debug('constructor');

    this.destroyed = false;

    this.tech_ = tech;
    this.source_ = source;

    // @todo - is there a better way to do this where we don't pollute the
    // top level namespace?  does it matter?
    this.iov = null;
    this.conduits = conduits;
  }

  createIOV (player, options) {
    this.debug('createIOV');

    this.updateIOV(IOV.fromUrl(
      this.source_.src,
      this.conduits,
      player,
      {},
      options,
    ));

    this.iov.initialize();
  }

  updateIOV (iov) {
    this.debug('updateIOV');

    if (this.iov) {
      // If the IOV is the same, do nothing
      if (this.iov.id === iov.id) {
        return;
      }

      this.iov.destroy();
    }

    this.iov = iov;
  }

  destroy () {
    this.debug('destroying...');

    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    this.iov.destroy();
    // @todo - do we need to destroy conduits?

    this.dispose();

    this.debug = null;
    this.tech_ = null;
    this.source_ = null;
    this.iov = null;
    this.conduits = null;
  }
};
