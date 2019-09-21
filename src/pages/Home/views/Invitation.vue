<template>
  <div class="invitation container">
    <p>{{ $t("registerByEmail") }}</p>
    <div class="form-group">
      <input
        type="text"
        class="textbox"
        :class="{'is-invalid':invalidForm.email}"
        :placeholder="$t('email')"
        v-model="email"
      />
    </div>
    <div class="button-box">
      <input type="button" class="btn blue" :value="$t('send')" @click="requestInvitation" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Invitation",
  data() {
    return {
      email: "",

      dirty: { email: false },
      invalidForm: { email: false }
    };
  },
  computed: {},
  watch: {
    email() {
      this.validForm_email();
    }
  },
  methods: {
    validForm_email() {
      this.dirty.email = true;
      this.invalidForm.email = this.email.trim() === "" || this.email.trim().indexOf(" ") > 0;
    },
    validForm() {
      if (this.dirty.email === false) {
        this.validForm_email();
      } else {
        return !this.invalidForm.email;
      }
    },
    requestInvitation() {
      let isValid = this.validForm();
      if (isValid) {
        let url = "http://192.168.1.101:8000/api/invitation/";
        let o = { email: this.email };
        this.axios
          .post(url, o)
          .then(() => {
            alert("Invitation mail sent."); // TODO beatuy alert
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
$pc-padding: 10%;
$phone-padding: 40px;

.container {
  width: 100%;
  padding: 50px $pc-padding;
  @include pc-width {
    padding: 50px $phone-padding;
  }
}
.invitation {
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
