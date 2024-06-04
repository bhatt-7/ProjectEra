import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../slices/projectSlice";
import axios from "axios";
import DownloadButton from "../components/DownloadButton";
import { BackgroundGradientDemo } from "../components/BackgroundGradientDemo";
import { fetchProjects } from "../services/operations/projectAPI";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
const ProjectList = () => {
    const dispatch = useDispatch();
    const { loading, projectData, error } = useSelector((state) => state.project);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 bg-red-200">Error: {error}</div>;
    }

    const handleDelete = async (projectId) => {
        // Dispatch action to delete project from frontend
        dispatch(deleteProject(projectId));
        Swal.fire({
            title: "Project Deleted ",
            text: "",
            icon: "success"
          });
        await axios
            .delete(
                `http://localhost:5000/api/users/deleteProject/${projectId}`,
                {
                    withCredentials: true,
                },
                {
                    method: "DELETE",
                }
            )
            .then((response) => {
                
                if (response.ok) {
                    
                    console.log(response);
                } else {
                    // Handle deletion error
                }
            })
            .catch((error) => {
                // Handle fetch error
            });
            
    };

    // Styles
    const styles = {
        container: {
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f4f8",
        },
        title: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#333",
        },
        flexContainer: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            width: "80%", // Adjusted width to center the items
        },
        projectCard: {
            position: "relative",
            backgroundColor: "#1E293B", // blue-gray-900
            padding: "24px",
            border: "1px solid #64748B", // blue-gray-400
            borderRadius: "8px",
            maxWidth: "320px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            cursor: "pointer",
            overflow: "hidden",
        },
        gradientBar: {
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            height: "8px",
            background: "linear-gradient(to right, #FF7E5F, #FFB88C)", // from red to orange
        },
        projectContent: {
            marginBottom: "16px",
        },
        projectTitle: {
            color: "#FFFFFF",
            fontSize: "24px",
            fontWeight: "bold",
            paddingBottom: "8px",
        },
        projectDescription: {
            color: "#A0AEC0", // cool gray
            paddingBottom: "8px",
        },
        downloadButtonContainer: {
            display: "flex",
            justifyContent: "flex-end",
        },
        fileList: {
            marginTop: "8px",
        },
        fileListTitle: {
            color: "#FFFFFF",
            fontWeight: "bold",
            marginBottom: "8px",
        },
        fileItem: {
            color: "#CBD5E0", // cool gray
            marginBottom: "4px",
        },
    };

    return (
        // <div className='flex flex-col h-screen items-center mt-8 gap-7' >
        //     <h2 >User Projects</h2>
        //     <div className='border  gap-5 p-4' >
        //         {projectData.map((project) => (
        //             // <div className='  border-2 flex flex-col '
        //             //     key={project._id}

        //             // >
        //             //     <span ></span>
        //             //     <div className='gap-7' >
        //             //         <h2 className='text-3xl'>Project: {project.name}</h2>
        //             //         <p className='mt-5'>Description: {project.description}</p>
        //             //     </div>
        //             //     <div className='mt-6 p-5 rounded-md shadow-md shadow-blue-900 flex flex-col bg-gray-600 gap-5'>
        //             //         <DownloadButton projectId={project._id} />
        //             //     <ul >
        //             //         <li className='text-white'>Project Files</li>
        //             //         {project.files.map((file) => (
        //             //             <li key={file._id} className='text-blue-300' >{file.filename}</li>
        //             //         ))}
        //             //     </ul>

        //             //     </div>
        //             //     <button className='mt-7 text-white font-bold hover:shadow-md hover:shadow-gray-400 bg-red-600 p-3 rounded-md ' onClick={() => handleDelete(project._id)}>Delete</button>
        //             // </div>

        //         ))}
        //     </div>
        // </div>

        <div className="mt-20 h-screen flex flex-col items-center gap-7 ">
            <h1 className="text-[#103559] text-2xl font-semibold ">
                Published Projects
            </h1>
            <div className="bg-black "></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-xl gap-6">
                {projectData.map((items, index) => {
                    return (
                        <div key={index} class="max-w-2xl mx-auto">
                            <div class=" shadow-xl shadow-indigo-900 border border-gray-200 rounded-lg max-w-sm h-[100%] p-5 bg-[white] ">
                                <a href="#">
                                    <img class="rounded-t-lg" src={items.img} alt="" />
                                </a>
                                <div class="p-5">
                                    <a href="#">
                                        <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                                            {items.name}
                                        </h5>
                                    </a>
                                    <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">
                                        {items.description}
                                    </p>
                                    
                                </div>
                            <div className="mt-6 p-5 rounded-md shadow-md shadow-blue-900 flex flex-col bg-gray-600 gap-5">
                                <DownloadButton projectId={items._id} />
                                <ul>
                                    <li className="text-white">Project Files</li>
                                    {items.files.map((file) => (
                                        <li key={file._id} className="text-blue-300">
                                            {file.filename}
                                        </li>
                                    ))}
                                </ul>
                           
                            </div>
                            <button className="bg-red-600 text-white flex items-center gap-2 hover:shadow-md transition-all duration-200 hover:shadow-black mt-6 rounded-md p-3" onClick={() => {handleDelete(items._id) }}>Delete Project <RiDeleteBin5Fill />
</button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectList;
