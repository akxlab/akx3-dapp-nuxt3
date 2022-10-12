<script lang="ts" setup>
// @ts-ignore
const props = defineProps<{connectFunction:Function}>();
const provider = useState("provider");

</script>
<template>


    <v-btn size="x-large" variant="flat" color="primary" @click="props.connectFunction(provider)" >CONNECT</v-btn>


</template>