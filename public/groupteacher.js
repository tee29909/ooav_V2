function checkgroupteacher(){

    console.log(document.getElementById("username").value);
    if(document.getElementById("username").value=="" ){
        alert("กรุณาเลือกอาจารย์");
    }else{
        alert("ทำการเพิ่มสำเร็จ");
        document.getElementById("addteacher").submit();
    }

  
}