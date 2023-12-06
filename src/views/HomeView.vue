<template>
  <div class="home">
    <h1>Home</h1>
    <p>My name is {{ name }} and my age is {{ age }}</p>
    <button @click="handleClick">click me</button>
    <button @click="age++">Add 1 to age</button>
    <input type="text" v-model="name" style="margin-bottom: 25px" />

    <div v-for="name in matchingNames" :key="name">
      {{ name }}
    </div>

    <p>search term - {{ search }}</p>
    <input type="text" v-model="search" />
    <button @click="handleStop">Stop watch</button>
  </div>

  <div v-if="error">{{ error }}</div>
  <div class="home" v-if="posts.length">
    <PostList :posts="posts" v-if="showPosts" />
    <button @click="showPosts = !showPosts">toggle posts</button>
    <button @click="posts.pop()">delete post</button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import { computed, ref, watch, watchEffect } from "vue";
import PostList from "../components/PostList.vue";
import Spinner from "../components/Spinner.vue";
import getPosts from "../composables/getPosts";

export default {
  name: "HomeView",
  components: { PostList, Spinner },
  setup() {
    // we wrap the values in ref, unlike with the options api where data() is reactive, the values in setup() are not
    // there is also reactive instead of ref but the drawback is, you can not use it with primitive values
    let name = ref("mario");
    let age = ref(30);

    const search = ref("");
    const names = ref(["mario", "yoshi", "luigi", "peach", "toad", "bowser"]);

    // runs the callback when the value changes, watchEffect runs straight away and when something changes in the callback, while watch we have to list out the value it is monitoring as an argument dependency
    const stopWatch = watch(search, () => {
      console.log("watch function ran");
    });
    const stopEffect = watchEffect(() => {
      console.log("watchEffect function ran", search.value);
    });

    // computed property used to filter
    const matchingNames = computed(() => {
      return names.value.filter((name) => name.includes(search.value));
    });

    const handleClick = () => {
      name.value = "luigi";
      age.value = 35;
    };

    // storing the functions in a value allows us to stop them when they are called like so
    const handleStop = () => {
      stopWatch();
      stopEffect();
    };

    // how props work with comp API - check div with PropsList and check the component it self
    const { posts, error, load } = getPosts();
    load();

    const showPosts = ref(true);

    return {
      name,
      age,
      handleClick,
      names,
      search,
      matchingNames,
      handleStop,
      posts,
      showPosts,
      error,
    };
  },
};
</script>

<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>