# RentRibAthens

Ένα σύγχρονο website για ενοικίαση RIB σκαφών στην Αθήνα, χτισμένο με Next.js 14, TypeScript και Tailwind CSS.

## 🚀 Τεχνολογίες

- **Next.js 14** με App Router
- **TypeScript** για type safety
- **Tailwind CSS** για styling
- **ESLint** και **Prettier** για code quality
- **Husky** για pre-commit hooks
- **GitHub Actions** για CI/CD
- **Google Fonts (Roboto)** για typography

## 📦 Εγκατάσταση και Εκκίνηση

### Προαπαιτούμενα
- Node.js 18.x ή νεότερη έκδοση
- npm ή yarn

### Εγκατάσταση

```bash
# Κλωνοποίηση του repository
git clone https://github.com/your-username/rentribathens.git
cd rentribathens

# Εγκατάσταση dependencies
npm install

# Εκκίνηση development server
npm run dev
```

Το website θα είναι διαθέσιμο στο `http://localhost:3000`

## 🛠️ Διαθέσιμες Εντολές

### Ανάπτυξη
- `npm run dev` - Εκκίνηση development server
- `npm run build` - Build για production
- `npm run start` - Εκκίνηση production server

### Code Quality
- `npm run lint` - Έλεγχος ESLint
- `npm run lint:fix` - Αυτόματη διόρθωση ESLint errors
- `npm run format` - Format κώδικα με Prettier
- `npm run format:check` - Έλεγχος Prettier formatting
- `npm run type-check` - Έλεγχος TypeScript types

### SEO και Sitemap
- `npm run sitemap` - Δημιουργία sitemap.xml και robots.txt

### Git Hooks
- `npm run prepare` - Εγκατάσταση Husky hooks
- `npm run pre-commit` - Εκτέλεση lint-staged (αυτόματα σε κάθε commit)

## 📝 Αλλαγή Κειμένου και Εικόνων Σκαφών

### Αλλαγή Κειμένου Σκαφών

Για να αλλάξετε τα κείμενα των σκαφών, επεξεργαστείτε το αρχείο `data/boats.ts`:

```typescript
// Παράδειγμα αλλαγής στοιχείων σκάφους
{
  id: '1',
  slug: 'νέο-σκάφος',
  name: 'Νέο Σκάφος',
  shortDescription: 'Η νέα περιγραφή σας',
  longDescription: 'Η λεπτομερής περιγραφή σας...',
  capacity: 10,
  engine: 'Yamaha 200HP',
  images: [
    '/images/νέο-σκάφος-1.jpg',
    '/images/νέο-σκάφος-2.jpg',
    '/images/νέο-σκάφος-3.jpg'
  ]
}
```

### Αλλαγή Εικόνων Σκαφών

1. **Προετοιμασία εικόνων:**
   - Μέγεθος: 800x600 pixels (αναλογία 4:3)
   - Μορφή: JPG ή PNG
   - Ανάλυση: τουλάχιστον 72 DPI
   - Μέγεθος αρχείου: κάτω από 500KB ανά εικόνα

2. **Ανάρτηση εικόνων:**
   - Τοποθετήστε τις εικόνες στο φάκελο `public/images/`
   - Χρησιμοποιήστε περιγραφικά ονόματα (π.χ. `rib-500-1.jpg`)
   - Ενημερώστε τα paths στο `data/boats.ts`

3. **Παράδειγμα δομής φακέλων:**
   ```
   public/
   └── images/
       ├── rib-500-1.jpg
       ├── rib-500-2.jpg
       ├── rib-500-3.jpg
       ├── rib-650-1.jpg
       ├── rib-650-2.jpg
       ├── rib-650-3.jpg
       ├── rib-400-1.jpg
       ├── rib-400-2.jpg
       └── rib-400-3.jpg
   ```

### Αλλαγή Άλλων Κειμένων

- **Κεντρική σελίδα:** Επεξεργαστείτε το `app/page.tsx`
- **Meta δεδομένα:** Επεξεργαστείτε το `app/layout.tsx`
- **Στυλ και χρώματα:** Επεξεργαστείτε το `app/globals.css` και `tailwind.config.js`
- **Υπηρεσίες:** Επεξεργαστείτε το `app/services/page.tsx`

## 🔧 Ρύθμιση Environment Variables

Δημιουργήστε ένα αρχείο `.env.local` στη ρίζα του project:

