<template>
  <div class="login">
    <div class="login_logo">
      <img src="/MusicAI_logo.png" alt="로고" style="width:110px; height:70px;">
      <div class="logo">MusicAi</div>
    </div>
    <v-container class="login_box">
      <v-text-field v-model="user.id" label="아이디"></v-text-field>
      <v-text-field v-model="user.password" label="비밀번호"></v-text-field>
      <div class="text-center">
        <v-btn class="mr-2" @click="login">로그인</v-btn>
        <v-btn @click="moveJoin()">회원가입</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      user: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    moveJoin() {
      this.$router.push("/join")
    },
    login() {
      this.$axios.post("/api/user/login", this.user)
        .then(result => {
          if (result.data.result == "ok") {
            console.log(result.data)
            this.$store.commit("setLoginUser", result.data.user)
            alert("MusicAi 환영합니다:)")
            this.$router.push("/main")
          }
          else {
            alert(result.data.message)
          }
        })
    }
  }
});
</script>

<style>
.login {

  padding-left: 300px;
  padding-right: 300px;
}

.logo {
  font-size: 30px;
  font-weight: 600;
  color: #4FEBF0;
}

.login_logo {
  text-align: center;
  margin: 30px;
}

.login_box {
  width: 50%;
}
</style>