import React from 'react';
import { useDispatch } from 'react-redux';
import { downloadProjectFiles } from '../services/operations/projectAPI';

const DownloadButton = ({ projectId }) => {
    const dispatch = useDispatch();

    const handleDownload = async () => {
        try {
            const response = await downloadProjectFiles(projectId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `project_${projectId}_files.zip`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading project files:', error);
        }
    };

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
        >
            Download Project Files
        </button>
    );
};

export default DownloadButton;
