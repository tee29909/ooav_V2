function checkCreatesub() {
    var tmp_ID = document.getElementById("ID").value;
    var tmp_name = document.getElementById("name").value;
    //var tmp_group = document.getElementById("group").value;
  
    if(tmp_ID == ""  || tmp_name ==""){
        alert("กรุณากรอกข้อมูลให้ครบ")
        return false;
    }else if(tmp_ID.length < 8 ){
        alert("กรุณากรอกรหัสวิชาให้ครบ 8 ตัว")
        return false;
    }else if(tmp_ID.length > 8 ){
        alert("กรุณากรอกรหัสวิชาให้ครบ 8 ตัว")
        return false;
    }
    else if(tmp_ID!= parseInt(tmp_ID)){
        alert("กรอกรหัสวิชาเฉพาะตัวเลขเท่านั้น")
        return false;
    }else if(!tmp_name.match(/^([a-zA-Z0-9])+$/i)){
        alert("กรอกชื่อวิชาเฉพาะตัวอักษรภาษาอังกฤษเท่านั้น")
        return false;
    }/*else if(tmp_group!= parseInt(tmp_group)){
        alert("กรอกกลุ่มวิชาเฉพาะตัวเลขเท่านั้น")
        return false;
    }*/else {
        alert("เพิ่มข้อมูลเรียบร้อย");
        document.getElementById("createsub").submit();
      }
}
