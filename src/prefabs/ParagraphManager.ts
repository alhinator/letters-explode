import { Letter } from "./UIManager";
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"
];

function isLetter(char: string): char is Letter {
    char = char.toLowerCase();
    return letters.indexOf(char) !== -1;
}

interface WordCheck {
    word: string,
    isCompleted: boolean
}

interface LetterCheck<integer> {
    [key: string]: integer;
}

class Paragraph {
    paragraph: string;
    words: WordCheck[];
    length: integer;
    letterCount: LetterCheck<integer>;

    constructor(paragraph: string) {
        this.paragraph = paragraph;
        this.words = [];

        let wordList = paragraph.split(" ");
        wordList.forEach((word: string) => {
            let newWordCheck: WordCheck = { word: word, isCompleted: false };
            this.words.push(newWordCheck);
        });

        this.length = this.words.length;

        // sets all letter appearances to 0
        this.letterCount = {};
        for (const letter of letters) {
            this.letterCount[letter] = 0;
        }

        for (const char of this.paragraph) {
            let c = char.toLowerCase();
            if (isLetter(c)) {
                this.letterCount[c] += 1;
            }
        }
    }
}

type ParagraphSize = "SHORT" | "MEDIUM" | "LONG";

/**
@class ParagraphManager a class for handling the paragraphs and word contents to be used in the main prototype.
 **/
export class ParagraphManager {
    paragraph: Paragraph;


    constructor(which_one: ParagraphSize) {
        this.paragraph = new Paragraph(""); // grabfromjson(which_one)
    }
}