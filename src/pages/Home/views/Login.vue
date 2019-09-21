<template>
  <div class="login container">
    <p>{{ $t("loginByEmail") }}</p>
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
        type="password"
        class="textbox"
        :class="{'is-invalid':invalidForm.password}"
        :placeholder="$t('password')"
        v-model="password"
      />
    </div>
    <div class="form-group">
      <p>
        <router-link to="/resetPassword">{{ $t("forgetPassword") }}?</router-link>
      </p>
    </div>
    <div class="button-box">
      <input type="button" class="btn blue" :value="$t('send')" @click="login" />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",

      dirty: { email: false, password: false },
      invalidForm: { email: false, password: false }
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  },
  watch: {
    email() {
      this.validForm_email();
    },
    password() {
      this.validForm_password();
    }
  },
  methods: {
    validForm_email() {
      this.dirty.email = true;
      this.invalidForm.email = this.email.trim() === "" || this.email.trim().indexOf(" ") > 0;
    },
    validForm_password() {
      this.dirty.password = true;
      this.invalidForm.password = this.password.trim() === "" || this.password.trim().indexOf(" ") > 0;
    },
    validForm() {
      if (this.dirty.email === false || this.dirty.password === false) {
        this.validForm_email();
        this.validForm_password();
      } else {
        return !(this.invalidForm.email || this.invalidForm.password);
      }
    },
    login() {
      let isValid = this.validForm();
      if (isValid) {
        let url = "http://192.168.1.101:8000/api-token-auth/";
        let o = {
          email: this.email,
          password: this.password
        };
        this.axios
          .post(url, o)
          .then(response => {
            Swal.fire(this.$t("hi"), this.$t("welcomeBack") + "!", "success").then(() => {
              let token = "jwt " + response.data.token;
              this.$store.commit("setToken", token);
              this.getUser();
            });
          })
          .catch(function(error) {
            const title = error.response.status.toString();
            const msg = JSON.stringify(error.response.data);
            Swal.fire(title, msg, "error");
            console.error(error);
          });
      }
    },
    getUser() {
      let url = "http://192.168.1.101:8000/api/users/";
      let headers = { headers: { Authorization: this.token } };
      this.axios
        .get(url, headers)
        .then(response => {
          let user = response.data[0];
          this.$store.commit("setUser", user);
          this.$router.push({ name: "Index" });
        })
        .catch(function(error) {
          const title = error.response.status.toString();
          const msg = JSON.stringify(error.response.data);
          Swal.fire(title, msg, "error");
          console.error(error);
        });
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
