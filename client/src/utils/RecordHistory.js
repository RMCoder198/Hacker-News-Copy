var History = [];

function Record(value){
     
     let arr = {word:'',time:''};
     let time  = new Date();
     
     arr.word = value;
     arr.time =  time;

     if(History.length>4){
     	History.shift();
        History.push(arr);
     }
     else{
     	History.push(arr);
     }
}

export {History, Record};