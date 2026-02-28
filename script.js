// -----------------------------
// YOUTUBE API CONFIG
// -----------------------------
const API_KEY = "YOUR_YT_API_KEY_MASKED";  // Placeholder (masked)
const CHANNEL_ID = "UC7mS2fz-ps8_8tMNet6Xn1w"; // PrometheusHunk channel ID
const MAX_RESULTS = 3;

const carousel = document.getElementById("videoCarousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let position = 0;

// --------------------------------------------
// FETCH LATEST VIDEOS
// --------------------------------------------
async function loadVideos() {
    try {
        const url =
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}` +
            `&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

        const res = await fetch(url);
        const data = await res.json();

        carousel.innerHTML = "";

        data.items.forEach(video => {
            if (video.id.videoId) {
                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${video.id.videoId}`;
                iframe.allowFullscreen = true;
                carousel.appendChild(iframe);
            }
        });
    } catch (err) {
        console.error("YouTube Fetch Error:", err);
    }
}

// --------------------------------------------
// CAROUSEL CONTROL
// --------------------------------------------
nextBtn.addEventListener("click", () => {
    position = Math.min(position + 1, MAX_RESULTS - 1);
    carousel.style.transform = `translateX(-${position * 100}%)`;
});

prevBtn.addEventListener("click", () => {
    position = Math.max(position - 1, 0);
    carousel.style.transform = `translateX(-${position * 100}%)`;
});

// Auto-slide every 5 seconds
setInterval(() => {
    position = (position + 1) % MAX_RESULTS;
    carousel.style.transform = `translateX(-${position * 100}%)`;
}, 5000);

// Init
loadVideos();