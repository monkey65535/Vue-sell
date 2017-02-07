<template>
    <!--外部传递星星尺寸-->
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item star-icon" track-by="$index"></span>
    </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
    data () {
        return {

        };
    },
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDdecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDdecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss">
   @import "./scss/star.scss";
</style>