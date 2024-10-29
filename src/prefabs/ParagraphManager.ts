// import { Letter } from "./UIManager";

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

        this.letterCount = {};
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