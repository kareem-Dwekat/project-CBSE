<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const selectedStatus = ref('All')
const detailsDialog = ref(false)
const selectedOrder = ref(null)
const snackbar = ref(false)
const snackbarMessage = ref('')

const statuses = [
  'All',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

const orders = ref([
  {
    id: 'ORD-2026-1048',
    date: 'August 10, 2026',
    status: 'Delivered',
    total: 42.97,
    address: 'Ramallah, Palestine',
    payment: 'Visa ending in 4242',
    items: [
      {
        id: 1,
        title: 'The Midnight Library',
        author: 'Matt Haig',
        format: 'Paperback',
        quantity: 1,
        price: 14.99,
        color: '#284B63',
      },
      {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        format: 'Paperback',
        quantity: 1,
        price: 17.99,
        color: '#B65C3A',
      },
      {
        id: 3,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        format: 'E-book',
        quantity: 1,
        price: 9.99,
        color: '#D5A64A',
      },
    ],
  },
  {
    id: 'ORD-2026-1027',
    date: 'August 4, 2026',
    status: 'Shipped',
    total: 31.98,
    address: 'Ramallah, Palestine',
    payment: 'Visa ending in 4242',
    items: [
      {
        id: 4,
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        format: 'Hardcover',
        quantity: 1,
        price: 19.99,
        color: '#315A52',
      },
      {
        id: 5,
        title: '1984',
        author: 'George Orwell',
        format: 'Paperback',
        quantity: 1,
        price: 11.99,
        color: '#7D3C3C',
      },
    ],
  },
  {
    id: 'ORD-2026-0995',
    date: 'July 25, 2026',
    status: 'Processing',
    total: 23.98,
    address: 'Ramallah, Palestine',
    payment: 'Cash on delivery',
    items: [
      {
        id: 6,
        title: 'The Book Thief',
        author: 'Markus Zusak',
        format: 'Paperback',
        quantity: 1,
        price: 13.99,
        color: '#5A486C',
      },
      {
        id: 7,
        title: 'Deep Work',
        author: 'Cal Newport',
        format: 'E-book',
        quantity: 1,
        price: 9.99,
        color: '#3C6078',
      },
    ],
  },
  {
    id: 'ORD-2026-0912',
    date: 'July 8, 2026',
    status: 'Cancelled',
    total: 16.99,
    address: 'Ramallah, Palestine',
    payment: 'Visa ending in 4242',
    items: [
      {
        id: 8,
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        format: 'Paperback',
        quantity: 1,
        price: 16.99,
        color: '#773E45',
      },
    ],
  },
])

const filteredOrders = computed(() => {
  const searchValue = search.value.toLowerCase().trim()

  return orders.value.filter(order => {
    const matchesStatus =
      selectedStatus.value === 'All' ||
      order.status === selectedStatus.value

    const matchesSearch =
      !searchValue ||
      order.id.toLowerCase().includes(searchValue) ||
      order.items.some(item =>
        item.title.toLowerCase().includes(searchValue),
      )

    return matchesStatus && matchesSearch
  })
})

const deliveredCount = computed(() =>
  orders.value.filter(order => order.status === 'Delivered').length,
)

const activeCount = computed(() =>
  orders.value.filter(order =>
    ['Processing', 'Shipped'].includes(order.status),
  ).length,
)

const totalSpent = computed(() =>
  orders.value
    .filter(order => order.status !== 'Cancelled')
    .reduce((total, order) => total + order.total, 0),
)

function statusColor(status) {
  const colors = {
    Delivered: 'success',
    Shipped: 'info',
    Processing: 'warning',
    Cancelled: 'error',
  }

  return colors[status] || 'grey'
}

function statusIcon(status) {
  const icons = {
    Delivered: 'mdi-check-circle-outline',
    Shipped: 'mdi-truck-delivery-outline',
    Processing: 'mdi-clock-outline',
    Cancelled: 'mdi-close-circle-outline',
  }

  return icons[status] || 'mdi-package-variant'
}

function openDetails(order) {
  selectedOrder.value = order
  detailsDialog.value = true
}

function showMessage(message) {
  snackbarMessage.value = message
  snackbar.value = true
}

function reorder(order) {
  showMessage(`${order.items.length} item(s) added to your cart.`)
}

function downloadInvoice(order) {
  showMessage(`Invoice for ${order.id} is ready to download.`)
}

function clearFilters() {
  search.value = ''
  selectedStatus.value = 'All'
}
</script>

<template>
  <div class="orders-view">
    <header class="page-header">
      <div>
        <p class="small-title">MY ACCOUNT</p>
        <h1>Order history</h1>

        <p>
          View your previous purchases and track active orders.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-book-open-page-variant-outline"
        class="shop-button"
        @click="showMessage('The bookstore catalog will open here.')"
      >
        Continue shopping
      </v-btn>
    </header>

    <div class="summary-grid">
      <v-card class="summary-card">
        <div class="summary-icon blue">
          <v-icon icon="mdi-receipt-text-outline" />
        </div>

        <div>
          <span>Total orders</span>
          <strong>{{ orders.length }}</strong>
        </div>
      </v-card>

      <v-card class="summary-card">
        <div class="summary-icon orange">
          <v-icon icon="mdi-truck-outline" />
        </div>

        <div>
          <span>Active orders</span>
          <strong>{{ activeCount }}</strong>
        </div>
      </v-card>

      <v-card class="summary-card">
        <div class="summary-icon green">
          <v-icon icon="mdi-check-circle-outline" />
        </div>

        <div>
          <span>Delivered</span>
          <strong>{{ deliveredCount }}</strong>
        </div>
      </v-card>

      <v-card class="summary-card">
        <div class="summary-icon gold">
          <v-icon icon="mdi-wallet-outline" />
        </div>

        <div>
          <span>Total spent</span>
          <strong>${{ totalSpent.toFixed(2) }}</strong>
        </div>
      </v-card>
    </div>

    <div class="orders-section">
      <div class="orders-toolbar">
        <div>
          <h2>Your orders</h2>
          <p>{{ filteredOrders.length }} order(s) found</p>
        </div>

        <div class="filters">
          <v-text-field
            v-model="search"
            label="Search orders"
            placeholder="Order ID or book title"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            color="primary"
            hide-details
            clearable
          />

          <v-select
            v-model="selectedStatus"
            label="Status"
            :items="statuses"
            prepend-inner-icon="mdi-filter-outline"
            variant="outlined"
            density="comfortable"
            color="primary"
            hide-details
          />
        </div>
      </div>

      <div
        v-if="filteredOrders.length"
        class="orders-list"
      >
        <article
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-item"
        >
          <div class="order-header">
            <div>
              <span class="order-label">
                ORDER NUMBER
              </span>

              <h3>{{ order.id }}</h3>
            </div>

            <div class="order-date">
              <span>Placed on</span>
              <strong>{{ order.date }}</strong>
            </div>

            <v-chip
              :color="statusColor(order.status)"
              variant="tonal"
              size="small"
            >
              <v-icon
                :icon="statusIcon(order.status)"
                start
              />

              {{ order.status }}
            </v-chip>
          </div>

          <div class="order-body">
            <div class="book-covers">
              <div
                v-for="item in order.items.slice(0, 3)"
                :key="item.id"
                class="book-cover"
                :style="{ backgroundColor: item.color }"
              >
                <v-icon
                  icon="mdi-book-open-page-variant-outline"
                  size="20"
                />
              </div>
            </div>

            <div class="order-description">
              <strong>
                {{ order.items[0].title }}
              </strong>

              <span v-if="order.items.length > 1">
                and {{ order.items.length - 1 }} more item(s)
              </span>

              <span v-else>
                {{ order.items[0].author }}
              </span>
            </div>

            <div class="order-total">
              <span>Order total</span>
              <strong>${{ order.total.toFixed(2) }}</strong>
            </div>

            <div class="order-actions">
              <v-btn
                variant="outlined"
                color="primary"
                @click="openDetails(order)"
              >
                View details
              </v-btn>

              <v-btn
                v-if="order.status === 'Delivered'"
                color="primary"
                @click="reorder(order)"
              >
                Buy again
              </v-btn>

              <v-btn
                v-else-if="order.status === 'Shipped'"
                color="primary"
                @click="showMessage('Opening shipment tracking...')"
              >
                Track order
              </v-btn>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="empty-state"
      >
        <v-icon
          icon="mdi-package-variant"
          size="65"
        />

        <h3>No orders found</h3>

        <p>
          Try changing the search text or selected status.
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
    v-model="detailsDialog"
    max-width="680"
  >
    <v-card
      v-if="selectedOrder"
      class="details-dialog"
    >
      <div class="dialog-header">
        <div>
          <p>ORDER DETAILS</p>
          <h2>{{ selectedOrder.id }}</h2>
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="detailsDialog = false"
        />
      </div>

      <v-divider />

      <div class="dialog-content">
        <div class="dialog-status">
          <div>
            <span>Order date</span>
            <strong>{{ selectedOrder.date }}</strong>
          </div>

          <v-chip
            :color="statusColor(selectedOrder.status)"
            variant="tonal"
          >
            {{ selectedOrder.status }}
          </v-chip>
        </div>

        <h3>Items</h3>

        <div
          v-for="item in selectedOrder.items"
          :key="item.id"
          class="dialog-item"
        >
          <div
            class="dialog-book"
            :style="{ backgroundColor: item.color }"
          >
            <v-icon icon="mdi-book-outline" />
          </div>

          <div class="dialog-item-info">
            <strong>{{ item.title }}</strong>
            <span>{{ item.author }}</span>

            <small>
              {{ item.format }} · Quantity: {{ item.quantity }}
            </small>
          </div>

          <strong>${{ item.price.toFixed(2) }}</strong>
        </div>

        <v-divider class="my-5" />

        <div class="order-information">
          <div>
            <span>Shipping address</span>
            <strong>{{ selectedOrder.address }}</strong>
          </div>

          <div>
            <span>Payment method</span>
            <strong>{{ selectedOrder.payment }}</strong>
          </div>
        </div>

        <div class="dialog-total">
          <span>Total</span>
          <strong>${{ selectedOrder.total.toFixed(2) }}</strong>
        </div>
      </div>

      <v-card-actions class="dialog-actions">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-download-outline"
          @click="downloadInvoice(selectedOrder)"
        >
          Download invoice
        </v-btn>

        <v-btn
          color="primary"
          @click="detailsDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
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
.orders-view {
  width: 100%;
  min-width: 0;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 25px;
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

.shop-button,
.order-actions .v-btn,
.dialog-actions .v-btn {
  text-transform: none;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 32px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border: 1px solid #e5ded2;
  border-radius: 14px;
  background: white;
  box-shadow: none;
}

.summary-icon {
  display: grid;
  width: 45px;
  height: 45px;
  flex: none;
  place-items: center;
  border-radius: 13px;
}

.summary-icon.blue {
  color: #17324d;
  background: #dce7ef;
}

.summary-icon.orange {
  color: #a44d2d;
  background: #f6dfd4;
}

.summary-icon.green {
  color: #296146;
  background: #dceee4;
}

.summary-icon.gold {
  color: #7b5817;
  background: #f5e7bd;
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
  font-size: 22px;
}

.orders-section {
  width: 100%;
}

.orders-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 25px;
}

.orders-toolbar h2 {
  margin: 0;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: normal;
}

.orders-toolbar p {
  margin: 5px 0 0;
  color: #888;
  font-size: 13px;
}

.filters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 175px;
  width: min(500px, 100%);
  gap: 12px;
}

