export default class AdapterService {
  adaptToServer(data) {
    return this.#objectToSnakeCase(data);
  }

  adaptToClient(data) {
    return this.#objectToCamelCase(data);
  }

  #toSnakeCase(key) {
    return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  #toCamelCase(key) {
    return key.replace(/_([A-z])/g, (_, letter) => letter.toUpperCase());
  }

  #convertKeys(data, convertFunction) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [convertFunction(key), value]),
    );
  }

  #objectToSnakeCase(data) {
    return this.#convertKeys(data, this.#toSnakeCase);
  }

  #objectToCamelCase(data) {
    return this.#convertKeys(data, this.#toCamelCase);
  }
}
