# Complete Azure Deployment Guide

## Current Status: 60% Complete

### ✅ COMPLETED:

1. Azure Database for PostgreSQL
2. Azure App Service Plan
3. Azure App Service (Backend)
4. GitHub Actions workflow
5. .gitignore configuration
6. CORS settings

### 🔄 IN PROGRESS:

7. Git commits and push
8. GitHub Secrets configuration

### ⏳ PENDING:

9. Azure Static Web App (Frontend)
10. Azure Blob Storage for images

---

## STEP 7: Commit and Push Code

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: prepare for Azure deployment

- Add comprehensive gitignore rules
- Add GitHub Actions workflow
- Update CORS for Azure deployment
- Add Azure Blob Storage documentation
- Prepare for production deployment"

# Push to main branch
git push origin main
```

---

## STEP 8: Configure GitHub Secrets

1. Go to GitHub → your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
4. Value: Download from Azure App Service:
   - Go to Azure Portal → App Service → real-estate-api-ig25
   - Click "Get publish profile"
   - Copy the entire content
5. Click "Add secret"

---

## STEP 9: Create Azure Blob Storage

### Why Azure Blob Storage?

- **Scalable**: Handle millions of images
- **Reliable**: 99.9% availability
- **Cost-effective**: ~$0.02/GB/month
- **Secure**: Built-in security

### Setup Steps:

1. **Create Storage Account:**

   - Go to Azure Portal
   - Click "Create a resource"
   - Search "Storage account"
   - Fill in:
     - Resource group: `real-estate-rg`
     - Storage account name: `realestatestorageig25`
     - Region: `North Europe`
     - Performance: `Standard`
     - Redundancy: `LRS`

2. **Create Container:**

   - Go to storage account
   - Click "Containers" → "+ Container"
   - Name: `properties`
   - Public access: `Private`

3. **Get Connection String:**

   - Go to "Access keys"
   - Copy "Connection string" from key1

4. **Add to App Service Configuration:**
   - Go to App Service → Settings → Configuration
   - Add application setting:
     - Name: `AzureStorageConnectionString`
     - Value: `DefaultEndpointsProtocol=https;AccountName=realestatestorageig25;AccountKey=YOUR_KEY;EndpointSuffix=core.windows.net`

---

## STEP 10: Create Azure Static Web App (Frontend)

1. **Create Static Web App:**

   - Go to Azure Portal
   - Click "Create a resource"
   - Search "Static Web App"
   - Fill in:
     - Resource group: `real-estate-rg`
     - Name: `real-estate-front-ig25`
     - Region: `North Europe`
     - Build details:
       - Build preset: `React`
       - App location: `/Frontend/real-estate-front`
       - Output location: `dist`

2. **Connect to GitHub:**

   - Choose your repository
   - Branch: `main`
   - Click "Review + create"

3. **Update CORS in Backend:**
   - Go to App Service → Configuration
   - Update CORS to include frontend URL:
     ```
     https://real-estate-front-ig25.azurestaticapps.net
     ```

---

## STEP 11: Test Deployment

1. **Test Backend API:**

   - URL: `https://real-estate-api-ig25.azurewebsites.net/api`
   - Check if endpoints work

2. **Test Frontend:**

   - URL: `https://real-estate-front-ig25.azurestaticapps.net`
   - Check if site loads

3. **Test Image Upload:**
   - Try uploading property images
   - Verify they save to Azure Blob Storage

---

## Cost Estimation:

| Service        | Plan     | Monthly Cost |
| -------------- | -------- | ------------ |
| PostgreSQL     | B1ms     | ~$25         |
| App Service    | B1       | ~$13         |
| Static Web App | Free     | $0           |
| Blob Storage   | Standard | ~$2-5        |
| **Total**      |          | **~$40-45**  |

---

## Next Steps After Deployment:

1. **Monitor Performance:**

   - Check Azure Monitor
   - Monitor costs

2. **Security:**

   - Enable HTTPS
   - Configure firewall rules

3. **Optimization:**

   - Enable CDN for images
   - Optimize database queries

4. **Backup:**
   - Configure automated backups
   - Test restore procedures
