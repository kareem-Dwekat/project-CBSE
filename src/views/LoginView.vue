<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref(null)
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const snackbar = ref(false)
const message = ref('')

const emailRules = [
  value => !!value || 'Email is required',
  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    'Enter a valid email address',
]

const passwordRules = [
  value => !!value || 'Password is required',
  value =>
    value.length >= 8 ||
    'Password must be at least 8 characters',
]

async function login() {
  const { valid } = await form.value.validate()

  if (!valid) return

  loading.value = true

  setTimeout(() => {
    loading.value = false
    message.value = 'Login successful. Welcome back!'
    snackbar.value = true

   
    localStorage.setItem('loggedIn', 'true')

    const savedUser = JSON.parse(
      localStorage.getItem('accountUser') || '{}',
    )

    localStorage.setItem(
      'accountUser',
      JSON.stringify({
        ...savedUser,
        email: email.value,
      }),
    )

    window.dispatchEvent(
      new CustomEvent('account:login', {
        detail: {
          email: email.value,
          rememberMe: rememberMe.value,
        },
      }),
    )

  
    setTimeout(() => {
      router.push('/profile')
    }, 800)
  }, 700)
}

function showMessage(text) {
  message.value = text
  snackbar.value = true
}
</script>

<template>
  <v-app>
    <v-main class="login-page">
      <div class="login-container">
        <!-- Left section -->
        <section class="welcome-section">
          <div class="brand">
            <div class="brand-icon">
              L
            </div>

            <span>Leaf & Letter</span>
          </div>

          <div class="welcome-content">
            <p class="small-title">
              YOUR READING SPACE
            </p>

            <h1>
              Your next chapter,<br>
              all in one place.
            </h1>

            <p class="description">
              Save books you love, follow every order, and keep your reading
              life beautifully organized.
            </p>

            <ul>
              <li>
                <v-icon icon="mdi-bookmark-outline" />
                Build your personal wishlist
              </li>

              <li>
                <v-icon icon="mdi-package-variant-closed" />
                Track print and e-book orders
              </li>

              <li>
                <v-icon icon="mdi-star-outline" />
                Manage your ratings and reviews
              </li>
            </ul>
          </div>

          <p class="bottom-text">
            For readers, collectors, and curious minds.
          </p>
        </section>

        <!-- Login form -->
        <section class="form-section">
          <v-card class="login-card">
            <p class="member-label">
              MEMBER ACCESS
            </p>

            <h2>Welcome back</h2>

            <p class="subtitle">
              Sign in to view your profile, orders, reviews, and saved books.
            </p>

            <v-form
              ref="form"
              @submit.prevent="login"
            >
              <v-text-field
                v-model.trim="email"
                label="Email address"
                placeholder="reader@example.com"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                autocomplete="email"
                variant="outlined"
                color="primary"
                :rules="emailRules"
                class="mb-3"
              />

              <v-text-field
                v-model="password"
                label="Password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="
                  showPassword ? 'mdi-eye-off' : 'mdi-eye'
                "
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                variant="outlined"
                color="primary"
                :rules="passwordRules"
                @click:append-inner="showPassword = !showPassword"
              />

              <div class="form-options">
                <v-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  color="primary"
                  density="compact"
                  hide-details
                />

                <a
                  href="#"
                  @click.prevent="
                    showMessage('Password recovery will be added later.')
                  "
                >
                  Forgot password?
                </a>
              </div>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                class="login-button"
              >
                Sign in

                <v-icon
                  icon="mdi-arrow-right"
                  end
                />
              </v-btn>

              <div class="divider">
                <span>OR</span>
              </div>

              <v-btn
                variant="outlined"
                size="large"
                block
                class="google-button"
                prepend-icon="mdi-google"
                @click="
                  showMessage('Google login is mocked in this prototype.')
                "
              >
                Continue with Google
              </v-btn>
            </v-form>

            <!-- الانتقال إلى Register -->
            <p class="register-text">
              New to Leaf & Letter?

              <router-link to="/register">
                Create an account
              </router-link>
            </p>

            <p class="demo-note">
              <v-icon
                icon="mdi-lock-outline"
                size="14"
              />

              Demo interface — no password is stored.
            </p>
          </v-card>
        </section>
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
    </v-main>
  </v-app>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  padding: 24px;
  background: #f4f0e8;
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  width: min(1150px, 100%);
  min-height: calc(100vh - 48px);
  margin: auto;
  overflow: hidden;
  border-radius: 28px;
  background: #fffcf7;
  box-shadow: 0 25px 70px rgba(23, 50, 77, 0.15);
}

.welcome-section {
  display: flex;
  flex-direction: column;
  padding: 48px;
  color: white;
  background: linear-gradient(145deg, #1c3b59, #11283e);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Georgia, serif;
  font-size: 22px;
}

.brand-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 2px solid #d5a64a;
  border-radius: 12px;
  color: #d5a64a;
  font-weight: bold;
}

.welcome-content {
  margin: auto 0;
}

.small-title {
  margin-bottom: 18px;
  color: #e8c77d;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 3px;
}

.welcome-content h1 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: clamp(44px, 5vw, 66px);
  font-weight: normal;
  line-height: 1;
}

.description {
  max-width: 430px;
  margin: 28px 0;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
}

.welcome-content ul {
  display: grid;
  gap: 15px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.welcome-content li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.welcome-content li .v-icon {
  color: #e8c77d;
}

.bottom-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.form-section {
  display: grid;
  padding: 60px;
  place-items: center;
}

.login-card {
  width: min(440px, 100%);
  padding: 10px;
  background: transparent;
  box-shadow: none;
}

.member-label {
  display: inline-block;
  margin-bottom: 18px;
  padding: 7px 12px;
  border: 1px solid #ded6c8;
  border-radius: 30px;
  color: #6c6257;
  background: #f8f4ed;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
}

.login-card h2 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 48px;
  font-weight: normal;
}

.subtitle {
  margin: 12px 0 30px;
  color: #6f716f;
  line-height: 1.6;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-options a,
.register-text a {
  color: #17324d;
  font-weight: bold;
  text-decoration: none;
}

.form-options a:hover,
.register-text a:hover {
  color: #b65c3a;
  text-decoration: underline;
}

.login-button {
  height: 52px;
  background: #17324d;
  text-transform: none;
}

.divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 22px 0;
  color: #999;
  font-size: 12px;
}

.divider::before,
.divider::after {
  height: 1px;
  flex: 1;
  background: #ddd6cc;
  content: "";
}

.google-button {
  height: 50px;
  color: #313b44;
  text-transform: none;
}

.register-text {
  margin-top: 28px;
  color: #676b6d;
  text-align: center;
}

.demo-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 15px;
  color: #99948d;
  font-size: 12px;
}

@media (max-width: 850px) {
  .login-page {
    padding: 0;
  }

  .login-container {
    grid-template-columns: 1fr;
    min-height: 100vh;
    border-radius: 0;
  }

  .welcome-section {
    display: none;
  }

  .form-section {
    padding: 35px 24px;
  }
}

@media (max-width: 480px) {
  .login-card h2 {
    font-size: 40px;
  }

  .form-options {
    gap: 10px;
  }
}
</style>