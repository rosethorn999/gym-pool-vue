<template>
  <div class="login container">
    <p>{{ $t("loginByEmail") }}</p>
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
        type="password"
        class="textbox"
        id="password-textbox"
        :placeholder="$t('password')"
        v-model="password"
      />
    </div>
    <div class="form-group">
      <p>
        <router-link to="/resetPassword">{{ $t("forgetYourPassword") }}?</router-link>
      </p>
    </div>
    <div class="button-box">
      <input type="button" class="btn blue" :value="$t('send')" @click="login" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    login() {
      // TODO check form
      let url = "http://127.0.0.1:8000/api-token-auth/";
      let o = {
        email: this.email,
        password: this.password
      };
      this.axios
        .post(url, o)
        .then(response => {
          alert("Welcome home"); // TODO beatuy alert
          sessionStorage.setItem("token", "jwt " + response.data.token);
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
