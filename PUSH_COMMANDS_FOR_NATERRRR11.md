# 🚀 Push Commands for @naterrrr11

## Your Exact Commands to Push to GitHub

---

## First: Did You Create the Repository?

### If YES, you created the repository → Use Section A below
### If NO, you haven't created it yet → Use Section B below

---

## SECTION A: Repository Already Created

If you already created a repository on GitHub, run these commands:

### Commands to Copy/Paste:

```bash
# Navigate to your project
cd /app

# Add your GitHub repository
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/naterrrr11/kaylin-mares-photography.git

# Push to GitHub
git push -u origin main
```

**What will happen:**
- It will ask for your **username** → Type: `naterrrr11`
- It will ask for your **password** → Use your Personal Access Token (see below)

---

## SECTION B: Haven't Created Repository Yet

If you haven't created the repository on GitHub yet:

### Step 1: Create Repository on GitHub
1. Go to: **https://github.com/new**
2. Repository name: `kaylin-mares-photography`
3. Description: `Professional photography portfolio`
4. Choose Public or Private
5. **DON'T** check any boxes
6. Click **"Create repository"**

### Step 2: Then Use Section A Commands Above

---

## 🔑 Getting Your Personal Access Token (Password)

GitHub needs a special token instead of your regular password:

### Quick Steps:
1. Go to: **https://github.com/settings/tokens/new**
2. Note: `Emergent Photography Website`
3. Expiration: Choose **90 days**
4. Check the box: **repo** (gives full repository access)
5. Scroll down and click **"Generate token"**
6. **COPY THE TOKEN!** (starts with `ghp_`) - You'll only see it once!
7. Use this token as your password when pushing

**IMPORTANT:** Save this token somewhere! You'll need it for the password.

---

## 📥 After Pushing - Download Your Code

Once the push is successful:

1. Go to: **https://github.com/naterrrr11/kaylin-mares-photography**
2. Click green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file
5. ✅ Done! You have all your code!

---

## 🆘 Troubleshooting

### Error: "Permission denied"
- Make sure you're using the Personal Access Token, not your GitHub password
- Check the token has "repo" permissions

### Error: "Repository not found"
- Make sure you created the repository first (Section B)
- Verify the repository name is exactly: `kaylin-mares-photography`

### Error: "Authentication failed"
- Generate a new Personal Access Token
- Make sure you copied the entire token (starts with `ghp_`)

---

## ✅ Success Checklist

- [ ] Created repository on GitHub
- [ ] Generated Personal Access Token
- [ ] Ran the git commands
- [ ] Code pushed successfully
- [ ] Downloaded ZIP from GitHub
- [ ] Extracted and have all files

---

**Ready?** Tell me:
- "Repository created, running commands now"
- "Need help creating the repository"
- "Need help getting the token"
- "Commands ran successfully!"
