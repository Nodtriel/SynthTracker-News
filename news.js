document.addEventListener('DOMContentLoaded', () => {
    loadNewsArticles();
});

async function loadNewsArticles() {
    const newsContainer = document.getElementById('news-articles');

    try {
        const response = await fetch('http://localhost:1337/api/newss', {
            headers: {
                'Authorization': 'Bearer a7dd4893370a1c08d2ce9635cea354862a87851f960beaea152c3bfbe40cc63382d48d371bfabcf04c07e33d9978542e67df9370b7fe33f547ec8f638df505aeec0a6077c0c9e3f11eea8c1fa2be5849697621af2cfa6b55912e83a3d95ef6e51635f959dd98d2427ec0635f76711014e849a3f8953d1cea9d0fbbda06960387'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        const articles = data.data;
        if (articles) {
            articles.forEach(article => {
                const { title, date, content } = article.attributes;

                const articleElement = document.createElement('div');
                articleElement.classList.add('news-article');
                articleElement.innerHTML = `
                    <h3>${title}</h3>
                    <p><small>${new Date(date).toLocaleDateString()}</small></p>
                    <p>${content}</p>
                `;
                newsContainer.appendChild(articleElement);
            });
        } else {
            console.error('No articles found');
        }
    } catch (error) {
        console.error('Error fetching news articles:', error);
    }
}
