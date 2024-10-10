"use client";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Loading from "@/src/components/loading";
import { CLIENT_API_KEY } from "@/src/config/envConfig";
import { useAddPost } from "@/src/components/hooks/post.hook";
const PostCreationModal = ({ isVisible, onClose }: any) => {
  const router = useRouter();
  const [ImgUploadLoading, setImgUploadloding] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string[] | []>([]);
  const { mutate: addPost } = useAddPost();

  const handleEditorChange = (content: any) => {
    setContent(content);
  };

  const handleImageUpload = async (e: any) => {
    setImgUploadloding(true);
    const formData = new FormData();

    formData.append("image", e);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData,
      );

      if (res.data.success) {
        const imgURL = res.data.data.url;

        setImage((prev) => [...prev, imgURL]);
        setImgUploadloding(false);
      }
    } catch (err) {
      console.log(err);
      setImgUploadloding(false);
    }
  };

  const handleSubmit = () => {
    const postData = {
      category: category,
      title: title,
      description: content,
      images: image,
    };

    addPost(postData);

    onClose();
    router.push("/profile");
    setImage([]);
    setCategory("");
    setContent("");
    setTitle("");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 font-titlefont">
      {ImgUploadLoading && <Loading />}
      <div className="bg-white relative rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-auto">
        <h2 className=" text-black text-xl  font-serif mb-4">
          Create Travel Post
        </h2>
        <p className=" text-black block mb-2 font-medium">Title:</p>
        <input
          className="w-full p-2 border text-black bg-white border-gray-300 rounded mb-4"
          placeholder="Post Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="text-black block mb-2 font-medium">Category:</p>
        <select
          className=" w-full p-2 border bg-white text-black  border-gray-300 rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select category
          </option>
          <option value="Adventure">Adventure</option>
          <option value="Business Travel">Business Travel</option>
          <option value="Exploration">Exploration</option>
        </select>

        <p className=" text-black block mb-2 font-medium">
          Write tips, guides, and stories or other
        </p>
        <Editor
          apiKey="0c045137f3yeeksdlll1a5w8y6iqxwhx1e85yyr88z0iy5yz"
          init={{
            height: 200,

            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | removeformat | help",
          }}
          value={content}
          onEditorChange={handleEditorChange}
        />
        <div className="mt-5 grid  md:grid-cols-3 gap-2 ">
          {image.map((img, index) => (
            <img
              key={index}
              alt=""
              className={`${image ? " border-dashed border-1 rounded-lg border-indigo-600 w-full h-36 p-1 " : ""} `}
              src={img}
            />
          ))}
        </div>
        <div className=" w-24 mt-5 text-sm rounded-lg cursor-pointer dark:text-gray-400 dark:placeholder-gray-400">
          <label
            className="text-xs bg-gray-600 hover:bg-gray-700 w-full duration-500 rounded-sm font-sans p-2 text-white cursor-pointer"
            htmlFor="file_input"
          >
            Upload Image
          </label>
          <input
            multiple
            className="hidden"
            id="file_input"
            type="file"
            onChange={(e) => handleImageUpload(e.target.files?.[0])}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-3 py-2 text-xs  bg-designColor opacity-80 text-white rounded hover:opacity-100 duration-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 duration-500"
            onClick={() => handleSubmit()}
          >
            Submit Post
          </button>
        </div>
        <button
          className=" absolute top-0 right-0 text-white font-bodyfont  opacity-80 hover:opacity-100 duration-500 bg-designColor px-2"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PostCreationModal;
