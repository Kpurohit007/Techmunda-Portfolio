# Deploying TechMunda Portfolio to techmunda.co.in

This guide will help you deploy your portfolio website to the domain **techmunda.co.in**.

## Option 1: Vercel (Recommended - Easiest)

### Steps:

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up with your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Import `Kpurohit007/Techmunda-Portfolio`
   - Vercel will auto-detect settings

3. **Configure Build Settings**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

4. **Add Environment Variables** (if needed)
   - PORT: 3000 (optional)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

6. **Connect Domain**
   - Go to Project Settings → Domains
   - Add `techmunda.co.in`
   - Add `www.techmunda.co.in` (optional)
   - Follow DNS configuration instructions:
     - Add A record: `@` → Vercel IP (shown in dashboard)
     - Add CNAME record: `www` → `cname.vercel-dns.com`

### DNS Configuration for techmunda.co.in:
```
Type    Name    Value
A       @       [Vercel IP address]
CNAME   www     cname.vercel-dns.com
```

---

## Option 2: Netlify

### Steps:

1. **Sign up/Login to Netlify**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub → Select `Techmunda-Portfolio`

3. **Build Settings**
   - Build command: `npm install`
   - Publish directory: `.` (root)
   - Functions directory: `.netlify/functions`

4. **Deploy**
   - Click "Deploy site"

5. **Connect Domain**
   - Go to Site Settings → Domain management
   - Add custom domain: `techmunda.co.in`
   - Configure DNS as shown in Netlify dashboard

---

## Option 3: Railway (For Full Node.js Backend)

### Steps:

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `Techmunda-Portfolio`

3. **Configure**
   - Railway auto-detects Node.js
   - Start command: `npm start`
   - Port: 3000

4. **Add Domain**
   - Go to Settings → Networking
   - Add custom domain: `techmunda.co.in`
   - Configure DNS as instructed

---

## Option 4: Traditional Hosting (cPanel/Shared Hosting)

If you have traditional hosting:

1. **Upload Files via FTP/cPanel**
   - Upload all files except `node_modules`
   - Upload `.gitignore`

2. **Install Dependencies**
   - SSH into server
   - Run: `npm install`

3. **Start Server**
   - Use PM2: `pm2 start server.js`
   - Or configure as a service

4. **Point Domain**
   - Configure DNS A record to point to server IP

---

## DNS Configuration (for techmunda.co.in)

Contact your domain registrar and add:

**For Vercel/Netlify:**
```
Type: A
Name: @
Value: [Hosting provider IP]

Type: CNAME  
Name: www
Value: [Hosting provider CNAME]
```

**For Railway/Traditional Hosting:**
```
Type: A
Name: @
Value: [Your server IP address]

Type: A
Name: www
Value: [Your server IP address]
```

---

## Post-Deployment Checklist

- [ ] Test contact forms work
- [ ] Verify database is saving inquiries
- [ ] Check all links work
- [ ] Test on mobile devices
- [ ] Verify SSL certificate (HTTPS)
- [ ] Test Google Maps integration
- [ ] Check social media links

---

## Troubleshooting

**Database Issues:**
- SQLite database file needs write permissions
- On serverless (Vercel/Netlify), consider using a cloud database (PlanetScale, Supabase)

**API Not Working:**
- Check serverless function logs
- Verify CORS settings
- Ensure environment variables are set

**Domain Not Loading:**
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check domain registrar settings

---

## Need Help?

If you encounter issues, check:
1. Hosting provider documentation
2. Domain registrar DNS settings
3. Server logs for errors

