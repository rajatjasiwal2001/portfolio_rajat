# Flask Portfolio with Real APIs

A modern, responsive Flask portfolio with real API integrations for Gmail, calling, messaging, and enhanced tech background effects.

## Features

- **Real Gmail Integration**: Contact form sends actual emails via Gmail SMTP
- **Call Functionality**: Direct phone calling with tel: links
- **WhatsApp Messaging**: Direct WhatsApp message links
- **Tech Background**: Animated floating code, particles, and circuit patterns
- **Responsive Design**: Bootstrap 5 with custom animations
- **Interactive Elements**: Form validation, loading states, and smooth transitions

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Email Settings

Create a `.env` file in the project root with your Gmail credentials:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Flask Configuration
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
```

**Important**: For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an "App Password" (not your regular password)
3. Use the app password in the EMAIL_PASSWORD field

### 3. Update Contact Information

Edit the contact information in `templates/contact.html`:
- Replace phone numbers with your actual numbers
- Update email addresses
- Modify social media links

### 4. Run the Application
```bash
python app.py
```

Visit `http://localhost:5000` to see your portfolio.

## API Endpoints

- `POST /send_message` - Sends contact form data via Gmail
- `GET /call?number=+1234567890` - Initiates phone call
- `GET /whatsapp?number=+1234567890&message=Hello` - Opens WhatsApp chat

## Tech Background Effects

The portfolio includes several animated tech elements:
- Floating code snippets
- Particle effects
- Circuit pattern overlays
- Matrix-style backgrounds
- Gradient animations

## Customization

- **Colors**: Modify CSS variables in `static/css/style.css`
- **Content**: Update HTML templates in `templates/`
- **Animations**: Adjust JavaScript effects in `static/js/script.js`
- **Projects**: Add your projects in `templates/projects.html`

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for sensitive data
- Consider using a more secure email service for production
- Implement rate limiting for the contact form in production

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

This project is open source and available under the MIT License.
