<template>
  <div class="account">
    <div class="container">
      <div class="block">
        <h3>{{ $t("memberInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("_id") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="id" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("username") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="username" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("email") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="email" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("first_name") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="first_name" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("last_name") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="last_name" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("county") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="county" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("birth_date") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="birth_date" />
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <h3>{{ $t("contactInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("facebook_id") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="facebook_id" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("line_id") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="line_id" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("tg_id") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="tg_id" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("mobile") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="mobile" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("phone") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="phone" />
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <h3>{{ $t("securityInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("date_joined") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="date_joined" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("modify_time") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="modify_time" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("last_login") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="last_login" disabled />
            </div>
          </div>
        </div>
      </div>

      <div class="button-box">
        <input type="button" class="btn blue" :value="$t('done')" @click="done" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "account",
  props: {},
  data() {
    return {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      birth_date: "",
      county: "",

      facebook_id: "",
      line_id: "",
      tg_id: "",
      mobile: "",
      phone: "",

      date_joined: "",
      modify_time: "",
      last_login: ""
    };
  },
  mounted() {
    // TODO implement
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};

    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.email = user.email;
    this.birth_date = user.birth_date;
    this.county = user.county;

    this.facebook_id = user.facebook_id;
    this.line_id = user.line_id;
    this.tg_id = user.tg_id;
    this.mobile = user.mobile;
    this.phone = user.phone;

    this.date_joined = user.date_joined;
    this.modify_time = user.modify_time;
    this.last_login = user.last_login;
  },
  methods: {
    done() {
      // TODO save
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 50px 250px;
}
.block {
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  padding: 10px 20px;
  margin-bottom: 30px;
  h3 {
    color: #0350cc;
  }
  > div {
    padding: 0px 180px;
  }
}
.form-group {
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  label {
    text-align: right;
    flex: 1;
    min-width: 80px;
    padding-right: 18px;
  }
  .control-box {
    flex: 4;
    width: 100%;
    > div,
    > input,
    > select {
      width: 100%;
    }
  }
}
.button-box {
  text-align: right;
}
</style>
