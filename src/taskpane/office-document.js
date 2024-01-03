/* global Word Excel console Office */

const insertText = async (text) => {
  const tag = `{{${text}}}`;

  if (Office.context.host === Office.HostType.Excel) {
    try {
      await Excel.run(async (context) => {
        // let sheet = context.workbook.worksheets.getActiveWorksheet();
        let range = context.workbook.getSelectedRange();

        range.values = [
          [text]
        ];
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // Write text to Workbook.

  if (Office.context.host === Office.HostType.Word) {
    // Write text to the document.
    try {
      await Word.run(async (context) => {
        let location = context.document.getSelection();
        // Apply formatting to the selected range

        let range = location.insertText(text, Word.InsertLocation.replace);
        range.font.size = 16; // Set font size to 16pt
        range.font.color = "red";
        await context.sync();
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  }
};

export default insertText;