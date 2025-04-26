export const tableSchemas = `

-- Table 1: Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) CHECK (role IN ('organizer', 'audience')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Events
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image TEXT,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table 3: Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  seat_numbers TEXT[] NOT NULL, -- e.g., ['A1', 'B2', 'C5']
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Payments
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  booking_id INTEGER REFERENCES bookings(id), -- nullable for organizer payments
  event_id INTEGER REFERENCES events(id),     -- nullable for audience payments
  amount DECIMAL(10, 2) NOT NULL,
  purpose VARCHAR(20) CHECK (purpose IN ('event_listing', 'ticket_booking')),
  status VARCHAR(20) DEFAULT 'initiated', -- 'initiated', 'successful', 'failed'
  payment_gateway_id VARCHAR(255), -- Stripe/Razorpay ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

--Table 6: Event Categories
CREATE TABLE IF NOT EXISTS event_categories (
  event_id INTEGER REFERENCES events(id),
  category_id INTEGER REFERENCES categories(id),
  PRIMARY KEY (event_id, category_id)
);

-- Table 7: Search Log
CREATE TABLE IF NOT EXISTS search_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  keyword VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
