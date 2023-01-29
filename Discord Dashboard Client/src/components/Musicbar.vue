<template>
  <div class="musicbar">
    <img :src="getImageUrl ? getImageUrl : 'https://oladino.com/wp-content/uploads/2022/01/Witcher-Logo-Svg-TB030122001.png'" alt="SongImage" class="songimg">
    <div class="status">
      <a class="artistname">{{ getStatus.artist ? getStatus.artist : "The song is unplayable." }}</a>
      <hr>
      <a>{{ getStatus.song}}</a>
      <div class="loadbackground">
        <div class="loadbar" :style="{width: progress > 100 ? 100 : progress + '%'}"></div>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
  import '@/assets/css/musicbar.css'
  import { ref, onMounted, computed, reactive } from 'vue'
  import { useLanyard } from "@leonardssh/use-lanyard";
  var prsnc = ref() 

  useLanyard({
      userId: "299955838368612353",
      socket: true,
      async onPresenceUpdate(presence) {
        prsnc.value = presence
      },
    });

  const data = reactive({
    rotate: {
      rotate: 360,
      duration: 5000,
    },
    time: new Date().getTime(),
  });

  const getImageUrl = computed(() => {
    return prsnc.value?.spotify?.album_art_url;
  });
  const getStatus = computed(() => {
    return {
      statusIndicator: prsnc.value?.discord_status || "Offline",
      song: prsnc.value?.spotify?.song,
      artist: prsnc.value?.spotify?.artist,
      album: prsnc.value?.spotify?.album,
      albumurl: prsnc.value?.spotify?.album_art_url,
      trackId: prsnc.value?.spotify?.track_id,
    };
  });
  const progress = computed(() => {
    const total =
      prsnc.value?.spotify?.timestamps?.end -
      prsnc.value?.spotify?.timestamps?.start;
    const progress =
      100 -
      (100 * (prsnc.value?.spotify?.timestamps.end - data.time)) / total;
    return progress;
  });
  onMounted(() => {
    setInterval(() => {
      data.time = new Date().getTime();
    }, 1000);
  });
  </script>