const overlayHTML = `
  <div id="overlay" style="position: fixed; top: 10px; right: 10px; width: 250px; background: rgba(0, 0, 0, 0.1); z-index: 10000; padding: 10px; border-radius: 8px; text-align: center;">
    <button id="start-stop" style="background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 12px; transition: background-color 0.3s ease;">Start</button>
    <button id="close-overlay" style="background-color: #f44336; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 12px; transition: background-color 0.3s ease;">Close</button>
    <video id="screen-video" controls style="display: none; width: 100%; height: auto; margin-top: 10px;"></video>
  </div>
`;

function createOverlay() {
  if (!document.getElementById("overlay")) {
    document.body.insertAdjacentHTML("beforeend", overlayHTML);
    document
      .getElementById("start-stop")
      .addEventListener("click", toggleCapture);
    document
      .getElementById("close-overlay")
      .addEventListener("click", closeOverlay);
  }
}

let mediaRecorder;
let recordedChunks = [];
let stream;

function toggleCapture() {
  const button = document.getElementById("start-stop");
  if (button.textContent === "Start") {
    button.textContent = "Stop";
    startCapture();
  } else {
    button.textContent = "Start";
    stopCapture();
  }
}

async function startCapture() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
      preferCurrentTab: true,
    });

    document.getElementById("screen-video").srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    mediaRecorder.start();
  } catch (err) {
    console.error("Error starting screen capture: ", err);
  }
}

function stopCapture() {
  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const videoElement = document.getElementById("screen-video");
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    videoElement.srcObject = null;
    videoElement.src = url;
    videoElement.style.display = "block";
    recordedChunks = [];

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };
}

function closeOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.remove();
  }
}

createOverlay();
