// weizac commands
export const modules = {
  NOTER: 'noter',
  TIMER: 'timer',
  BLACKJACK: 'blackjack',
  QUIT: 'quit'
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}