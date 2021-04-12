<template>
<beat-loader :color="color"></beat-loader>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue"

export default {
components: {
    BeatLoader,
},
data() {
    return {
        color: '#3D008D',
    };
}
}
</script>

<style>

</style>

