"use server";

import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

type fileUploadProps = {
  fileType: string;
  // fileSize?: number;
  // filePreviousURL?: string;
  // file?: File[];
  // acceptedFileTypes?: string[];
};

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function getSignedURL({ fileType }: fileUploadProps) {
  const { userId } = auth();
  if (!userId)
    return {
      failure: "Unauthorized",
    };

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: fileType,
    Metadata: {
      userId,
    },
  });

  // this url is from aws
  const url = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  });

  // if (filePreviousURL) {
  //   await fetch(filePreviousURL, {
  //     method: "DELETE",
  //   });
  // }

  // const res = await fetch(signedURL, {
  //   method: "PUT",
  //   body: file,
  //   headers: {
  //     "Content-Type": fileType,
  //   },
  // });

  // console.log(res);
  return { success: url };
}

export async function getFileUpload({ file, fileType }: any) {
  if (!file)
    return {
      status: 400,
      res: "No files selected",
    };

  const signedURLResult = await getSignedURL({
    fileType,
  });

  if (signedURLResult.failure !== undefined) {
    console.log(signedURLResult.failure);
    return {
      status: 400,
      res: signedURLResult.failure,
    };
  }

  const url = signedURLResult.success;

  const res = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": fileType,
    },
  });
  if (res.ok) {
    const resMediaURL = url.split("?")[0];

    return {
      status: 200,
      res: resMediaURL,
    };
  }
}
