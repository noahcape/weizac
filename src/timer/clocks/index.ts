import { printNumbers, countDown } from '../util'
import { sleep } from '../../util'
import { timerOs } from '..'
import { spawn } from 'child_process'

export const minuteSeconds = async (minutes: number, seconds: number) => {
  let mTens: number = Math.floor(minutes / 10)
  let mOnes: number = minutes % 10
  let sTens: number = Math.floor(seconds / 10);
  let sOnes: number = seconds % 10;

  for (let i = seconds; i >= 0; i--) {
    console.clear()
    printNumbers(mTens, mOnes, sTens, sOnes)
    console.log()
    const newSeconds = countDown(sTens, sOnes)
    sTens = newSeconds[0]
    sOnes = newSeconds[1]
    await sleep(1000);
  }
  if (minutes === 0) {
    await sleep(500)
    console.log('DONE 👋')
    spawn('afplay src/timer/sounds/timerDone.mp3', { shell: '/bin/bash' })
    await sleep(4000)
    return timerOs()
  }
  minuteSeconds(minutes - 1, 60)
}