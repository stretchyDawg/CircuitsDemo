console.log("page loaded")

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
        components.length = 0; // <-- Clearing arrays
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

        startWire = wire;

        return wire;
    }

    function updateWire(x, y) {
        if (startWire) {
            startWire.style.width = x - startWire.offsetLeft + 'px';
            startWire.style.height = y - startWire.offsetTop + 'px';
        }
    }

    function connectComponents(start, end) {
        // Find components associated with start and end points
        const startComponent = findComponent(start.offsetLeft, start.offsetTop);
        const endComponent = findComponent(end.offsetLeft, end.offsetTop);
        
        console.log("Start Component:", startComponent);
        console.log("End Component:", endComponent);
        
        if (startComponent && endComponent) {
            // Logic done to visually connect components
            const wireConnection = document.createElement('div');
            wireConnection.className = 'wire-connection';
            schematicEditor.appendChild(wireConnection);

            const startX = startComponent.offsetLeft + startComponent.offsetWidth / 2;
            const startY = startComponent.offsetTop + startComponent.offsetHeight / 2;

            const endX = endComponent.offsetLeft + endComponent.offsetWidth / 2;
            const endY = endComponent.offsetTop + endComponent.offsetHeight / 2;

            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
            const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

            wireConnection.style.width = length + 'px';
            wireConnection.style.left = startX + 'px';
            wireConnection.style.top = startY + 'px';
            wireConnection.style.transform = 'rotate(' + angle + 'deg)';
        }
    }

    function findComponent(x, y) {
        const foundComponent = components.find(component => {
            const rect = component.getBoundingClientRect();
            const isWithinBounds =
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.top &&
                y <= rect.bottom;
    
            console.log(
                `Checking component at (${x}, ${y}): ${isWithinBounds ? 'Found!' : 'Not Found'}`,
                rect
            );
    
            return isWithinBounds;
        });
    
        console.log("Found Component:", foundComponent);
        return foundComponent;
    }
});