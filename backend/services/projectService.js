let projects=require('../data/projectData')

const getAllProjects=()=>projects;

const getProjectById=(id)=>projects.find(project=>project.id===id)

const addProject=( name, description , status)=>{
    const newProject={
        id:projects.length+1,
        name,
        description ,
        status
    };
    projects.push(newProject);
    return newProject
};


const deleteProject=(id)=>{
    const initialLength=projects.length;
    projects=projects.filter(project=>project.id!==id);
    return projects.length<initialLength;
}

const updateProject=(id, updatedData)=>{
    const projectIndex=projects.findIndex(project=>project.id===id);
    if(projectIndex===-1) return null;
    const updatedProject={...projects[projectIndex], ...updatedData};
    projects[projectIndex]=updatedProject;
    return updatedProject;
}

module.exports={
    getAllProjects,
    getProjectById,
    addProject,
    deleteProject,
    updateProject,
}