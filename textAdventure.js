document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('game-output');
    const input = document.getElementById('user-input');
    const button = document.getElementById('submit-command');

    let gameState = {
        location: 'start',
        inventory: []
    };

    const gameData = {
        start: {
            description: 'You find yourself in a neon-lit cityscape. You can go "north" to a mysterious alley, "east" to a glowing tower, or "west" to a cyberpunk bar.',
            commands: {
                'go north': 'alley',
                'go east': 'tower',
                'go west': 'bar'
            }
        },
        alley: {
            description: 'The alley is dark, but you see a flickering light. A shadowy figure approaches. You can "talk to figure" or "run south".',
            commands: {
                'talk to figure': 'figure',
                'run south': 'start'
            }
        },
        figure: {
            description: 'The figure offers you a choice: a "blue pill" or a "red pill". You can also "go south" to leave.',
            commands: {
                'blue pill': function () {
                    gameState.inventory.push('blue pill');
                    return 'bluePillPath';
                },
                'red pill': function () {
                    gameState.inventory.push('red pill');
                    return 'redPillPath';
                },
                'go south': 'alley'
            }
        },
        bluePillPath: {
            description: 'You feel a surge of energy. The world around you changes. You can "explore" or "return south".',
            commands: {
                'explore': 'cyberspace',
                'return south': 'start'
            }
        },
        redPillPath: {
            description: 'Reality becomes clear. You see the hidden code of the universe. You can "hack reality" or "return south".',
            commands: {
                'hack reality': 'matrix',
                'return south': 'start'
            }
        },
        cyberspace: {
            description: 'You are now in a digital realm. You can "navigate" further or "disconnect".',
            commands: {
                'navigate': 'ending1',
                'disconnect': 'start'
            }
        },
        matrix: {
            description: 'You have control over the matrix. You can "reshape the world" or "escape".',
            commands: {
                'reshape the world': 'ending2',
                'escape': 'start'
            }
        },
        bar: {
            description: 'The bar is lively with neon lights and synth music. You can "order a drink" or "talk to the bartender".',
            commands: {
                'order a drink': function () {
                    gameState.inventory.push('drink');
                    return 'drink';
                },
                'talk to bartender': 'bartender'
            }
        },
        drink: {
            description: 'The drink is refreshing. You feel more confident. You can "talk to bartender" or "leave".',
            commands: {
                'talk to bartender': 'bartender',
                'leave': 'start'
            }
        },
        bartender: {
            description: 'The bartender shares a secret. You can "investigate" or "leave".',
            commands: {
                'investigate': 'secret',
                'leave': 'start'
            }
        },
        secret: {
            description: 'The secret leads you to an underground lab. You can "enter lab" or "return to bar".',
            commands: {
                'enter lab': 'lab',
                'return to bar': 'bar'
            }
        },
        lab: {
            description: 'In the lab, you discover advanced technology. You can "use tech" or "leave".',
            commands: {
                'use tech': 'ending3',
                'leave': 'bar'
            }
        },
        tower: {
            description: 'The glowing tower stands tall. You can "enter tower" or "return west".',
            commands: {
                'enter tower': 'insideTower',
                'return west': 'start'
            }
        },
        insideTower: {
            description: 'Inside the tower, you find a control room. You can "control city" or "leave".',
            commands: {
                'control city': 'ending2',
                'leave': 'tower'
            }
        },
        ending1: {
            description: 'You become a digital entity, exploring cyberspace forever. THE END. Type "restart" to play again.',
            commands: {
                'restart': 'start'
            }
        },
        ending2: {
            description: 'You reshape reality to your will, becoming a legend in the synthwave city. THE END. Type "restart" to play again.',
            commands: {
                'restart': 'start'
            }
        },
        ending3: {
            description: 'You use the advanced technology to travel through time, embarking on endless adventures. THE END. Type "restart" to play again.',
            commands: {
                'restart': 'start'
            }
        }
    };

    function displayMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }

    function processCommand(command) {
        const location = gameData[gameState.location];
        if (command === '?') {
            displayCommands(location.commands);
        } else if (location.commands[command]) {
            if (typeof location.commands[command] === 'function') {
                gameState.location = location.commands[command]();
                if (gameState.location === 'bluePillPath' || gameState.location === 'redPillPath') {
                    displayMessage('You chose the ' + command + '.');
                }
            } else {
                gameState.location = location.commands[command];
            }
            displayMessage(gameData[gameState.location].description);
        } else {
            displayMessage('Unknown command.');
        }
    }

    function displayCommands(commands) {
        const availableCommands = Object.keys(commands).join(', ');
        displayMessage('Available commands: ' + availableCommands);
    }

    button.addEventListener('click', () => {
        const command = input.value.toLowerCase().trim();
        input.value = '';
        processCommand(command);
    });

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            button.click();
        }
    });

    displayMessage(gameData[gameState.location].description);
});
