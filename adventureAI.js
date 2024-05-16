document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('game-output');
    const input = document.getElementById('user-input');
    const button = document.getElementById('submit-command');

    // Initial welcome message
    displayMessage("Welcome to Adventure AI! Type your commands to start the journey.");

    button.addEventListener('click', () => {
        const command = input.value.trim();
        input.value = '';
        if (command) {
            processCommand(command);
        }
    });

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            button.click();
        }
    });

    function displayMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }

    async function processCommand(command) {
        displayMessage(`> ${command}`);
        try {
            const response = await getHuggingFaceResponse(command);
            displayMessage(response);
        } catch (error) {
            displayMessage('Error getting AI response: ' + error.message);
            console.error(error);
        }
    }

    async function getHuggingFaceResponse(command) {
        const prompt = `You are an AI guiding a user through a synthwave-themed adventure. Here is the current scenario: 
        "You find yourself in a neon-lit cityscape, with towering skyscrapers and glowing signs. The air is filled with the hum of electric vehicles and distant music. In the distance, you see a mysterious figure beckoning you. You approach cautiously, unsure of what awaits. The figure speaks in a low voice, 'Welcome to Neon City, where every decision shapes your destiny. What will you do next?' The user just typed: '${command}'." 
        Continue the story in an engaging and creative way.`;

        const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: 150,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received response from Hugging Face API:', data);

        if (data && data.length > 0 && data[0].generated_text) {
            return data[0].generated_text.trim();
        } else {
            throw new Error('No response from AI');
        }
    }
});
