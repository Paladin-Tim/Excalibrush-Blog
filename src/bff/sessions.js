export const sessions = {
  list: {},
  create(user) {
    const hash = crypto.randomUUID();

    this.list[hash] = user;

    return hash;
  },
  remove(hash) {
    delete this.list[hash];
  },
};
