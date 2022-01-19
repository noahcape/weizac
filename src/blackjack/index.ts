import casino from "inquirer";
import { basicModuleCommand } from "../index";
import { Blackjack } from "./Blackjack";
import { Card } from "./Card";

export const blackJack = () => {
  const prompt = casino.createPromptModule();
  prompt([
    {
      type: "confirm",
      name: "play",
      message: "Ready to play a game of 21",
    },
  ]).then(({ play }) => {
    if (play) {
      const game = new Blackjack();
      playerTurn(game);
    } else {
      console.log("goodbye");
      console.clear();
      return basicModuleCommand();
    }
  });
};

const hitStaySplit = (player: Card[]): Promise<string> => {
  const prompt = casino.createPromptModule();

  const choices =
    (player[0] as Card).getValue() === (player[1] as Card).getValue()
      ? ["HIT", "STAY", "SPLIT"]
      : ["HIT", "STAY"];
  return prompt([
    {
      type: "list",
      name: "move",
      message: "Your move, what will you do",
      choices,
    },
  ]).then(({ move }) => move);
};

const playerTurn = async (game: Blackjack): Promise<any> => {
  // should tell us if someone has split
  if (game.getSplitState()) {
    return console.log(game.player);
  }

  if (game.getHandValue(game.player as Card[]) > 21) {
    console.log("YOU BUSTED");
    console.log(
      `YOU: ${game.getPlayer()}  ${game.getHandValue(
        game.player as Card[]
      )}\nDEALER: ${game.getDealerDone()}  ${game.getHandValue(game.dealer)}`
    );
    return blackJack();
  } else {
    console.log(
      `YOU: ${game.getPlayer()}  <<${game.getHandValue(
        game.player as Card[]
      )}>>\nDEALER: ${game.getDealer()}`
    );
    switch (await hitStaySplit(game.player as Card[])) {
      case "HIT": {
        game.hitPlayer(0);
        return playerTurn(game);
      }
      case "STAY": {
        game.playOutDealer();
        console.log(
          `YOU: ${game.getPlayer()}  ${game.getHandValue(
            game.player as Card[]
          )}\nDEALER: ${game.getDealerDone()}  ${game.getHandValue(
            game.dealer
          )}`
        );
        return blackJack();
      }
      case "SPLIT": {
        game.split();
        return playerTurn(game);
      }
    }
  }
};

/**
 * method that plays out one hand in a void
 * no matter split or stay or hit just one hand is being played out.
 * because we know if someone has split we can then look through their hand
 */
