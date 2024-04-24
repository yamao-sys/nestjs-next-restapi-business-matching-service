import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export const s3 = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  },
  endpoint: process.env.DYNAMO_DB_END_POINT ?? 'http://localstack:4566',
  forcePathStyle: true,
});

export const getObjectLists = () => {
  s3.send(
    new ListObjectsV2Command({
      Bucket: 'localstack-bucket',
      MaxKeys: 10, //取得件数を指定。最大1000件まで
    }),
  );
};

export const getObject = async (key: string) => {
  const { Body } = await s3.send(
    new GetObjectCommand({
      Bucket: 'localstack-bucket',
      Key: key,
    }),
  );
  if (!(Body instanceof Readable)) {
    throw new Error('Invalid S3 Body');
  }

  const chunks: Buffer[] = [];
  for await (const chunk of Body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
};

export const putObject = (key: string, body: string) => {
  s3.send(
    new PutObjectCommand({
      Bucket: 'localstack-bucket',
      Key: key,
      Body: body,
    }),
  );
};
