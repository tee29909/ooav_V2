function checknull(){
    console.log(document.getElementById("username").value);
    if(document.getElementById("username").value==""){
        alert("กรุณาใส่ username");
    }else if(document.getElementById("password").value==""){
        alert("กรุณาใส่ password");
    }else if(document.getElementById("firstName").value==""){
        alert("กรุณาใส่ firstName");
    }else if(document.getElementById("lastName").value==""){
        alert("กรุณาใส่ lastName");
    }else if(document.getElementById("type").value==""){
        alert("กรุณาเลือกประเภทผู้ใช้");
    }else{
        alert("ทำการแก้ไขสำเร็จ");
        document.getElementById("us").submit();
    }

  
}