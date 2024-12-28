// Function to play or stop sounds
function toggleSound(soundId, button) {
    const sound = document.getElementById(soundId);

    // If there is a currently playing sound, pause it and remove its visual indication
    if (currentlyPlayingSound && currentlyPlayingSound !== sound) {
        currentlyPlayingSound.pause();
        currentlyPlayingButton.classList.remove('playing');
    }

    // Reset the current time of the sound to the beginning
    sound.currentTime = 0;

    // Play the selected sound
    if (sound.paused) {
        sound.play();
        currentlyPlayingSound = sound;
        currentlyPlayingButton = button;
        button.classList.add('playing'); // Add visual indication to the button
        isPlaying = true;
        updatePlayPauseButton();
    } else {
        sound.pause();
        currentlyPlayingSound = null;
        currentlyPlayingButton.classList.remove('playing'); // Remove visual indication from the button
        isPlaying = false;
        updatePlayPauseButton();
    }
}

// Function to update the play/pause button state based on the current sound state
function updatePlayPauseButton() {
    const playPauseButton = document.getElementById('playPauseBtn');

    if (isPlaying) {
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// Function to handle play/pause button click
function playPauseSound() {
    if (isPlaying) {
        currentlyPlayingSound.pause();
        isPlaying = false;
        updatePlayPauseButton();
    } else {
        if (currentlyPlayingSound) {
            currentlyPlayingSound.play();
            isPlaying = true;
            updatePlayPauseButton();
        } else {
            // Play the first sound (sound1)
            const firstSound = document.getElementById('sound1');
            firstSound.play();
            currentlyPlayingSound = firstSound;
            isPlaying = true;
            updatePlayPauseButton();
        }
    }
}

// Function to handle sound ended event
function soundEnded() {
    const button = currentlyPlayingButton;
    if (button) {
        button.classList.remove('playing');
    }
    currentlyPlayingSound = null;
    isPlaying = false;
    updatePlayPauseButton();
}

// Set up event listeners for sound buttons
const soundButtons = document.querySelectorAll('.sound-btn');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false; // This tracks the overall play state (whether any sound is playing)
let currentlyPlayingSound = null; // This will track the currently playing sound
let currentlyPlayingButton = null; // This will track the currently playing button

soundButtons.forEach(button => {
    const soundId = button.getAttribute('data-sound');
    const iconClass = button.getAttribute('data-icon');
    const buttonColor = button.getAttribute('data-color');

    // Set icon and color dynamically
    button.innerHTML = `<i class="${iconClass}"></i>`;
    button.style.backgroundColor = buttonColor;

    button.addEventListener('click', () => {
        toggleSound(soundId, button);
    });
});

// Play/Pause button functionality
playPauseBtn.addEventListener('click', playPauseSound);

// Add event listener for sound ended event
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('ended', soundEnded);
});