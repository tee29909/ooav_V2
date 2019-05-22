function checkEditsub() {
    var tmp_ID = document.getElementById("ID").value;
    var tmp_name = document.getElementById("name").value;
   
  
    if(tmp_ID == ""  || tmp_name ==""){
        alert("กรุณากรอกข้อมูลให้ครบ")
        return false;
    }else if(tmp_ID.length < 8){
        alert("กรุณากรอกรหัสวิชาให้ครบ 8 ตัว")
        return false;
    }else if(tmp_ID!= parseInt(tmp_ID)){
        alert("กรอกรหัสวิชาเฉพาะตัวเลขเท่านั้น")
        return false;
    }else {
        alert("แก้ไขข้อมูลเรียบร้อย");
        document.getElementById("editsub").submit();
      }
}
