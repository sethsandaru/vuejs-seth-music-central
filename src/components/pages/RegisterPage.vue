<template>
    <div style="padding: 20px 0;">
        <h3 class="text-center">Login to your account</h3>

        <div class="form">
            <div class="form-group">
              <label>Email address</label>
              <input type="text" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="user.password">
            </div>
            <div class="form-group">
              <label>Retype Password</label>
              <input type="password" class="form-control" v-model="user.retype_password">
            </div>
            <div class="form-group">
              <label>Your name</label>
              <input type="text" class="form-control" v-model="user.name">
            </div>

            <div class="text-center">
              <button class="btn btn-primary" @click="doLogin">Register now!</button>

              <p>
                <router-link to="/login">Already have an account? Login now!</router-link>
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
                user: {
                  email: "",
                  password: "",
                  retype_password: "",
                  name: "",
                }
            }
        },
        methods: {
            doLogin()
            {
                if (this.email == "" || this.password == "" || this.retype_password == "" || this.name == "")
                {
                    toastr.error("Please input all the needed information, thanks!", "Login failed");
                    return;
                }

                // register now
                url.setController('User');
                axios.post(url.getURL('register'), this.user)
                  .then(res => {
                      var data = res.data;

                      if (data.error)
                      {
                          toastr.error(data.error, "Register failed");
                      }
                      else {
                          toastr.success('Registered successfully! Please login to continue!', "Register successfully!");
                          window.location = "#/login";
                      }
                  })
                  .catch(err => {
                      toastr.error("Failed to register. Please try again later!", "Register failed");
                  });
            }
        }
    }
</script>

<style scoped>

</style>
