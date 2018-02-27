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
            <div class="form-group">
              <label>Retype Password</label>
              <input type="password" class="form-control" v-model="retype_password">
            </div>
            <div class="form-group">
              <label>Your name</label>
              <input type="text" class="form-control" v-model="name">
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
    export default {
        data()
        {
            return {
                email: "",
                password: "",
                retype_password: "",
                name: "",
            }
        },
        methods: {
            doLogin()
            {
                if (this.email == "" || this.password == "" || this.retype_password == "")
                {
                    toastr.error("Please input all the needed information, thanks!", "Login failed");
                    return;
                }

                // login now

            }
        }
    }
</script>

<style scoped>

</style>
