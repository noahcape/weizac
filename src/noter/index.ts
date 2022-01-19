import * as commands from "./commands";
import * as noter from "inquirer";
import { noteList, getNoteContents, saveNote } from './util'
import { sleep } from '../util'
import { basicModuleCommand } from "../index";

export const noterOs = () => {
  const prompt = noter.createPromptModule();
  prompt([
    {
      type: 'list',
      name: 'command',
      message: 'What would you like to do?',
      choices: [
        commands.commandOptions.START_NOTE,
        commands.commandOptions.DELETE_NOTE,
        commands.commandOptions.EDIT_IN_TERMINAL,
        commands.commandOptions.OPEN_NOTE,
        commands.commandOptions.HELP,
        commands.commandOptions.QUIT
      ]
    }
  ])
  .then(async ({ command }) => {
    switch (command) {
      case commands.commandOptions.START_NOTE: {
        prompt([
          {
            type: "input",
            name: "name",
            message: "What would you like to name your note?",
          },
          {
            type: "input",
            name: "description",
            message: "Optionally add a short description to your note:",
            default: () => {
              return;
            }
          },
        ]).then(async ({ name, description }) => {
          commands.writeCommands.newNote(name, description);
          await sleep(2000);
          return noterOs()
        });
        break;
      }
      case commands.commandOptions.OPEN_NOTE: {
        if (noteList().length === 0) {
          console.log('Sorry, it looks like you currently have no notes.')
          await sleep(2000);
          return noterOs()
        }
        prompt([
          {
            type: 'list',
            name: 'name',
            message: 'select a note to open',
            choices: noteList(),
          }
        ])
        .then(async ({ name }) => {
          if (name !== 'cancel') {
            commands.displayCommands.openNote(name)
            await sleep(2000)
            return noterOs()
          }
          return noterOs()
        })
        break;
      }
      case commands.commandOptions.DELETE_NOTE: {
        prompt([
          {
            type: 'list',
            name: 'name',
            message: 'which note would you like to delete',
            choices: noteList(),
          }
        ])
        .then(async ({ name }) => {
          if (name !== 'cancel') {
            return prompt([
              {
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure you want to delete <${name}>?`,
                default: () => {
                  return true
                }
              }
            ])
            .then(async ({ confirm }) => {
              confirm && commands.deleteCommands.deleteNote(name)
              return noterOs()
            })
          }
          return noterOs()
        })
        break;
      }
      case commands.commandOptions.EDIT_IN_TERMINAL: {
        if (noteList().length === 0) {
          console.log('Sorry, it looks like you currently have no notes.')
          await sleep(2000);
          return noterOs()
        }
        prompt([
          {
            type: 'list',
            name: 'name',
            message: 'select a note to open',
            choices: noteList(),
          }
        ])
        .then(async ({ name }) => {
          if (name !== 'cancel') {
            return prompt([
              {
                type: 'editor',
                name: 'note',
                message: 'Edit your note',
                default: () => {
                  return getNoteContents(name)
                }
              }
            ])
            .then(({ note }) => {
              saveNote(name, note)
              return noterOs()
            })
          }
          return noterOs()
        })
        break;
      }
      case commands.commandOptions.HELP: {
        commands.help();
        await sleep(2000);
        return noterOs()
      }
      case commands.commandOptions.QUIT: {
        console.log("goodbye");
        console.clear();
        basicModuleCommand();
        break;
      }
      default: {
        console.log(
          "That command cannot be found"
        );
        await sleep(2000);
        return noterOs()
      }
    }
  }) 
}
