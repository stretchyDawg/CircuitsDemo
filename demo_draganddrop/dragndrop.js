document.addEventListener('DOMContentLoaded', function () {
    const schematicEditor = document.getElementById('schematic-editor');
    
    
    // Make initial components draggable
    const componentsContainer = document.querySelector('.components');
    const components = componentsContainer.querySelectorAll('.static-component');
    components.forEach(component => {
        console.log(`Added component ${component.id}`)
        component.addEventListener('dragstart', handleDragStart);
    });
    function handleDragStart(event) {
        // For some reason, some browsers require this to implement dragging
        event.dataTransfer.setData('text/plain', ''); 
        console.log("Dragstart!")
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
   
   