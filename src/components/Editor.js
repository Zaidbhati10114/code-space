import React, { lazy, useState } from "react";
import "./Editor.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml"; // same as html
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

function Editor({ displayName, language, value, onChange }) {
  function handleChange(editor, data, value) {
    onChange(value);
  }

  const [open, setOpen] = useState(true);

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      {/*top Section */}
      <div className="editor-title">
        <h1>{displayName}</h1>
        <button
          onClick={() => setOpen(prevOpen => !prevOpen)}
          className="open-close"
        >
          Open/Close
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true
        }}
      />
    </div>
  );
}

export default Editor;
