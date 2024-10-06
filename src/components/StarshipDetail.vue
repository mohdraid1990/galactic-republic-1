<template>
  <div class="starship-detail" v-if="starship">
    <h2>{{ starship.name }}</h2>
    <p><strong>Model:</strong> {{ starship.model }}</p>
    <p><strong>Manufacturer:</strong> {{ starship.manufacturer }}</p>
    <p><strong>Cost:</strong> {{ starship.cost_in_credits }} credits</p>
    <p><strong>Crew:</strong> {{ starship.crew }}</p>
    <p><strong>Passengers:</strong> {{ starship.passengers }}</p>
    <button @click="$router.push('/')">Back to List</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      starship: null,
    };
  },
  methods: {
    async fetchStarship(id) {
      const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
      this.starship = await response.json();
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchStarship(id);
  },
};
</script>

<style lang="scss" scoped>
.starship-detail {
  background-color: #5a777cff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(114, 100, 148, 0.1);
  max-width: 600px;
  margin: 20px auto;
  text-align: left;

  h2 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 24px;
  }

  p {
    margin: 8px 0;
    font-size: 18px;
    color: #34495e;
  }

  button {
    background-color: #2980b9;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1abc9c;
    }
  }
}
</style>
