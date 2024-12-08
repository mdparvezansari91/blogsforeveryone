'use client';
import React, { useState, ChangeEvent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { FaUpload, FaTrash } from 'react-icons/fa'; // Import the trash icon
import Image from 'next/image';

interface AIRequest {
  request: {
    prompt: string; // Adjust this according to the actual structure of your request
  };
  respondWith: {
    string: (callback: (signal: AbortSignal) => Promise<string>) => void;
  };
}

const TinyMCEEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // State for the image
  const [editorContent, setEditorContent] = useState<string>("Write your mind"); // State for the editor content
  const [title, setTitle] = useState<string | null>(null);

  // Handler for editor change
  const handleEditorChange = (content: string) => {
    setEditorContent(content); // Update the state with the editor content
  };

  // Handler for image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set the Base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  // Trigger the hidden file input
  const handleClick = () => {
    document.getElementById('file-input')?.click(); // Trigger the hidden file input
  };

  // Handle image deletion
  const handleImageDelete = () => {
    setImage(null); // Reset the image state
  };

  // Handle post submission
  const handlePost = async () => {
    try {
      const response = await axios.post('/api/uploadposts', { editorContent, image, title });
      console.log(response.data);
      if (response.data.success){
        setTitle(null)
        setEditorContent("write your own mind");
        setImage(null);
      }
      // Handle the response as needed
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className='border border-gray-800 w-full rounded mb-8 relative'>
        {!image ? (
          <>
            <input
              className='hidden'
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={handleClick}
              className="flex items-center justify-center w-full h-12 bg-gray-200 rounded cursor-pointer"
            >
              <FaUpload className="mr-2" /> {/* Icon */}
              Upload Image
            </button>
          </>
        ) : (
          <div className="relative">
            <Image width={900} height={300} src={image} alt="Preview" className="max-w-full h-auto" />
            <button
              onClick={handleImageDelete}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 m-2"
              title="Delete Image"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <input
        className='border font-bold text-lg box-border shadow-md placeholder:text-gray-500 w-full rounded-lg p-3 mb-4'
        type="text"
        placeholder='Title'
        onChange={(e) => { setTitle(e.target.value) }}
      />
      
      <div className="border border-gray-300 rounded-lg shadow-sm">
        <Editor
          apiKey='82iz15cx76sm1j1414w8lz9575e0xvs7hcnbf1ti5zth4g0e'
          init={{
            plugins: [
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
              'importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request: AIRequest['request'], respondWith: AIRequest['respondWith']) => {
              respondWith.string(() => Promise.reject('See docs to implement AI Assistant'));
            },
          }}
          value={editorContent}
          onEditorChange={handleEditorChange}
        />
      </div>
      
      <button onClick={handlePost} className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Post
      </button>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Content Preview:</h2>
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white" dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};

export default TinyMCEEditor;