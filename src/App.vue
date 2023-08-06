<template>
  <nav class="navbar navbar-expand-lg body-tertiary">
    <div class="container-fluid">
      <div class="navbar-brand">
        <router-link to="/"
          ><img style="height: 30px" src="@/assets/cocktail.png" />
          <span class="logo"> My Cocktail</span></router-link
        >
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-link">
            <router-link to="/ingredients">Ingredients</router-link>
          </li>
          <li class="nav-link">
            <router-link to="/alcoholics">Alcoholic</router-link>
          </li>
          <li class="nav-link">
            <router-link to="/categories">Categories</router-link>
          </li>
          <li class="nav-link">
            <router-link to="/glasses">Glasses</router-link>
          </li>
          <li class="nav-link">
            <router-link to="/about">About</router-link>
          </li>
        </ul>
        <!-- search bar to search for cocktail by name -->
        <form class="d-flex" role="search">
          <input
            class="form-control me-1"
            type="search"
            placeholder="Search cocktails"
            v-model="name"
          />
          <button
            class="search-btn"
            type="submit"
            @click.stop.prevent="submit()"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    // submit the form and navigate to the SearchView
    submit() {
      // if the name is empty and the query contains the name, remove the name from the query
      if (this.name === "" && Object.keys(this.$route.query).includes("name")) {
        let newQuery = this.$route.query;
        delete newQuery.name;
        this.$router.push({
          name: "SearchView",
          // use the spread operator to copy the object
          query: { ...newQuery },
        });
      }
      // if a new name is entered, navigate to the SearchView with the name as the query
      else if (this.name !== this.$route.query.name) {
        this.$router.push({
          name: "SearchView",
          query: { name: this.name },
        });
      }
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 15px;
  background-color: darkcyan;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-size: larger;
}

nav a.router-link-exact-active {
  color: #42b983;
}

input {
  border-radius: 5px;
}

.search-btn {
  border-radius: 5px;
  background-color: goldenrod;
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.try-out-btn {
  border-style: outset;
  width: 100px;
  margin-bottom: 8px;
}

.logo {
  color: white;
  font-size: 19.2px;
}
</style>
