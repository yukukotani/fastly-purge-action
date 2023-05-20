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

  type PurgeSingleUrlOptions = {
    cached_url: string;
    fastly_soft_purge: 0 | 1;
  }

  class PurgeApi {
    bulkPurgeTag(options: BulkPurgeTagOptions): Promise<PurgeResponse>;
    purgeSingleUrl(options: PurgeSingleUrlOptions): Promise<PurgeResponse>;
  }

  type PurgeResponse = {
    status: string;
    id: string;
  };

  namespace ApiClient {
    namespace instance {
      function authenticate(token: string): void;
    }
  }
}
