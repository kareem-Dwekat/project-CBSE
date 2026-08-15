<script setup>
import { computed, ref } from 'vue'

const form = ref(null)

const editing = ref(false)
const loading = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')

const savedUser = JSON.parse(
  localStorage.getItem('accountUser') || '{}',
)

const user = ref({
  firstName: savedUser.firstName || 'Sara',
  lastName: savedUser.lastName || 'Ahmad',
  email: savedUser.email || 'reader@example.com',
  phone: savedUser.phone || '+970 599 123 456',
  city: savedUser.city || 'Ramallah',
  favoriteGenre: savedUser.favoriteGenre || 'Fiction',
  bio:
    savedUser.bio ||
    'A book lover interested in fiction, history, and technology.',
})

const originalUser = ref({ ...user.value })

const fullName = computed(() =>
  `${user.value.firstName} ${user.value.lastName}`,
)

const initials = computed(() =>
  `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`
    .toUpperCase(),
)

const requiredRule = value =>
  !!value || 'This field is required'

const emailRules = [
  requiredRule,
  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    'Enter a valid email address',
]

function startEditing() {
  originalUser.value = { ...user.value }
  editing.value = true
}

function cancelEditing() {
  user.value = { ...originalUser.value }
  editing.value = false
}

async function saveProfile() {
  const { valid } = await form.value.validate()

  if (!valid) return

  loading.value = true

  setTimeout(() => {
    localStorage.setItem(
      'accountUser',
      JSON.stringify(user.value),
    )

    originalUser.value = { ...user.value }
    editing.value = false
    loading.value = false
    snackbarMessage.value = 'Profile updated successfully!'
    snackbar.value = true
  }, 600)
}
</script>

<template>
  <div class="profile-view">
    <header class="page-header">
      <div>
        <p class="small-title">
          MY ACCOUNT
        </p>

        <h1>Profile</h1>

        <p>
          Manage your personal information and reading preferences.
        </p>
      </div>

      <v-btn
        v-if="!editing"
        color="primary"
        prepend-icon="mdi-pencil-outline"
        class="edit-button"
        @click="startEditing"
      >
        Edit profile
      </v-btn>
    </header>

    <v-card class="profile-summary">
      <div class="avatar">
        {{ initials }}
      </div>

      <div class="user-info">
        <h2>{{ fullName }}</h2>
        <p>{{ user.email }}</p>

        <span class="member-badge">
          <v-icon
            icon="mdi-book-open-page-variant-outline"
            size="16"
          />

          Book Club Member
        </span>
      </div>

      <div class="account-stats">
        <div>
          <strong>8</strong>
          <span>Orders</span>
        </div>

        <div>
          <strong>14</strong>
          <span>Wishlist</span>
        </div>

        <div>
          <strong>6</strong>
          <span>Reviews</span>
        </div>
      </div>
    </v-card>

    <v-card class="details-card">
      <div class="section-heading">
        <div>
          <h3>Personal information</h3>

          <p>
            Update your account details below.
          </p>
        </div>

        <v-icon
          icon="mdi-shield-check-outline"
          color="primary"
          size="28"
        />
      </div>

      <v-form
        ref="form"
        @submit.prevent="saveProfile"
      >
        <div class="form-grid">
          <v-text-field
            v-model.trim="user.firstName"
            label="First name"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            color="primary"
            :readonly="!editing"
            :rules="[requiredRule]"
          />

          <v-text-field
            v-model.trim="user.lastName"
            label="Last name"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            color="primary"
            :readonly="!editing"
            :rules="[requiredRule]"
          />

          <v-text-field
            v-model.trim="user.email"
            label="Email address"
            prepend-inner-icon="mdi-email-outline"
            type="email"
            variant="outlined"
            color="primary"
            :readonly="!editing"
            :rules="emailRules"
          />

          <v-text-field
            v-model.trim="user.phone"
            label="Phone number"
            prepend-inner-icon="mdi-phone-outline"
            variant="outlined"
            color="primary"
            :readonly="!editing"
          />

          <v-text-field
            v-model.trim="user.city"
            label="City"
            prepend-inner-icon="mdi-map-marker-outline"
            variant="outlined"
            color="primary"
            :readonly="!editing"
          />

          <v-select
            v-model="user.favoriteGenre"
            label="Favorite genre"
            prepend-inner-icon="mdi-bookshelf"
            :items="[
              'Fiction',
              'History',
              'Science',
              'Technology',
              'Business',
              'Poetry',
              'Biography',
            ]"
            variant="outlined"
            color="primary"
            :readonly="!editing"
          />
        </div>

        <v-textarea
          v-model.trim="user.bio"
          label="About me"
          prepend-inner-icon="mdi-text"
          variant="outlined"
          color="primary"
          rows="3"
          :readonly="!editing"
        />

        <div
          v-if="editing"
          class="form-actions"
        >
          <v-btn
            variant="outlined"
            size="large"
            @click="cancelEditing"
          >
            Cancel
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            size="large"
            prepend-icon="mdi-content-save-outline"
            :loading="loading"
          >
            Save changes
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>

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
.profile-view {
  width: 100%;
  min-width: 0;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 30px;
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

.edit-button {
  text-transform: none;
}

.profile-summary {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 25px;
  padding: 27px;
  border: 1px solid #e5ded2;
  border-radius: 14px;
  background: #fff;
  box-shadow: none;
}

.avatar {
  display: grid;
  width: 80px;
  height: 80px;
  flex: none;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: #17324d;
  font-family: Georgia, serif;
  font-size: 27px;
}

.user-info h2 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 26px;
  font-weight: normal;
}

.user-info p {
  margin: 5px 0 10px;
  color: #777;
}

.member-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 20px;
  color: #744d18;
  background: #f7e8bd;
  font-size: 12px;
  font-weight: bold;
}

.account-stats {
  display: flex;
  gap: 35px;
  margin-left: auto;
}

.account-stats div {
  display: grid;
  text-align: center;
}

.account-stats strong {
  color: #17324d;
  font-family: Georgia, serif;
  font-size: 24px;
}

.account-stats span {
  color: #898989;
  font-size: 12px;
}

.details-card {
  padding: 28px;
  border: 1px solid #e5ded2;
  border-radius: 14px;
  background: #fff;
  box-shadow: none;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 27px;
}

.section-heading h3 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: normal;
}

.section-heading p {
  margin: 6px 0 0;
  color: #888;
  font-size: 13px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 5px;
}

.form-actions .v-btn {
  text-transform: none;
}

@media (max-width: 650px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .profile-summary {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .account-stats {
    width: 100%;
    justify-content: space-around;
    margin: 12px 0 0;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .v-btn {
    width: 100%;
  }

  .page-header h1 {
    font-size: 39px;
  }
}
</style>