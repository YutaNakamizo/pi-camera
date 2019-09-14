console.log("script loading...");


/* Media Stream */
const getStream = ()=>{
  return navigator.mediaDevices.getUserMedia({
    video: true,
    //$B;H$&%+%a%i$r%$%s%+%a%i$+GXLL%+%a%i$+$r;XDj$9$k>l9g$K$O(B
    //video: { facingMode: "environment" },//$BGXLL%+%a%i(B
    //video: { facingMode: "user" },//$B%$%s%+%a%i(B
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

