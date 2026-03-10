import { onEscKeydown } from '../common/utils';

export default class KeyboardManager {
  #handlers = new Map();

  addEscHandler(id, handler) {
    const newHandler = (evt) => {
      onEscKeydown(evt, handler);
    };

    this.#handlers.set(id, newHandler);
    document.addEventListener('keydown', newHandler);

    return newHandler;
  }

  removeEscHandler(id) {
    const handler = this.#handlers.get(id);

    if (handler) {
      document.removeEventListener('keydown', handler);
      this.#handlers.delete(id);
    }
  }

  clearHandlers() {
    this.#handlers.forEach((handler) => {
      document.removeEventListener('keydown', handler);
    });

    this.#handlers.clear();
  }
}
