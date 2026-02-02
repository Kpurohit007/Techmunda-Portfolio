# 🚀 Quick Deploy Guide - techmunda.co.in

## ⚡ Fastest Way: Vercel (5 minutes)

### Step 1: Deploy to Vercel
1. **Go to**: https://vercel.com/new
2. **Sign in** with your GitHub account
3. **Click**: "Import Git Repository"
4. **Select**: `Kpurohit007/Techmunda-Portfolio`
5. **Click**: "Deploy" (don't change any settings)
6. **Wait**: 1-2 minutes for deployment

✅ Your site will be live at: `https://techmunda-portfolio-xxxxx.vercel.app`

---

### Step 2: Connect Domain techmunda.co.in

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `techmunda.co.in`
   - Click **"Add"**

2. **Vercel will show DNS records** - Copy these!

3. **Go to your Domain Registrar** (where you bought techmunda.co.in):
   - Examples: GoDaddy, Namecheap, Google Domains, etc.
   - Find **DNS Management** or **DNS Settings**

4. **Add these DNS records**:

   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.21.21
   TTL: Auto (or 3600)
   ```

   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto (or 3600)
   ```

5. **Save DNS settings**

6. **Wait 5-60 minutes** for DNS to propagate

7. **Check status** in Vercel dashboard - it will show "Valid Configuration" when ready

---

## 🔍 Verify Deployment

After DNS propagates:
- ✅ Visit: https://techmunda.co.in
- ✅ Visit: https://www.techmunda.co.in
- ✅ Test contact form
- ✅ Check all links work

---

## 🆘 Troubleshooting

**Domain not working?**
- Wait up to 48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is unlocked in registrar

**API/Forms not working?**
- Check Vercel function logs
- Verify database file permissions (SQLite may need cloud DB for production)

**Need help?**
- Check Vercel docs: https://vercel.com/docs
- Check DNS propagation: https://dnschecker.org

---

## 📝 Alternative: Netlify

If Vercel doesn't work:

1. Go to: https://app.netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm install`
   - Publish directory: `.` (root)
6. Click "Deploy"
7. Go to Site Settings → Domain management → Add custom domain

---

## ✅ Post-Deployment Checklist

- [ ] Site loads at techmunda.co.in
- [ ] HTTPS/SSL certificate active (automatic with Vercel)
- [ ] Contact forms submit successfully
- [ ] All images load correctly
- [ ] Mobile responsive
- [ ] Social media links work
- [ ] Google Maps integration works

---

**Your site is ready to deploy! Follow Step 1 above to get started.**

