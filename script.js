const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function endGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState === undefined || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    endGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: 'You see a long JavaScript Code approaching you. What do you do?',
    options: [
      {
        text: 'Turn right',
        setState: { right: true },
        nextText: 2
      },
      {
        text: 'Turn Left',
        nextText: 6
      },
      {
        text: 'Do complete the Code(attack)',
        nextText: 6
      }
    ]
  },
  {
    id: 2,
    text: 'You have turned right, and see a key placed conveniently on the floor next to a chest. What do you do?',
    options: [
      {
        text: 'Pick up the key; Open the chest',
        nextText: 6
      },
      {
        text: 'Pick up the key; Turn Left',
        requiredState: (currentState) => currentState.right,
        setState: { left: false, key: true },
        nextText: 3
      },
      {
        text: 'Pick up the key; Turn Right',
        nextText: 3
      },
      {
        text: 'Pick up the key and run in a random direction',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You turn left, you see a key place on a 10ft bookshelf. What do you do?',
    options: [
      {
        text: 'Attempt to climb up the bookshelf and aquire the key',
        requiredState: (currentState) => currentState.right,
          setState: { left: false, key: true },
        nextText: 5
      },
      {
        text: 'Bark for help',
        nextText: 6
      },
      {
        text: 'Jump',
        nextText: 6
      },
      {
        text: 'Turn right',
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'You jump down from the bookshelf, conviently where you have landed you aquire another key. Just 3 feet away from you, you see your owner in a big cage, with 3 keylocks on the door. But, you see the Javascript code monster approach you. What do you do? ',
    options: [
      {
        text: 'Run to unlock all 3 locks',
        nextText: 6
      },
      {
        text: 'Leave and abandon your owner'
      },
      {
        text: 'Bark',
        nextText: 13
      }
    ]
  },
  {
    id: 6,
    text: 'You trigger a pressure plate and a cage drops on you. You are now stuck!',
    options: [
      {
        text: 'Trapped',
        nextText: -1
      }

    ]
  },
  {
    id: 13,
    text: 'The javascript code has caught up to you and put you in the cage along with your owne, but you see a suspicious looking phone placed next to the bed inside the cage. What could it be? ',
    options: [
      {
        text: 'Is the dog and owner ever gonna excape? Find out in Part 2...(TBC)',
        nextText: -1

      },
    ]
  }
];

 endGame();