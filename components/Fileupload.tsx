'use client';

import { useState } from 'react';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

type AnalysisResult = {
  summary: string;
  clauses: string[];
  explanation: string;
};

type Props = {
  onResults: (result: AnalysisResult) => void;
};

export default function FileUpload({ onResults }: Props) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const userId = session?.user?.id || null;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId || !session) {
      setError('Please sign in and select a file.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ filePath }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unexpected error occurred');
        return;
      }

      onResults(data);
    } catch (err: any) {
      console.error('Upload failed:', err.message);
      setError(err.message || 'Unexpected error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
        Upload your legal document
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
        Supported formats: PDF, DOCX, JPG/PNG
      </p>

      <input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 disabled:opacity-50"
      >
        {uploading ? 'Uploading & Analyzing...' : 'Upload & Analyze'}
      </button>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
}