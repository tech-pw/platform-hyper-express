import { Readable } from "stream";

/**
 * Interface defining possible body parser types, to be used with `NestExpressApplication.useBodyParser()`.
 */
export type NestHyperExpressBodyParserType = "json" | "urlencoded" | "text" | "raw";

export interface MultipartFieldInterface {
	type: string,
	fieldname: string,
	filename?: string,
	mimetype: string,
	encoding: string,
	file?: Readable,
	value?: string,
	fieldnameTruncated?: boolean,
	valueTruncated?: boolean,
	_buf?: Buffer
	toBuffer?: any,
	fields: Record<string, MultipartFieldInterface>
}

export interface ReadableWithToBuffer extends Readable {
	toBuffer: () => Promise<Buffer>;
}