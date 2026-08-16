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
          <!-- Brand -->
          <a href="/catalog" class="brand">
            <div class="brand-icon">L</div>
            <span>Leaf & Letter</span>
          </a>

          <!-- Navigation -->
          <nav class="navigation">
            <span class="navigation-title">
              STORE
            </span>

            <!-- Catalog Microfrontend -->
            <a
              href="/catalog"
              class="nav-link"
            >
              <v-icon icon="mdi-home-outline" />
              Home
            </a>

            <a
              href="/products"
              class="nav-link"
            >
              <v-icon
                icon="mdi-book-open-page-variant-outline"
              />
              Browse Books
            </a>

            <!-- Cart Microfrontend -->
            <a
              href="/cart"
              class="nav-link"
            >
              <v-icon icon="mdi-cart-outline" />
              Shopping Cart
            </a>

            <div class="navigation-divider" />

            <span class="navigation-title">
              MY ACCOUNT
            </span>

            <!-- Account Microfrontend -->
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
              <v-icon
                icon="mdi-package-variant-closed"
              />
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

          <!-- Logout -->
          <button
            type="button"
            class="logout-button"
            @click="logout"
          >
            <v-icon icon="mdi-logout" />
            Sign out
          </button>
        </aside>

        <!-- Child account page -->
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
  background: linear-gradient(
    160deg,
    #1c3b59,
    #11283e
  );
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-family: Georgia, serif;
  font-size: 21px;
  text-decoration: none;
}

.brand-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: none;
  place-items: center;
  border: 2px solid #d5a64a;
  border-radius: 12px;
  color: #d5a64a;
  font-weight: bold;
}

/* Navigation */
.navigation {
  display: grid;
  gap: 8px;
  margin-top: 45px;
}

.navigation-title {
  padding: 0 16px 5px;
  color: rgba(255, 255, 255, 0.42);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
}

.navigation-divider {
  height: 1px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.12);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  transition:
    color 0.2s,
    background 0.2s;
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

/* Logout */
.logout-button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: auto;
  padding: 14px 16px;
  border: 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition:
    color 0.2s,
    background 0.2s;
}

.logout-button:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

/* Page content */
.account-content {
  min-width: 0;
  padding: 45px clamp(25px, 4vw, 60px);
}

/* Tablet and mobile */
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
    align-items: center;
    margin-top: 25px;
    padding-bottom: 5px;
    overflow-x: auto;
  }

  .navigation-title,
  .navigation-divider {
    display: none;
  }

  .nav-link {
    width: auto;
    flex: none;
    white-space: nowrap;
  }

  .logout-button {
    width: auto;
    margin-top: 18px;
  }

  .account-content {
    padding: 35px 24px;
  }
}

@media (max-width: 600px) {
  .sidebar {
    padding: 16px;
  }

  .brand {
    font-size: 19px;
  }

  .brand-icon {
    width: 38px;
    height: 38px;
  }

  .account-content {
    padding: 28px 16px;
  }
}
</style>