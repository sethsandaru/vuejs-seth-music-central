<template>
    <div style="padding: 20px 0;">
        <div class="row">
            <div class="col-md-4">
                <h4 class="card-title">HOT IN WEEK</h4>

                <ul class="list-group">
                    <li class="list-group-item">
                        <p class="title">Machine</p>
                        <p class="artist">Pandora</p>
                    </li>
                    <li class="list-group-item">
                        <p class="title">What you deserved</p>
                        <p class="artist">No Resolve</p>
                    </li>
                    <li class="list-group-item">
                        <p class="title">Secret</p>
                        <p class="artist">Our Waking Hour</p>
                    </li>
                </ul>
            </div>

          <div class="col-md-4">
            <h4 class="card-title">NEWEST</h4>

            <ul class="list-group">
              <li class="list-group-item">
                <p class="title">Machine</p>
                <p class="artist">Pandora</p>
              </li>
              <li class="list-group-item">
                <p class="title">What you deserved</p>
                <p class="artist">No Resolve</p>
              </li>
              <li class="list-group-item">
                <p class="title">Secret</p>
                <p class="artist">Our Waking Hour</p>
              </li>
            </ul>
          </div>

          <div class="col-md-4">
            <h4 class="card-title">MOST VIEWED</h4>

            <ul class="list-group">
              <li class="list-group-item">
                <p class="title">Machine</p>
                <p class="artist">Pandora</p>
              </li>
              <li class="list-group-item">
                <p class="title">What you deserved</p>
                <p class="artist">No Resolve</p>
              </li>
              <li class="list-group-item">
                <p class="title">Secret</p>
                <p class="artist">Our Waking Hour</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-page"
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
