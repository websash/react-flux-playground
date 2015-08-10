import { EventEmitter } from 'events';

export function createStore(spec) {
  const emitter = new EventEmitter();
  emitter.setMaxListeners(0);

  return Object.assign(spec, {
    emitChange() {
      emitter.emit('change');
    },

    addChangeListener(callback) {
      emitter.on('change', callback);
    },

    removeChangeListener(callback) {
      emitter.removeListener('change', callback);
    }
  });
}
