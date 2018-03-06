<template>
    <div class="row" style="padding: 20px 0;">
        <h2 style="padding-bottom: 5px;">{{music.music_name}}</h2>
        <h4 style="padding-bottom: 15px;">Artist: {{music.artist}}</h4>

        <div v-if="isYoutube" class="text-center">
            <iframe width="100%" height="400px" v-bind:src="parse_youtube_url(youtube_id)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div v-else>
            <audio v-bind:src="music_url(music.file_url)" preload="auto" style="margin: 0 auto;" />
        </div>

        <div class="dropdown" v-if="$store.state.user != null">
            <button class="btn btn-primary" type="button" data-toggle="dropdown">Add to playlists <span class="caret"></span></button>

            <ul class="dropdown-menu">
              <li v-for="(item, index) in $store.state.user.playlists">
                <a style="cursor: pointer" @click="add_music_to_playlist(item.up_id, index)"><i class="fa fa-music"></i> {{item.up_name}} - Songs: {{item.up_total_songs}}</a>
              </li>
              <li><a style="cursor: pointer" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus"></i> Create new playlist</a></li>
            </ul>
        </div>

        <div class="panel panel-primary" style="margin-top: 20px;">
            <div class="panel-heading">
                Lyric:
            </div>
            <div class="panel-body">
                <pre>{{music.lyric}}</pre>
            </div>
        </div>

        <!-- Add new playlist modal -->
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add new playlist</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Playlist name/title:</label>
                  <input type="text" class="form-control" v-model="up_title">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" @click="create_playlist">Save</button>
              </div>
            </div>

          </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {url} from "../../helper";
    import {config} from "../../config";

    export default {
        data()
        {
            return{
                id: "",
                music: {},
                isYoutube: false,
                youtube_id: "",
                up_title: ""
            }
        },
        created()
        {
            // get music
            this.id = this.$route.params.id;
            url.setController('Music');
            axios.get(url.getURL('GetByID') + "/" + this.$route.params.id)
              .then(res => {

                  if (res.data != null)
                  {
                    this.music = res.data;

                    // create player
                    if (this.music.file_url.indexOf('youtube.com') < 0)
                    {
                      // mp3 player
                      audiojs.events.ready(function() {
                        var as = audiojs.createAll();
                      });
                    }
                    else {
                      this.isYoutube = true;
                      this.youtube_id = this.music.file_url.substring(this.music.file_url.lastIndexOf('?v=') + 3);
                    }

                    // set title
                    document.title = this.music.music_name + " - " + config.app_name;
                  }
                  else {
                    toastr.error('Get music failed!', 'Error');
                    window.history.back();
                  }
              })
              .catch(err => {
                  toastr.error('Get music failed!', 'Error');
                  window.history.back();
              });
        },
        methods: {
            parse_youtube_url(id)
            {
                return "https://www.youtube.com/embed/" + id;
            },
            music_url(file_name)
            {
                if (file_name.indexOf("http") >= 0)
                {
                  return file_name;
                }
                else {
                  url.setController('Music');
                  return url.getURL('MusicFile') + "/" + file_name;
                }
            },
            create_playlist()
            {
              if (this.up_title == "")
              {
                toastr.error("Please input all information!");
                return;
              }

              url.setController('UserPlaylist');
              axios.post(url.getURL('CreatePlaylist') + "/" + this.$store.state.user.id, {title: this.up_title})
                .then(res => {
                  var data = res.data;

                  if (data.error)
                  {
                    toastr.error(data.error);
                  }
                  else {
                    toastr.success("Create playlist successfully!");
                    this.$store.dispatch('addUserPlaylist', data);

                    $("#myModal").modal('hide');
                    this.up_title = "";
                  }
                })
                .catch(err => {
                  toastr.error("Failed to create playlist, please try again!");
                });
            },
            add_music_to_playlist(playlist_id, index)
            {
                url.setController('UserPlaylist');
                axios.post(url.getURL('AddMusicToPlaylist') + "/" + playlist_id, {music_id: this.id})
                  .then(res => {
                      var data = res.data;

                      if (data.error)
                      {
                          toastr.error(data.error);
                      }
                      else {
                          toastr.success("Add this music to playlist successfully!");
                          this.$store.dispatch('addMusicPlaylist', index);
                      }
                  })
                  .catch(err => {
                      toastr.error("Add to playlist failed, please try again!");
                  });
            }
        }
    }
</script>

<style scoped>

</style>
