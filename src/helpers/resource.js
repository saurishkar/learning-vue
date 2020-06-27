const ResourceHelper = {
  uniqIdGenerator() {
    return new Date().getTime();
  }
}

export const { uniqIdGenerator } = ResourceHelper;
