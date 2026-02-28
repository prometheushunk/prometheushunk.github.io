// config.js provides: window.PH_YT_API_KEY
const API_KEY = window.PH_YT_API_KEY;
const CHANNEL_ID = "UCX5uOaNn-ORyRNPWV2VN_lQ";  // Prometheus Hunk channel ID
const MAX_RESULTS = 3;

async function loadVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

    const res = await fetch(url);
    const data = await res.json();

    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    data.items.forEach(item => {
        const videoId = item.id.videoId;
        if (!videoId) return;

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1"
                allow="autoplay; encrypted-media"
            ></iframe>
        `;

        carousel.appendChild(card);
    });
}

loadVideos();