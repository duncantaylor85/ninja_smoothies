<template>
  <div v-if="smoothie" class="edit-smoothie">
    <v-container fluid>
      <v-card raised width="500" class="mx-auto">
        <v-container class="px-12">
          <v-card-title
            class="indigo--text headline justify-center text-wrap"
          >Edit "{{ smoothie.title }}" smoothie</v-card-title>

          <v-row justify="center">
            <v-col colls>
              <v-text-field
                background-color="grey lighten-3"
                class="mb-3"
                label="Title"
                v-model="smoothie.title"
              ></v-text-field>

              <v-text-field
                v-for="(ing, index) in smoothie.ingredients"
                :key="index"
                class="d-flex"
                append-outer-icon="mdi-delete"
                @click:append-outer="deleteIngredient(ing)"
                label="Ingredient:"
                v-model="smoothie.ingredients[index]"
              ></v-text-field>

              <v-text-field
                @click:append-outer="addIngredient"
                append-outer-icon="mdi-plus-circle"
                label="Add an ingredient"
                v-model="another"
                @keydown.enter.prevent="addIngredient"
              ></v-text-field>
              <p v-if="feedback" class="red--text text-center">{{ feedback }}</p>
              <div class="text-center">
                <v-btn outlined class="mt-6" @click="editSmoothie" dark color="pink">Update Smoothie</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
    };
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@']/g,
          lower: true,
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err);
          });
        this.feedback = null;
      } else {
        this.feedback = "enter title";
      }
    },
    addIngredient() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You need to input a value to add an ingredient";
      }
    },
    deleteIngredient(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => {
          return ingredient != ing;
        }
      );
    },
  },
  created() {
    const ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>
