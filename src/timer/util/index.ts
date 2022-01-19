const numbers = {
  ZERO: () => [
    ('.____.'),
    ('|    |'),
    ('|    |'),
    ('|    |'),
    ('|____|')
  ],
  ONE: () => [
    ('  ..  '),
    (' /||  '),
    ('  ||  '),
    ('  ||  '),
    ('__||__')
  ],
  TWO: () => [
    ('.____ '),
    ('     |'),
    ('.____|'),
    ('|     '),
    ('|____.')
  ],
  THREE: () => [
    ('_____.'),
    ('     |'),
    (' ____|'),
    ('     |'),
    ('_____|')
  ],
  FOUR: () => [
    ('.    .'),
    ('|    |'),
    ('|____|'),
    ('     |'),
    ('     |')
  ],
  FIVE: () => [
    ('.____.'),
    ('|     '),
    ('|____.'),
    ('     |'),
    ('.____|')
  ],
  SIX: () => [
    ('.____.'),
    ('|     '),
    ('|____.'),
    ('|    |'),
    ('|____|')
  ],
  SEVEN: () => [
    ('______'),
    ('     /'),
    ('    / '),
    ('   /  '),
    ('  /   ')
  ],
  EIGHT: () => [
    ('.____.'),
    ('|    |'),
    ('|____|'),
    ('|    |'),
    ('|____|')
  ],
  NINE: () => [
    ('.____.'),
    ('|    |'),
    ('|____|'),
    ('     |'),
    ('.____|')
  ]
}

export const numbersOrder: {
  [index: number]: () => string[]
} = {
  0: numbers.ZERO,
  1: numbers.ONE,
  2: numbers.TWO,
  3: numbers.THREE,
  4: numbers.FOUR,
  5: numbers.FIVE,
  6: numbers.SIX,
  7: numbers.SEVEN,
  8: numbers.EIGHT,
  9: numbers.NINE
}

export const printNumbers = (mTens: number, mOnes: number, sTens: number, sOnes: number): void => {
  console.log('+-----------------------------------+')
  for (let n = 0; n <= 4; n++) {
    console.log(`| ${numbersOrder[mTens]()[n]}  ${numbersOrder[mOnes]()[n]} ${n === 1 || n === 3 ? '.' : ' '}  ${numbersOrder[sTens]()[n]}   ${numbersOrder[sOnes]()[n]} |`)
  }
  console.log('+-----------------------------------+')
}

export const countDown = (tens: number, ones: number): number[] => {
  let tempTens = tens
  let tempOnes = ones
  if (tempOnes === 0)  {
    tempOnes = 9
    tempTens !== 0 ? tempTens-- : null
  } else {
    tempOnes--
  }
  return [tempTens, tempOnes]
}