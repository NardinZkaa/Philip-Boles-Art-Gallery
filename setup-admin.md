# Admin Setup Guide

## Setting up Admin Authentication

### 1. Enable Authentication in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Settings**
3. Enable **Email auth** if not already enabled
4. Make sure **Enable email confirmations** is OFF for development

### 2. Create Admin User

You can create the admin user in two ways:

#### Option A: Through Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter the following details:
   - **Email**: admin@artgallery.com
   - **Password**: admin123456
   - **Email Confirm**: true

#### Option B: Through the Application
1. Start the development server: `npm run dev`
2. Go to the admin page: `http://localhost:5174/admin`
3. You'll see the login page
4. Use the credentials above to log in

### 3. Apply Database Migrations

Run the following command to apply the authentication policies:

```bash
supabase db reset
```

### 4. Test the Login

1. Go to `http://localhost:5174/admin`
2. You should see a login form
3. Enter:
   - **Email**: admin@artgallery.com
   - **Password**: admin123456
4. Click "Sign In"

### 5. Security Notes

- Change the default password after first login
- The admin user has full access to all admin functions
- Authentication is required for all admin operations
- Public users can still view the gallery and content

### 6. Admin Features Available

Once logged in, you can:
- **Paintings**: Add, edit, delete paintings with file uploads
- **Collections**: Manage painting collections
- **Content**: Edit text content for all pages
- **Settings**: Configure website settings

### Troubleshooting

If you encounter issues:
1. Check that Supabase is running: `supabase status`
2. Verify authentication is enabled in the dashboard
3. Check the browser console for any errors
4. Ensure the database migrations have been applied 