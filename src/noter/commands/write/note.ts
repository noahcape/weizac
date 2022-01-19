import fs from "fs";
import { openNote } from "../display/note";
import { addNote } from "../../util";

export const newNote = async (name: string, description: string) => {
  await fs.writeFile(
    `src/noter/storage/${name.replace(/ /gm, "-")}.md`,
    `# ${name}\n${description && ">"}${description}\n`,
    (err) => {
      if (err) console.log(err);
    }
  );
  openNote(name);
  addNote(name, description);
};
