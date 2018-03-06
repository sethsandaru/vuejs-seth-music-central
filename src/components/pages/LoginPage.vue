<template>
    <div style="padding: 20px 0;">
        <h3 class="text-center">Login to your account</h3>

        <div class="form">
            <div class="form-group">
              <label>Email address</label>
              <input type="text" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>

            <div class="text-center">
                <button class="btn btn-primary" @click="doLogin">Login now!</button>

                <p>
                    <router-link to="/register">Don't have account? Sign up now!</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {url} from "../../helper";
    import axios from 'axios';

    export default {
        data()
        {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            doLogin()
            {
                if (this.email == "" || this.password == "")
                {
                    toastr.error("Please input all the needed information, thanks!", "Login failed");
                    return;
                }

                // login now
                url.setController('User');
                axios.post(url.getURL('login'), {email: this.email, password: this.password})
                  .then(res => {
                      var data = res.data;

                      if (data.error)
                      {
                          toastr.error(data.error, "Login failed");
                      }
                      else {
                          toastr.success("Login successfully!");
                          this.$store.dispatch('setUser', data.data.user_data);
                          window.location = "#/";
                      }
                  })
                  .catch(err => {
                      toastr.error("Request to login failed", "Login failed");
                  });
            }
        }
    }
</script>

<style scoped>

</style>
