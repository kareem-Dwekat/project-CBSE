<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const selectedRating = ref('All ratings')

const editDialog = ref(false)
const deleteDialog = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')

const selectedReview = ref(null)
const editedRating = ref(0)
const editedComment = ref('')

const ratingOptions = [
  'All ratings',
  '5 stars',
  '4 stars',
  '3 stars',
  '2 stars',
  '1 star',
]

const reviews = ref([
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    date: 'August 8, 2026',
    rating: 5,
    comment:
      'A practical and easy-to-follow book. The examples helped me understand how small daily habits can create meaningful changes over time.',
    helpful: 14,
    format: 'Paperback',
    color: '#B65C3A',
  },
  {
    id: 2,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    date: 'July 29, 2026',
    rating: 4,
    comment:
      'A thoughtful story with an interesting idea. Some parts felt slow, but the overall message was emotional and inspiring.',
    helpful: 9,
    format: 'Paperback',
    color: '#284B63',
  },
  {
    id: 3,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    date: 'July 15, 2026',
    rating: 5,
    comment:
      'A simple but beautiful story about following your dreams and listening to your heart. I would definitely read it again.',
    helpful: 21,
    format: 'E-book',
    color: '#D5A64A',
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    date: 'June 24, 2026',
    rating: 4,
    comment:
      'A powerful and disturbing novel. It makes the reader think deeply about privacy, power, and control in society.',
    helpful: 17,
    format: 'Paperback',
    color: '#7D3C3C',
  },
])

const filteredReviews = computed(() => {
  const searchValue = search.value.toLowerCase().trim()

  return reviews.value.filter(review => {
    const matchesSearch =
      !searchValue ||
      review.title.toLowerCase().includes(searchValue) ||
      review.author.toLowerCase().includes(searchValue) ||
      review.comment.toLowerCase().includes(searchValue)

    const matchesRating =
      selectedRating.value === 'All ratings' ||
      review.rating === Number(selectedRating.value.charAt(0))

    return matchesSearch && matchesRating
  })
})

const averageRating = computed(() => {
  if (!reviews.value.length) return 0

  const total = reviews.value.reduce(
    (sum, review) => sum + review.rating,
    0,
  )

  return (total / reviews.value.length).toFixed(1)
})

const totalHelpful = computed(() =>
  reviews.value.reduce(
    (total, review) => total + review.helpful,
    0,
  ),
)

function openEditDialog(review) {
  selectedReview.value = review
  editedRating.value = review.rating
  editedComment.value = review.comment
  editDialog.value = true
}

function saveReview() {
  if (!selectedReview.value) return

  if (!editedComment.value.trim()) {
    showMessage('Please enter your review.')
    return
  }

  if (editedRating.value < 1) {
    showMessage('Please select a rating.')
    return
  }

  const review = reviews.value.find(
    item => item.id === selectedReview.value.id,
  )

  if (review) {
    review.rating = editedRating.value
    review.comment = editedComment.value.trim()
  }

  editDialog.value = false
  showMessage('Review updated successfully!')
}

function openDeleteDialog(review) {
  selectedReview.value = review
  deleteDialog.value = true
}

function deleteReview() {
  if (!selectedReview.value) return

  const deletedTitle = selectedReview.value.title

  reviews.value = reviews.value.filter(
    review => review.id !== selectedReview.value.id,
  )

  deleteDialog.value = false
  selectedReview.value = null

  showMessage(`Your review for ${deletedTitle} was deleted.`)
}

function markHelpful(review) {
  review.helpful += 1
  showMessage('Thank you for your feedback!')
}

function clearFilters() {
  search.value = ''
  selectedRating.value = 'All ratings'
}

function showMessage(text) {
  snackbarMessage.value = text
  snackbar.value = true
}
</script>

