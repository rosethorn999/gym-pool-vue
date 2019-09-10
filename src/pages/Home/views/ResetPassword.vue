<template>
  <div class="login container">
    <p>{{ $t("newPasswordWillSentToEmail") }}</p>
    <div class="form-group">
      <input
        type="text"
        class="textbox"
        :class="{'is-invalid':invalidForm.email}"
        :placeholder="$t('email')"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        class="textbox"
        :class="{'is-invalid':invalidForm.sn}"
        :placeholder="$t('sn')"
        v-model="sn"
      />
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
      sn: "",

      dirty: { email: false, sn: false },
      invalidForm: { email: false, sn: false }
    };
  },
  computed: {},
  watch: {
    email() {
      this.validForm_email();
    },
    sn() {
      this.validForm_sn();
    }
  },
  methods: {
    validForm_email() {
      this.dirty.email = true;
      this.invalidForm.email = this.email.trim() === "" || this.email.trim().indexOf(" ") > 0;
    },
    validForm_sn() {
      this.dirty.sn = true;
      this.invalidForm.sn = this.sn.trim() === "" || this.sn.trim().indexOf(" ") > 0;
    },
    validForm() {
      if (this.dirty.email === false || this.dirty.password === false) {
        this.validForm_email();
        this.validForm_sn();
      } else {
        return !(this.invalidForm.email || this.invalidForm.sn);
      }
    },
    resetPassword() {
      let isValid = this.validForm();
      if (isValid) {
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
  &.is-invalid,
  &.is-invalid:focus {
    border-color: #dc3545;
    outline: 0;
  }
}
.button-box {
  margin-top: 50px;
}
</style>
