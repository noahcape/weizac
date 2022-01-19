import fs from 'fs-extra'
import { removeNoteName } from '../../util'

export const deleteNote = (note: string) => {
  const noteName = note.replace(/ /gm, '-')
  const fileName = `src/noter/storage/${noteName}.md`

  fs.remove(fileName, (err) => {
    if (err) console.log(err);
    removeNoteName(note)
  })
}