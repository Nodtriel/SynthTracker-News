document.addEventListener('DOMContentLoaded', () => {
    loadNewsArticles();
});

async function loadNewsArticles() {
    const newsContainer = document.getElementById('news-articles');
    const apiKey = 'AIzaSyA_k1fBULwhpEm8UDGM6wIs230iK3RgsuM';
    const sheetId = '1nsMPcR6FuyyRiDCTlCiYB_koi5b43oRdbyQ27YePs7I';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);  // Check the structure of the data returned
        
        const articles = data.values.slice(1); // Remove header row

        articles.forEach(article => {
            const [title, date, content] = article;

            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');
            articleElement.innerHTML = `
                <h3>${title}</h3>
                <p><small>${new Date(date).toLocaleDateString()}</small></p>
                <p>${content}</p>
            `;
            newsContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error fetching news articles:', error);
    }
}
