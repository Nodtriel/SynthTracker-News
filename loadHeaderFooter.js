document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', 'header.html');
    loadHTML('footer', 'footer.html');
});

async function loadHTML(elementId, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}
