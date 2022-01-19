export const help = () => {
  console.log(
    "Note Manager is a CLI to allow you to store, write, find, and edit notes"
  );
  console.log("Currently we support the following commands");
  console.log("\t<open>: open a note in Typora");
  console.log("\t<edit>: edit note in nano, cannot preview markdown");
  console.log("\t<delete>: delete a note");
  console.log("\t<write>: allow you to create a new note");
  console.log("\t<quit>: quitt noter");
  console.log("\tand obviously <help>");
};
