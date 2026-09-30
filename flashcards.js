// 1. Data Structure (Yahan hum naye chapters aur cards add kar sakte hain)
const chapterData = {
    "1": {
        title: "Introduction to Software Development",
        cards: [
            {
                question: "What is SDLC?",
                answer: "Software Development Life Cycle (SDLC) is a structured process used by software teams to design, develop, test, and deploy high-quality software."
            },
            {
                question: "What is the primary goal of the Requirement Gathering phase?",
                answer: "To collect, analyze, and document exactly what stakeholders and end-users need from the system before building it."
            },
            {
                question: "What is the key difference between Functional and Non-Functional requirements?",
                answer: "Functional requirements define WHAT the system should do (features), while Non-Functional requirements define HOW the system performs (security, speed, usability)."
            },
            {
                question: "What is the Waterfall Model?",
                answer: "A traditional SDLC model where each phase must be completed before the next phase begins. It flows downwards like a waterfall."
            }
        ]
    }
};

// 2. State Variables (Yaad rakhne ke liye ke hum kahan hain)
let currentChapterId = "1";
let currentCardIndex = 0;

// 3. Page Load logic
document.addEventListener("DOMContentLoaded", () => {
    // URL se chapter number nikalna (e.g., ?chapter=1)
    const urlParams = new URLSearchParams(window.location.search);
    const paramChapter = urlParams.get("chapter");

    // Agar URL mein chapter hai aur hamare data mein bhi majood hai
    if (paramChapter && chapterData[paramChapter]) {
        currentChapterId = paramChapter;
    }

    // Back button ko sahi chapter page par bhejna
    const backBtn = document.getElementById("back-to-chapter");
    if (backBtn) {
        backBtn.href = "chapter.html?chapter=" + currentChapterId;
    }

    loadChapter(currentChapterId);
});

// 4. Chapter Load Karna
function loadChapter(chapterId) {
    const titleElem = document.getElementById("chapter-title");
    
    if (!chapterData[chapterId]) {
        if (titleElem) titleElem.innerText = "Chapter Not Found";
        return;
    }

    const chapter = chapterData[chapterId];
    if (titleElem) {
        titleElem.innerText = chapterId + "_ " + chapter.title;
    }

    currentCardIndex = 0;
    renderCard();
}

// 5. Card Dikhana (Render)
function renderCard() {
    const chapter = chapterData[currentChapterId];
    
    // Agar cards nahi hain toh wapis jao
    if (!chapter || !chapter.cards || chapter.cards.length === 0) return;

    const card = chapter.cards[currentCardIndex];
    const totalCards = chapter.cards.length;

    const flashcard = document.getElementById("flashcard");
    if (flashcard) {
        // Naya card dikhane se pehle usay wapis seedha (front par) kar do
        flashcard.classList.remove("is-flipped");
    }

    // Text update karna
    document.getElementById("card-question").innerText = card.question;
    document.getElementById("card-answer").innerText = card.answer;
    document.getElementById("card-counter").innerText = `Card ${currentCardIndex + 1} of ${totalCards}`;

    // Buttons ko Disable/Enable karna
    document.getElementById("prev-btn").disabled = (currentCardIndex === 0);
    document.getElementById("next-btn").disabled = (currentCardIndex === totalCards - 1);
}

// 6. 3D Flip Animation Trigger
function flipCard() {
    const flashcard = document.getElementById("flashcard");
    if (flashcard) {
        flashcard.classList.toggle("is-flipped");
    }
}

// 7. Next Card Function
function nextCard() {
    const chapter = chapterData[currentChapterId];
    if (currentCardIndex < chapter.cards.length - 1) {
        currentCardIndex++;
        renderCard();
    }
}

// 8. Previous Card Function
function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderCard();
    }
}
