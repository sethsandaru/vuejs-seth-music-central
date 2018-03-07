<template>
    <div class="row" v-if="genre != null" style="padding: 20px 0;">
        <h3 style="padding-bottom: 10px;">{{genre.genre_name}}</h3>

        <div class="col-md-6">
          <h4 class="card-title">MOST VIEWED</h4>

          <ul class="list-group">
            <li class="list-group-item" v-for="item in hottest.items" @click="view_music(item.music_id)">
              <p class="title">{{item.music_name}}</p>
              <p class="artist">{{item.artist}}</p>
            </li>
          </ul>

          <div v-if="hottest.endPage > 1" style="text-align: center">
            <button class="btn btn-primary" v-if="hottest.page > 1" @click="openPage(hottest.page - 1, false)"><< Previous page</button>
            <button class="btn btn-primary" v-if="hottest.page < hottest.endPage" @click="openPage(hottest.page + 1, false)">Next page >></button>
          </div>
        </div>
        <div class="col-md-6">
          <h4 class="card-title">NEWEST</h4>

          <ul class="list-group">
            <li class="list-group-item" v-for="item in newest.items" @click="view_music(item.music_id)">
              <p class="title">{{item.music_name}}</p>
              <p class="artist">{{item.artist}}</p>
            </li>
          </ul>

          <div v-if="newest.endPage > 1" style="text-align: center">
            <button class="btn btn-primary" v-if="newest.page > 1" @click="openPage(newest.page - 1, true)"><< Previous page</button>
            <button class="btn btn-primary" v-if="newest.page < newest.endPage" @click="openPage(newest.page + 1, true)">Next page >></button>
          </div>
        </div>
    </div>
</template>

<script>
    import {url} from "../../helper";
    import axios from "axios";

    export default {
        data()
        {
            return {
                genre_id: this.$route.params.id,
                genre: null,
                limit: 10,
                newest: {
                    page: 1,
                    endPage: 0,
                    start: 0,
                    items: []
                },
                hottest: {
                    page: 1,
                    endPage: 0,
                    start: 0,
                    items: []
                },
            }
        },
        created()
        {
            // TODO: Set genre information
            for (var i = 0; i < this.$store.state.genres.length; i++) {
              if (this.genre_id == this.$store.state.genres[i].genre_id) {
                this.genre = this.$store.state.genres[i];
                break;
              }
            }

            if (this.genre == null)
            {
                toastr.error("This genre is not exists");
                window.location = "#/";
                return;
            }

            // TODO: Get newest music in this genre
            url.setController("Music");
            axios.get(url.getURL("Search") + "?genre_id=" + this.genre_id + "&start=" + this.newest.start + "&limit=" + this.limit)
              .then(res => {
                  var data = res.data;

                  if (data.musics)
                  {
                      this.newest.endPage = Math.ceil(data.total / this.limit);
                      this.newest.items = data.musics;
                  }
                  else {
                    toastr.error("Get newest music of this genre failed");
                  }
              })
              .catch(err => {
                  toastr.error("Get newest music of this genre failed");
              });


            // TODO: Get most viewed music in this genre
            url.setController("Music");
            axios.get(url.getURL("HottestWithPagination") + "/" + this.genre_id + "?start=" + this.hottest.start + "&limit=" + this.limit)
              .then(res => {
                  var data = res.data;

                  if (data.musics)
                  {
                      this.hottest.endPage = Math.ceil(data.total / this.limit);
                      this.hottest.items = data.musics;
                  }
                  else {
                      toastr.error("Get newest music of this genre failed");
                  }
              })
              .catch(err => {
                  toastr.error("Get newest music of this genre failed");
              });
        },
        methods: {
            openPage(page, isNewest) {
                url.setController('Music');

                var rqURL = "";
                if (isNewest)
                {
                    this.newest.start = (page - 1) * this.limit;
                    rqURL = url.getURL('Search') + "?genre_id=" + this.genre_id + "&start=" + this.newest.start + "&limit=" + this.limit;
                }
                else
                {
                    this.hottest.start = (page - 1) * this.limit;
                    rqURL = url.getURL("HottestWithPagination" + "/" + this.genre_id + "?start=" + this.hottest.start + "&limit=" + this.limit);
                }

                axios.get(rqURL)
                  .then(res => {
                      var data = res.data;

                      if (data.musics)
                      {
                          //set data
                          if (isNewest)
                          {
                              this.newest.items = data.musics;
                              this.newest.page = page;
                          }
                          else {
                              this.hottest.items = data.musics;
                              this.hottest.page = page;
                          }
                      }
                      else {
                          toastr.error("Next page failed, please try again");
                      }
                  })
                  .catch(err => {
                    toastr.error("Next page failed");
                  });
            },
            view_music(id)
            {
                window.location = "#/music/" + id;
            }
        }
    }
</script>

<style scoped>

</style>
