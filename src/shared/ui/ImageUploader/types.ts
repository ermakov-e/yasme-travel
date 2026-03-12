export interface ImageFile {
  file: File;
  preview: string;
}

export interface ImageUploaderProps {
  value?: ImageFile | null;
  onChange?: (value: ImageFile | null) => void;
  accept?: string;
  maxSize?: number; // в мегабайтах
  multiple?: boolean;
  disabled?: boolean;
}
