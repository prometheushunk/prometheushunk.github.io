let currentIndex = 0;

async function loadVideos() {
    const { YT_API_KEY, CHANNEL_ID, MAX_RESULTS } = window.PH_CONFIG;

    const url =
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${YT_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${MAX_RESULTS}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items) return;

        const carousel = document.getElementById("carousel");
        carousel.innerHTML = "";

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            if (!videoId) return;

            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            carousel.appendChild(iframe);
        });
    } catch (err) {
        console.error("YouTube API error:", err);
    }
}

function moveCarousel(dir) {
    const items = document.querySelectorAll("#carousel iframe");
    if (items.length === 0) return;

    currentIndex = (currentIndex + dir + items.length) % items.length;

    const carousel = document.getElementById("carousel");
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

loadVideos();