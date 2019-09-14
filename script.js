console.log("script loading...");


/* Media Stream */
const getStream = ()=>{
  return navigator.mediaDevices.getUserMedia({
    video: true,
    //使うカメラをインカメラか背面カメラかを指定する場合には
    //video: { facingMode: "environment" },//背面カメラ
    //video: { facingMode: "user" },//インカメラ
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
  const recorder = new MediaRecorder(stream);
  
  recorder.ondataavailable = e=>{};
  
  recorder.onstop = ()=>{};



  return recorder;
};







document.addEventListener("DOMContentLoaded",async ()=>{
  const stream = await getStream();
  
  console.log(stream);
  

  setPreview(stream);
  
  const recorder = getRecorder();
});


console.log("script loaded!");

