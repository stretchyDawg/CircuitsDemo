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

        // For some reason, some browsers require this to implement dragging
        event.dataTransfer.setData('text/plain', ''); 
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
        console.log("Drop")
        const x = event.clientX - schematicEditor.offsetLeft - mouseX;
        const y = event.clientY - schematicEditor.offsetTop - mouseY;

        // Create a new component at the drop location
        const newComponent = createComponent(x, y);
        schematicEditor.appendChild(newComponent);
    }
    
    function createComponent(x, y) {
        // Creates a new component element
        const component = document.createElement('div');
        component.className = 'component';
        component.style.left = `${x}px`;
        component.style.top = `${y}px`;
        return component;
    }
});
   
   