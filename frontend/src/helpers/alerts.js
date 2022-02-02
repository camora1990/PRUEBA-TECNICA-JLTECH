import Swal from "sweetalert2";
const alerts = {
  error: function (title, text) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  },
  sucess: (text) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  },
};

export { alerts };
