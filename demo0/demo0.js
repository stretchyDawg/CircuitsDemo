console.log("page loaded")
// let screenLog = document.getElementById("screen-log")
// document.addEventListener("mousemove", logKey);
// function logKey(e) {
//     screenLog.innerText = `
//       Screen X/Y: ${e.screenX}, ${e.screenY}
//       Client X/Y: ${e.clientX}, ${e.clientY}`;
//   }

document.addEventListener('DOMContentLoaded', function () {
    const schematicEditor = document.getElementById('schematic-editor');
    const components = [];
    const wires = [];
    
    // State
    let isDrawing = false;
    let startWire = null;
    
    // Event Listeners
    schematicEditor.addEventListener('mousedown', handleMouseDown);
    schematicEditor.addEventListener('mousemove', handleMouseMove);
    schematicEditor.addEventListener('mouseup', handleMouseUp);
    const refreshButton = document.getElementById('refresh-button');
    refreshButton.addEventListener('click', function () {
        while (schematicEditor.firstChild) {
            schematicEditor.removeChild(schematicEditor.firstChild);
        }
    
        // Clear components and wires arrays
        components.length = 0;
        wires.length = 0;
    });
    
    function handleMouseDown(event) {
        const component = createComponent(event);
        components.push(component);

        startWire = createWire(event);
        isDrawing = true;
    }
    
    function handleMouseMove(event) {
        const schematicEditor = document.getElementById('schematic-editor');
        let screenLog = document.getElementById("screen-log")
        screenLog.innerText = `Screen X/Y: ${event.screenX}, ${event.screenY}
        Client X/Y: ${event.clientX}, ${event.clientY}
        Offset X/Y: ${event.offsetX}, ${event.offsetY}
        Calculation: ${(event.clientX - schematicEditor.offsetLeft + 1)}, ${(event.clientY - schematicEditor.offsetTop + 1)}
              ------------------------------

              Extra Tests: ---`;

        if (isDrawing) {
            updateWire(event.offsetX, event.offsetY);
        }
    }

    function handleMouseUp(event) {
        if (isDrawing) {
            isDrawing = false;
            const endWire = createWire(event.offsetX, event.offsetY);
            connectComponents(startWire, endWire);
            wires.push({ start: startWire, end: endWire });
        }
    }

    function createComponent(event) {
        const schematicEditor = document.getElementById('schematic-editor');
        const component = document.createElement('div');
        component.className = 'component';
        component.style.left = (event.clientX - schematicEditor.offsetLeft + 1) + 'px';
        component.style.top = (event.clientY - schematicEditor.offsetTop + 1) + 'px';
        schematicEditor.appendChild(component);
        return component;
    }

    function createWire(event) {
        const wire = document.createElement('div');
        wire.className = 'wire';
        wire.style.left = (event.clientX - schematicEditor.offsetLeft + 1) + 'px';
        wire.style.top = (event.clientY - schematicEditor.offsetTop + 1) + 'px';
        schematicEditor.appendChild(wire);
        return wire;
    }

    function updateWire(x, y) {
        if (startWire) {
            startWire.style.width = x - startWire.offsetLeft + 'px';
            startWire.style.height = y - startWire.offsetTop + 'px';
        }
    }

});