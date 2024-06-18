const overlayHTML = `
  <div id="overlay">
    <div id="overlay-content">
      <button id="start-stop">Start</button>
      <button id="close-btn">Close</button>
      <video id="screen-video" controls></video>
    </div>
  </div>
`;

const overlayStyle = `
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #overlay-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  #start-stop {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.3s ease;
  }
  #start-stop:hover {
    background-color: #45a049;
  }
  #screen-video {
    display: none;
    width: 100%;
    height: auto;
    margin-top: 20px;
  }
  #close-btn{
    background-color: #af4c4c;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.3s ease;
  }
  #close-btn:hover {
    background-color: #a04545;
  }
`;

function createOverlay() {
  const style = document.createElement("style");
  style.textContent = overlayStyle;
  document.head.append(style);

  const div = document.createElement("div");
  div.innerHTML = overlayHTML;
  document.body.append(div);

  document.getElementById("close-btn").addEventListener("click", closeOverlay);

  document
    .getElementById("start-stop")
    .addEventListener("click", toggleCapture);
}

let mediaRecorder;
let recordedChunks = [];

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
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
  });

  document.getElementById("screen-video").srcObject = stream;
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  mediaRecorder.start();
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
  };
}

function closeOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.remove();
  }
}

createOverlay();
