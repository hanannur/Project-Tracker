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

        


         const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "10px";
        editBtn.addEventListener("click", () => {
              li.innerHTML = "";

            // Create input fields with current values
            const nameInput = document.createElement("input");
            nameInput.value = project.name;

            const descInput = document.createElement("input");
            descInput.value = project.description;

            const statusInput = document.createElement("input");
            statusInput.value = project.status;


            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.style.marginLeft = "10px";

            saveBtn.addEventListener("click", async () => {
                const updatedProject = {
                    name: nameInput.value,
                    description: descInput.value,
                    status: statusInput.value
                };

                await fetch(`${API_URL}/${project.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedProject)
                });

                loadProjects(); // Refresh list
            });

            // Cancel Button
            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.style.marginLeft = "5px";
            cancelBtn.addEventListener("click", () => {
                loadProjects(); // Re-render original view
            });

            // Add inputs and buttons to list item
            li.appendChild(nameInput);
            li.appendChild(descInput);
            li.appendChild(statusInput);
            li.appendChild(saveBtn);
            li.appendChild(cancelBtn);
        });


            
        

         const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "5px";
        deleteBtn.addEventListener("click", async () => {
            const confirmed = confirm(`Are you sure you want to delete "${project.name}"?`);
            if (confirmed) {
                await fetch(`${API_URL}/${project.id}`, {
                    method: "DELETE"
                });
                loadProjects();
            }
        });
         li.appendChild(editBtn);
        li.appendChild(deleteBtn);




        list.appendChild(li);
    });
}

async function addProject() {
    const name=document.getElementById("name").value;
    const description=document.getElementById("description").value;
    const status=document.getElementById("status").value;

    if(!name || !description || !status) {
        alert("Please fill  all fields");
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