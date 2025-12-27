# How to Login to Creative Fusion LLC Admin Panel

## Quick Start

### Step 1: Create Your Admin Account

Visit: **https://your-domain.com/auth/signup**

1. Enter your email (e.g., admin@creativefusion.llc)
2. Create a strong password (minimum 6 characters)
3. Confirm your password
4. Click "Create Admin Account"

You will be automatically redirected to the login page.

### Step 2: Login to Admin Panel

Visit: **https://your-domain.com/auth/login**

1. Enter the email you just created
2. Enter your password
3. Click "Sign In"

You will be redirected to the admin dashboard at `/admin`

## Admin Panel Features

Once logged in, you can access:

### 1. Portfolio Management (`/admin/portfolio`)
- **Add New Projects**: Upload images, set titles, descriptions, categories
- **Edit Projects**: Update existing portfolio items
- **Delete Projects**: Remove portfolio items
- **Image Upload**: Direct upload to Supabase storage bucket
- **Categories**: Photography, Videography, Graphic Design, Web Development, etc.

### 2. Bookings Management (`/admin/bookings`)
- **View All Bookings**: See all customer inquiries from the website
- **Filter by Status**: pending, contacted, in-progress, completed, cancelled
- **Contact Customers**: Direct WhatsApp link with pre-filled message
- **Update Status**: Mark bookings as contacted/completed
- **Add Notes**: Keep track of conversations and progress

## Database Setup

Make sure these SQL scripts have been executed in your Supabase project:

1. `scripts/001_create_bookings_table.sql` - Creates bookings table
2. `scripts/002_create_portfolio_table.sql` - Creates portfolio table
3. `scripts/003_create_portfolio_storage.sql` - Creates storage bucket for images

To run these scripts:
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste each script
4. Click "Run" for each one

## Default Admin Credentials

For initial setup, create your first admin user at:
**https://your-domain.com/auth/signup**

Recommended:
- Email: admin@creativefusion.llc
- Password: Use a strong, secure password

## Troubleshooting

### "Invalid login credentials"
- Make sure you created an account first at `/auth/signup`
- Check that you're using the correct email and password
- Password is case-sensitive

### "Unable to upload images"
- Ensure the storage bucket SQL script has been run
- Check that you're logged in with a valid admin account
- Verify RLS policies are properly configured

### Can't access admin pages
- Make sure you're logged in at `/auth/login` first
- Check that the middleware (proxy.ts) is properly configured
- Clear browser cache and try again

## Security Notes

- Admin accounts are protected by Supabase Authentication
- All admin routes require authentication via middleware
- Portfolio and bookings tables use Row Level Security (RLS)
- Public users can only submit bookings, not view them
- Only authenticated users can view/manage data
- Image uploads are restricted to authenticated users only

## Support

For technical issues, contact your development team or refer to the Supabase documentation.
