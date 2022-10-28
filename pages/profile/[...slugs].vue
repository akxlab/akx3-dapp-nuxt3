<script setup>

import useAvatar from "../../composables/useAvatar";
import {useProfileStore} from "../../stores/profile";

const route = useRoute();
const slug = route.params.slugs;

const caller = useAvatar();
const store = useProfileStore();
const loadedProfile = useState(() => {})

onMounted(async () => {
    const username = store.username;
    if(username) {
      const u = await caller.getDataFromUsername(username);
      loadedProfile.value = u;
    }
})

</script>
<template>
 <v-container>
   SLUG
 </v-container>
</template>