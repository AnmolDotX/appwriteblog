const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRTIE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRTIE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRTIE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRTIE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRTIE_BUCKET_ID)
};

export default conf;