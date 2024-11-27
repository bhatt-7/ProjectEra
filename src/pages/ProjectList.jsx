// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteProject } from "../slices/projectSlice";
// import axios from "axios";
// import DownloadButton from "../components/DownloadButton";
// import { BackgroundGradientDemo } from "../components/BackgroundGradientDemo";
// import { fetchProjects } from "../services/operations/projectAPI";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import Swal from "sweetalert2";
// const ProjectList = () => {
//     const dispatch = useDispatch();
//     const { loading, projectData, error } = useSelector((state) => state.project);

//     useEffect(() => {
//         dispatch(fetchProjects());
//     }, [dispatch]);

//     if (loading) {
//         return <div className="p-4">Loading...</div>;
//     }

//     if (error) {
//         return <div className="p-4 bg-red-200">Error: {error}</div>;
//     }

//     const handleDelete = async (projectId) => {
//         // Dispatch action to delete project from frontend
//         dispatch(deleteProject(projectId));
//         Swal.fire({
//             title: "Project Deleted ",
//             text: "",
//             icon: "success"
//         });
//         await axios
//             .delete(
//                 `http://localhost:5000/api/users/deleteProject/${projectId}`,
//                 {
//                     withCredentials: true,
//                 },
//                 {
//                     method: "DELETE",
//                 }
//             )
//             .then((response) => {

//                 if (response.ok) {

//                     console.log(response);
//                 } else {
//                     // Handle deletion error
//                 }
//             })
//             .catch((error) => {
//                 // Handle fetch error
//             });

//     };

//     // Styles
//     const styles = {
//         container: {
//             padding: "16px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#f0f4f8",
//         },
//         title: {
//             fontSize: "24px",
//             fontWeight: "bold",
//             marginBottom: "16px",
//             color: "#333",
//         },
//         flexContainer: {
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             gap: "24px",
//             width: "80%", // Adjusted width to center the items
//         },
//         projectCard: {
//             position: "relative",
//             backgroundColor: "#1E293B", // blue-gray-900
//             padding: "24px",
//             border: "1px solid #64748B", // blue-gray-400
//             borderRadius: "8px",
//             maxWidth: "320px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//             cursor: "pointer",
//             overflow: "hidden",
//         },
//         gradientBar: {
//             position: "absolute",
//             left: "0",
//             right: "0",
//             bottom: "0",
//             height: "8px",
//             background: "linear-gradient(to right, #FF7E5F, #FFB88C)", // from red to orange
//         },
//         projectContent: {
//             marginBottom: "16px",
//         },
//         projectTitle: {
//             color: "#FFFFFF",
//             fontSize: "24px",
//             fontWeight: "bold",
//             paddingBottom: "8px",
//         },
//         projectDescription: {
//             color: "#A0AEC0", // cool gray
//             paddingBottom: "8px",
//         },
//         downloadButtonContainer: {
//             display: "flex",
//             justifyContent: "flex-end",
//         },
//         fileList: {
//             marginTop: "8px",
//         },
//         fileListTitle: {
//             color: "#FFFFFF",
//             fontWeight: "bold",
//             marginBottom: "8px",
//         },
//         fileItem: {
//             color: "#CBD5E0", // cool gray
//             marginBottom: "4px",
//         },
//     };

//     return (
//         <div className="mt-20 h-screen flex flex-col items-center gap-7 ">
//             <h1 className="text-[#103559] text-2xl font-semibold ">
//                 Published Projects
//             </h1>
//             <div className="bg-black "></div>
//             <div className="flex flex-wrap justify-center space-x-6 overflow-scroll">
//                 {projectData.map((items, index) => {
//                     return (
//                         <div key={index} class="max-w-2xl mx-auto">
//                             <div class=" shadow-xl shadow-indigo-900 border border-gray-200 rounded-lg max-w-sm h-[100%] p-5 bg-[white] w-[300px] ">
//                                 <a href="#">
//                                     <img class="rounded-t-lg" src={items.img} alt="" />
//                                 </a>
//                                 <div class="p-5">
//                                     <a href="#">
//                                         <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
//                                             {items.name}
//                                         </h5>
//                                     </a>
//                                     <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">
//                                         {items.description}
//                                     </p>

//                                 </div>
//                                 <div className="mt-6 p-5 rounded-md shadow-md shadow-blue-900 flex flex-col bg-gray-600 gap-5">
//                                     <DownloadButton projectId={items._id} />
//                                     <ul>
//                                         <li className="text-white">Project Files</li>
//                                         {items.files.map((file) => (
//                                             <li key={file._id} className="text-blue-300">
//                                                 {file.filename}
//                                             </li>
//                                         ))}
//                                     </ul>

//                                 </div>
//                                 <button className="bg-red-600 text-white flex items-center gap-2 hover:shadow-md transition-all duration-200 hover:shadow-black mt-6 rounded-md p-3" onClick={() => { handleDelete(items._id) }}>Delete Project <RiDeleteBin5Fill />
//                                 </button>
//                             </div>

//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ProjectList;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../slices/projectSlice";
import axios from "axios";
import DownloadButton from "../components/DownloadButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { fetchProjects } from "../services/operations/projectAPI";

const ProjectList = () => {
    const dispatch = useDispatch();
    const { loading, projectData, error } = useSelector((state) => state.project);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-600">
                Loading projects...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                Error: {error}
            </div>
        );
    }

    const handleDelete = async (projectId) => {
        // Confirmation before deletion
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            dispatch(deleteProject(projectId));

            try {
                await axios.delete(`http://localhost:5000/api/users/deleteProject/${projectId}`, {
                    withCredentials: true
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Your project has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Could not delete the project.",
                    icon: "error"
                });
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                My Projects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectData.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaK4UVnECoCkNrICKZKjn5TeJg7ExLvGNWwg&s" || '/placeholder-image.png'}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Project Details */}
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                                {project.name}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {project.description}
                            </p>

                            {/* Files Section */}
                            <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    Project Files
                                </h3>
                                <ul className="space-y-2">
                                    {project.files.map((file) => (
                                        <li
                                            key={file._id}
                                            className="text-sm text-gray-600 flex items-center"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2 text-blue-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {file.filename}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <DownloadButton
                                    projectId={project._id}
                                    className="flex-grow bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                                />
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    <RiDeleteBin5Fill className="mr-2" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;