function checkexamroom(){

   
    console.log(document.getElementById("type2").value);
    if(document.getElementById("type2").value=="" ){
        alert("กรุณาเลือกห้อง");
    }else{
        alert("ทำการเพิ่มสำเร็จ");
        document.getElementById("addexamroom").submit();
    }

  
}