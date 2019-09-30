<template>
  <div class="register container">
    <p>{{ $t("fillToRegister") }}</p>
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
        :class="{'is-invalid':invalidForm.username}"
        :placeholder="$t('username')"
        v-model="username"
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
      <input
        type="password"
        class="textbox"
        :class="{'is-invalid':invalidForm.password}"
        :placeholder="$t('passwordConfirm')"
        v-model="password2"
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
    <div class="form-group">
      <input
        type="text"
        class="textbox"
        :class="{'is-invalid':invalidForm.last_name}"
        :placeholder="$t('last_name')"
        v-model="last_name"
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        class="textbox"
        :class="{'is-invalid':invalidForm.first_name}"
        :placeholder="$t('first_name')"
        v-model="first_name"
      />
    </div>
    <div class="form-group">
      {{ $t("reilizeHowWeSaveYourPrivacyPleaseVisit") }}
      <router-link to="/privacyPolicy">{{ $t("privacyPolicy") }}</router-link>
    </div>
    <div class="button-box">
      <input type="button" class="btn blue" :value="$t('send')" @click="createUser" />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
const { basicRequest } = require("@/apis/api.js");

export default {
  name: "Register",
  mounted: function() {
    let invitation_id = this.$route.query.id;
    if (invitation_id) {
      this.invitation_id = invitation_id;
    } else {
      alert("error");
    }
  },
  data() {
    return {
      invitation_id: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      sn: "",
      first_name: "",
      last_name: "",

      dirty: {
        email: false,
        username: false,
        password: false,
        sn: false,
        first_name: false,
        last_name: false
      },
      invalidForm: {
        email: false,
        username: false,
        password: false,
        password2: false,
        sn: false,
        first_name: false,
        last_name: false
      }
    };
  },
  computed: {},
  watch: {
    email() {
      this.validForm_email();
    },
    username() {
      this.validForm_username();
    },
    password() {
      this.validForm_password();
    },
    password2() {
      this.validForm_password();
    },
    sn() {
      this.validForm_sn();
    },
    first_name() {
      this.validForm_first_name();
    },
    last_name() {
      this.validForm_last_name();
    }
  },
  methods: {
    validForm_email() {
      this.dirty.email = true;
      this.invalidForm.email = this.email.trim() === "" || this.email.trim().indexOf(" ") > 0;
    },
    validForm_username() {
      this.dirty.username = true;
      this.invalidForm.username = this.username.trim() === "" || this.username.trim().indexOf(" ") > 0;
    },
    validForm_password() {
      this.dirty.password = true;
      this.invalidForm.password =
        this.password.trim() !== this.password2.trim() ||
        this.password.trim() === "" ||
        this.password.trim().indexOf(" ") > 0;
    },
    validForm_sn() {
      this.dirty.sn = true;
      const reSn = /^[A-Z]\d{9}$/;
      this.invalidForm.sn = !reSn.exec(this.sn);
    },
    validForm_first_name() {
      this.dirty.first_name = true;
      this.invalidForm.first_name = this.first_name.trim() === "" || this.first_name.trim().indexOf(" ") > 0;
    },
    validForm_last_name() {
      this.dirty.last_name = true;
      this.invalidForm.last_name = this.last_name.trim() === "" || this.last_name.trim().indexOf(" ") > 0;
    },
    validForm() {
      if (
        this.dirty.email === false ||
        this.dirty.username === false ||
        this.dirty.password === false ||
        this.dirty.sn === false ||
        this.dirty.first_name === false ||
        this.dirty.last_name === false
      ) {
        this.validForm_email();
        this.validForm_username();
        this.validForm_password();
        this.validForm_sn();
        this.validForm_first_name();
        this.validForm_last_name();
      } else {
        return !(
          this.invalidForm.email ||
          this.invalidForm.username ||
          this.invalidForm.password ||
          this.invalidForm.sn ||
          this.invalidForm.first_name ||
          this.invalidForm.last_name
        );
      }
    },
    createUser() {
      let isValid = this.validForm();
      if (isValid) {
        let url = "/user/";
        let o = {
          invitation_id: this.invitation_id,
          email: this.email,
          username: this.username,
          password: this.password,
          sn: this.sn,
          first_name: this.first_name,
          last_name: this.last_name
        };
        // TODO show loading animation
        basicRequest
          .post(url, o)
          .then(() => {
            const msg = this.$t("registerSucc", [this.email]);
            Swal.fire(this.$t("done"), msg, "success").then(() => {
              this.$router.push({ name: "Login" });
            });
          })
          .catch(function(error) {
            const title = error.response.status.toString();
            const msg = JSON.stringify(error.response.data);
            Swal.fire(title, msg, "error");
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
  padding: 50px $pc-padding;
  @include pc-width {
    padding: 50px $phone-padding;
  }
}
.register {
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
a:link,
a:visited {
  color: $blue;
}
a:hover {
  color: $electricblue;
}
</style>
