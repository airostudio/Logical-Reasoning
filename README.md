# 🧠 Logical Reasoning Tester

A beautiful, interactive logical reasoning test application built with Next.js, TypeScript, and Stripe payments. Users can test their cognitive abilities through abstract and deductive reasoning questions, then receive detailed results via email for a one-time fee of $2.99.

## ✨ Features

- **🎨 Rich, Colorful UI**: Eye-catching gradient designs with smooth animations
- **🧩 Dual Question Types**:
  - Abstract Reasoning (Pattern Recognition)
  - Deductive Reasoning (Logical Deduction)
- **📊 Comprehensive Results**: Detailed scoring with performance breakdown
- **💳 Secure Payments**: Stripe integration for safe transactions
- **📧 Email Delivery**: Automated results delivery with upsell offers
- **📱 Responsive Design**: Works perfectly on all devices
- **⚡ Real-time Progress**: Visual progress tracking and timer

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Stripe account for payment processing
- Email service (Gmail/SMTP) for sending results

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Logical-Reasoning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Stripe Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=Logical Reasoning Test <noreply@logicaltest.com>

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **📖 Having issues? See the [Stripe Setup Guide](./STRIPE_SETUP.md) for detailed instructions and troubleshooting.**

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Stripe Setup

1. **Get your Stripe keys**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy your publishable and secret keys
   - Add them to `.env.local`

2. **Set up webhooks**
   - Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
   - Login: `stripe login`
   - Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhook`
   - Copy the webhook signing secret to `.env.local`

3. **For production**
   - Create a webhook endpoint in Stripe Dashboard
   - Point it to: `https://yourdomain.com/api/webhook`
   - Select event: `checkout.session.completed`

### Email Setup (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this password in `EMAIL_PASSWORD`

## 📁 Project Structure

```
Logical-Reasoning/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/   # Stripe checkout
│   │   └── webhook/                   # Payment webhooks
│   ├── payment/                       # Payment page
│   ├── register/                      # User registration
│   ├── success/                       # Success page
│   ├── test/                          # Test interface
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Landing page
│   └── globals.css                    # Global styles
├── components/
│   └── ShapeRenderer.tsx              # Visual pattern renderer
├── lib/
│   ├── email.ts                       # Email functionality
│   └── testQuestions.ts               # Test questions & scoring
├── .env.local.example                 # Environment template
├── next.config.js                     # Next.js config
├── package.json                       # Dependencies
├── tailwind.config.js                 # Tailwind config
└── tsconfig.json                      # TypeScript config
```

## 🎯 Test Structure

The test includes 15 questions:
- **6 Abstract Reasoning Questions**: Pattern recognition with visual shapes
- **9 Deductive Reasoning Questions**: Logical premise-conclusion challenges

### Scoring Levels

- **90-100%**: Exceptional
- **75-89%**: Advanced
- **60-74%**: Proficient
- **45-59%**: Developing
- **0-44%**: Emerging

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Questions

Add or modify questions in `lib/testQuestions.ts`:
```typescript
{
  id: 1,
  type: 'abstract' | 'deductive',
  question: 'Your question',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // index of correct option
  explanation: 'Why this is correct'
}
```

### Pricing

Change the price in:
- `app/api/create-checkout-session/route.ts`: `unit_amount: 299` (in cents)
- Update UI text in `app/payment/page.tsx` and `app/page.tsx`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

Works with any Node.js hosting:
- Netlify
- Railway
- Render
- Digital Ocean

## 📧 Email Customization

The results email includes:
- Overall score and percentage
- Performance breakdown
- Expert analysis
- Test statistics
- 20 upsell offers for other tests

Edit the email template in `lib/email.ts` to customize:
- HTML design
- Upsell offers
- Branding

## 🔒 Security

- All payments processed securely through Stripe
- No credit card data stored locally
- Environment variables for sensitive data
- HTTPS required for production

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues:
- Open an issue on GitHub
- Email: support@example.com

## 🎉 Features Coming Soon

- [ ] Multi-language support
- [ ] Additional test types
- [ ] User accounts and test history
- [ ] Mobile app versions
- [ ] Team/organization plans

---

Made with ❤️ using Next.js, TypeScript, and Stripe
