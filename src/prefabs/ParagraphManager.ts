import { Letter } from "./UIManager";
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"
];

function isLetter(char: string): char is Letter {
    char = char.toLowerCase();
    return letters.indexOf(char) !== -1;
}

export interface WordCheck {
    word: string,
    isCompleted: boolean
}

interface LetterCheck<integer> {
    [key: string]: integer;
}

class Paragraph {
    _paragraph: string;
    _words: WordCheck[];
    _length: integer;
    _letterCount: LetterCheck<integer>;

    constructor(paragraph: string) {
        this._paragraph = paragraph;
        this._words = [];

        let wordList = paragraph.split(" ");
        wordList.forEach((word: string) => {
            let newWordCheck: WordCheck = { word: word, isCompleted: false };
            this._words.push(newWordCheck);
        });

        this._length = this._words.length;

        // sets all letter appearances to 0
        this._letterCount = {};
        for (const letter of letters) {
            this._letterCount[letter] = 0;
        }

        for (const char of this._paragraph) {
            let c = char.toLowerCase();
            if (isLetter(c)) {
                this._letterCount[c] += 1;
            }
        }
    }
}

type ParagraphSize = "SHORT" | "MEDIUM" | "LONG";

function isParagraphSize(word: string): word is ParagraphSize {
    return ["SHORT", "MEDIUM", "LONG"].indexOf(word) !== -1;
}

/**
@class ParagraphManager a class for handling the paragraphs and word contents to be used in the main prototype.
 **/
export class ParagraphManager {
    private _paragraph: Paragraph;

    constructor(which_one: string) {
        let paragraphList = JSON.parse("paragraphs.json");
        if (isParagraphSize(which_one)) {
            this._paragraph = new Paragraph(paragraphList[which_one]);
        } else {
            this._paragraph = new Paragraph("");
        }
    }

    public getParagraph() {
        return this._paragraph._words;
    }

    public getLength() {
        return this._paragraph._length;
    }

    public getLetterCount() {
        return this._paragraph._letterCount;
    }
}