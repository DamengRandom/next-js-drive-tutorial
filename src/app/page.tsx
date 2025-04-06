/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

// import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./folder-file-row";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { Button } from "~/components/ui/button";
// import { UploadButton } from "~/components/uploadthing";
// import { useRouter } from "next/navigation";
// import { usePostHog } from "posthog-js/react";

export default function GoogleDriveClone() {
  // const navigate = useRouter();

  // const posthog = usePostHog();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/f/1" className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {/* {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))} */}
          </div>
          <div>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {mockFolders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {mockFiles.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <Button>Upload</Button>
        {/* <UploadButton
          endpoint="driveUploader"
          onBeforeUploadBegin={(files) => {
            posthog.capture("files_uploading", {
              fileCount: files.length,
            });

            return files;
          }}
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
          input={{
            folderId: props.currentFolderId,
          }}
        /> */}
      </div>
    </div>
  );
}