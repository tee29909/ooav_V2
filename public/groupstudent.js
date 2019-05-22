function checkgroupstudent(){

    console.log(document.getElementById("username").value);
    if(document.getElementById("username").value=="" ){
        alert("กรุณาเลือกนิสิต");
    }else{
        alert("ทำการเพิ่มสำเร็จ");
        document.getElementById("addstudent").submit();
    }

  
}