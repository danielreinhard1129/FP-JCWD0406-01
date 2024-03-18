import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { axiosInstance } from '@/libs/axios';
import { toast } from 'sonner';
import { IDropzoneProps } from '@/types/props.type';
import { IFileObject } from '@/types/upload.type';

const Dropzone = ({
  className,
  transactionId,
  getTransactionById,
}: IDropzoneProps) => {
  const [files, setFiles] = useState<IFileObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const upload_preset: string = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: IFileObject[]) => {
        const newLength: number = previousFiles.length + acceptedFiles.length;
        if (newLength <= 1) {
          return [
            ...previousFiles,
            ...acceptedFiles.map((file: any) =>
              Object.assign(file, { preview: URL.createObjectURL(file) }),
            ),
          ];
        } else {
          return previousFiles;
        }
      });
    }

    const validateError = rejectedFiles[0].errors[0].message;
    if (validateError === 'File type must be .jpeg,.png,.jpg') {
      toast.error('File format should be jpg, jpeg, and png ');
    } else {
      toast.error('file size should not exceed 1MB');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { image: ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1,
    maxSize: 1024 * 1000,
    multiple: false,
    onDrop,
  });

  useEffect(() => {
    return () =>
      files.forEach((file: IFileObject) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files: IFileObject[]) =>
      files.filter((file: IFileObject) => file.name !== name),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file: IFileObject) => formData.append('file', file as any));
    formData.append('upload_preset', upload_preset);

    const URL: string = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

    let paymentProof: string | undefined;
    try {
      setIsLoading(true);
      const response = await axios.post(URL, formData);
      paymentProof = response?.data.url.toString();
      toast.success('upload proof of successful payment');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    const { data } = await axiosInstance.patch(
      `/transactions/${transactionId}/payment-proof`,
      {
        paymentProof,
      },
    );
    getTransactionById();
    setFiles([]);
  };

  return (
    <div className="mt-10 w-full p-4 border">
      <h1 className="font-semibold text-center mb-3 pt-2 text-xl">
        Upload proof of payment
      </h1>

      <form onSubmit={handleSubmit}>
        {!files.length ? (
          <div
            {...getRootProps({
              className: className,
            })}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </div>
        ) : (
          <section className="mt-10">
            <ul className="mb-6 gap-10 flex justify-center ">
              {files.map((file: any) => (
                <li key={file.name} className="relative rounded-md shadow-lg ">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={170}
                    height={170}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="object-contain rounded-md text-center"
                  />
                  <button
                    type="button"
                    className="w-7 h-7 border border-secondary-400 bg-black rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={() => removeFile(file.name)}
                  >
                    <XMarkIcon className="w-5 h-5 text-white hover:bg-white hover:fill-secondary-400 transition-colors hover:text-black" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <button
                type="submit"
                className="px-14 py-2 bg-black rounded-lg text-white my-4"
              >
                {isLoading ? 'Waiting ...' : 'Upload'}
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default Dropzone;
