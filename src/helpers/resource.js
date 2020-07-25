const ResourceHelper = {
  uniqIdGenerator() {
    return new Date().getTime();
  },
  generateRandomIndex(limit = 1) {
    return Math.floor(Math.random() * Math.floor(limit));
  },
  generateRandomNumber(limit = 1, decimalPlaces = 2) {
    const num = parseFloat((Math.random() * limit).toFixed(decimalPlaces));
    return num;
  }
}

export const { uniqIdGenerator, generateRandomIndex, generateRandomNumber } = ResourceHelper;
