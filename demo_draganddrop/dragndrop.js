document.addEventListener('DOMContentLoaded', function () {
    const schematicEditor = document.getElementById('schematic-editor');
    let mouseX = 0;
    let mouseY = 0;

    function preventDefault(event) {
        // Done because several events have default functions that must be overwritten
        // Essentially '@Override' from Java
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
});
   
   