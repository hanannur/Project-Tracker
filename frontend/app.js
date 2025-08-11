const API_URL="http://localhost:3000/api/projects"


document.getElementById("addProject").addEventListener("click", addProject);

async function loadProjects() {
    const res=await fetch(API_URL);
    const projects=await res.json();
    const list=document.getElementById("projectList");
    list.innerHTML="";
    projects.forEach(project => {
        const li=document.createElement("li");
        li.textContent=`Project Name: ${project.name} - Project Description: ${project.description} - Project Status:${project.status}`;
        list.appendChild(li);
    });

    
}

async function addProject() {
    const name=document.getElementById("name").value;
    const description=document.getElementById("description").value;
    const status=document.getElementById("status").value;

    if(!name || !description || !status) {
        alert("Please fill in all fields");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description, status })
    });

        document.getElementById("name").value="";
        document.getElementById("description").value="";
        document.getElementById("status").value="";
        loadProjects()

    } 
    loadProjects()