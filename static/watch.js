var video = document.getElementById('video');
var qualityButtons = document.querySelectorAll('#quality-buttons button');
var episodeButtons = document.getElementById('episode-buttons');
var controlsContainer = document.getElementById('controls-container');
var isMouseMoving = false;
var timeout;

function hideControls() {
  controlsContainer.style.opacity = '0';
  episodeButtons.style.display = 'none';
}

function showControls() {
  controlsContainer.style.opacity = '1';
  episodeButtons.style.display = 'flex';
}

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(hideControls, 3000);
}

document.addEventListener('mousemove', function () {
  if (!isMouseMoving) {
    showControls();
  }
  resetTimeout();
  isMouseMoving = true;
});

controlsContainer.addEventListener('mouseover', function () {
  clearTimeout(timeout);
});

controlsContainer.addEventListener('mouseout', function () {
  resetTimeout();
  isMouseMoving = false;
});

function playVideo(videoUrl) {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoUrl;
    video.addEventListener('loadedmetadata', function () {
      video.play();
    });
  }
}

for (var i = 0; i < qualityButtons.length; i++) {
  qualityButtons[i].addEventListener('click', function () {
    for (var j = 0; j < qualityButtons.length; j++) {
      qualityButtons[j].classList.remove('active');
    }
    this.classList.add('active');
  });
}

function updateNextVideoUrl() {
  // Get the current URL
  var currentUrl = window.location.href;

  // Extract the base URL without the episode number
  var baseEpisodeUrl = currentUrl.substring(0, currentUrl.lastIndexOf('-episode-') + 9);

  // Extract the current episode number from the URL
  var currentEpisode = parseInt(currentUrl.substring(currentUrl.lastIndexOf('-episode-') + 9));

  // Increment the episode number
  var nextEpisode = currentEpisode + 1;

  // Construct the URL for the next episode
  var videoUrl = baseEpisodeUrl + nextEpisode;

  // Redirect to the next episode URL
  window.location.href = videoUrl;
}

function updatePrevVideoUrl() {
  // Get the current URL
  var currentUrl = window.location.href;

  // Extract the base URL without the episode number
  var baseEpisodeUrl = currentUrl.substring(0, currentUrl.lastIndexOf('-episode-') + 9);

  // Extract the current episode number from the URL
  var currentEpisode = parseInt(currentUrl.substring(currentUrl.lastIndexOf('-episode-') + 9));

  // Increment the episode number
  var nextEpisode = currentEpisode - 1;

  // Construct the URL for the next episode
  var videoUrl = baseEpisodeUrl + nextEpisode;

  // Redirect to the next episode URL
  window.location.href = videoUrl;
}

hideControls();
resetTimeout();