<template>
  <div class="reviews-view">
    <header class="page-header">
      <div>
        <p class="small-title">MY ACCOUNT</p>
        <h1>My reviews</h1>

        <p>
          View and manage the reviews you have shared.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-book-search-outline"
        class="browse-button"
        @click="showMessage('The bookstore catalog will open here.')"
      >
        Browse books
      </v-btn>
    </header>

    <div class="summary-grid">
      <v-card class="summary-card">
        <div class="summary-icon blue">
          <v-icon icon="mdi-message-text-outline" />
        </div>

        <div>
          <span>Total reviews</span>
          <strong>{{ reviews.length }}</strong>
        </div>
      </v-card>

      <v-card class="summary-card">
        <div class="summary-icon gold">
          <v-icon icon="mdi-star-outline" />
        </div>

        <div>
          <span>Average rating</span>
          <strong>{{ averageRating }}</strong>
        </div>
      </v-card>

      <v-card class="summary-card">
        <div class="summary-icon green">
          <v-icon icon="mdi-thumb-up-outline" />
        </div>

        <div>
          <span>Helpful votes</span>
          <strong>{{ totalHelpful }}</strong>
        </div>
      </v-card>
    </div>

    <div class="reviews-section">
      <div class="reviews-toolbar">
        <div>
          <h2>Your book reviews</h2>
          <p>{{ filteredReviews.length }} review(s) found</p>
        </div>

        <div class="filters">
          <v-text-field
            v-model="search"
            label="Search reviews"
            placeholder="Book title or author"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            color="primary"
            hide-details
            clearable
          />

          <v-select
            v-model="selectedRating"
            label="Rating"
            :items="ratingOptions"
            prepend-inner-icon="mdi-filter-outline"
            variant="outlined"
            density="comfortable"
            color="primary"
            hide-details
          />
        </div>
      </div>

      <div
        v-if="filteredReviews.length"
        class="reviews-list"
      >
        <article
          v-for="review in filteredReviews"
          :key="review.id"
          class="review-item"
        >
          <div
            class="book-cover"
            :style="{ backgroundColor: review.color }"
          >
            <v-icon
              icon="mdi-book-open-page-variant-outline"
              size="35"
            />

            <span>{{ review.format }}</span>
          </div>

          <div class="review-content">
            <div class="review-top">
              <div>
                <h3>{{ review.title }}</h3>
                <p>by {{ review.author }}</p>
              </div>

              <v-chip
                color="success"
                size="small"
                variant="tonal"
              >
                <v-icon
                  icon="mdi-check-circle-outline"
                  start
                />

                Published
              </v-chip>
            </div>

            <div class="rating-row">
              <v-rating
                :model-value="review.rating"
                color="#D5A64A"
                active-color="#D5A64A"
                density="compact"
                size="small"
                readonly
              />

              <strong>{{ review.rating }}.0</strong>
              <span>{{ review.date }}</span>
            </div>

            <p class="review-comment">
              {{ review.comment }}
            </p>

            <div class="review-bottom">
              <button
                type="button"
                class="helpful-button"
                @click="markHelpful(review)"
              >
                <v-icon
                  icon="mdi-thumb-up-outline"
                  size="18"
                />

                Helpful ({{ review.helpful }})
              </button>

              <div class="review-actions">
                <v-btn
                  variant="text"
                  color="primary"
                  prepend-icon="mdi-pencil-outline"
                  @click="openEditDialog(review)"
                >
                  Edit
                </v-btn>

                <v-btn
                  variant="text"
                  color="error"
                  prepend-icon="mdi-delete-outline"
                  @click="openDeleteDialog(review)"
                >
                  Delete
                </v-btn>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="empty-state"
      >
        <v-icon
          icon="mdi-message-star-outline"
          size="70"
        />

        <h3>No reviews found</h3>

        <p>
          Try changing the search text or rating filter.
        </p>

        <v-btn
          color="primary"
          @click="clearFilters"
        >
          Clear filters
        </v-btn>
      </div>
    </div>
  </div>

  <v-dialog
    v-model="editDialog"
    max-width="600"
  >
    <v-card
      v-if="selectedReview"
      class="dialog-card"
    >
      <div class="dialog-header">
        <div>
          <p>EDIT REVIEW</p>
          <h2>{{ selectedReview.title }}</h2>
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="editDialog = false"
        />
      </div>

      <v-divider />

      <div class="dialog-content">
        <label class="rating-label">
          Your rating
        </label>

        <v-rating
          v-model="editedRating"
          color="#D5A64A"
          active-color="#D5A64A"
          hover
          size="large"
        />

        <v-textarea
          v-model="editedComment"
          label="Your review"
          placeholder="Share your opinion about this book..."
          variant="outlined"
          color="primary"
          rows="5"
          counter="500"
          maxlength="500"
          class="mt-5"
        />
      </div>

      <v-card-actions class="dialog-actions">
        <v-btn
          variant="outlined"
          @click="editDialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          prepend-icon="mdi-content-save-outline"
          @click="saveReview"
        >
          Save changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="deleteDialog"
    max-width="450"
  >
    <v-card class="delete-dialog">
      <div class="delete-icon">
        <v-icon
          icon="mdi-delete-outline"
          size="35"
        />
      </div>

      <h2>Delete review?</h2>

      <p v-if="selectedReview">
        Are you sure you want to delete your review for
        <strong>{{ selectedReview.title }}</strong>?
      </p>

      <div class="delete-actions">
        <v-btn
          variant="outlined"
          @click="deleteDialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          color="error"
          @click="deleteReview"
        >
          Delete review
        </v-btn>
      </div>
    </v-card>
  </v-dialog>

  <v-snackbar
    v-model="snackbar"
    color="primary"
    location="bottom"
    :timeout="3000"
  >
    {{ snackbarMessage }}

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
.reviews-view {
  width: 100%;
  min-width: 0;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
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

.browse-button,
.review-actions .v-btn,
.dialog-actions .v-btn {
  text-transform: none;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 32px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 19px;
  border: 1px solid #e5ded2;
  border-radius: 14px;
  background: white;
  box-shadow: none;
}

.summary-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 14px;
}

