function TimeDifference(time) {
	var a  =new Date();
	var b = new Date(time);
	 var year = a.getFullYear() - b.getFullYear();
	 var months = a.getMonth() - b.getMonth();
     var day =  a.getDate() - b.getDate();
     var hours  = a.getHours() - b.getHours();
     var minutes = a.getMinutes() - b.getMinutes();
     var seconds = a.getSeconds() - b.getSeconds();
     if(year>0)
     	return year+" "+"year ago";
     else if(months>0)
     	return months+" "+"months ago";
     else if(day>0)
     	return day+" "+"days ago";
     else if(hours>0)
          return hours+" "+"hours ago";
     else if(minutes>0)
     	return minutes+" "+"minutes ago";
     else if(seconds>0)
     	return seconds+" "+"seconds ago";

}
export default TimeDifference;