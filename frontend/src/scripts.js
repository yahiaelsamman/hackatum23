const app = Vue.createApp({
  data() {
    return {
      selectedDish: {},
      filteredDishes: [],
      searchQuery: "",
      showTags: false,
      selectedTags: [],
      allTags: ["asian", "poultry", "spicy", "indian", "healthy", "salads"],
      dishes: [
        {
          id: 1,
          name: "Chicken Teriyaki",
          tags: ["asian", "poultry"],
          description: "Yummy Chicken Teriyaki Recipe",
        },
        {
          id: 2,
          name: "Spice Symphony",
          tags: ["spicy", "indian"],
          description: "Yummy Curry Dish inspired by Indian classics",
        },
        {
          id: 3,
          name: "Green Bowl",
          tags: ["healthy", "salads"],
          description:
            "If you're looking to combine health and taste this is the dish for you",
        },
      ],
      showDetails: false,
    };
  },
  created() {
    this.filteredDishes = this.dishes;
  },
  methods: {
    selectDish(dishId) {
      this.showDetails = true;
      this.selectedDish = this.dishes.find((dish) => dish.id === dishId);
    },
    filterList() {
      if (this.searchQuery === "" && this.selectedTags.length === 0) {
        this.filteredDishes = this.dishes;
      }
      if(
        this.selectedTags.length === 0) {
        this.filteredDishes = this.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } else {
        // General Filter and then filter that list with tags
        this.filteredDishes = this.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        console.log(this.filteredDishes);
        this.filteredDishes = this.filteredDishes.filter(dish =>
          this.selectedTags.some(tag =>
            dish.tags.map(dishTag => dishTag.toLowerCase()).includes(tag.toLowerCase())
          )
        );
        console.log(this.filteredDishes);
      }
      
    },
    toggleDropdown() {
      this.showTags = !this.showTags;
    },
    updateSelectedTags(event) {
      // Clear the array without losing reactivity
      this.selectedTags = [];
      if(event.target.value !== "") {
        this.selectedTags = Array.from(event.target.options)
                             .filter(option => option.selected)
                             .map(option => option.value);
        this.filterList(this.searchQuery);
      }
      else {
        this.filterList(this.searchQuery);
      }
    },
    getRecipes() {
      const apiUrl = 'http://localhost:8080/api/test'; // Replace with the actual API URL
  
      fetch(apiUrl)
  .then(response => {
    console.log("test");
    if (!response.ok) {
      // Make sure this error is thrown only when response.ok is false
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json(); // This line should only execute if response is ok
  })
  .then(data => {
    // this.recipes = data; // Make sure this line is executing
    alert("reached");
  })
  .catch(error => {
    // If this is logging the error, ensure it's not a false positive
    console.error('There was a problem with the fetch operation:', error);
  });
    }
  },
});

app.mount("#window");
