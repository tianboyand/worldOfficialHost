$(function(){
      $('#proceed').click(function(e) {
      	//e.preventDefault();
            var username = $('#username').val();
            var password = $('#password').val();
            var confirmation = $('#password2').val();
            var ref="1";
            if(username.length<=0)
            {
                  alert("Username harap diisi");
                  return false;
            }
            if(password.length<6)
            {
                  alert("Password harus memiliki panjang minimal 6");
                  return false;
            }
            if(password!=confirmation)
            {
                  alert("Password dan konfirmasi password harus sama");
                  return false;
            }
      });
});