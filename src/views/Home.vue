<template>
  <div class="home">
    <v-container>
      <v-row class="justify-center">
        <v-card
          raised
          v-for="smoothie in smoothies"
          :key="smoothie.id"
          class="mx-2 mb-12"
          min-width="257"
          min-height="260"
        >
          <div class="text-right">
            <v-icon color="grey" @click="deleteSmoothie(smoothie.id)">mdi-delete</v-icon>
          </div>

          <v-card-title class="indigo--text headline justify-center text-wrap">
            {{
            smoothie.title
            }}
          </v-card-title>
          <v-card-text>
            <v-chip
              color="grey lighten-1"
              class="d-inline-block ma-1"
              v-for="(ingredient, index) in smoothie.ingredients"
              :key="index"
            >{{ ingredient }}</v-chip>
          </v-card-text>
          <v-btn
            :to="{
            name: 'EditSmoothie',
            params: { smoothie_slug: smoothie.slug }
          }"
            fab
            color="pink"
            dark
            absolute
            right
            bottom
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/firebase/init";

export default {
  name: "Home",
  methods: {
    deleteSmoothie(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => {
            return smoothie.id != id;
          });
        });
    },
  },
  data() {
    return {
      smoothies: [],
    };
  },
  components: {},
  created() {
    // fetch data from firestore
    db.collection("smoothies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>
