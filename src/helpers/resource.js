const ResourceHelper = {
  uniqIdGenerator() {
    return new Date().getTime();
  },
  generateRandomIndex(limit = 1) {
    return Math.floor(Math.random() * Math.floor(limit));
  },
  generateRandomNumber(limit = 1, decimalPlaces = 2) {
    return parseFloat((Math.random() * limit).toFixed(decimalPlaces));
  }
}

export const { uniqIdGenerator, generateRandomIndex, generateRandomNumber } = ResourceHelper;
