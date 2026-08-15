<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('loggedIn')
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-main class="account-page">
      <div class="account-layout">
        <aside class="sidebar">
          <div class="brand">
            <div class="brand-icon">L</div>
            <span>Leaf & Letter</span>
          </div>

          <nav class="navigation">
            <router-link
              to="/profile"
              class="nav-link"
              active-class="active"
            >
              <v-icon icon="mdi-account-outline" />
              Profile
            </router-link>

            <router-link
              to="/orders"
              class="nav-link"
              active-class="active"
            >
              <v-icon icon="mdi-package-variant-closed" />
              My Orders
            </router-link>

            <router-link
              to="/wishlist"
              class="nav-link"
              active-class="active"
            >
              <v-icon icon="mdi-heart-outline" />
              Wishlist
            </router-link>

            <router-link
              to="/reviews"
              class="nav-link"
              active-class="active"
            >
              <v-icon icon="mdi-star-outline" />
              My Reviews
            </router-link>
          </nav>

          <button
            type="button"
            class="logout-button"
            @click="logout"
          >
            <v-icon icon="mdi-logout" />
            Sign out
          </button>
        </aside>

        <section class="account-content">
          <router-view />
        </section>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.account-page {
  min-height: 100vh;
  background: #fffcf7;
}

.account-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  width: 100%;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 36px 25px;
  color: white;
  background: linear-gradient(160deg, #1c3b59, #11283e);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Georgia, serif;
  font-size: 21px;
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

.navigation {
  display: grid;
  gap: 8px;
  margin-top: 65px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 14px 16px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  transition: 0.2s;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.active {
  color: #17212b;
  background: #e8c77d;
  font-weight: bold;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding: 14px 16px;
  border: 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
  cursor: pointer;
  font: inherit;
}

.logout-button:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.account-content {
  min-width: 0;
  padding: 45px clamp(25px, 4vw, 60px);
}

@media (max-width: 900px) {
  .account-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
    padding: 20px;
  }

  .navigation {
    display: flex;
    margin-top: 25px;
    overflow-x: auto;
  }

  .nav-link {
    flex: none;
  }

  .logout-button {
    margin-top: 20px;
  }

  .account-content {
    padding: 35px 24px;
  }
}
</style>