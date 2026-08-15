<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref(null)

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const snackbar = ref(false)

const requiredRule = value =>
  !!value || 'This field is required'

const emailRules = [
  requiredRule,
  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    'Enter a valid email address',
]

const passwordRules = [
  requiredRule,
  value =>
    value.length >= 8 ||
    'Password must be at least 8 characters',
]

const confirmPasswordRules = [
  requiredRule,
  value =>
    value === password.value ||
    'Passwords do not match',
]

const termsRules = [
  value =>
    value ||
    'You must accept the terms and conditions',
]

async function register() {
  const { valid } = await form.value.validate()

  if (!valid) return

  loading.value = true

  setTimeout(() => {
    loading.value = false
    snackbar.value = true

    window.dispatchEvent(
      new CustomEvent('account:register', {
        detail: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
        },
      }),
    )

    // الانتقال إلى صفحة Login بعد نجاح التسجيل
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }, 700)
}
</script>

<template>
  <v-app>
    <v-main class="register-page">
      <div class="register-container">
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
              JOIN OUR COMMUNITY
            </p>

            <h1>
              Create your<br>
              reading space.
            </h1>

            <p class="description">
              Create an account to save your favorite books, follow your
              orders, and share reviews with other readers.
            </p>

            <ul>
              <li>
                <v-icon icon="mdi-bookmark-outline" />

                Create your personal wishlist
              </li>

              <li>
                <v-icon icon="mdi-package-variant-closed" />

                Follow print and e-book orders
              </li>

              <li>
                <v-icon icon="mdi-star-outline" />

                Rate and review your books
              </li>
            </ul>
          </div>

          <p class="bottom-text">
            Your next great read starts here.
          </p>
        </section>

        <!-- Registration form -->
        <section class="form-section">
          <v-card class="register-card">
            <p class="member-label">
              NEW MEMBER
            </p>

            <h2>Create an account</h2>

            <p class="subtitle">
              Enter your information to join Leaf & Letter.
            </p>

            <v-form
              ref="form"
              @submit.prevent="register"
            >
              <div class="name-fields">
                <v-text-field
                  v-model.trim="firstName"
                  label="First name"
                  placeholder="Enter first name"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  color="primary"
                  :rules="[requiredRule]"
                />

                <v-text-field
                  v-model.trim="lastName"
                  label="Last name"
                  placeholder="Enter last name"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  color="primary"
                  :rules="[requiredRule]"
                />
              </div>

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
                class="mb-2"
              />

              <v-text-field
                v-model="password"
                label="Password"
                placeholder="Create a password"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="
                  showPassword ? 'mdi-eye-off' : 'mdi-eye'
                "
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                variant="outlined"
                color="primary"
                :rules="passwordRules"
                class="mb-2"
                @click:append-inner="showPassword = !showPassword"
              />

              <v-text-field
                v-model="confirmPassword"
                label="Confirm password"
                placeholder="Enter the password again"
                prepend-inner-icon="mdi-lock-check-outline"
                :append-inner-icon="
                  showConfirmPassword
                    ? 'mdi-eye-off'
                    : 'mdi-eye'
                "
                :type="
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                "
                autocomplete="new-password"
                variant="outlined"
                color="primary"
                :rules="confirmPasswordRules"
                @click:append-inner="
                  showConfirmPassword = !showConfirmPassword
                "
              />

              <v-checkbox
                v-model="acceptTerms"
                color="primary"
                density="compact"
                :rules="termsRules"
              >
                <template #label>
                  <span class="terms-text">
                    I agree to the

                    <a
                      href="#"
                      @click.stop.prevent
                    >
                      Terms and Conditions
                    </a>

                    and

                    <a
                      href="#"
                      @click.stop.prevent
                    >
                      Privacy Policy
                    </a>
                  </span>
                </template>
              </v-checkbox>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                class="register-button"
              >
                Create account

                <v-icon
                  icon="mdi-arrow-right"
                  end
                />
              </v-btn>
            </v-form>

            <!-- الانتقال اليدوي إلى صفحة Login -->
            <p class="login-text">
              Already have an account?

              <router-link to="/login">
                Sign in
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
        Account created successfully! Redirecting to login...

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
.register-page {
  min-height: 100vh;
  padding: 24px;
  background: #f4f0e8;
}

.register-container {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  width: min(1180px, 100%);
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
  padding: 45px 60px;
  place-items: center;
}

.register-card {
  width: min(500px, 100%);
  padding: 10px;
  background: transparent;
  box-shadow: none;
}

.member-label {
  display: inline-block;
  margin-bottom: 15px;
  padding: 7px 12px;
  border: 1px solid #ded6c8;
  border-radius: 30px;
  color: #6c6257;
  background: #f8f4ed;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
}

.register-card h2 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 46px;
  font-weight: normal;
}

.subtitle {
  margin: 12px 0 28px;
  color: #6f716f;
}

.name-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.terms-text {
  color: #676b6d;
  font-size: 13px;
}

.terms-text a,
.login-text a {
  color: #17324d;
  font-weight: bold;
  text-decoration: none;
}

.terms-text a:hover,
.login-text a:hover {
  color: #b65c3a;
  text-decoration: underline;
}

.register-button {
  height: 52px;
  margin-top: 5px;
  background: #17324d;
  text-transform: none;
}

.login-text {
  margin-top: 25px;
  color: #676b6d;
  text-align: center;
}

.demo-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 14px;
  color: #99948d;
  font-size: 12px;
}

@media (max-width: 850px) {
  .register-page {
    padding: 0;
  }

  .register-container {
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

@media (max-width: 520px) {
  .name-fields {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .register-card h2 {
    font-size: 38px;
  }
}
</style>