<template>
  <div class="addsmoothie">
    <v-container fluid>
      <v-card raised class="mx-auto" width="500">
        <v-container>
          <v-card-title
            class="indigo--text headline justify-center text-wrap"
          >Add New Smoothie Recipe</v-card-title>

          <v-row justify="center">
            <v-col cols="10">
              <v-text-field background-color="grey lighten-3" label="Title" v-model="title"></v-text-field>
              <v-text-field
                v-for="(ing,
                index) in ingredients"
                :key="index"
                class="d-flex"
                append-outer-icon="mdi-delete"
                @click:append-outer="deleteIngredient(ing)"
                label="Ingredient:"
                v-model="ingredients[index]"
              ></v-text-field>

              <v-text-field
                @click:append-outer="addIngredient"
                append-outer-icon="mdi-plus-circle"
                label="Add an ingredient"
                v-model="another"
                @keydown.enter.prevent="
                  addIngredient
                "
              ></v-text-field>
              <p v-if="feedback" class="red--text text-center">{{ feedback }}</p>
              <div class="text-center">
                <v-btn class="mt-3" outlined @click="addSmoothie" dark color="pink">Add Smoothie</v-btn>
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
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@']/g,
          lower: true,
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err);
          });
        this.feedback = null;
      } else {
        this.feedback = "Please enter a title";
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You need to input a value to add an ingredient";
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient != ing;
      });
    },
  },
};
</script>
