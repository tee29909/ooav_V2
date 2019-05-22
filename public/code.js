function check()
	{
        var elem = document.getElementById('year').value;
        // console.log(elem)
		// if(!elem.match(/^[a-zก-ฮ][a-zก-ฮ-\d]$/i))
		// {
		// 	alert("กรอกได้เฉพาะตัวอักษรภาษาอังกฤษเท่านั้น");
		// 	document.getElementById('year').value = "";
        // }
    regex1 =/^[a-zก-ฮ]+$/
	regex2=/^[a-zก-ฮ][a-zก-ฮ-\d]+$/i
	regex3=/^(\d|-)+$/i
	


	if( elem.match(regex1) ){  //
        alert("ตัวแรกไม่ได้เป็นตัวอักษร");
	}else if(elem.match(regex2) || elem.match(regex3) ){  //
		alert("ตัวที่สองไม่ได้เป็นตัวอักษรหรือตัวเลขหรือ - ได้");
	}else if( elem.match(regex3)){  //ตัวที่สามเป็นต้นไปไม่ใช้ตัวเลขหรือ -
        alert("ตัวที่สามเป็นต้นไปไม่ใช้ตัวเลขหรือ -");
	}else{
        alert("พ่องตาย");
    }
    }
    
// if(isNaN(elem))
		// {
		// 	alert("กรอกได้เฉพาะตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น");
		// 	document.getElementById('test_txt').value = "";
        // }