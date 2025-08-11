const projectService=require('../services/projectService')

const getAll=(req,res)=>{
    const result=projectService.getAllProjects();
    res.json(result);
}

const getOne=(req,res)=>{
    const id=parseInt(req.params.id);
    const project=projectService.getProjectById(id);
    if (!project) return res.status(404).json({message:'Project not found'});
    res.json(project)
}

const create=(req,res)=>{
    const{ name ,description , status}=req.body;
    if(!name||!description||!status) return res.status(400).json({message:"Data Missed"});

    const newProject=projectService.addProject( name , description , status);
    res.status(201).json(newProject);
}

const remove=(req, res)=>{
    const id = parseInt(req.params.id);
    const deleted=projectService.deleteProject(id);
    if(!deleted) return res.status(404).json({message:"Project not found"});
    res.json ({message:"Project deleted"});
};

const update=(req, res)=>{
    const id = parseInt(req.params.id);
    const updatedData=req.body;
    const updatedProject=projectService.updateProject(id, updatedData);
    if(!updatedProject) return res.status(404).json({message:"Project not found"});
    res.json(updatedProject);
}
module.exports={
    getAll,
    getOne,
    create,
    remove,
    update,
}