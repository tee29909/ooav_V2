function checkEditbuild() {
  var tmp_ID = document.getElementById("ID").value;
  var tmp_floor = document.getElementById("floor").value;
  var tmp_name = document.getElementById("name").value;

  console.log(tmp_ID);
  console.log(tmp_floor);
  console.log(tmp_name);
  if (tmp_ID == "" || tmp_floor == "" || tmp_name == "") {
    alert("กรอกข้อมูลให้ครบ");
    return false;
  }
 if(!tmp_ID.match(/^([a-zA-Z])+$/i) ){
    alert("รหัสตึก ต้องเป็นตัวอักษรภาษาอังกฤษ")
    return false;
  }
  //  if(tmp_name = parseInt(tmp_name) || !tmp_name.match(/^([a-zA-Z])+$/i)  ){
  //   alert("กรอกชื่อเฉพาะตัวอักษรภาษาอังกฤษ");
  //   return false;
  // }
  if(tmp_floor != parseInt(tmp_floor)){
    alert("กรอกชั้นเฉพาะตัวเลข");
    return false;
  }
  else {
    alert("แก้ไขข้อมูลเรียบร้อย");
    document.getElementById("editBuild").submit();
  }
}