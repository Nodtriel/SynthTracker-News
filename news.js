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
                const img1 = row[3] || ''; // First image URL
                const img2 = row[4] || ''; // Second image URL
                const img3 = row[5] || ''; // Third image URL

                const articleElement = document.createElement('div');
                articleElement.classList.add('news-article');

                articleElement.innerHTML = `
                    <h3>${title}</h3>
                    <p><strong>${date}</strong></p>
                    <p>${content}</p>
                    <div class="news-images">
                        ${img1 ? `<img src="${img1}" alt="News Image 1" class="news-thumbnail">` : ''}
                        ${img2 ? `<img src="${img2}" alt="News Image 2" class="news-thumbnail">` : ''}
                        ${img3 ? `<img src="${img3}" alt="News Image 3" class="news-thumbnail">` : ''}
                    </div>
                `;

                newsContainer.appendChild(articleElement);
            });

            // Add event listeners for full-screen preview
            document.querySelectorAll('.news-thumbnail').forEach(img => {
                img.addEventListener('click', (e) => {
                    const fullScreenDiv = document.createElement('div');
                    fullScreenDiv.classList.add('fullscreen-preview');
                    fullScreenDiv.innerHTML = `
                        <img src="${e.target.src}" alt="Full Screen Image">
                    `;
                    document.body.appendChild(fullScreenDiv);
                    fullScreenDiv.addEventListener('click', () => {
                        document.body.removeChild(fullScreenDiv);
                    });
                });
            });
        }
    } catch (error) {
        console.error('Error fetching news articles:', error);
    }
});
