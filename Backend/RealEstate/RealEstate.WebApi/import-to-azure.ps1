# Import Properties to Azure
$azureApiUrl = "https://real-estate-api-ig25-eahbg3dwgwemfjej.northeurope-01.azurewebsites.net/api"
$localDataPath = "local_properties.json"

# Read local data
$properties = Get-Content $localDataPath | ConvertFrom-Json

Write-Host "Found $($properties.Count) properties to import..."

foreach ($property in $properties) {
    try {
        # Remove ID and createdAt to let Azure generate new ones
        $propertyData = @{
            title = $property.title
            description = $property.description
            price = $property.price
            bedrooms = $property.bedrooms
            bathrooms = $property.bathrooms
            squareMeters = $property.squareMeters
            propertyType = $property.propertyType
            location = $property.location
            status = $property.status
            address = $property.address
            features = $property.features
        }

        # Convert to JSON
        $jsonData = $propertyData | ConvertTo-Json -Depth 10

        Write-Host "Importing: $($property.title) - $($property.price) грн"

        # Send to Azure
        $response = Invoke-RestMethod -Uri "$azureApiUrl/Property" -Method POST -Body $jsonData -ContentType "application/json"
        
        Write-Host "✅ Successfully imported: $($property.title)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to import $($property.title): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Import completed!" -ForegroundColor Green
