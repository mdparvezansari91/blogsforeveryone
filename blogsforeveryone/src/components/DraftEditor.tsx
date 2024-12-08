// components/DraftEditor.tsx
'use client'
import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onEditorStateChange}
      />
    </div>
  );
};

export default DraftEditor;