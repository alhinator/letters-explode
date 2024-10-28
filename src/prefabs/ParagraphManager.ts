interface WordCheck {
    word: string,
    isCompleted: boolean
}

class Paragraph {
    paragraph: string;
    words: WordCheck[];

    constructor(paragraph: string) {
        this.paragraph = paragraph;
        this.words = [];

        let wordList = paragraph.split(" ");
        wordList.forEach(function (word: string) {
            let newWordCheck: WordCheck = { word: word, isCompleted: false };
            this.words.push(newWordCheck);
        });
    }
}

/**
@class ParagraphManager a class for handling the paragraphs and word contents to be used in the main prototype.
 **/
export class ParagraphManager {
    paragraphs: Paragraph[];

    constructor() {
        this.paragraphs = [];
    }
}