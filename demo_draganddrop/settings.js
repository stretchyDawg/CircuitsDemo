document.addEventListener('DOMContentLoaded', function () {
    const schematicEditor = document.getElementById('schematic-editor');
    const refreshButton = document.getElementById('refresh-button');
    const screenLog = document.getElementById("screen-log")

    // Event Listeners
    refreshButton.addEventListener('click', function () {
        while (schematicEditor.firstChild) {
            schematicEditor.removeChild(schematicEditor.firstChild);
        }
    });
    document.addEventListener('mousemove', handleMouseMove);
    function handleMouseMove(event) {
        // Coordinates of mouse, and any additional dynamic console logs 
        screenLog.innerText = `Screen X/Y: ${event.screenX}, ${event.screenY}
        Client X/Y: ${event.clientX}, ${event.clientY}
        Offset X/Y: ${event.offsetX}, ${event.offsetY}
        Calculation: ${(event.clientX - schematicEditor.offsetLeft + 1)}, ${(event.clientY - schematicEditor.offsetTop + 1)}

        Extra Tests: ---`;
    }
});