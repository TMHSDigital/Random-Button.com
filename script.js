document.addEventListener('DOMContentLoaded', () => {
    const randomButton = document.getElementById('randomButton');
    const resultText = document.getElementById('resultText');
    const resultContainer = document.getElementById('result');
    
    // Lists of random items by category
    const randomLists = {
        facts: [
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
            "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
            "A group of flamingos is called a 'flamboyance'.",
            "Octopuses have three hearts, nine brains, and blue blood.",
            "The Hawaiian alphabet has only 12 letters.",
            "Bananas are berries, but strawberries aren't.",
            "Cats can't taste sweetness.",
            "The strongest muscle in the human body is the masseter (jaw muscle).",
            "A day on Venus is longer than a year on Venus.",
            "10% of all human beings ever born are alive right now.",
        ],
        jokes: [
            "Why don't scientists trust atoms? Because they make up everything!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "What do you call a fake noodle? An impasta!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I'm reading a book about anti-gravity. It's impossible to put down!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
            "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
            "Why don't skeletons fight each other? They don't have the guts.",
            "I used to play piano by ear, but now I use my hands.",
            "What do you call a parade of rabbits hopping backwards? A receding hare-line.",
        ],
        challenges: [
            "Do 10 jumping jacks right now!",
            "Call a friend you haven't spoken to in more than a month.",
            "Try to draw a perfect circle freehand.",
            "Learn how to say 'hello' in a new language today.",
            "Drink a glass of water right now.",
            "Try to balance on one foot for 30 seconds.",
            "Write a haiku about your day.",
            "Give a genuine compliment to the next person you talk to.",
            "Go outside and take a photo of something beautiful.",
            "Try to write your name with your non-dominant hand.",
        ],
        quotes: [
            ""Be yourself; everyone else is already taken." — Oscar Wilde",
            ""Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." — Albert Einstein",
            ""Be the change that you wish to see in the world." — Mahatma Gandhi",
            ""In three words I can sum up everything I've learned about life: it goes on." — Robert Frost",
            ""If you tell the truth, you don't have to remember anything." — Mark Twain",
            ""The way to get started is to quit talking and begin doing." — Walt Disney",
            ""Life is what happens when you're busy making other plans." — John Lennon",
            ""It does not matter how slowly you go as long as you do not stop." — Confucius",
            ""Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill",
            ""You miss 100% of the shots you don't take." — Wayne Gretzky",
        ],
        advices: [
            "Try a new food that you've never tasted before.",
            "Start a savings account with just $5 today.",
            "Create a playlist of songs that motivate you.",
            "Take a different route home today.",
            "Learn the basics of coding on a free online platform.",
            "Write down three things you're grateful for today.",
            "Delete one unused app from your phone.",
            "Read the first chapter of a book in a genre you don't usually read.",
            "Send a thank you message to someone who has helped you recently.",
            "Try a 5-minute meditation session using a free app.",
        ]
    };
    
    // Combine all lists into one array with type information
    const allItems = [];
    for (const category in randomLists) {
        randomLists[category].forEach(item => {
            allItems.push({
                category: category,
                text: item
            });
        });
    }
    
    // Keep track of recently shown items to avoid repetition
    const recentItems = new Set();
    const maxRecentItems = Math.floor(allItems.length * 0.3); // Remember 30% of items
    
    // Function to get a random item that hasn't been shown recently
    const getRandomItem = () => {
        // If we've shown too many items, clear the recent items
        if (recentItems.size >= maxRecentItems) {
            recentItems.clear();
        }
        
        // Filter out recently shown items
        const availableItems = allItems.filter(item => !recentItems.has(item.text));
        
        // Get a random item
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        const selectedItem = availableItems[randomIndex];
        
        // Add to recent items
        recentItems.add(selectedItem.text);
        
        return selectedItem;
    };
    
    // Function to set a new random item
    const setRandomItem = () => {
        const item = getRandomItem();
        const categoryEmojis = {
            facts: "🧠",
            jokes: "😂",
            challenges: "🎯",
            quotes: "💭",
            advices: "💡"
        };
        
        // Remove animation class and add it back to trigger animation
        resultContainer.classList.remove('result-animation');
        void resultContainer.offsetWidth; // Trigger reflow
        resultContainer.classList.add('result-animation');
        
        // Set the text with category emoji
        resultText.textContent = `${categoryEmojis[item.category]} ${item.text}`;
    };
    
    // Add click event to button
    randomButton.addEventListener('click', () => {
        // Add a clicking animation to the button
        randomButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            randomButton.style.transform = '';
        }, 150);
        
        setRandomItem();
    });
    
    // Add keyboard shortcut (spacebar)
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent scrolling
            randomButton.click();
        }
    });
}); 