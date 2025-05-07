"use client"

import { ArrowLeft } from 'lucide-react';
import Button from './Button';

const BackButton = () => {
  return (
      <Button
          className="flex items-center px-4 py-2 rounded-lg border-[#403E43] text-[#221F26] hover:bg-[#F6F6F7]"
          onClick={() => window.history.back()}
      >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
      </Button>
  );
}

export default BackButton
