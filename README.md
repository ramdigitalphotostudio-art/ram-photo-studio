# Ram Digital Photo Studio

A modern, full-featured website for Ram Digital Photo Studio with an integrated admin dashboard for managing customer enquiries and maintaining a customer diary.

## 🌟 Features

### Public Website
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Contact Form**: Easy enquiry submission with optional email field
- **Service Showcase**: Display photography services and portfolio
- **Modern UI**: Clean, professional design with dark mode support

### Admin Dashboard
A comprehensive admin panel with three main sections:

#### 1. **Enquiries Management**
- View all customer enquiries in one place
- Status tracking system:
  - 🆕 New - Unprocessed enquiries
  - 📞 To Be Contacted - Marked for follow-up
  - ✅ Resolved - Successfully handled
  - 🚫 Spam - Filtered out
- Quick reply options:
  - Copy email address
  - WhatsApp direct link
  - SMS direct link
- Real-time status counts
- Search and filter functionality

#### 2. **Customer Diary**
- Maintain detailed customer records
- Track important dates:
  - Birthdays
  - Anniversaries
- Add notes for each customer
- Search by name or phone number
- Sort by date (newest/oldest first)
- Larger, readable font sizes

#### 3. **Special Occasions**
- Toggle view for birthdays and anniversaries
- **Today's Special Occasions**: Highlighted section for current day
- **Upcoming Occasions**: Next 30 days preview
- Quick WhatsApp greeting buttons
- Clean, table-like design with clear separators
- Side-by-side layout for easy scanning

### Key Functionalities
- **Custom Delete Confirmation**: Professional modal instead of browser alerts
- **WhatsApp Integration**: One-click greeting messages for special occasions
- **Responsive Tables**: Mobile-friendly data display
- **Dark Mode Support**: Throughout the entire application
- **Secure Authentication**: Protected admin routes
- **Database Integration**: Supabase backend with RLS policies

## 🚀 Tech Stack

- **Frontend**: Astro, HTML, CSS (Tailwind CSS)
- **Backend**: Astro API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **JavaScript**: Vanilla JS for interactivity

## 📁 Project Structure

```text
/
├── public/
│   ├── admin-dashboard.js      # Admin dashboard client side logic
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── index.astro     # Unified admin dashboard
│   │   │   └── enquiries.astro # Legacy enquiries page
│   │   ├── api/
│   │   │   ├── customers/
│   │   │   │   ├── add.ts
│   │   │   │   ├── update.ts
│   │   │   │   └── delete.ts
│   │   │   └── enquiries/
│   │   │       └── submit.ts
│   │   ├── contact.astro
│   │   └── index.astro
│   └── types/
│       ├── customer.ts
│       └── enquiry.ts
├── customers-setup.sql          # Customer diary database schema
├── supabase-setup.sql          # Enquiries database schema
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhinavmishra97/photo-studio.git
   cd photo-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PUBLIC_SUPABASE_URL=your_supabase_url
   PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase database**
   
   Run the SQL scripts in your Supabase SQL editor:
   ```bash
   # First, run supabase-setup.sql for enquiries table
   # Then, run customers-setup.sql for customers table
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## � Security

- Environment variables are stored in `.env` (excluded from Git)
- Row Level Security (RLS) enabled on all Supabase tables
- Service role key used only server-side
- Admin routes protected with authentication

## 📝 Database Schema

### Enquiries Table
- `id`: UUID (primary key)
- `name`: Text (required)
- `phone`: Text (required)
- `email`: Text (optional)
- `message`: Text (required)
- `status`: Enum (new, to_be_contacted, resolved, spam)
- `created_at`: Timestamp

### Customers Table
- `id`: UUID (primary key)
- `name`: Text (required)
- `phone`: Text (required)
- `birthday`: Date (optional)
- `anniversary`: Date (optional)
- `notes`: Text (optional)
- `created_at`: Timestamp

## 🎨 Design Features

- **Clean UI**: Minimalist, professional design
- **Responsive**: Works on all device sizes
- **Accessible**: Proper semantic HTML and ARIA labels
- **Fast**: Optimized for performance
- **Modern**: Latest web technologies

## 📧 Contact

For any queries or support, please contact:
- **Email**: mishraabhinav2306@gmail.com
- **GitHub**: [@abhinavmishra97](https://github.com/abhinavmishra97)

## 📄 License

This project is private and proprietary to Ram Digital Photo Studio.

---

Built with ❤️ using [Astro](https://astro.build)
