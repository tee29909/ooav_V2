function checkexaminvigilator(){

    console.log(document.getElementById("type").value);
    console.log(document.getElementById("type2").value);
    if(document.getElementById("type").value=="" ){
        alert("กรุณาเลือกผู้คุมสอบ");
    }else if(document.getElementById("type2").value=="" ){
        alert("กรุณาเลือกห้อง");
    }else{
        alert("ทำการเพิ่มสำเร็จ");
        document.getElementById("addinvigilator").submit();
    }

  
}