async function loadHeroClip() {
  try {
    const response = await fetch("https://YOUR_GCP_ENDPOINT/latest-hero");
    const data = await response.json();

    if (data.heroClipUrl) {
      const video = document.getElementById("bgVideo");
      video.src = data.heroClipUrl;
    }
  } catch (err) {
    console.log("Fallback video used.");
  }
}

loadHeroClip();