// LOAD VIDEOS FROM YOUTUBE
const API_KEY = YT_API_KEY; 
const CHANNEL_ID = "UCyQ0lZ8JTT_Xpn6bezW0RMw";
const MAX_RESULTS = 6;

let videoOffset = 0;

async function loadVideos() {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.items) return;

        const container = document.getElementById("video-container");

        data.items.forEach(item => {
            if (item.id.videoId) {
                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`;
                container.appendChild(iframe);
            }
        });

    } catch (e) {
        console.error("Failed loading YouTube videos:", e);
    }
}

function slideCarousel(direction) {
    const container = document.getElementById("video-container");
    const cardWidth = 345;
    videoOffset += direction * cardWidth;
    container.style.transform = `translateX(${-videoOffset}px)`;
}

window.onload = () => loadVideos();