function loadHTML(selector, url) {
    console.log(`Loading ${url} into ${selector}`);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            console.log(`Successfully loaded ${url}`);
        })
        .catch(error => console.error('Error loading HTML:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', 'header.html');
    loadHTML('footer', 'footer.html');
});
