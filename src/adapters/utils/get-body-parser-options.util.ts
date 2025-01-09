import { Readable } from "stream";
import type { RawBodyRequest } from "@nestjs/common";
import type { IncomingMessage, ServerResponse } from "http";
import { Request, Truncations } from "hyper-express";
import type { MultipartFieldInterface, NestHyperExpressBodyParserOptions, ReadableWithToBuffer, } from "../../interfaces";

const rawBodyParser = (
  req: RawBodyRequest<IncomingMessage>,
  _res: ServerResponse,
  buffer: Buffer,
) => {
  if (Buffer.isBuffer(buffer)) {
    req.rawBody = buffer;
  }
  return true;
};

export function getBodyParserOptions<Options = NestHyperExpressBodyParserOptions>(
  rawBody: boolean,
  options?: Omit<Options, "verify"> | undefined,
): Options {
  let parserOptions: Options = (options || {}) as Options;

  if (rawBody === true) {
    parserOptions = {
      ...parserOptions,
      verify: rawBodyParser,
    };
  }

  return parserOptions;
}

/**
 * Adds a `toBuffer` method to a `Readable` stream, enabling the buffer to be returned as a Promise.
 *
 * @param {Buffer} buffer - The buffer to be wrapped in a readable stream.
 * @returns {ReadableWithToBuffer} - A Readable stream with an additional `toBuffer` method.
 */
function addToBufferMethod(buffer: Buffer): ReadableWithToBuffer {
  // Create a Readable stream from the provided buffer
  const readableWithToBuffer = Readable.from(buffer) as ReadableWithToBuffer;

  async function toBuffer(): Promise<Buffer> {
    return new Promise((resolve, reject) => resolve(buffer));
  }

  // Assign the `toBuffer` function to the Readable stream
  readableWithToBuffer.toBuffer = toBuffer;
  return readableWithToBuffer;
}

export async function multipartRequestBodyParser(
  req: Request,
): Promise<Record<string, MultipartFieldInterface>> {

  const fields: Record<string, MultipartFieldInterface> = {};
  await req.multipart(async (field) => {
    const coommonMultipartField: MultipartFieldInterface = {
      type: field.file ? 'file' : 'field',
      fieldname: field.name,
      encoding: field.encoding,
      mimetype: field.mime_type,
      fields: fields,
    };

    if (field.file) {
      const chunks: Buffer[] = [];
      const fileStream = field.file.stream;

      // Collect chunks from the file stream
      for await (const chunk of fileStream) {
        chunks.push(Buffer.from(chunk));
      }
      // Combine all chunks into a single buffer
      const buffer = Buffer.concat(chunks);

      fields[field.name] = {
        ...coommonMultipartField,
        filename: field.file.name,
        file: field.file.stream,
        _buf: buffer,
        toBuffer: addToBufferMethod(buffer).toBuffer
      };
    } else {
      fields[field.name] = {
        ...coommonMultipartField,
        value: field.value || '',
        fieldnameTruncated: (field.truncated as Truncations).name ?? false,
        valueTruncated: (field.truncated as Truncations).value ?? false,
      };
    }
  });

  return fields;
}