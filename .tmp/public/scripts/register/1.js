$(function(){
      $('#proceed').click(function(e) {
        //e.preventDefault();
            var username = $('#username').val();
            var password = $('#password').val();
            var confirmation = $('#password2').val();
            var nama = $("#nama").val();
            var nohp = $("#nohp").val();
            var namabank = $("bank").val();
            var namarek = $("#namarek").val();
            var norek = $("#rekening").val();
            var email = $("email").val();
            var pin = $("#pin").val();
            var pin2 = $("#pin2").val();
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
            if(nama.length<=0)
            {
                  alert("Nama harap diisi");
                  return false;
            }
            if(nohp.length<=0)
            {
                  alert("Nomor HP harap diisi");
                  return false;
            }
            if(namabank.length<=0)
            {
                  alert("Nama Bank harap diisi");
                  return false;
            }
            if(namarek.length<=0)
            {
                  alert("Nama Rekening harap diisi");
                  return false;
            }
            if(norek.length<=0)
            {
                  alert("Nomor Rekening harap diisi");
                  return false;
            }
            if(email.length<=0)
            {
                  alert("Email harap diisi");
                  return false;
            }
            if(pin.length!=6)
            {
                  alert("PIN harus berisi 6 angka");
                  return false;
            }
             if(pin!=pin2)
            {
                  alert("PIN dan konfirmasi PIN harus sama");
                  return false;
            }
      });
});