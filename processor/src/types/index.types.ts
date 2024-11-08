export type Message = {
  code: string;
  message: string;
  referencedBy: string;
};

export type ValidatorCreator = (
  path: string[],
  message: Message,
  overrideConfig?: object
) => [string[], [[(o: object) => boolean, string, [object]]]];

export type ValidatorFunction = (o: object) => boolean;

export type Wrapper = (
  validator: ValidatorFunction
) => (value: object) => boolean;

interface JsonObject<V = never> {
  [key: string]: V;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ClientRequest {
  // Define the properties of ClientRequest if needed
}

interface HttpErrorType {
  body?: JsonObject;
  code: number;
  headers?: JsonObject<string>;
  message: string;
  name: string;
  originalRequest: ClientRequest;
  retryCount?: number;
  status: number;
  statusCode: number;
}

export function isHttpError(error: unknown): error is HttpErrorType {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const hasRequiredString = (key: string) =>
    typeof (error as never)[key] === 'string';

  return typeof (error as never) === 'object' && hasRequiredString('name');
}
