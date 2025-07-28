const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and service role key
const supabaseUrl = 'http://127.0.0.1:54321'; // Local Supabase
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2UiLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@artgallery.com',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@artgallery.com');
    console.log('Password: admin123456');
    console.log('\nYou can now log in to the admin panel at: http://localhost:5174/admin');
    
  } catch (error) {
    console.error('Failed to create admin user:', error);
  }
}

createAdminUser(); 