<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const snackbar = ref(false)
const message = ref('')

const books = ref([
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    format: 'Paperback',
    price: 14.99,
    rating: 4.6,
    color: '#284B63',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    format: 'Hardcover',
    price: 17.99,
    rating: 4.8,
    color: '#B65C3A',
  },
  {
    id: 3,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    format: 'Paperback',
    price: 11.99,
    rating: 4.7,
    color: '#D5A64A',
  },
  {
    id: 4,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    format: 'Paperback',
    price: 19.99,
    rating: 4.5,
    color: '#315A52',
  },
])

const filteredBooks = computed(() => {
  const value = search.value.toLowerCase().trim()

  if (!value) {
    return books.value
  }

  return books.value.filter(
    book =>
      book.title.toLowerCase().includes(value) ||
      book.author.toLowerCase().includes(value),
  )
})

function showMessage(text) {
  message.value = text
  snackbar.value = true
}

function addToCart(book) {
  showMessage(`${book.title} was added to your cart.`)
}

function removeBook(book) {
  books.value = books.value.filter(item => item.id !== book.id)
  showMessage(`${book.title} was removed from your wishlist.`)
}
</script>

<template>
  <div class="wishlist-view">
    <header class="page-header">
      <div>
        <p class="small-title">MY ACCOUNT</p>

        <h1>My wishlist</h1>

        <p>
          Keep track of the books you would like to read next.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-book-open-page-variant-outline"
        @click="showMessage('The bookstore catalog will open here.')"
      >
        Browse books
      </v-btn>
    </header>

    <div class="content-section">
      <div class="toolbar">
        <div>
          <h2>Saved books</h2>
          <p>{{ books.length }} book(s) in your wishlist</p>
        </div>

        <v-text-field
          v-model="search"
          label="Search wishlist"
          placeholder="Book title or author"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          color="primary"
          hide-details
          clearable
        />
      </div>

      <div
        v-if="filteredBooks.length"
        class="book-grid"
      >
        <v-card
          v-for="book in filteredBooks"
          :key="book.id"
          class="book-card"
        >
          <div
            class="book-cover"
            :style="{ backgroundColor: book.color }"
          >
            <v-icon
              icon="mdi-book-open-page-variant-outline"
              size="42"
            />

            <span>{{ book.format }}</span>
          </div>

          <div class="book-information">
            <div class="rating">
              <v-icon
                icon="mdi-star"
                color="#d5a64a"
                size="18"
              />

              <span>{{ book.rating }}</span>
            </div>

            <h3>{{ book.title }}</h3>
            <p>{{ book.author }}</p>

            <div class="book-bottom">
              <strong>${{ book.price.toFixed(2) }}</strong>

              <v-btn
                icon="mdi-delete-outline"
                color="error"
                variant="text"
                size="small"
                @click="removeBook(book)"
              />
            </div>

            <v-btn
              block
              color="primary"
              prepend-icon="mdi-cart-outline"
              class="cart-button"
              @click="addToCart(book)"
            >
              Add to cart
            </v-btn>
          </div>
        </v-card>
      </div>

      <div
        v-else
        class="empty-state"
      >
        <v-icon
          icon="mdi-heart-outline"
          size="70"
        />

        <h3>Your wishlist is empty</h3>

        <p>
          Save books that you would like to purchase later.
        </p>

        <v-btn
          v-if="search"
          color="primary"
          @click="search = ''"
        >
          Clear search
        </v-btn>

        <v-btn
          v-else
          color="primary"
          prepend-icon="mdi-book-search-outline"
          @click="showMessage('The bookstore catalog will open here.')"
        >
          Discover books
        </v-btn>
      </div>
    </div>
  </div>

  <v-snackbar
    v-model="snackbar"
    color="primary"
    location="bottom"
    :timeout="3000"
  >
    {{ message }}

    <template #actions>
      <v-btn
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.wishlist-view {
  width: 100%;
  min-width: 0;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 38px;
}

.small-title {
  margin: 0 0 8px;
  color: #b65c3a;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 3px;
}

.page-header h1 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 48px;
  font-weight: normal;
}

.page-header p {
  margin: 8px 0 0;
  color: #727572;
}

.content-section {
  width: 100%;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 26px;
}

.toolbar h2 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: normal;
}

.toolbar p {
  margin: 5px 0 0;
  color: #888;
  font-size: 13px;
}

.toolbar .v-text-field {
  width: min(330px, 100%);
  flex: none;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.book-card {
  overflow: hidden;
  border: 1px solid #e5ded2;
  border-radius: 12px;
  background: #fffdf9;
  box-shadow: none;
}

.book-cover {
  display: grid;
  height: 190px;
  place-items: center;
  align-content: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.book-cover span {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
}

.book-information {
  padding: 17px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #777;
  font-size: 13px;
}

.book-information h3 {
  min-height: 48px;
  margin: 10px 0 4px;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: normal;
}

.book-information p {
  margin: 0;
  color: #888;
  font-size: 13px;
}

.book-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 13px;
}

.book-bottom strong {
  color: #17324d;
  font-family: Georgia, serif;
  font-size: 20px;
}

.cart-button {
  text-transform: none;
}

.empty-state {
  display: grid;
  min-height: 420px;
  place-items: center;
  align-content: center;
  color: #9a958e;
  text-align: center;
}

.empty-state h3 {
  margin: 16px 0 6px;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: normal;
}

.empty-state p {
  margin: 0 0 22px;
}

@media (max-width: 1100px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .page-header,
  .toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .toolbar .v-text-field {
    width: 100%;
  }

  .book-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 39px;
  }
}
</style>