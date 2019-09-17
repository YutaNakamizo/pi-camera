console.log("script loading...");


const chunks = [];


/* Media Stream */
const getStream = ()=>{
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: 1920,
      height: 1080
    },
    audio: true
  });
};




/* Preview Area */
const setPreview = (stream)=>{
  const screen = document.getElementById("preview");
  screen.srcObject = stream;
};



/* Video Recording */
const getRecorder = stream=>{
  const recorder = new MediaRecorder(stream, {mimeType: "video/webm; codecs=h264"});
  
  recorder.ondataavailable = e=>{
    console.log(e);
    chunks.push(e.data);
  };
  
  recorder.onstop = e=>{
    console.log(e);
    const blob = new Blob(chunks, {type: "video/mp4"});
    chunks.length = 0;

    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a') // download属性を持ったaタグをクリックするとダウンロードができるので、それをシミュレートする
    a.style = 'display:none'
    a.href = url;
    a.download = 'test.mp4'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  };

  return recorder;
};









document.addEventListener("DOMContentLoaded",async ()=>{
  const video_start = document.getElementById("control_video-start");
  const video_stop = document.getElementById("control_video-stop");
  const status_mode = document.getElementById("status_mode");
  const status_status = document.getElementById("status_status");
  const status_size = document.getElementById("status_size");
  const status_length = document.getElementById("status_length");
  

  const stream = await getStream();
  
  setPreview(stream);
  
  const recorder = getRecorder(stream);

  video_start.onclick = ()=>{
    status_status.innerText = "Recording";
    
    const interval_id = setInterval(()=>{
      status_length.innerText = Number(status_length.innerText.slice(0,-1)) + 1 + "s";
    }, 1000);
    window.intervalId = interval_id;

    recorder.start(1000*60 * 5);
    
  };

  video_stop.onclick = ()=>{
    recorder.stop();
    clearInterval(window.intervalId);

    status_status.innerText = "stand-by";
    status_length.innerText = "0s";

  };
  
});


console.log("script loaded!");

