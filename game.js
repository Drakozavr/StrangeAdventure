const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

//character inventory
let items = {};

//starting game
function startGame() {
  items = {};
  showTextNode(1);
}

//allow us to display on buttons what option we are on
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

//check if have a requred state object
//when it's bull that means we don't have the requared state we want to return true
function showOption(option) {
  return option.requiredItems === undefined || option.requiredItems(items);
}

//selecting options, take the state that we have currently, add everything from option.setState to it and override everything that already there.
//returning a brand new object
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  //add restart to option in case character dies -1
  if (nextTextNodeId <= 0) {
    return startGame();
  }

  items = Object.assign(items, option.setItems);
  showTextNode(nextTextNodeId);
}

//all text Nodes storage
const textNodes = [
  //text 1
  {
    id: 1,
    text:
      "You wake up in a strange place on a cold floor and see a small vessel with a red powder near you.",
    //answers
    options: [
      {
        text: "Take the red powder",
        setItems: { redPowder: true },
        nextText: 2,
      },
      {
        text: "Leave the red powder",
        nextText: 2,
      },
    ],
  },
  //text 2
  {
    id: 2,
    text:
      "You left a strange building and went down the street in search for answers to where you are. On the way, you see a merchant.",
    //answers
    options: [
      {
        text: "Trade the red powder for a magic wand",
        requiredItems: (currentState) => currentState.redPowder,
        setItems: { redPowder: false, magicWand: true },
        nextText: 3,
      },
      {
        text: "Trade red powder for a cloak",
        requiredItems: (currentState) => currentState.redPowder,
        setItems: { redPowder: false, cloak: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant",
        nextText: 3,
      },
    ],
  },
  //text 3
  {
    id: 3,
    text:
      "You wandered around the city a little more. Quiet streets, low buildings and a frightening castle right at the exit of the town. After your strange awakening, you feel headache and tiredness.",
    //answers
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Find a room to sleep in the town",
        nextText: 5,
      },
      {
        text: "Find some hay in the stable to sleep in",
        nextText: 6,
      },
    ],
  },
  //text 4
  {
    id: 4,
    text:
      "You feel very tired, the pain in your head just became unbearable, at some point you lost consciousness while exploring the castle. Lying on the dirty floor, you didn’t see a smelly monster bite your head off. You die the same second.",
    //answers
    options: [
      {
        text: "Sad story bro. Try again.",
        nextText: -1,
      },
    ],
  },
  //text 5
  {
    id: 5,
    text:
      "You don't have money to pay for the room. So you wander around the city until evening. When it's dark you enter the nearest inn and break the lock to one of the rooms. You sleep on the bed for several hours until the tavern owner discovers you. He calls the town guards and they throw you into cell.",
    //answers
    options: [
      {
        text:
          "Life in prison is clearly not the adventure you dreamed about. Try again.",
        nextText: -1,
      },
    ],
  },
  //text 6
  {
    id: 6,
    text:
      "Going around the city you found quiet stables. It wasn't very comfortable to sleep on hard straw, but you had enough rest and headache went away. In the morning you felt a surge of energy.",
    //answers
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  //text 7
  {
    id: 7,
    text:
      "You tried to be very quiet, but after just a few minutes you come across a monster. He makes a terrible roar and rushes to the attack.",
    //answers
    options: [
      {
        text: "Attack with magic wand",
        requiredItems: (currentState) => currentState.magicWand,
        nextText: 8,
      },
      {
        text: "Attack with strange red powder",
        requiredItems: (currentState) => currentState.redPowder,
        setItems: { redPowder: false },
        nextText: 9,
      },
      {
        text: "Try to run",
        nextText: 10,
      },
      {
        text: "Throw your cloak at the monster and run.",
        requiredItems: (currentState) => currentState.cloak,
        setItems: { cloak: false },
        nextText: 11,
      },
    ],
  },
  //text 8
  {
    id: 8,
    text:
      "You're trying to cast some spells, but monster moves to fast. He jumps on you and warm blood from your neck was the last thing you remember.",
    //answer
    options: [
      {
        text: "Try again in the next life.",
        nextText: -1,
      },
    ],
  },
  //text 9
  {
    id: 9,
    text:
      "You suddenly throw your hand forward and pour all the red powder right into the monster's face. He makes a terrible roar and you see how the skin begins to peel from him. You catch your breath and examine the corpse. You see something sparkling.",
    //answers
    options: [
      {
        text:
          "Pick up monster's golden necklace with strange green stone in it.",
        setItems: { necklace: true },
        nextText: 14,
      },
      {
        text: "You feel nauseous. Leave the corpse and move on.",
        nextText: 14,
      },
      {
        text:
          "Pick up monster's golden necklace and pull out his tooth as a trophy.",
        setItems: { necklace: true, monsterTooth: true },
        nextText: 14,
      },
    ],
  },

  //text 10
  {
    id: 10,
    text:
      "You're trying to run, but monster moves faster. His sharp claws tears your back to shreds. You die in agony in a few minutes.",
    options: [
      {
        text: "Try again in the next life.",
        nextText: -1,
      },
    ],
  },

  //text 11
  {
    id: 11,
    text:
      "Your cloak slows down the monster and you manage to escape. You run through several long corridors completely lost count. Only after a few minutes you decide to stop and look around. Before you another gloomy corridor diverging in two directions.",
    //answers
    options: [
      {
        text: "Turn left",
        nextText: 12,
      },
      {
        text: "Turn right",
        nextText: 13,
      },
    ],
  },

  //test 12 turn left
  {
    id: 12,
    text:
      "Going forward after the left turn you see a wooden door, a subtle radiance of magic emanates from it. The door probably protects some kind of spell.",
    //answers
    options: [
      {
        text: "Pull the doorknob",
        nextText: 15,
      },
      {
        text:
          "With a strange feeling inside you take out a gold necklace and put it on your neck. After that you pull the doorknob.",
        requiredItems: (currentState) => currentState.necklace,
        nextText: 16,
      },
      {
        text: "Closely inspect the door and walls around",
        nextText: 17,
      },
    ],
  },
  //text 15
  {
    id: 15,
    text:
      "You pull the doorknob and feel a powerful electrical charge that stops your heart.",
    //answer
    options: [
      {
        text: "You died. Try again.",
        nextText: -1,
      },
    ],
  },
  //text 16
  {
    id: 16,
    text:
      "You pull the doorknob and feel a powerful electrical charge. The magic wave throws you a few steps from the door. You see how the stone in your necklace begins to pulsate bright green and breaks into pieces, absorbing the power of a protective spell. This jewelry probably just saved your life.",
    //answer
    options: [
      {
        text:
          "While your heart is trying to jump out of your chest, you decide to inspect the door and walls around",
        nextText: 17,
      },
    ],
  },
  //text 17
  {
    id: 17,
    text:
      "You carefully examine the door without touching it. Strange letters in the center look like a fancy pattern, but you can read it somehow: HE WHO COMES FROM OTHER WORLDS WILL FIND FORGOTTEN PATH. YOUR PALM ON THE TEXT WILL LEAD YOU HOME. AT LAST.",
    //answers
    options: [
      {
        text: "Put your palm on the strange writings on the door",
        nextText: 18,
      },
      {
        text: "Pull the doorknob",
        nextText: 19,
      },
    ],
  },
  //text 18
  {
    id: 18,
    text:
      "You feel like you're starting to fall somewhere. Color glimpses flash before your eyes. Space begins to warp and you lose consciousness. When open your eyes you realize that you are lying in your room on the bed. Outside the window just the usual picture, you are in the 21st century. And all events feel like a crazy dream. Or not a dream..?",
    //answers
    options: [
      {
        text: "Congratulations! You just finished the game. Wanna do it again?",
        nextText: -1,
      },
    ],
  },
  //text 19
  {
    id: 19,
    text:
      "A powerful electrical charge passes through your body. You fall dead in front of the door.",
    options: [
      {
        text: "Well... you can try again...",
        nextText: -1,
      },
    ],
  },

  //text 13 turn right
  {
    id: 13,
    text:
      "You turn to the right and after a few steps see a pedestal with a transparent bowl with blue liquid in it.",
    //answers
    options: [
      {
        text: "Drink the blue liquid",
        nextText: 20,
      },
      {
        text: "Do nothing with liquid. Just go back to the left turn.",
        nextText: 12,
      },
    ],
  },
  //text 20
  {
    id: 20,
    text:
      "After the first sip of an incomprehensible slurry, you realized your mistake. It was too late. The magic swill turned you into another monster guarding the old walls. You make a heart-rending cry and run away into the maze of corridors.",
    options: [
      {
        text: "Try again.",
        nextText: -1,
      },
    ],
  },

  //text 14
  {
    id: 14,
    text:
      "You go further along the gloomy corridors. Around nothing interesting, periodically you turn right or left, at some point you have lost track of the turns. Before you another gloomy corridor diverging in two directions.",
    //answers
    options: [
      {
        text: "Turn left",
        nextText: 12,
      },
      {
        text: "Turn right",
        nextText: 13,
      },
    ],
  },
  //
];

//
startGame();
