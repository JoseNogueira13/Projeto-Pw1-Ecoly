<template>
  <div>
    <h1>NewsDetailView</h1>
    <p>
      {{ newDetails }}
    </p>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/news";
export default {
  name: "NewsDetailView",

  data() {
    return {
      newDetails: {},
    };
  },

  async created() {
    // new id from the url
    const id = this.$route.params.id;

    const newDetail = await useNewsStore().getNewById(id);

    if (newDetail) this.newDetails = newDetail;
    else this.$router.push({ name: "NotFound" });
  },
};
</script>

<style lang="scss" scoped></style>
