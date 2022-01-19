import * as timer from "inquirer"
import { basicModuleCommand } from "..";
import { sleep } from "../util";
import * as clocks from './clocks'

export const timerOs = () => {
  console.clear()
  const prompt = timer.createPromptModule();
  prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Select a command',
      choices: [
        'Start a timer',
        'quit'
      ]  
    }
  ])
  .then(async ({command}) => {
    switch (command) {
      case 'Start a timer': {
          prompt([
            {
              type: 'input',
              name: 'minutes',
              message: 'Minutes: '
            }
          ])
          .then(({ minutes }) => {
            return prompt([
              {
                type: 'input',
                name: 'seconds',
                message: 'Seconds: '
              }
            ])
            .then(async ({ seconds }) => {
              await sleep(200);
              return clocks.minuteSeconds(parseInt(minutes), parseInt(seconds))
            })
          })
        break;
      }
      case 'quit': {
        console.log("goodbye");
        console.clear();
        return basicModuleCommand();
      }
    }
  })
}