.orders-list {
  display: grid;
  gap: 16px;
}

.order-item {
  overflow: hidden;
  border: 1px solid #e5ded2;
  border-radius: 16px;
  background: #fffdf9;
}

.order-header {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 17px 20px;
  border-bottom: 1px solid #ebe5dc;
  background: #f9f5ee;
}

.order-label,
.order-date span,
.order-total span {
  display: block;
  color: #918b83;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

.order-header h3 {
  margin: 4px 0 0;
  color: #17324d;
  font-size: 15px;
}

.order-date {
  display: grid;
  gap: 4px;
}

.order-date strong {
  font-size: 13px;
}

.order-body {
  display: grid;
  grid-template-columns: auto minmax(150px, 1fr) auto auto;
  align-items: center;
  gap: 22px;
  padding: 20px;
}

.book-covers {
  display: flex;
}

.book-cover {
  display: grid;
  width: 40px;
  height: 57px;
  place-items: center;
  border: 2px solid white;
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 6px 12px rgba(23, 50, 77, 0.15);
}

.book-cover + .book-cover {
  margin-left: -10px;
}

.order-description {
  display: grid;
  gap: 4px;
}

.order-description strong {
  color: #17212b;
}

.order-description span {
  color: #888;
  font-size: 12px;
}

.order-total {
  display: grid;
  gap: 4px;
}

.order-total strong {
  font-family: Georgia, serif;
  font-size: 19px;
}

.order-actions {
  display: flex;
  gap: 9px;
}

.empty-state {
  display: grid;
  min-height: 330px;
  place-items: center;
  align-content: center;
  color: #96918a;
  text-align: center;
}

.empty-state h3 {
  margin: 15px 0 5px;
  color: #17212b;
  font-family: Georgia, serif;
  font-size: 25px;
}

.empty-state p {
  margin: 0 0 20px;
}

.details-dialog {
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

.dialog-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.dialog-status div,
.order-information div {
  display: grid;
  gap: 5px;
}

.dialog-status span,
.order-information span {
  color: #888;
  font-size: 12px;
}

.dialog-content h3 {
  margin-bottom: 15px;
  font-family: Georgia, serif;
  font-weight: normal;
}

.dialog-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 15px;
  padding: 11px 0;
}

.dialog-book {
  display: grid;
  width: 48px;
  height: 65px;
  place-items: center;
  border-radius: 6px;
  color: white;
}

.dialog-item-info {
  display: grid;
  gap: 3px;
}

.dialog-item-info span,
.dialog-item-info small {
  color: #888;
}

.order-information {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.dialog-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  padding: 18px;
  border-radius: 12px;
  background: #f5f0e8;
}

.dialog-total strong {
  color: #17324d;
  font-family: Georgia, serif;
  font-size: 24px;
}

.dialog-actions {
  justify-content: space-between;
  padding: 0 24px 24px;
}

@media (max-width: 1050px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .order-body {
    grid-template-columns: auto 1fr auto;
  }

  .order-actions {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}

@media (max-width: 700px) {
  .page-header,
  .orders-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .filters {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .order-header {
    grid-template-columns: 1fr auto;
  }

  .order-date {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .order-body {
    grid-template-columns: auto 1fr;
  }

  .order-total {
    grid-column: 2;
  }

  .order-actions {
    justify-content: stretch;
  }

  .order-actions .v-btn {
    flex: 1;
  }
}

@media (max-width: 500px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 39px;
  }

  .order-actions {
    flex-direction: column;
  }

  .order-information {
    grid-template-columns: 1fr;
  }

  .dialog-actions {
    align-items: stretch;
    flex-direction: column-reverse;
  }

  .dialog-actions .v-btn {
    width: 100%;
  }
}
</style>