<template>
    <div class="row" style="padding: 20px 0;">
        <h2 style="padding-bottom: 5px;">{{music.music_name}}</h2>
        <h4 style="padding-bottom: 15px;">Artist: {{music.artist}}</h4>

        <div v-if="isYoutube" class="text-center">
            <iframe width="100%" height="400px" v-bind:src="parse_youtube_url(youtube_id)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div v-else>
          <div id="single-song-player">
            <img amplitude-song-info="cover_art_url" amplitude-main-song-info="true"/>
            <div class="bottom-container">
              <progress class="amplitude-song-played-progress" amplitude-main-song-played-progress="true" id="song-played-progress"></progress>

              <div class="time-container">
              <span class="current-time">
                <span class="amplitude-current-minutes" amplitude-main-current-minutes="true"></span>:<span class="amplitude-current-seconds" amplitude-main-current-seconds="true"></span>
              </span>
                <span class="duration">
                <span class="amplitude-duration-minutes" amplitude-main-duration-minutes="true"></span>:<span class="amplitude-duration-seconds" amplitude-main-duration-seconds="true"></span>
              </span>
              </div>

              <div class="control-container">
                <div class="amplitude-play-pause" amplitude-main-play-pause="true" id="play-pause"></div>
                <div class="meta-container">
                  <span amplitude-song-info="name" amplitude-main-song-info="true" class="song-name"></span>
                  <span amplitude-song-info="artist" amplitude-main-song-info="true"></span>
                </div>
              </div>
            </div>
          </div>
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
                      Amplitude.init({
                        "bindings": {
                          37: 'prev',
                          39: 'next',
                          32: 'play_pause'
                        },
                        "songs": [
                          {
                            "name": this.music.music_name,
                            "artist": this.music.artist,
                            "album": "",
                            "url": this.music_url(this.music.file_url),
                            "cover_art_url": "https://i.imgur.com/5NgZ9rX.jpg"
                          }
                        ]
                      });

                      document.getElementById('song-played-progress').addEventListener('click', function( e ){
                        var offset = this.getBoundingClientRect();
                        var x = e.pageX - offset.left;
                        Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
                      });

                      document.addEventListener('beforeunload', this.handlerGoOut)
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
        mounted()
        {
            url.setController("Music");
            axios.get(url.getURL("AddNewView") + "/" + this.id)
              .then(res => console.log("Add view ok"));
        },
        beforeRouteLeave(to, from, next)
        {
            Amplitude.pause();
            next();
        },
        methods: {
            parse_youtube_url(id)
            {
                return "https://www.youtube.com/embed/" + id;
            },
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
                if (this.youtube_id != "")
                {
                    toastr.error("This is an youtube video, can't add this to playlist. Sorry!");
                    return;
                }

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

  div#single-song-player {
    width: 460px;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
    margin-top: 50px;
  }
  div#single-song-player img[amplitude-song-info="cover_art_url"] {
    width: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  div#single-song-player div.bottom-container {
    background-color: #202136;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  div#single-song-player div.bottom-container progress.amplitude-song-played-progress:not([value]) {
    background-color: #313252;
  }
  div#single-song-player div.bottom-container progress.amplitude-song-played-progress {
    background-color: #313252;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    display: block;
    cursor: pointer;
    border: none;
  }
  div#single-song-player div.bottom-container progress[value]::-webkit-progress-bar {
    background-color: #313252;
  }
  div#single-song-player div.bottom-container progress[value]::-moz-progress-bar {
    background-color: #00a0ff;
  }
  div#single-song-player div.bottom-container progress[value]::-webkit-progress-value {
    background-color: #00a0ff;
  }
  div#single-song-player div.bottom-container div.time-container {
    opacity: 0.5;
    font-family: 'Open Sans';
    font-weight: 100;
    font-size: 12px;
    color: #fff;
    height: 15px;
  }
  div#single-song-player div.bottom-container div.time-container span.current-time {
    float: left;
    margin-left: 5px;
  }
  div#single-song-player div.bottom-container div.time-container span.duration {
    float: right;
    margin-right: 5px;
  }
  div#single-song-player div.bottom-container div.control-container {
    margin-top: 10px;
    padding-bottom: 10px;
  }
  div#single-song-player div.bottom-container div.control-container div.amplitude-play-pause {
    width: 74px;
    height: 74px;
    cursor: pointer;
    float: left;
    margin-left: 10px;
  }
  div#single-song-player div.bottom-container div.control-container div.amplitude-play-pause.amplitude-paused {
    background: url('../../assets/images/play_s.svg');
  }
  div#single-song-player div.bottom-container div.control-container div.amplitude-play-pause.amplitude-playing {
    background: url('../../assets/images/pause_s.svg');
  }
  div#single-song-player div.bottom-container div.control-container div.meta-container {
    float: left;
    width: calc(100% - 84px);
    text-align: center;
    color: white;
    margin-top: 10px;
  }
  div#single-song-player div.bottom-container div.control-container div.meta-container span[amplitude-song-info="name"] {
    font-family: "Open Sans", sans-serif;
    font-size: 18px;
    color: #fff;
    display: block;
  }
  div#single-song-player div.bottom-container div.control-container div.meta-container span[amplitude-song-info="artist"] {
    font-family: "Open Sans", sans-serif;
    font-weight: 100;
    font-size: 14px;
    color: #fff;
    display: block;
  }
  div#single-song-player div.bottom-container div.control-container:after {
    content: "";
    display: table;
    clear: both;
  }


</style>
