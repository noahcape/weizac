import { modules } from "./util";
import { noterOs } from "./noter";
import { timerOs } from "./timer";
import { blackJack } from './blackjack'
import * as weizac from "inquirer";


export const basicModuleCommand = () => {
  const prompt = weizac.createPromptModule();
  prompt([
    {
      type: "list",
      name: "command",
      message: "How may I help you",
      choices: [
        modules.NOTER,
        modules.TIMER,
        modules.BLACKJACK,
        modules.QUIT
      ],
    },
  ]).then(({ command }) => {
    moduleSwitch(command);
  });
};

const moduleSwitch = (command: string) => {
  switch (command) {
    case modules.NOTER: {
      console.clear();
      console.log(
        "Welcome to Note Manager, how may I help you?"
      );
      console.log(
        "Use <n help> at any time to see commands and more information about Note Manager"
      );
      return noterOs();
    }
    case modules.TIMER: {
      console.clear();
      console.log('Welcome to Timer, here you can set timers.')
      return timerOs();
    }
    case modules.BLACKJACK: {
      console.clear();
      console.log('Welcome to the casino')
      return blackJack()
    }
    case modules.QUIT: {
      return
    }
  }
};

console.clear();
console.log("Welcome to WEIZAC");
basicModuleCommand();
