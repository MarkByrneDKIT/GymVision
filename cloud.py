from google.cloud import storage

# Set up credentials
storage_client = storage.Client.from_service_account_json('gymvision-c352151a50b1.json')

# Set up bucket and image information
bucket_name = 'gymvision-image-storage'
blob_name = 'lift_image.jpg'
local_file_path = 'richard.jpg'

# Create a bucket object
bucket = storage_client.get_bucket(bucket_name)

# Create a blob object and upload the file
blob = bucket.blob(blob_name)
blob.upload_from_filename(local_file_path)
