<template>
    <div class="row" style="padding: 20px 0;">
        <h3 style="padding-bottom: 15px;">
            My music playlists
            <button class="btn btn-success" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus"></i> Add new playlist</button>
        </h3>

        <p v-if="$store.state.user.playlists.length == 0" style="text-align: center;">You don't have any playlists yet!</p>
        <ul class="list-group" v-else>
            <li class="list-group-item" v-for="item in $store.state.user.playlists">
                <p class="title">{{item.up_name}}</p>
                <p class="artist">Total songs: {{item.up_total_songs}}</p>
            </li>
        </ul>

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
    import {config} from "../../config";
    import axios from 'axios';
    import {url} from "../../helper";

    export default {
        data()
        {
            return {
                up_title: ""
            }
        },
        created()
        {
            if (this.$store.state.user == null)
            {
                toastr.error('Please login before using this feature');
                window.location = "#/";
            }

            document.title = "My playlists - " + config.app_name;
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>

</style>
