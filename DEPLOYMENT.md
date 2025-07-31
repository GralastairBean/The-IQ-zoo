# The IQ Zoo - Backend Deployment Guide

## Render Deployment Setup

### Prerequisites
- Render account (https://render.com)
- GitHub repository with your code

### Step 1: Prepare Your Repository
1. Make sure your repository has these files:
   - `app.py` (Flask application)
   - `requirements.txt` (Python dependencies)
   - `backend/animals.json` (Animal data)
   - `render.yaml` (Render configuration)

### Step 2: Deploy to Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect Your Repository**
   - Connect your GitHub account
   - Select your repository

3. **Configure the Service**
   - **Name**: `iq-zoo-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free (or choose paid plan)

4. **Environment Variables** (Optional)
   - Add any environment variables if needed

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app

### Step 3: Get Your Backend URL
- After deployment, Render will give you a URL like: `https://iq-zoo-backend.onrender.com`
- Save this URL - you'll need it for your frontend configuration

### Step 4: Test Your Backend
Test these endpoints:
- `https://your-app-name.onrender.com/` (Root)
- `https://your-app-name.onrender.com/animals` (Get animals)
- `https://your-app-name.onrender.com/health` (Health check)

### Step 5: Update Frontend (Next Step)
Once your backend is deployed, you'll need to:
1. Update your frontend to use the new backend URL
2. Deploy your frontend to Vercel/Netlify
3. Configure your domain

## Troubleshooting

### Common Issues:
1. **Build fails**: Check `requirements.txt` has all dependencies
2. **Import errors**: Make sure file paths are correct
3. **CORS errors**: Check CORS configuration in `app.py`

### Logs:
- Check Render dashboard for deployment logs
- Use the "Logs" tab to debug issues

## Next Steps
After backend deployment:
1. Deploy frontend to Vercel/Netlify
2. Configure domain DNS
3. Update frontend API calls to use new backend URL 