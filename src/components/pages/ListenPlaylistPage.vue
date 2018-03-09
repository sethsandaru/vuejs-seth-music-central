<template>
    <div class="row" style="padding: 20px 0;" v-if="playlist != null">
        <h3 style="padding-bottom: 10px;">Playlist: {{playlist.up_name}}</h3>
        <h4 style="padding-bottom: 10px;">Total songs: {{playlist.playlist_musics.length}}</h4>

      <div class="row">
          <div class="text-center" style="padding-bottom: 15px;">
              <audio controls id="music_player">
                  <source id="music_source" type="audio/mp3" />
              </audio>
          </div>

          <ul class="list-group">
              <li class="list-group-item" v-for="(item, index) in playlist.playlist_musics"
                  @click="changeMusic(index)" v-bind:class="{'list-group-item-selected': index == nowMusic}">
                  <p class="title">{{item.music.music_name}}</p>
                  <p class="artist">{{item.music.artist}}</p>
              </li>
          </ul>

      </div>
    </div>
</template>

<script>
    import {url} from "../../helper";
    import {config} from "../../config";
    import axios from "axios";

    export default {
        data()
        {
            return {
                id: this.$route.params.id,
                playlist: null,
                nowMusic: 0
            }
        },
        mounted()
        {

          url.setController("UserPlaylist");
          axios.get(url.getURL("GetUserPlaylist") + "/" + this.id + "?user_id=" + this.$store.state.user.id)
            .then(res => {
              var data = res.data;

              if (data != null) {
                this.playlist = data;
                document.title = "Your playlist: " + data.up_name + " - " + config.app_name;
                this.$nextTick(function () {
                  this.init();
                });
              }
              else {
                toastr.error("This playlist is not exists");
                window.location = "#/playlist";
              }
            })
            .catch(err => {
              toastr.error("Can't get playlist info");
              console.log(err);
              window.location = "#/playlist";
            })

        },
      beforeRouteLeave(to, from, next)
      {
          Amplitude.pause();
          next();
      },
      methods: {
            music_url(file_name)
            {
              if (file_name == null) return;

              if (file_name.indexOf("http") >= 0)
              {
                return file_name;
              }
              else {
                url.setController('Music');
                return url.getURL('MusicFile') + "/" + file_name;
              }
            },
            changeMusic(index)
            {
              var music_player = document.getElementById("music_player");
              music_player.pause();

              this.nowMusic = index;

              // play first music
              url.setController('Music');
              music_source.src = url.getURL('MusicFile') + "/" + this.playlist.playlist_musics[index].music.file_url;
              music_player.load();
              music_player.play();
            },
            init()
            {
                // start first one
                var music = this.playlist.playlist_musics[this.nowMusic].music;

                // set music
                var music_source = document.getElementById("music_source");
                var music_player = document.getElementById("music_player");

                // play first music
                url.setController('Music');
                music_source.src = url.getURL('MusicFile') + "/" + music.file_url;
                music_player.load();
                music_player.play();

                var self = this;
                music_player.addEventListener('ended', function () {
                  if (self.nowMusic == self.playlist.playlist_musics.length - 1)
                    return;

                  self.nowMusic++;

                  music = self.playlist.playlist_musics[self.nowMusic].music;

                  // next music
                  url.setController('Music');
                  music_source.src = url.getURL('MusicFile') + "/" + music.file_url;
                  music_player.load();
                  music_player.play();
                });
            }
      }
    }
</script>

<style scoped>
    .list-group-item-selected, .list-group-item:hover{
        background: #3498db;
    }

</style>
