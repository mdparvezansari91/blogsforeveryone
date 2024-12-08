// src/components/TiptapEditor.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useRef, useState } from 'react';
import axios from 'axios'; // Import axios for making API calls

const TiptapEditor: React.FC = () => {
    const editor = useEditor({
        extensions: [StarterKit, Image], // Only use StarterKit
        content: '<p>Hello World! 🌎️</p>',
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [saving, setSaving] = useState(false); // State to track saving status
    const [title, setTitle] = useState(''); // State for the title

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

    const handlePost = async () => {
        if (editor) {
            const json = editor.getJSON(); // Get the editor content in JSON format
            setSaving(true); // Set saving state to true
            console.log(json);
            try {
                const response = await axios.post('/api/uploadposts', { title, content: json });
                console.log(response.data); // Handle the response as needed
            } catch (error) {
                console.error("Error saving content:", error);
            } finally {
                setSaving(false); // Reset saving state
            }
        }
    };

    return (
        <>
        <div className="p-4 bg-white rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 w-full p-2 border rounded"
            />
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                    Bold
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue- 600 transition"
                >
                    Italic
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()} // Toggle bullet list using StarterKit
                    className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                >
                    Bullet List
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
                <button
                    onClick={handlePost}
                    className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded hover:bg-purple-600 transition"
                >
                    Post
                </button>
            </div>
            <div className="border rounded-lg">
                <EditorContent editor={editor} className="p-4" />
            </div>
            {saving && <p>Saving...</p>}
        </div>
        <div>
            {"hello"}
        </div>
        </>
    );
};

export default TiptapEditor;