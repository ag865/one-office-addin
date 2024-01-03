/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState } from "react";
import insertText from "../office-document";

const TextInsertion = () => {
  const [text, setText] = useState("Some text.");

  const handleTextInsertion = async () => {
    await insertText(text);
  };

  const handleTextChange = async (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      {/* <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the document.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button> */}
    </div>
  );
};

export default TextInsertion;
