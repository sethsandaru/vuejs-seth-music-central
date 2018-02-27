<template>
  <div id="app">
    <div class="nav_main">
      <div class="overlay"></div>
      <div class="mobile-side-menu">
        <ul>
          <li class="active"><a href="main.html"><i class="fa fa-home" aria-hidden="true"></i>Home</a></li>
          <li><a href="menu.html"><i class="fa fa-compass" aria-hidden="true"></i>Our Food</a></li>
          <li><a href="blog.html"><i class="fa fa-picture-o" aria-hidden="true"></i>Blog</a></li>
          <li><a href="team.html"><i class="fa fa-users" aria-hidden="true"></i>Our Chef</a></li>
          <li><a href="short-codes.html"><i class="fa fa-dashcube" aria-hidden="true"></i>Short Codes</a></li>
          <li><a href="icons.html"><i class="fa fa-random" aria-hidden="true"></i>Web Icons</a></li>
          <li><a href="contact.html"><i class="fa fa-map-marker" aria-hidden="true"></i>Location</a></li>
          <li><a href="sign-in.html"><i class="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
        </ul>
      </div>
      <div class="navbar">
        <div class="agile_container">
          <div class="w3_agile_nav_main_left">
            <div class="toggleMenu">
              <a href="#"> <i class="fa fa-navicon"></i> </a>
            </div>
          </div>
          <div class="w3_agile_nav_main_right">
            <ul class="wthree_social_icons">
              <li><a v-bind:href="config.facebook_url" class="w3_agileits_facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a v-bind:href="config.instagram_url" class="w3_agileits_twitter"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><router-link to="/search" class="w3_agileits_google"><i class="fa fa-search" aria-hidden="true"></i></router-link></li>
            </ul>
          </div>
          <div class="clearfix"> </div>
        </div>
      </div>
    </div>
    <div class="agileinfo_logo">
      <div class="agile_container">
        <h1><a href="./">{{config.app_name}}</a></h1>
      </div>
    </div>


    <div class="container">
      <router-view></router-view>
    </div>



    <div class="footer">
      <div class="container">
        <div class="w3ls_footer_grid">
          <div class="w3ls_footer_grid_left">
            <div class="w3ls_footer_grid_left1">
              <h2>Follow Us</h2>
              <div class="w3ls_footer_grid_left1_pos">
                <ul>
                  <li><a v-bind:href="config.facebook_url" class="facebook"><i class="fa fa-facebook" aria-hidden="true"></i>Facebook</a></li>
                  <li><a v-bind:href="config.instagram_url" class="instagram"><i class="fa fa-instagram" aria-hidden="true"></i>Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="w3ls_footer_grid_right">
            <ul class="agileits_w3layouts_footer">
              <li><a href="./">Contact Us</a></li>
              <li><a href="./">About Us</a></li>
            </ul>
          </div>
          <div class="clearfix"> </div>
        </div>
        <div class="w3_agile_copyright">
          <p>&copy; 2018 by Seth Sandaru aka Seth Phat aka Phat Tran Minh. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {config} from "./config";

  export default {
    name: 'app',
    data() {
      return {
        config: config
      }
    },
    mounted()
    {
        document.title = config.app_name;
    }
  }
</script>

<style>
</style>
