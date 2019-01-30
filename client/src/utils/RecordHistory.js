


function Record(value){
          var History = [];

     let arr = {word:'',time:''};
     let time  = new Date();
     if(localStorage.getItem("history", JSON.stringify(History)) != null ){
          History = JSON.parse(localStorage.getItem("history", JSON.stringify(History)));

     }
     arr.word = value;
     arr.time =  time;

     if(History.length>4){
     	History.shift();
        History.push(arr);
               localStorage.setItem("history", JSON.stringify(History));

     }
     else{
     	History.push(arr);
                    localStorage.setItem("history", JSON.stringify(History));

     }

}

export default Record;