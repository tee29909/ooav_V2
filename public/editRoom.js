function checkEditroom() {
    var tmp_ID = document.getElementById("ID").value;
    var tmp_floor = document.getElementById("floor").value;
    if (tmp_ID == "" || tmp_floor == "") {
        alert("กรอกข้อมูลให้ครบ");
        return false;
    }
    if (!tmp_ID.match(/^([a-zA-Z0-9])+$/i)) {
        alert("รหัสห้อง ต้องเป็นตัวอักษรภาษาอังกฤษ");
        return false;
    }
    if (tmp_floor != parseInt(tmp_floor)) {
        alert("กรอกชั้นเฉพาะตัวเลข");
        return false;
    } else {
        alert("แก้ไขข้อมูลเรียบร้อย");
        document.getElementById("editRoom").submit();
    }
}