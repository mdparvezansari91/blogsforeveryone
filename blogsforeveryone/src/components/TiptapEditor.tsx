// src/components/TiptapEditor.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useRef } from 'react';

const TiptapEditor: React.FC = () => {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: '<p>Hello World! 🌎️</p>',
        onUpdate: ({ editor }) => {
            if (editor) {
                const json = editor.getJSON();
                console.log(json); // Use the JSON content as needed
                // Send the content to your API to save it in MongoDB
            }
        },
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && editor) {
            const reader = new FileReader();
            reader.onloadend = () => {
                editor.chain().focus().setImage({ src: reader.result as string }).run();
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                    Bold
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                    Italic
                </button>
                <button
                    onClick={handleImageUpload}
                    className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition"
                >
                    Upload Image
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <div className="border rounded-lg">
                <EditorContent editor={editor} className="p-4" />
            </div>
        </div>
    );
};

export default TiptapEditor;