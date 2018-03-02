<template>
    <div style="padding: 20px 0;">
        <div class="row">
            <div class="col-md-4">
                <h4 class="card-title">HOT IN WEEK</h4>

                <ul class="list-group">
                    <li class="list-group-item" v-for="item in weekly_high" @click="view_music(item.music_id)">
                        <p class="title">{{item.music_name}}</p>
                        <p class="artist">{{item.artist}}</p>
                    </li>
                </ul>
            </div>

          <div class="col-md-4">
            <h4 class="card-title">NEWEST</h4>

            <ul class="list-group">
              <li class="list-group-item" v-for="item in newest" @click="view_music(item.music_id)">
                <p class="title">{{item.music_name}}</p>
                <p class="artist">{{item.artist}}</p>
              </li>
            </ul>
          </div>

          <div class="col-md-4">
            <h4 class="card-title">MOST VIEWED</h4>

            <ul class="list-group">
              <li class="list-group-item" v-for="item in alltime_high" @click="view_music(item.music_id)">
                <p class="title">{{item.music_name}}</p>
                <p class="artist">{{item.artist}}</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {url} from "../../helper";

    export default {
        data()
        {
            return {
                'weekly_high': [],
                'alltime_high': [],
                'newest': []
            }
        },
        created()
        {
            // get high weekly
            url.setController('Music')
            axios.get(url.getURL('GetHomePageData'))
              .then(res => {
                  this.weekly_high = res.data.weekly;
                  this.alltime_high = res.data.alltime;
                  this.newest = res.data.newest;
              })
              .catch(err => {
                  toastr.error('Failed to load music...');
              });


        },
        methods: {
            view_music(id)
            {
                window.location = "#/music/" + id;
            }
        }
    }
</script>

<style scoped>
    .list-group-item
    {
        cursor: pointer;
    }

    .card-title {
        text-align: center;
    }

    .artist {
        font-size: 12px;
    }

    .title {
        font-size:14px;
        font-weight: bold;
    }
</style>
