document.addEventListener('DOMContentLoaded', async () => {
    const newsContainer = document.getElementById('news-container');

    try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1nsMPcR6FuyyRiDCTlCiYB_koi5b43oRdbyQ27YePs7I/values/Sheet1?key=AIzaSyA_k1fBULwhpEm8UDGM6wIs230iK3RgsuM');
        const data = await response.json();

        if (data && data.values) {
            data.values.slice(1).forEach(row => {
                const title = row[0];
                const date = row[1]; // Treat date as a string
                const content = row[2];

                const articleElement = document.createElement('div');
                articleElement.classList.add('news-article');

                articleElement.innerHTML = `
                    <h3>${title}</h3>
                    <p><strong>${date}</strong></p>
                    <p>${content}</p>
                `;

                newsContainer.appendChild(articleElement);
            });
        }
    } catch (error) {
        console.error('Error fetching news articles:', error);
    }
});
