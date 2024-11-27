import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createProject } from './actions/projectActions';
import { setProjectData } from '../../slices/projectSlice';
import { uploadProject } from '../../services/operations/projectAPI';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from "sweetalert2"
const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  //const {setProject} = useSelector((state)=>state.project)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    files.forEach((file) => {
      formData.append('files', file);
    });
    console.log(formData)
    dispatch(uploadProject(formData,navigate));
    Swal.fire({
      title: "Good job!",
      text: "Project Published ",
      icon: "success"
    });
    navigate("/project")
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-6">Create Project Form</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="files">
          Upload Files:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="files"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit" 
onClick={()=>{ "" }}
        >
          Create Project
        </button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
