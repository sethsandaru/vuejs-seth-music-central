<template>
    <div style="padding: 20px;">
        <h3 style="padding: 10px 0;">Search music</h3>

        <div class="form-inline">
            <div class="form-group" style="width: 75%">
                <input type="text" class="form-control" placeholder="Keyword..." style="width: 100%;" v-model="search.keyword">
            </div>
            <div class="form-group">
                <select class="form-control" v-model="search.genre_id">
                    <option value="">All</option>
                    <option v-for="item in $store.state.genres" :value="item.genre_id">{{item.genre_name}}</option>
                </select>
            </div>
            <button class="btn btn-primary" @click="doSearch"><i class="fa fa-search"></i> Search</button>
        </div>

        <div v-if="isSearching" style="margin-top: 15px;">
            <h4 style="padding-bottom: 10px;">Total <b>{{total}}</b> result found.</h4>

            <ul class="list-group">
                <li class="list-group-item" v-for="item in musics" @click="view_music(item.music_id)">
                    <p class="title">{{item.music_name}}</p>
                    <p class="artist">{{item.artist}}</p>
                </li>
            </ul>

            <div v-if="endPage > 1" style="text-align: center">
                <button class="btn btn-primary" v-if="page > 1" @click="openPage(page - 1)"><< Previous page</button>
                <button class="btn btn-primary" v-if="page < endPage" @click="openPage(page + 1)">Next page >></button>
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
                search: {
                    keyword: "",
                    genre_id: "",
                },
                start: 0,
                limit: 10,
                musics: [],
                total: 0,
                isSearching: false,
                page: 0,
                endPage: 0,
            }
        },
        methods: {
            doSearch()
            {
                this.start = 0;
                this.page = 0;
                this.endPage = 0;
                this.isSearching = false;

                url.setController('Music');
                axios.get(url.getURL('Search') + "?keyword=" + this.search.keyword + "&genre_id=" + this.search.genre_id + "&start=" + this.start + "&limit=" + this.limit)
                  .then(res => {
                      var data = res.data;

                      if (data.musics)
                      {
                          //set data
                          this.musics = data.musics;
                          this.total = data.total;
                          this.page = 1;
                          this.endPage = Math.ceil(this.total / this.limit);
                      }
                      else {
                          this.total = 0;
                      }

                      this.isSearching = true;
                  })
                  .catch(err => {
                      toastr.error("Search failed");
                  });
            },
            openPage(page) {
                this.start = (page - 1) * this.limit;
                url.setController('Music');
                axios.get(url.getURL('Search') + "?keyword=" + this.search.keyword + "&genre_id=" + this.search.genre_id + "&start=" + this.start + "&limit=" + this.limit)
                    .then(res => {
                        var data = res.data;

                        if (data.musics)
                        {
                            //set data
                            this.musics = data.musics;
                            this.page = page;
                        }
                        else {
                            toastr.error("Next page failed, please try again");
                        }
                    })
                    .catch(err => {
                        toastr.error("Search failed");
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