.summary-icon.blue {
  color: #17324d;
  background: #dce7ef;
}

.summary-icon.gold {
  color: #7b5817;
  background: #f5e7bd;
}

.summary-icon.green {
  color: #296146;
  background: #dceee4;
}

.summary-card div:last-child {
  display: grid;
}

.summary-card span {
  color: #888;
  font-size: 12px;
}

.summary-card strong {
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 23px;
}

.reviews-section {
  width: 100%;
}

.reviews-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 25px;
}

.reviews-toolbar h2 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: normal;
}

.reviews-toolbar p {
  margin: 5px 0 0;
  color: #888;
  font-size: 13px;
}

.filters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 170px;
  width: min(500px, 100%);
  gap: 12px;
}

.reviews-list {
  display: grid;
  gap: 17px;
}

.review-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  overflow: hidden;
  border: 1px solid #e5ded2;
  border-radius: 17px;
  background: #fffdf9;
}

.book-cover {
  display: grid;
  min-height: 230px;
  place-items: center;
  align-content: center;
  gap: 17px;
  color: rgba(255, 255, 255, 0.9);
}

.book-cover span {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
}

.review-content {
  padding: 22px;
}

.review-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
}

.review-top h3 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 23px;
  font-weight: normal;
}

.review-top p {
  margin: 5px 0 0;
  color: #888;
  font-size: 13px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 15px;
}

.rating-row strong {
  color: #744d18;
  font-size: 13px;
}

.rating-row span {
  margin-left: auto;
  color: #999;
  font-size: 12px;
}

.review-comment {
  margin: 17px 0;
  color: #545b5e;
  line-height: 1.7;
}

.review-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  border-top: 1px solid #ebe5dc;
}

.helpful-button {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 0;
  border: 0;
  color: #777;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.helpful-button:hover {
  color: #17324d;
}

.review-actions {
  display: flex;
  gap: 5px;
}

.empty-state {
  display: grid;
  min-height: 400px;
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

.dialog-card {
  border-radius: 20px;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
}

.dialog-header p {
  margin: 0 0 5px;
  color: #b65c3a;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
}

.dialog-header h2 {
  margin: 0;
  font-family: Georgia, serif;
  font-weight: normal;
}

.dialog-content {
  padding: 24px;
}

.rating-label {
  display: block;
  margin-bottom: 7px;
  color: #676b6d;
  font-size: 13px;
}

.dialog-actions {
  justify-content: flex-end;
  gap: 10px;
  padding: 0 24px 24px;
}

.delete-dialog {
  padding: 30px;
  border-radius: 20px;
  text-align: center;
}

.delete-icon {
  display: grid;
  width: 70px;
  height: 70px;
  margin: 0 auto 18px;
  place-items: center;
  border-radius: 50%;
  color: #b3261e;
  background: #f8dddd;
}

.delete-dialog h2 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: normal;
}

.delete-dialog p {
  margin: 13px 0 25px;
  color: #777;
  line-height: 1.6;
}

.delete-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 700px) {
  .page-header,
  .reviews-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .filters {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .review-item {
    grid-template-columns: 1fr;
  }

  .book-cover {
    min-height: 130px;
  }
}

@media (max-width: 500px) {
  .page-header h1 {
    font-size: 39px;
  }

  .review-top,
  .review-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .rating-row {
    flex-wrap: wrap;
  }

  .rating-row span {
    width: 100%;
    margin-left: 0;
  }

  .delete-actions,
  .dialog-actions {
    align-items: stretch;
    flex-direction: column-reverse;
  }

  .delete-actions .v-btn,
  .dialog-actions .v-btn {
    width: 100%;
  }
}
</style>