const INITIAL_ID = 0;

class AutoIncrementIdGenerator {
  private currentId: number;

  constructor() {
    this.currentId = INITIAL_ID;
  }

  nextId() {
    return String(++this.currentId);
  }

  resetId() {
    this.currentId = INITIAL_ID;
  }
}

export const autoIncrementIdGenerator = new AutoIncrementIdGenerator();

export default autoIncrementIdGenerator;
