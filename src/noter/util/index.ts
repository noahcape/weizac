import fs from "fs";

export const alphabet = 'abcdefghijklmnopqrstuvwxyz'

// add json data to file
export const addNote = (name: string, description: string) => {
  fs.readFile("src/noter/storage/notes.json", "utf8", (err, data) => {
    if (err) console.log(err);
    const json = JSON.parse(data);
    json.push({ name: name, description: description });
    fs.writeFile(
      "src/noter/storage/notes.json",
      JSON.stringify(json),
      (err) => {
        if (err) console.log(err);
      }
    );
  });
};

// get names of notes
export const getNoteNames = ():
  | [
      {
        name: string;
        description: string;
      }
    ]
  | string => {
  const data = fs.readFileSync("src/noter/storage/notes.json", "utf8");
  const notes: [
    {
      name: string;
      description: string;
    }
  ] = JSON.parse(data);
  if (notes.length < 1)
    return "You currently have no notes\nUse <noter write> to create a new note";
  return notes;
};

export const noteList = (): any[] => {
  const data = fs.readFileSync("src/noter/storage/notes.json", "utf8");
  const notes: [
    {
      name: string;
      description: string;
    }
  ] = JSON.parse(data);
  const list: any[] = [];

  notes.forEach(({ name, description }, index) => {
    list.push({
      name: description ? `${name}: ${description}` : name,
      value: name
    });
  });
  list.push({
    name: 'cancel',
    value: 'cancel'
  })
  return list;
};

export const removeNoteName = (noteName: string) => {
  fs.readFile("src/noter/storage/notes.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes: [
      {
        name: string;
        description: string;
      }
    ] = JSON.parse(data);
    const json = notes.filter((value) => value.name !== noteName);
    fs.writeFile(
      "src/noter/storage/notes.json",
      JSON.stringify(json),
      (err) => {
        if (err) console.log(err);
      }
    );
  });
};

export const saveNote = (name: string, content: string): void => {
  const noteName = name.replace(/ /gm, '-');
  const fileName = `src/noter/storage/${noteName}.md`
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err
  })
}

export const getNoteContents = (name: string): string | void => {
  const noteName = name.replace(/ /gm, '-');
  const fileName = `src/noter/storage/${noteName}.md`
  const data = fs.readFileSync(fileName, { encoding: 'utf8' })
  return data
}
