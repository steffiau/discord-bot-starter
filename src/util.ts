const getRandomIndex = (max: number) => Math.floor(Math.random() * (max + 1));

export const getRandomMsg = (msgs: string[]) =>
  msgs[getRandomIndex(msgs.length - 1)];
