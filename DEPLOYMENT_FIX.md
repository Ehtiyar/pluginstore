# Netlify Deployment Fix Guide

## Problem
The Netlify deployment is failing with a configuration parsing error in `netlify.toml`.

## Solution Steps

### 1. Updated netlify.toml
I've simplified the `netlify.toml` file to use only essential configuration:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Updated package.json
Added the Netlify Next.js plugin to devDependencies:
```json
"@netlify/plugin-nextjs": "^5.8.0"
```

### 3. Deployment Steps

1. **Commit and push the changes:**
   ```bash
   git add .
   git commit -m "Fix netlify.toml configuration"
   git push origin main
   ```

2. **In Netlify Dashboard:**
   - Go to your site settings
   - Under "Build & deploy" > "Build settings"
   - Make sure these settings are correct:
     - Build command: `npm run build`
     - Publish directory: `.next`
     - Node version: `18`

3. **Set Environment Variables:**
   In Netlify dashboard > Site settings > Environment variables, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
   ```

4. **Trigger a new deploy:**
   - Go to "Deploys" tab
   - Click "Trigger deploy" > "Deploy site"

### 4. Alternative: Manual Build Settings

If the netlify.toml still causes issues, you can remove it and set everything manually in the Netlify dashboard:

1. Delete the `netlify.toml` file
2. In Netlify dashboard, set:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`
3. Add the Next.js plugin manually in the plugins section

### 5. Common Issues and Solutions

**Issue: "Base di" error**
- This usually means there's a syntax error in the TOML file
- The simplified version should fix this

**Issue: Build fails with missing dependencies**
- Make sure all dependencies are in package.json
- The Netlify plugin should be in devDependencies

**Issue: Environment variables not working**
- Make sure they start with `NEXT_PUBLIC_` for client-side access
- Check that they're set in Netlify dashboard

### 6. Test Locally First

Before deploying, test the build locally:
```bash
npm install
npm run build
```

If this works locally, the Netlify deployment should work too.

### 7. If Still Failing

If the deployment still fails:

1. Check the build logs in Netlify dashboard
2. Look for specific error messages
3. Try removing the netlify.toml file entirely and use manual settings
4. Consider using Vercel instead, which has better Next.js support

## Next Steps After Successful Deployment

1. Set up your Supabase project
2. Run the database schema
3. Configure your environment variables
4. Test the authentication system
5. Add your payment gateway keys

The simplified configuration should resolve the parsing error and allow your site to deploy successfully.
