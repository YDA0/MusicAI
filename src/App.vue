<template>
  <v-app>
    <div class="header">
      <v-layout align-center>
        <v-layout @click="this.$router.push('/')">
          <img src="/MusicAI_logo.png" alt="로고" style="width:100px; height:60px; margin-right: 15px; margin-left: 30px;">
          <div class="logo">MusicAi</div>
        </v-layout>
        <v-spacer></v-spacer>
        <div class="user" v-if="$store.state.loginUser">
          {{ $store.state.loginUser.name }}
        </div>
        <div><v-btn class="btn" flat @click="logout" v-if="$store.state.loginUser">로그아웃</v-btn></div>
      </v-layout>
    </div>
    <v-main>
      <router-view />
    </v-main>
    <div class="footer">
      <v-layout justify-center align-center>
        <span>&copy; 2023 MusicAi. All rights reserved.</span>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    this.$axios.post("/api/user/info")
      .then(result => {
        if (result.data.result == "ok") {
          this.$store.commit("setLoginUser", result.data.user)
        }
      })
  },
  methods: {
    logout() {
      this.$axios.post("/api/user/logout")
        .then(result => {
          this.$store.commit("logout")
          this.$router.push("/")
        })
    }
  }
}
</script>

<style>
.header {
  background-color: #000;
  color: #fff;
  padding: 50px;
  margin-bottom: 80px;
}

.header .logo {
  font-size: 50px;
  font-weight: 700;
  color: #4FEBF0;
}

.user {
  margin-right: 10px;
  margin-top: 5px;
}

.btn {
  background-color: #000;
  border-color: #4FEBF0;
  border-width: 1px;
}

.footer {
  background-color: #000;
  color: #fff;
  padding: 50px;
  text-align: center;
  margin-top: 100px;
}
</style>
