<template>
  <div id="app">
    <div class="nav_main">
      <div class="overlay"></div>
      <div class="mobile-side-menu">
        <ul>
          <li class="active"><router-link to="/"><i class="fa fa-home" aria-hidden="true"></i>Home</router-link></li>
          <li v-for="item in $store.state.genres">
            <router-link :to="url_genre(item.genre_id)">
              <i class="fa fa-compass" aria-hidden="true"></i> {{item.genre_name}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mobile-side-menu from-right">
        <ul>
          <li class="active"><router-link to="/"><i class="fa fa-home" aria-hidden="true"></i>Home</router-link></li>
          <li v-for="item in $store.state.genres">
            <router-link :to="url_genre(item.genre_id)">
              <i class="fa fa-compass" aria-hidden="true"></i> {{item.genre_name}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar">
        <div class="agile_container">
          <div class="w3_agile_nav_main_left">
            <div class="toggleMenu">
              <a href="javascript:void(0);"> <i class="fa fa-navicon"></i> </a>
            </div>
          </div>
          <div class="w3_agile_nav_main_right">
            <ul class="wthree_social_icons" style="position: relative;">
              <li><a v-bind:href="config.facebook_url" class="w3_agileits_facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a v-bind:href="config.instagram_url" class="w3_agileits_twitter"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><router-link to="/search" class="w3_agileits_google"><i class="fa fa-search" aria-hidden="true"></i></router-link></li>
              <li>
                  <a class="w3_agileits_facebook dropdown-toggle" @click="userSidebar = !userSidebar"
                     v-bind:class="{'hover-button' : userSidebar}">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </a>
              </li>
            </ul>

            <div class="box-people" v-show="userSidebar">
                <table class="table table-bordered" style="margin: 0;">
                    <tr v-if="$store.state.user == null">
                        <td width="15%">
                          <img src="./assets/images/default_avatar.jpg" alt="Default avatar" class="img-circle avatar">
                        </td>
                        <td>
                            <div class="guest">
                                <p>Hello guest!</p>
                                <router-link to="/login" class="btn btn-primary">Login</router-link>
                                <router-link to="/register" class="btn btn-warning">Register</router-link>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td width="15%">
                            <img src="./assets/images/default_avatar.jpg" alt="Default avatar" class="img-circle avatar">
                        </td>
                        <td>
                            <div class="user-logged">
                                <p>Hello, {{$store.state.user.name}}!</p>
                                <router-link to="/playlist" class="btn btn-primary">My Playlist</router-link>
                                <router-link to="/logout" class="btn btn-warning">Log out</router-link>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
          </div>
          <div class="clearfix"> </div>
        </div>
      </div>
    </div>
    <div class="agileinfo_logo">
      <div class="agile_container">
        <h1><router-link to="/">{{config.app_name}}</router-link></h1>
      </div>
    </div>


    <div class="container" @click="userSidebar = false">
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
  import store from './store';

  export default {
    name: 'app',
    data() {
      return {
        config: config,
        userSidebar: false
      }
    },
    methods: {
      url_genre(id)
      {
        return '/genre/' + id;
      }
    },
    created()
    {
        // load genre
        store.dispatch('getGenre');
    },
    mounted()
    {
        document.title = config.app_name;
    }
  }
</script>

<style>
</style>
