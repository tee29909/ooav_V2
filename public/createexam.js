function checkCreateexam() {
    //var ID = document.getElementById("ID").value;
    var bday = document.getElementById("bday").value;
    var appt = document.getElementById("appt-time").value;
    var appt1 = document.getElementById("appt-time1").value;
    var type = document.getElementById("type").value;

    if ( bday == "" || appt == "" || appt1 == "" || type == "") {
        alert("กรอกข้อมูลให้ครบ");
        return false;
    }
    //    if(!tmp_ID.match(/^([a-zA-Z])+$/i) ){
    //       alert("รหัสตึก ต้องเป็นตัวอักษรภาษาอังกฤษ")
    //       return false;
    //     }
    //      if(tmp_name = parseInt(tmp_name) || !tmp_name.match(/^([a-zA-Z])+$/i)  ){
    //       alert("กรอกชื่อเฉพาะตัวอักษรภาษาอังกฤษ");
    //       return false;
    //     }
    //     if(tmp_floor != parseInt(tmp_floor)){
    //       alert("กรอกชั้นเฉพาะตัวเลข");
    //       return false;
    //     }
    else {
        alert("เพิ่มข้อมูลเรียบร้อย");
        document.getElementById("createexam").submit();
    }
}