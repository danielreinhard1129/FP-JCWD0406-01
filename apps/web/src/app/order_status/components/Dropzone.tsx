import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { axiosInstance } from '@/libs/axios';

const Dropzone = ({ className, transaction_id, getTransactionById }: any) => {
  const [files, setFiles]: any = useState([]);
  const [isLoading, setIsLoading]: any = useState(false);
  const upload_preset: any = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: any) => {
        const newLength = previousFiles.length + acceptedFiles.length;
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
      alert('File format should be jpg, jpeg, and png ');
    } else {
      alert('file size should not exceed 1MB');
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
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: any) => {
    setFiles((files: any) => files.filter((file: any) => file.name !== name));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file: any) => formData.append('file', file));
    formData.append('upload_preset', upload_preset);

    const URL: any = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    let paymentProof;
    try {
      setIsLoading(true);
      const response = await axios.post(URL, formData);
      paymentProof = response.data.url.toString();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    const { data } = await axiosInstance.patch(
      `/transactions/payment_proof/${transaction_id}`,
      {
        paymentProof,
      },
    );
    getTransactionById();
    setFiles([]);
  };

  return (
    <div className="mt-5 w-full p-4 border">
      <h1 className="font-semibold text-center mb-3 text-xl">
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
                className="px-3 py-2 bg-black rounded-lg text-white my-4"
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
