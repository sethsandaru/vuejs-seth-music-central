<template>

</template>

<script>
    export default {
        created()
        {
            if (this.$store.state.user == null)
            {
                toastr.error('Please login before using this feature');
                window.location = "#/";
            }

            this.$store.dispatch('removeUser');
            toastr.success('Logged out!');
            window.location = "#/";
        }
    }
</script>

<style scoped>

</style>
