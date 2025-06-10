let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage or initialize an empty array if none exist 
        let editIndex = null; // Variable to store the index of the task being edited
    
        const taskForm = document.getElementById('taskForm'); // Get the task form element from the DOM
        const taskTitle = document.getElementById('taskTitle'); // Get the task title input element
        const taskCategory = document.getElementById('taskCategory'); // Get the task category input element
        const taskPriority = document.getElementById('taskPriority'); // Get the task priority input element
        const taskDeadline = document.getElementById('taskDeadline'); // Get the task deadline input element
        const taskBody = document.getElementById('taskBody'); // Get the table body element where tasks will be displayed
    
        // Render tasks to the table
        function renderTasks() {
            taskBody.innerHTML = ''; // Clear the existing content in the table body
            tasks.forEach((task, index) => { // Loop through each task in the tasks array
                const row = document.createElement('tr'); // Create a new table row for each task
    
                const titleCell = document.createElement('td'); // Create a table cell for the task title
                titleCell.textContent = task.title; // Set the cell content to the task's title
                titleCell.title = task.title;
                
                row.appendChild(titleCell); // Append the title cell to the row
                
                const categoryCell = document.createElement('td'); // Create a table cell for the task category
                categoryCell.textContent = task.category; // Set the cell content to the task's category
                categoryCell.title = task.category;
                row.appendChild(categoryCell); // Append the category cell to the row
                
                const priorityCell = document.createElement('td'); // Create a table cell for the task priority
                // priorityCell.textContent = task.priority; // Set the cell content to the task's priority
                const priorityBadge = document.createElement('span');
                priorityBadge.textContent = task.priority;
                priorityBadge.className = `priority-badge ${task.priority.toLowerCase()}`;
                priorityCell.appendChild(priorityBadge);
                priorityCell.title = task.priority;
                row.appendChild(priorityCell); // Append the priority cell to the row
                
                const deadlineCell = document.createElement('td'); // Create a table cell for the task deadline
                deadlineCell.textContent = task.deadline; // Set the cell content to the task's deadline
                deadlineCell.title = task.deadline;
                row.appendChild(deadlineCell); // Append the deadline cell to the row
                
                const actionsCell = document.createElement('td'); // Create a table cell for the action buttons
                const editBtn = document.createElement('button'); // Create an "Edit" button
                editBtn.className = 'edit-btn'; // Add a class to the edit button for styling
                // editBtn.textContent = 'Edit'; // Set the button text to "Edit" "
                editBtn.innerHTML = '<i class="fas fa-edit"></i><span class="btn-label">Edit</span>';
                editBtn.onclick = () => editTask(index); // Set the click event to trigger task editing
    
                const deleteBtn = document.createElement('button'); // Create a "Delete" button
                deleteBtn.className = 'delete-btn'; // Add a class to the delete button for styling
                // deleteBtn.textContent = 'Delete'; // Set the button text to "Delete"
                deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i><span class="btn-label"> Delete</span>';
                deleteBtn.onclick = () => deleteTask(index); // Set the click event to trigger task deletion
    
                actionsCell.appendChild(editBtn); // Append the edit button to the actions cell
                actionsCell.appendChild(deleteBtn); // Append the delete button to the actions cell
                row.appendChild(actionsCell); // Append the actions cell to the row
    
                taskBody.appendChild(row); // Append the row to the table body
            });
        }
    
        // Add or update task (handles task creation or editing)
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the default form submission behavior
            const title = taskTitle.value.trim(); // Get and trim the task title input value
            const category = taskCategory.value.trim(); // Get and trim the task category input value
            const priority = taskPriority.value; // Get the selected task priority
            const deadline = taskDeadline.value; // Get the selected task deadline

            if (!title || !category || !priority || !deadline) return; // Exit if any field is empty

            const newTask = { title: title, category: category, priority: priority, deadline: deadline }; // Create a new task object

            if (editIndex === null) {
                // Add new task (if no task is currently being edited)
                tasks.push(newTask); // Add the new task to the tasks array
            } else {
                // Update existing task (if editing a task)
                tasks[editIndex] = newTask; // Replace the task at the edit index with the new data
                editIndex = null; // Reset the edit index after updating
            }

            saveTasks(); // Save tasks to localStorage
            renderTasks(); // Re-render the tasks list
            taskForm.reset(); // Reset the form fields
        });

        function editTask(index) {
            editIndex = index; // Set the index of the task to be edited
            const task = tasks[index]; // Retrieve the task data from the tasks array
            taskTitle.value = task.title; // Populate the form with the task title
            taskCategory.value = task.category; // Populate the form with the task category
            taskPriority.value = task.priority; // Populate the form with the task priority
            taskDeadline.value = task.deadline; // Populate the form with the task deadline
        }

        function deleteTask(index) {
            tasks.splice(index, 1); // Remove the task at the specified index from the tasks array
            saveTasks(); // Save the updated tasks list to localStorage
            renderTasks(); // Re-render the tasks list to reflect the deletion
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks array as a JSON string in localStorage
        }

        // Initial render (load and display tasks on page load) 
        renderTasks();