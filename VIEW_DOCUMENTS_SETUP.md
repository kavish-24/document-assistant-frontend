# View Documents Feature - Setup Guide

## ✅ Implementation Complete

The "View Documents" feature has been successfully added to your Next.js project!

## 📁 New Files Created

1. **`lib/supabase.ts`** - Supabase client configuration
2. **`lib/store/ViewContext.tsx`** - React Context for view state management
3. **`components/documents/ViewDocuments.tsx`** - Main component for viewing documents list
4. **`components/documents/DocumentViewer.tsx`** - PDF viewer component

## 🔧 Updated Files

1. **`components/layout/Sidebar.tsx`** - Added "View Documents" nav item with view switching
2. **`app/layout.tsx`** - Wrapped with ViewProvider
3. **`app/page.tsx`** - Conditionally renders views based on activeView state
4. **`lib/api.ts`** - Added Supabase functions (listSupabaseFiles, getSignedUrl, getFileMetadata)
5. **`package.json`** - Added @supabase/supabase-js dependency

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

This will install `@supabase/supabase-js` which was added to package.json.

### 2. Configure Supabase Environment Variables

Create or update your `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get these values:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Verify Supabase Bucket

Make sure you have a bucket named **"files"** in your Supabase Storage:
1. Go to Storage in your Supabase dashboard
2. Create a bucket named "files" if it doesn't exist
3. Set appropriate permissions (public or authenticated access)

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

## 🎯 How It Works

### View State Management
- Uses React Context (`ViewContext`) to manage active view
- Two views: `'documents'` (default) and `'viewDocuments'`
- No routing - everything happens in the same page

### Sidebar Navigation
- Clicking "Documents" shows the original DocumentsPage
- Clicking "View Documents" shows the ViewDocuments component
- Active state is highlighted in the sidebar

### Document Viewing
1. **ViewDocuments** component loads files from Supabase "files" bucket
2. Displays list with file icons, sizes, and dates
3. Clicking a PDF file:
   - Generates a signed URL (valid for 1 hour)
   - Opens DocumentViewer modal
   - Embeds PDF in iframe for viewing
4. Non-PDF files show a message (only PDFs can be viewed inline)

## 📋 Features

✅ List all documents from Supabase bucket  
✅ Display file metadata (size, date)  
✅ Click to view PDFs in modal  
✅ Signed URLs for secure access  
✅ Download option  
✅ Open in new tab option  
✅ Responsive design  
✅ Error handling  
✅ Loading states  

## 🔍 API Functions Added

### `listSupabaseFiles()`
Lists all files from the "files" bucket in Supabase.

### `getSignedUrl(filename, expiresIn)`
Creates a signed URL for secure file access. Default expiration: 1 hour.

### `getFileMetadata(filename)`
Gets metadata for a specific file.

## 🎨 Styling

All components use the existing design system:
- Consistent with existing Card, Alert, Button components
- Uses existing CSS variables and classes
- Responsive and mobile-friendly

## ⚠️ Important Notes

1. **PDF Only**: Currently, only PDF files can be viewed inline. Other file types will show an error message.

2. **Signed URLs**: URLs expire after 1 hour. If a PDF fails to load, try clicking "View" again to generate a new signed URL.

3. **Bucket Name**: The code expects a bucket named exactly "files". If your bucket has a different name, update it in `lib/api.ts`.

4. **Permissions**: Make sure your Supabase bucket has appropriate permissions set. For public access, enable public bucket. For authenticated access, ensure users are authenticated.

## 🐛 Troubleshooting

### "Failed to load documents from Supabase"
- Check that environment variables are set correctly
- Verify the bucket name is "files"
- Check Supabase project is active

### "Failed to load PDF"
- Signed URL may have expired - try again
- Check file exists in bucket
- Verify bucket permissions

### No files showing
- Check bucket has files uploaded
- Verify bucket name matches "files"
- Check browser console for errors

## 📝 Next Steps (Optional Enhancements)

- Add support for viewing DOCX/PPTX files
- Add file search/filter functionality
- Add pagination for large file lists
- Add file preview thumbnails
- Add file sharing capabilities