```env
# Website URL
NEXT_PUBLIC_SITE_URL=https://rentribathens.gr

# Business Phone Number
NEXT_PUBLIC_BUSINESS_PHONE=+302101234567

# Contact Form Endpoint (αν χρησιμοποιείτε εξωτερική υπηρεσία)
FORM_ENDPOINT=https://your-form-service.com/submit

# Email Configuration (για το contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Database (αν χρησιμοποιείτε database)
DATABASE_URL=postgresql://username:password@localhost:5432/rentribathens
```

## 🎨 Χρώματα Θέματος

Το website χρησιμοποιεί τα ακόλουθα χρώματα:

- **Background:** #FFFFFF (Λευκό)
- **Primary:** #0B3D91 (Ναυτικό μπλε)
- **Accent:** #2EC4B6 (Τυρκουάζ)
- **Muted:** #F6F8FA (Ανοιχτό γκρι)

## 📁 Δομή Project

```
rentribathens/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── contact/
│   │       └── route.ts
│   ├── boats/                    # Boat pages
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Reusable components
│   ├── BoatCard.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   ├── NavLink.tsx
│   ├── SEO.tsx
│   ├── ServiceCard.tsx
│   └── StructuredData.tsx
├── data/                         # Static data
│   └── boats.ts
├── public/                       # Static assets
│   ├── images/
│   ├── favicon.ico
│   └── og-image.png
├── .github/                      # GitHub Actions
│   └── workflows/
│       └── ci.yml
├── .husky/                       # Git hooks
│   └── pre-commit
├── .eslintrc                     # ESLint config
├── .prettierrc                   # Prettier config
├── next.config.js                # Next.js config
├── next-sitemap.js               # Sitemap config
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Deployment σε Vercel

### Αυτόματο Deployment με GitHub

1. **Push τον κώδικα σε GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Συνδέστε με Vercel:**
   - Πηγαίνετε στο [vercel.com](https://vercel.com)
   - Κάντε sign in με το GitHub account σας
   - Κάντε κλικ "New Project"
   - Επιλέξτε το repository `rentribathens`
   - Επιλέξτε το Next.js framework

3. **Ρύθμιση Environment Variables:**
   - Στο Vercel dashboard, πηγαίνετε στο Settings → Environment Variables
   - Προσθέστε τις μεταβλητές:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
     NEXT_PUBLIC_BUSINESS_PHONE=+302101234567
     ```

4. **Deploy:**
   - Κάντε κλικ "Deploy"
   - Το Vercel θα κάνει build και deploy το project αυτόματα

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

## 🔄 CI/CD με GitHub Actions

Το project περιλαμβάνει αυτόματο CI/CD pipeline που:

- **Ελέγχει τον κώδικα** σε κάθε push και pull request
- **Τρέχει ESLint** για code quality
- **Ελέγχει Prettier** formatting
- **Κάνει TypeScript type checking**
- **Κάνει build** το application
- **Δημιουργεί sitemap** και robots.txt
- **Τρέχει Lighthouse** για performance testing

## 🛠️ Development Tools

### ESLint Configuration
- Next.js recommended rules
- TypeScript support
- Prettier integration
- React hooks rules

### Prettier Configuration
- Single quotes
- Semicolons
- 2-space indentation
- Line width: 80 characters

### Pre-commit Hooks
- Αυτόματος έλεγχος ESLint
- Αυτόματο formatting με Prettier
- Εμπόδιση commit αν υπάρχουν errors

## 📊 SEO Features

- **Structured Data** (JSON-LD) για LocalBusiness
- **Sitemap** αυτόματη δημιουργία
- **Robots.txt** optimization
- **Open Graph** και **Twitter Cards**
- **Canonical URLs**
- **Meta tags** για local SEO

## 🐛 Troubleshooting

### Συνήθη Προβλήματα

1. **Build fails:**
   ```bash
   # Καθαρίστε το cache
   rm -rf .next
   npm run build
   ```

2. **ESLint errors:**
   ```bash
   # Αυτόματη διόρθωση
   npm run lint:fix
   ```

3. **TypeScript errors:**
   ```bash
   # Έλεγχος types
   npm run type-check
   ```

4. **Sitemap issues:**
   ```bash
   # Επαναδημιουργία sitemap
   npm run sitemap
   ```

## 📞 Υποστήριξη

Για ερωτήσεις ή προβλήματα:

- **Email:** info@rentribathens.gr
- **Τηλέφωνο:** +30 210 123 4567
- **GitHub Issues:** [Create an issue](https://github.com/your-username/rentribathens/issues)

## 📄 License

Αυτό το project είναι ιδιόκτητο. Όλα τα δικαιώματα διατηρούνται.

---

**Σημείωση:** Αυτό το README είναι στα ελληνικά γιατί το website είναι προορισμένο για το ελληνικό κοινό.
