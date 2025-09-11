# Azure Blob Storage Setup for Image Uploads

## Why Azure Blob Storage?

- **Scalable**: Can handle millions of images
- **Reliable**: 99.9% availability
- **Cost-effective**: Pay only for what you use
- **Secure**: Built-in security features

## Setup Steps:

### 1. Create Storage Account in Azure Portal

- Go to Azure Portal
- Click "Create a resource"
- Search for "Storage account"
- Choose "Storage account"
- Fill in:
  - Resource group: `real-estate-rg`
  - Storage account name: `realestatestorageig25`
  - Region: `North Europe`
  - Performance: `Standard`
  - Redundancy: `LRS`

### 2. Create Container

- Go to your storage account
- Click "Containers" in left menu
- Click "+ Container"
- Name: `properties`
- Public access level: `Private`

### 3. Get Connection String

- Go to "Access keys" in storage account
- Copy "Connection string" from key1

### 4. Add to Azure App Service Configuration

- Go to your App Service (`real-estate-api-ig25`)
- Settings → Configuration
- Add new application setting:
  - Name: `AzureStorageConnectionString`
  - Value: `DefaultEndpointsProtocol=https;AccountName=realestatestorageig25;AccountKey=YOUR_KEY;EndpointSuffix=core.windows.net`

## Code Changes Needed:

### Backend Changes:

1. Install Azure.Storage.Blobs NuGet package
2. Create BlobStorageService
3. Update PropertyController to use Blob Storage
4. Update image upload logic

### Frontend Changes:

1. Update image upload to handle Azure URLs
2. Update image display to use Azure URLs

## Benefits:

- Images survive server restarts
- Can handle unlimited uploads
- Better performance
- Automatic backup
- CDN support for faster loading
