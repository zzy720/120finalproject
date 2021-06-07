/*
Game Name: The Funeral
Group Members' Names: Noah Jiang, Zeyu Zhang, Bianca Hsieh

ps: cheat code for grader
    If you really can't beat the puzzles:
    press F1 in the first scene to go to the puzzle
    press F1 in the first puzzle to go to the second puzzle
    press F1 in the second puzzle to go to the top - walk toward the shadow to trigger the final plot

    but we do hope that you can beat all the levels since we have find numerous amount of playtesters,
    and they all beated it.
*/

// game configuration
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    scene: [ Menu, Funeral, Puzzle1, Puzzle2, FinalAnim, Credit, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

//globalized text font
let scoreConfig = {
    fontFamily: 'pixel',
    fontSize: '21px',
    //backgroundColor: '#2f4673',
    color: '#625B57',
    align: 'right',
    fixedWidth: 0
};

let finalConfig = {
    fontFamily: 'pixel',
    fontSize: '14px',
    //backgroundColor: '#2f4673',
    color: '#625B57',
    align: 'right',
    fixedWidth: 0
};

let creditConfig = {
    fontFamily: 'pixel',
    fontSize: '30px',
    //backgroundColor: '#2f4673',
    color: '#FFFFFF',
    align: 'left',
    fixedWidth: 0
};

let endConfig = {
    fontFamily: 'pixel',
    fontSize: '72px',
    //backgroundColor: '#2f4673',
    color: '#FFFFFF',
    align: 'middle',
    fixedWidth: 0
};


//reserve key inputs
let keyA, keyD, keyE, keyS, keySPACE;
let keyF1; //cheat code

//moving status
let isLeft, isRight, isJump, isStop = false;
let isRunningLeft, isRunningRight = false;

//talking status
let isTalkingCousin1, isTalkingCousin2, isTalkingCousin3, isTalkingCousin4, 
    isTalkingGrandparents, isTalkingDad = false;


let map;
let layer,bglayer;
let tiles;
let controls;

let cousin1dialogue = ["Bianca:  I feel sorry for you Tony,", 
                       "Bianca:  everything is gonna be fine.", 
                       "Bianca:  Time will carry away the pain."];

let cousin2dialogue = ["Vicky:  Aunt Helena treated me so well,",
                       "Vicky:  but...",
                       "VIcky:  I'm sorry..."];

let cousin3dialogue = ["Jenny:  Don't cry brother!"];

let cousin4dialogue = ["Timmy:  Papa! It's raining!",
                       "Uncle:  Timmy! Be quiet! Behave yourself!",
                       "Uncle:  I'm sorry Tony, Timmy is still too young,",
                       "Uncle:  He can't quite understand the situation right now.",
                       "Tony:  It's alright uncle."];

let grandparentsdialogue = ["Grandma:  She was so adorable...",
                            "Grandpa:  Her life shouldn't end like this...",
                            "Grandma:  My honey...",
                            "Grandpa:  ...",
                            "Grandma:  You should go talk to your dad,",
                            "Grandma:  he must be so suffering..."];

let fatherdialoguebefore = ["Dad:  Helena..."];

let fatherdialogueafter = ["Dad:  I loved her so much,",
                           "Dad:  She will always be with us...", 
                           "Dad:  It's time to go home,", 
                           "Dad:  but before that...",
                           "Dad:  would you want to say goodbye to your mom?"];

let momdialogue = ["Mom:  Hey Tony,",
                   "Mom:  How's everything going?",
                   "Tony:  Mom! Are...",
                   "Mom:  You've been doing great Tony,",
                   "Mom:  don't worry.",
                   "Tony: Mom, please stay with me forever!",
                   "Mom:  ...",
                   "Tony:  Mom!",
                   "Mom:  Stay strong Tony, trust yourself.",
                   "Tony:  Mom!",
                   "Mom:  Remember, you are always the best,",
                   "Mom:  and you are always my boy.",
                   "Tony:  Mom!"];

