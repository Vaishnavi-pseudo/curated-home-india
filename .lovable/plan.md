# 🪔 India's Curated Discovery Platform for Homegrown Instagram Brands

## Design Vision

A premium, warm marketplace with a Pinterest-meets-luxury aesthetic. Soft beige/ivory/muted terracotta palette, serif + sans-serif font pairing, rounded cards with subtle shadows, smooth hover animations, and clean whitespace throughout. Mobile-first and responsive.

---

## Phase 1: Foundation & Authentication

### Backend Setup (Lovable Cloud / Supabase)

- Database schema: users, profiles, seller_applications, products, categories, orders, order_items, reviews, wishlists, followed_sellers
- Role-based auth system (buyer, seller, admin) with separate user_roles table
- Row-level security policies for all tables

### Authentication Pages

- **Sign Up / Login** — Email-based auth with role selection (Buyer or Seller)
- **Seller Onboarding Form** — Brand name, Instagram handle, category, sample images, brand story → submitted for admin approval
- **Protected routes** based on user role

---

## Phase 2: Buyer-Facing Storefront

### Homepage

- Hero section with strong positioning statement and CTA
- Featured categories: Embroidery, Candles, Rugs, Handmade Gifting
- Trending Brands carousel
- New Arrivals grid
- Trust indicators bar (Verified Sellers, Secure Payments, Curated Platform)
- Newsletter signup section
- Elegant footer

### Discovery & Browsing

- Category-based browsing pages
- Search bar with filters: price range, category, rating, location
- Pinterest-style grid layout with hover effects
- Wishlist heart button on product cards

### Product Page

- Large image gallery
- Product description, price, category
- Seller info card (clickable to seller profile)
- Reviews & ratings section
- Add to Cart & Save to Wishlist buttons

### Seller Profile Page

- Brand story, Instagram link
- Product catalog grid
- Reviews section
- Follow Seller button

---

## Phase 3: Checkout & Orders (Stripe)

### Checkout Flow

- Cart page with quantity controls
- Address form
- Stripe-powered secure checkout
- Order confirmation page

### Order Tracking

- Order status updates (Pending → Shipped → Delivered)
- Order history in buyer account

### Buyer Account Dashboard

- Order history
- Saved wishlist
- Followed sellers list

---

## Phase 4: Seller Dashboard

- **Product Management** — Upload products with images, price, description, category; edit and delete
- **Inventory Management** — Stock tracking per product
- **Order Dashboard** — View orders by status (pending, shipped, delivered); update order status
- **Payout Tracking** — View earnings and payout history
- **Profile Editing** — Update brand story, Instagram link, profile image

---

## Phase 5: Admin Panel

- **Seller Approvals** — Review and approve/reject seller applications with verified badge assignment
- **Order Overview** — View all platform orders
- **Category Management** — Add, edit, remove product categories
- **Review Moderation** — Flag or remove inappropriate reviews

---

## Phase 6: Trust & Polish

- Verified seller badges throughout the UI
- Ratings & reviews system with star ratings
- Secure checkout trust indicators
- Refund & Return policy page
- Smooth page transitions and micro-interactions
- Mobile responsiveness polish across all pages