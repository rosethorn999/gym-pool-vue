<template>
  <div class="login container">
    <p>{{ $t("newPasswordWillSentToEmail") }}</p>
    <div class="form-group">
      <input
        type="text"
        class="textbox"
        id="email-textbox"
        :placeholder="$t('email')"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <input type="text" class="textbox" id="sn-textbox" :placeholder="$t('sn')" v-model="sn" />
    </div>
    <div class="button-box">
      <input type="button" class="btn blue" :value="$t('back')" @click="$router.go(-1)" />
      <input type="button" class="btn blue" :value="$t('send')" @click="resetPassword" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      sn: ""
    };
  },
  computed: {},
  methods: {
    resetPassword() {
      // TODO check form
      let url = "http://127.0.0.1:8000/api/password_reset/";
      let o = {
        email: this.email,
        sn: this.sn
      };
      this.axios
        .post(url, o)
        .then(() => {
          alert("Your new password had sent to your email"); // TODO beatuy alert
        })
        .catch(function(error) {
          // TODO error control
          console.error(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 50px 250px;
}
.login {
  background: #f5f7f8;
  text-align: center;
}

.form-group {
  width: 100%;
  margin-bottom: 12px;
  display: block;
}
.textbox {
  padding: 10px;
  border: 1px solid #707070;
  margin-bottom: 40px;
  width: 30%;
  min-width: 250px;
  height: 57px;
  line-height: 57px;
  display: block;
  margin: 0px auto;
}
.button-box {
  margin-top: 50px;
}
.btn {
  height: 40px;
  padding: 5px 30px;
  border-radius: 13px;
  margin-left: 25px;
  cursor: pointer;
  &.blue {
    background: #1977f2;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
}
</style>
