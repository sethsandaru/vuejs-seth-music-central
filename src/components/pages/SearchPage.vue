<template>
    <div style="padding: 20px;">
        <h3>Search music</h3>

        <div class="form-inline">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Keyword...">
            </div>
            <div class="form-group">
                <select class="form-control">
                    <option v-for="item in $store.state.genres" :value="item.genre_id">{{item.genre_name}}</option>
                </select>
            </div>
            <button class="btn btn-primary">Search <i class="fa fa-search"></i></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search-page"
    }
</script>

<style scoped>

</style>
