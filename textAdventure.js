document.addEventListener('DOMContentLoaded', () => {
    const gameOutput = document.getElementById('game-output');
    const userInput = document.getElementById('user-input');
    const submitButton = document.getElementById('submit-command');

    // Initial game text
    const initialText = "You find yourself in a neon-lit cityscape. You can go 'north' to a mysterious alley, 'east' to a glowing tower, or 'west' to a cyberpunk bar.";
    gameOutput.innerHTML = `<p>${initialText}</p>`;

    submitButton.addEventListener('click', () => {
        const command = userInput.value.trim();
        processCommand(command);
        userInput.value = '';
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = userInput.value.trim();
            processCommand(command);
            userInput.value = '';
        }
    });

    function processCommand(command) {
        // Process the command and update gameOutput accordingly
        let response = '';

        switch (command.toLowerCase()) {
            case 'north':
                response = 'You head north into the mysterious alley...';
                break;
            case 'east':
                response = 'You move east towards the glowing tower...';
                break;
            case 'west':
                response = 'You walk west into the cyberpunk bar...';
                break;
            case '?':
                response = 'Possible commands: north, east, west';
                break;
            default:
                response = 'Unknown command. Try again.';
        }

        gameOutput.innerHTML += `<p>${response}</p>`;
        gameOutput.scrollTop = gameOutput.scrollHeight; // Scroll to the bottom
    }
});
