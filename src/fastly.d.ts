declare module "fastly" {
  type BulkPurgeTagOptions =
    | {
        service_id: string;
        fastly_soft_purge: number;
        surrogate_key: string;
      }
    | {
        service_id: string;
        fastly_soft_purge: number;
        purge_response: object;
      };

  class PurgeApi {
    bulkPurgeTag(options: BulkPurgeTagOptions): Promise<unknown>;
  }

  namespace ApiClient {
    namespace instance {
      function authenticate(token: string): void;
    }
  }
}
