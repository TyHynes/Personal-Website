document.addEventListener('DOMContentLoaded', () => {
    // Create modal structure
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a>
        <img class="modal-content" id="img01">
        <div id="caption"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementsByClassName("prev")[0];
    const nextBtn = document.getElementsByClassName("next")[0];

    // Interactive Media Cards
    const cards = Array.from(document.querySelectorAll('.movie-card, .music-card, .art-piece'));
    let currentIndex = 0;

    // Helper function to extract info and update modal
    function updateModal(index) {
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        currentIndex = index;

        const card = cards[currentIndex];

        // Find the image source
        const img = card.querySelector('img');
        const src = img ? img.src : '';
        if (!src) return;

        let title = '';
        let details = '';

        // Extract info based on card type
        if (card.classList.contains('movie-card')) {
            // Movies & TV
            const titleEl = card.querySelector('.movie-title');
            const ratingEl = card.querySelector('.movie-rating');
            if (titleEl) title = titleEl.innerText;
            if (ratingEl) details = ratingEl.innerText;
        }
        else if (card.classList.contains('music-card')) {
            // Music
            const songEl = card.querySelector('.song-title-lg');
            const artistEl = card.querySelector('.artist-name-lg');
            const albumEl = card.querySelector('.album-name-lg');

            if (songEl) title = songEl.innerText;
            if (artistEl) details += `Artist: ${artistEl.innerText}<br>`;
            if (albumEl) details += `Album: ${albumEl.innerText}`;
        }
        else if (card.classList.contains('art-piece')) {
            // Art
            const captionEl = card.querySelector('.art-caption');
            if (captionEl) title = captionEl.innerText;
        }

        // Update DOM
        modal.style.display = "block";
        modalImg.src = src;

        let captionHtml = '';
        if (title) captionHtml += `<div style="font-size: 1.5rem; color: var(--neon-cyan); margin-bottom: 5px;">${title}</div>`;
        if (details) captionHtml += `<div style="font-size: 1rem; color: white;">${details}</div>`;
        captionText.innerHTML = captionHtml;
    }

    // Add click events to all cards
    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            updateModal(index);
        });
    });

    // Blog & Project Collapse Functionality
    const blogPosts = document.querySelectorAll('.data-panel > p');
    blogPosts.forEach(post => {
        // Only collapse if significantly taller than 150px
        if (post.scrollHeight > 150) {
            post.classList.add('blog-collapsed');

            const btn = document.createElement('button');
            btn.innerText = '[Read More]';
            btn.className = 'read-more-btn';

            btn.onclick = function () {
                if (post.classList.contains('blog-collapsed')) {
                    post.classList.remove('blog-collapsed');
                    btn.innerText = '[Show Less]';
                } else {
                    post.classList.add('blog-collapsed');
                    btn.innerText = '[Read More]';
                }
            };

            // Insert button after the paragraph
            post.parentNode.insertBefore(btn, post.nextSibling);
        }
    });

    // Navigation Click Events
    prevBtn.onclick = () => updateModal(currentIndex - 1);
    nextBtn.onclick = () => updateModal(currentIndex + 1);

    // Close functionalities
    closeBtn.onclick = () => modal.style.display = "none";
    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "block") {
            if (e.key === "Escape") modal.style.display = "none";
            if (e.key === "ArrowLeft") updateModal(currentIndex - 1);
            if (e.key === "ArrowRight") updateModal(currentIndex + 1);
        }
    });
});
