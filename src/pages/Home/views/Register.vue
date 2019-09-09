<template>
  <div class="register container">
    <div v-if="hasInvitation_id">
      <p>{{ $t("fillToRegister") }}</p>
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
        <input
          type="text"
          class="textbox"
          id="username"
          :placeholder="$t('username')"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="textbox"
          id="password"
          :placeholder="$t('password')"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="textbox"
          id="passwordConfirm"
          :placeholder="$t('passwordConfirm')"
          v-model="password2"
        />
      </div>
      <div class="form-group">
        <input type="text" class="textbox" id="sn" :placeholder="$t('sn')" v-model="sn" />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="textbox"
          id="last_name"
          :placeholder="$t('last_name')"
          v-model="last_name"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="textbox"
          id="first_name"
          :placeholder="$t('first_name')"
          v-model="first_name"
        />
      </div>
      <div class="form-group">
        {{ $t("reilizeHowWeSaveYourPrivacyPleaseVisit") }}
        <a href="#">{{ $t("privacyPolicy") }}</a>
      </div>
      <div class="button-box">
        <input type="button" class="btn blue" :value="$t('send')" @click="createUser" />
      </div>
    </div>

    <div v-else>
      <p>{{ $t("registerByEmail") }}</p>
      <div class="form-group">
        <input
          type="text"
          class="textbox"
          id="email-textbox"
          :placeholder="$t('email')"
          v-model="email"
        />
      </div>
      <div class="button-box">
        <input type="button" class="btn blue" :value="$t('send')" @click="requestInvitation" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      hasInvitation_id: false, // TODO implement

      invitation_id: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      sn: "",
      first_name: "",
      last_name: ""
    };
  },
  computed: {},
  methods: {
    requestInvitation() {
      // TODO check form
      let url = "http://127.0.0.1:8000/api/invitation/";
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
    },
    createUser() {
      // TODO check form
      let url = "http://127.0.0.1:8000/api/users/";
      let o = {
        invitation_id: this.invitation_id,
        email: this.email,
        username: this.username,
        password: this.password,
        sn: this.sn,
        first_name: this.first_name,
        last_name: this.last_name
      };
      this.axios
        .post(url, o)
        .then(() => {
          alert("User created"); // TODO beatuy alert
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
