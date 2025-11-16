# Document Assistant Frontend

A modern Next.js frontend for the Document Assistant API.

## Features

- 📤 **File Upload**: Upload PDF, DOCX, and PPTX files
- 📋 **File List**: View all uploaded documents
- 📄 **View Summary**: View generated summaries for documents
- 🔍 **Search**: Search through indexed documents
- 🗑️ **Delete**: Remove documents from storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running (default: http://localhost:8000)

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── FileUpload.tsx  # File upload component
│   ├── FileList.tsx    # File list component
│   ├── SummaryModal.tsx # Summary modal component
│   └── SearchBar.tsx   # Search bar component
├── lib/
│   └── api.ts          # API service functions
└── package.json
```

## API Endpoints Used

- `POST /upload/` - Upload a file
- `GET /list_files/` - List all files
- `GET /view_summary/{filename}` - Get summary for a file
- `POST /search/` - Search documents
- `DELETE /delete_file/{filename}` - Delete a file

## Build for Production

```bash
npm run build
npm start
```

