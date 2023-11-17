export default {
    methods:{
        
        requestResponseCheck(response,form){
    if (response.message === "OK") {
      this.editStatus = {
        show: true,
        text: "İşlem Başarılı",
        variant: "success",
        icon: "fa-check",
      };
      this.sendNotification("Uyarı", "İşlem Başarılı", "success");
    } else {
      this.sendNotification("Uyarı", "İşlem Başarısız", "danger");
      this.editStatus = {
        show: true,
        text: "İşlem Başarısız",
        variant: "danger",
        icon: "fa-times",
      };
    }
    setTimeout(() => {
      this.editStatus.show = false;
      form.show = false
    }, 850);
  },
  sendNotification(title, body, variant = "success") {
    this.$bvToast.toast(body, {
      title,
      autoHideDelay: 5000,
      variant,
      toast: "b-toaster-bottom-center",
      appendToast: true,
    });
  },
    }
}

