<template>
  <img
    v-if="badge"
    :src="badge.src"
    alt="Badge em Destaque"
    class="highlighted-badge mb-1 mr-3"
  />
</template>

<script>
import { useBadgesStore } from "@/stores/badges";
export default {
  name: "HighLightBadge",

  data() {
    return { badge: null };
  },

  props: {
    badgeID: {
      type: String,
      required: true,
    },
  },

  async created() {
    const badgesStore = useBadgesStore();
    const badge = await badgesStore.getBadgeById(this.badgeID);
    this.badge = badge;
  },
};
</script>

<style lang="scss" scoped>
.highlighted-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 27%;
  height: auto;
}
</style>
