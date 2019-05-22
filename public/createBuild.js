function checkCreatebuild() {
    var tmp_ID = document.getElementById("ID").value;
    var tmp_floor = document.getElementById("floor").value;
    var tmp_name = document.getElementById("name").value;
    if (tmp_ID == "" || tmp_floor == "" || tmp_name == "") {
      alert("กรอกข้อมูลให้ครบ");
      return false;
    }
   if(!tmp_ID.match(/^([a-zA-Z])+$/i) ){
      alert("รหัสตึก ต้องเป็นตัวอักษรภาษาอังกฤษ")
      return false;
    }
     
    if(tmp_floor != parseInt(tmp_floor)){
      alert("กรอกชั้นเฉพาะตัวเลข");
      return false;
    }
    else {
      alert("เพิ่มข้อมูลเรียบร้อย");
      document.getElementById("createbuild").submit();
    }
  }