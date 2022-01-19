import { exec } from 'child_process';
import { getNoteNames } from '../../util'

export const displayNoteNames = () => {
  console.log(getNoteNames())
}

export const openNote = (name: string) => {
  const noteName = name.replace(/ /gm, '-');
  const fileName = `src/noter/storage/${noteName}.md`
  exec(`open -a typora ${fileName}`, { shell: '/bin/bash' }, (error) => {
    if (error) console.log(error)
  });
}