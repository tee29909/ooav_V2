function checkgroup() {

    console.log(document.getElementById("group").value);
    if (document.getElementById("id").value == "") {
        alert("กรุณาใส่เลือกวิชา");
    } else if (document.getElementById("group").value == "") {
        alert("กรุณาใส่ กลุ่ม");
    } else if (document.getElementById("max").value == "") {
        alert("กรุณาใส่ จำนวนนิสิต");
    } else if (document.getElementById("group").value != parseInt(document.getElementById("group").value)) {
        alert("กรอกกลุ่มเฉพาะตัวเลข");
    } else if (document.getElementById("max").value != parseInt(document.getElementById("max").value)) {
        alert("กรอกจำนวนนิสิตเฉพาะตัวเลข");
    } else {
        alert("ทำการแก้ไขสำเร็จ");
        document.getElementById("createbuild").submit();
    }


}