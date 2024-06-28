export const truncateSentence = (sentence:string, maxLength:number) => {
    let words = sentence.split(' ');
    let truncatedSentence = '';
    console.log("words:",words);
    for (let word of words) {
        if (truncatedSentence.length + word.length + 1 <= maxLength) {
            if (truncatedSentence.length > 0) {
                truncatedSentence += ' ';
            }
            truncatedSentence += word;
        } else {
            break;
        }
    }

    return truncatedSentence;
}