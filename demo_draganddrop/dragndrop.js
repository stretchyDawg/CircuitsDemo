document.addEventListener('DOMContentLoaded', function () {
    const undoButton = document.getElementById('undo-button');
    const redoButton = document.getElementById('redo-button');
    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);
    
    const schematicEditor = document.getElementById('schematic-editor');
    let mouseX = 0;
    let mouseY = 0;

    // Undo and redo, using the Memento Pattern strategy
    const componentHistory = [];
    let currentIndex = -1;

    function preventDefault(event) {
        // Done because several events have default functions that must be overwritten
        // Essentially '@Override' from Java (at least to my current understanding)
        // Made this a separate function since a lot of functions will use this in the future and to provide documentation.
        event.preventDefault();
    }
    
    // Make initial components draggable
    const componentsContainer = document.querySelector('.components');
    const components = componentsContainer.querySelectorAll('.static-component');
    components.forEach(component => {
        console.log(`Added component ${component.id}`)
        component.addEventListener('dragstart', handleDragStart);
    });
    function handleDragStart(event) {
        mouseX = event.offsetX
        mouseY = event.offsetY

        // Get specific type
        const type = event.target.getAttribute('data-type');
        event.dataTransfer.setData('text/plain', type); // You can also pass in the type
        
        console.log("Dragstart!")
    }

    // Handle drop & dragover events
    console.log("handles loaded")
    schematicEditor.addEventListener('dragover', handleDragOver);
    function handleDragOver(event){
        preventDefault(event);
        
        console.log("Dragover")
    };

    schematicEditor.addEventListener('drop', handleDrop);
    function handleDrop(event) {
        preventDefault(event);
        const x = event.clientX - schematicEditor.offsetLeft - mouseX;
        const y = event.clientY - schematicEditor.offsetTop - mouseY;
        const type = event.dataTransfer.getData('text/plain')

        // Checks if the thing selected (the target) is a component (by checking its classlist)
        if(!event.target.classList.contains("component")){            
            // Create a new component at the drop location
            const newComponent = createComponent(x, y, type);
            schematicEditor.appendChild(newComponent);
        }

        console.log("Drop")
        saveState()
    }
    
    function createComponent(x, y, type) {
        // Creates a new component element
        const component = document.createElement('div');
        component.className = 'component';
        component.style.left = `${x}px`;
        component.style.top = `${y}px`;
        component.dataset.type = type
        return component;
    }

    function updateUI() {
        // Basically enable/disable undo and redo buttons when they can't do anything
        undoButton.disabled = (currentIndex === -1);
        redoButton.disabled = (currentIndex === componentHistory.length - 1);
    }

    function saveState() {
        // Save the current state in the history
        // Do this by splicing by the currentIndex (if you know your list slicing from python, it's just a_list[0:currentIndex])
        // CurrentIndex is either incremented or decremented based on the button you press 
        currentIndex++;
        componentHistory.splice(currentIndex);
        componentHistory.push(schematicEditor.innerHTML);

        updateUI();
    }

    function undo() {
        console.log(componentHistory)
        if (currentIndex > 0) {
            currentIndex--;
            schematicEditor.innerHTML = componentHistory[currentIndex];
        }
        else if (currentIndex === 0){
            currentIndex = -1
            schematicEditor.innerHTML = "";
        }
        updateUI();
    }

    function redo() {
        console.log(componentHistory)
        if (currentIndex < componentHistory.length - 1) {
            currentIndex++;
            schematicEditor.innerHTML = componentHistory[currentIndex];
        }
        updateUI();
    }
});
   
   