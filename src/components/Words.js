import React from 'react';
class WordGen {
    static library = new Set([
        'California', 'everything', 'aboveboard', 'Washington', 'basketball', 'weathering', 
        'characters', 'literature', 'perfection', 'volleyball', 'depression', 'homecoming', 
        'technology', 'maleficent', 'watermelon', 'appreciate', 'relaxation', 'convection', 
        'abominable', 'government', 'salmonella', 'strawberry', 'aberration', 'retirement', 
        'television', 'contraband', 'Alzheimers', 'silhouette', 'friendship', 'loneliness', 
        'punishment', 'university', 'Cinderella', 'confidence', 'restaurant', 'abstinence', 
        'blancmange', 'blackboard', 'discipline', 'renovation', 'helicopter', 'generation', 
        'adaptation', 'skateboard', 'lightboard', 'Apocalypse', 'understand', 'leadership', 
        'revolution', 'Antarctica',
        'alliteration', 'unidentified', 'intermittent', 'Pennsylvania', 'exacerbation', 'independence', 
        'commensalism', 'intelligence', 'relationship', 'thanksgiving', 'professional', 'organization', 
        'sporadically', 'intimidating', 'abolitionist', 'onomatopoeia', 'appreciation', 'annunciation', 
        'malnutrition', 'architecture', 'biodiversity', 'acceleration', 'interdiction', 'trigonometry', 
        'communicator', 'bodybuilding', 'perspiration', 'appertaining', 'resurrection', 'constipation', 
        'civilization', 'velociraptor', 'retrocession', 'expectations', 'ambidextrous', 'cytoskeleton', 
        'hippopotamus', 'interjection', 'exasperation', 'felicitation', 'abbreviation', 'voluminosity', 
        'rambunctious', 'colonization', 'interception', 'championship', 'acquaintance', 'depreciation', 
        'consequences', 'grandparents'
    ])

    static guessed = new Set([])

    static getWord() {
        return [...this.library][Math.floor(Math.random() * this.library.size)]
    }

    static win(word) {
        this.guessed.add(word)
        this.library.delete(word)
    }
}

function Completed() {
    const list = [...WordGen.guessed].map((word) => <li class="word-item">{word}</li>);
    return (
        <div>
            <h3 class="word-header"><strong>Completed Words:</strong></h3>
            <ul>
                {list}
            </ul>
        </div>
    );
}

export {WordGen, Completed};
