function checksemester() {
    var tmp_year = document.getElementById("year").value;
    var tmp_semester = document.getElementById("semester").value;


    if (tmp_year == "" || tmp_semester == "") {
        alert("กรุณากรอกข้อมูลให้ครบ")
        return false;
    } else if (tmp_year.length != 4 ) {
        alert("กรุณากรอกปีการศึกษาให้ถูกต้อง")
        return false;
    } else if (tmp_year != parseInt(tmp_year)) {
        alert("กรอกรหัสปีการศึกษาเฉพาะตัวเลขเท่านั้น")
        return false;

    } else if (tmp_semester != parseInt(tmp_semester)) {
        alert("กรอกเทอมเฉพาะตัวเลขเท่านั้น")
        return false;
    } else {
        alert("เปลี่ยนปีการศึกษาเรียบร้อย");
        document.getElementById("semester1").submit();
    }
}