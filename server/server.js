const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Menu Data
const menuData = {
  appetizers: [
    {
      id: 1,
      name: "Texas Cheese Fries",
      price: 8.99,
      description: "Crispy fries loaded with melted cheddar, bacon bits, jalapeños, and ranch drizzle",
      image: "cheese-fries.jpg"
    },
    {
      id: 2,
      name: "Fried Pickles",
      price: 6.99,
      description: "Hand-battered dill pickle chips served with spicy ranch",
      image: "fried-pickles.jpg"
    },
    {
      id: 3,
      name: "Onion Blossom",
      price: 9.99,
      description: "Golden fried onion petals with our signature dipping sauce",
      image: "onion-blossom.jpg"
    },
    {
      id: 4,
      name: "Buffalo Wings",
      price: 11.99,
      description: "Six jumbo wings tossed in your choice of mild, hot, or BBQ sauce",
      sides: "Celery and blue cheese included"
    }
  ],
  burgers: [
    {
      id: 5,
      name: "The Manhattan Burger",
      price: 12.99,
      description: "½ lb Angus beef, American cheese, lettuce, tomato, pickles, Skeet's special sauce",
      sides: "Served with fries and a pickle spear",
      featured: true
    },
    {
      id: 6,
      name: "Texas BBQ Burger",
      price: 13.99,
      description: "½ lb patty topped with cheddar, bacon, crispy onion strings, and smoky BBQ sauce",
      sides: "Served with fries and a pickle spear",
      featured: true
    },
    {
      id: 7,
      name: "Spicy Jalapeño Burger",
      price: 13.49,
      description: "Pepper jack cheese, fresh jalapeños, chipotle mayo, lettuce, and tomato",
      sides: "Served with fries and a pickle spear"
    },
    {
      id: 8,
      name: "Classic Club Sandwich",
      price: 11.99,
      description: "Triple-decker with turkey, bacon, ham, lettuce, tomato, and mayo",
      sides: "Served with chips or upgrade to fries"
    }
  ],
  chicken: [
    {
      id: 9,
      name: "Chicken Fried Chicken",
      price: 13.99,
      description: "Tender chicken breast hand-breaded and fried golden, smothered in country gravy",
      sides: "Two sides included",
      featured: true
    },
    {
      id: 10,
      name: "Grilled Chicken Breast",
      price: 12.99,
      description: "Marinated and grilled to perfection, served plain or blackened",
      sides: "Two sides included"
    },
    {
      id: 11,
      name: "Chicken Tenders",
      price: 10.99,
      description: "Four crispy tenders with your choice of dipping sauce",
      sides: "Served with fries"
    }
  ],
  heartOfTexas: [
    {
      id: 12,
      name: "Chicken Fried Steak",
      price: 14.99,
      description: "Hand-battered beef cutlet fried crispy and topped with homemade country gravy",
      sides: "Two sides included",
      featured: true
    },
    {
      id: 13,
      name: "16oz Ribeye Steak",
      price: 24.99,
      description: "Prime cut ribeye grilled to your liking, seasoned with our house blend",
      sides: "Two premium sides included"
    },
    {
      id: 14,
      name: "Smoked Brisket Plate",
      price: 16.99,
      description: "Slow-smoked Texas brisket with BBQ sauce on the side",
      sides: "Two sides included"
    },
    {
      id: 15,
      name: "Baby Back Ribs",
      price: 18.99,
      description: "Half rack of fall-off-the-bone ribs glazed with our signature BBQ",
      sides: "Two sides included"
    }
  ],
  coast: [
    {
      id: 16,
      name: "Grilled Salmon",
      price: 17.99,
      description: "Fresh Atlantic salmon with lemon butter sauce",
      sides: "Two sides included",
      featured: true
    },
    {
      id: 17,
      name: "Fish & Chips",
      price: 13.99,
      description: "Beer-battered cod fillets with crispy fries and coleslaw",
      sides: "Tartar sauce and malt vinegar"
    },
    {
      id: 18,
      name: "Shrimp Po' Boy",
      price: 12.99,
      description: "Fried shrimp on a toasted hoagie with lettuce, tomato, and remoulade",
      sides: "Served with fries"
    }
  ],
  border: [
    {
      id: 19,
      name: "Trio Fajitas",
      price: 16.99,
      description: "Sizzling chicken, beef, and shrimp fajitas with peppers and onions",
      sides: "Flour tortillas, guac, sour cream, pico de gallo",
      featured: true
    },
    {
      id: 20,
      name: "Beef Enchiladas",
      price: 12.99,
      description: "Three cheese-filled enchiladas with seasoned beef, red sauce, and melted cheese",
      sides: "Rice and refried beans"
    },
    {
      id: 21,
      name: "Chicken Quesadilla",
      price: 11.99,
      description: "Grilled flour tortilla stuffed with chicken, cheese, peppers, and onions",
      sides: "Salsa and sour cream"
    }
  ]
};

// Reviews Data
const reviewsData = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    comment: "Ranch tastes homemade and the chicken is so moist and soft.",
    date: "2023-11-15"
  },
  {
    id: 2,
    author: "John D.",
    rating: 4,
    comment: "Good food, good service, friendly staff, good parking.",
    date: "2023-11-10"
  },
  {
    id: 3,
    author: "Emily R.",
    rating: 5,
    comment: "Best chicken fried steak in Texas! The gravy is incredible.",
    date: "2023-11-08"
  },
  {
    id: 4,
    author: "Mike T.",
    rating: 4,
    comment: "Love the small-town diner atmosphere. Portions are huge!",
    date: "2023-11-05"
  }
];

// Restaurant Info
const restaurantInfo = {
  name: "Skeet's Texas Grill",
  tagline: "A Taste of Merkel",
  subtitle: "Small town diner vibes with big Texas flavor",
  address: "1207 N 7th St, Merkel, TX 79536",
  phone: "+1 325-928-1039",
  rating: 4.4,
  totalReviews: 156,
  hours: {
    monday: "11:00 AM - 9:00 PM",
    tuesday: "11:00 AM - 9:00 PM",
    wednesday: "11:00 AM - 9:00 PM",
    thursday: "11:00 AM - 9:00 PM",
    friday: "11:00 AM - 10:00 PM",
    saturday: "11:00 AM - 10:00 PM",
    sunday: "Closed"
  },
  mapEmbedUrl: "https://maps.google.com/maps?q=1207+N+7th+St,+Merkel,+TX+79536&t=&z=13&ie=UTF8&iwloc=&output=embed"
};

// Routes
app.get('/api/menu', (req, res) => {
  res.json(menuData);
});

app.get('/api/reviews', (req, res) => {
  res.json(reviewsData);
});

app.get('/api/info', (req, res) => {
  res.json(restaurantInfo);
});

app.post('/api/reviews', (req, res) => {
  const { author, rating, comment } = req.body;

  if (!author || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newReview = {
    id: reviewsData.length + 1,
    author,
    rating: Number(rating),
    comment,
    date: new Date().toISOString().split('T')[0]
  };

  reviewsData.push(newReview);

  // Save to reviews.json file
  const reviewsFilePath = path.join(__dirname, 'reviews.json');
  try {
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviewsData, null, 2));
    console.log('Review saved to file:', newReview);
  } catch (error) {
    console.error('Error saving review to file:', error);
  }

  res.status(201).json({ message: 'Review added successfully', review: newReview });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // In a real application, you would send an email or store this in a database
  console.log('Contact form submission:', { name, email, message });

  res.status(200).json({ message: 'Message sent successfully!' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🔥 Skeet's Texas Grill server running on port ${PORT}`);
});
