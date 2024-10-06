<template>
  <div class="starship-list">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search for a starship..."
    />
    <ul>
      <li
        v-for="starship in filteredStarships"
        :key="starship.id"
        @click="goToDetail(starship.id)"
      >
        {{ starship.name }}
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      starships: [],
      searchTerm: "",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredStarships() {
      return this.starships
        .filter((starship) =>
          starship.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
    },
    totalPages() {
      return Math.ceil(this.starships.length / this.itemsPerPage);
    },
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/starship/${id}`);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async fetchStarships() {
      const response = await fetch("https://swapi.dev/api/starships/");
      const data = await response.json();
      this.starships = data.results.map((starship, index) => ({
        id: index + 1,
        ...starship,
      }));
    },
  },
  mounted() {
    this.fetchStarships();
  },
};
</script>

<style lang="scss" scoped>
.starship-list {
  background-color: #afbdabff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(147, 83, 231, 0.1);
  max-width: 600px;
  margin: 20px auto;

  input {
    width: 80%;
    padding: 10px;
    border: 1px solid #617291;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      cursor: pointer;
      padding: 10px;
      border: 1px solid #ccc;
      margin: 5px 0;
      transition: background-color 0.3s;
      border-radius: 4px; /* زوايا دائرية للعناصر */

      &:hover {
        background-color: #e2e6ea; /* لون عند المرور */
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between; /* توزيع الأزرار بالتساوي */
    margin-top: 20px;

    button {
      background-color: #007bff; /* لون زر السابق والتالي */
      color: white; /* لون نص الزر */
      padding: 10px 15px; /* مساحة داخلية للزر */
      border: none; /* إزالة الحدود */
      border-radius: 5px; /* زوايا دائرية للزر */
      cursor: pointer; /* تغيير شكل المؤشر عند المرور على الزر */
      transition: background-color 0.3s; /* تأثير التغيير اللوني */

      &:hover {
        background-color: #0056b3; /* لون الزر عند المرور */
      }

      &:disabled {
        background-color: #ccc; /* لون زر معطل */
        cursor: not-allowed; /* تغيير شكل المؤشر عند التعطيل */
      }
    }
  }
}
</style>
