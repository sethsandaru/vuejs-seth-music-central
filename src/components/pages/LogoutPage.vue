<template>

</template>

<script>
    export default {
        created()
        {
            this.$store.dispatch('removeUser');
            toastr.success('Logged out!');
            window.location = "#/";
        }
    }
</script>

<style scoped>

</style>
