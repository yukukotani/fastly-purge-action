# fastly-purge-action

A GitHub Actions to purge Fastly cache.

## Usage

```yaml
- name: Purge Fastly cache
  uses: Monchi/fastly-purge-action@v1
  with:
    api-token: YOUR_TOKEN_HERE
    service-id: 4UiI4ODITcAJv2z4ezJTFC
    target: surrogate-key
    keys: landing-pages
    soft: true
```

## Options

### api-token

**Required**

Your API token of Fastly. See [here](https://developer.fastly.com/reference/api/#authentication) for details.

### service-id

**Required**

Your service id to purge caches. **This is not service name. This will be a random alphanumeric string.**

### target

**Required**

The target to purge. Currently, only `surrogate-key` is supported. `all` and `url` will be supported if anyone requests.

### keys

**Required when the target is `surrogate-key`**

Surrogate Keys to purge.

### soft

True by default. If false, the affected object will be inaccessible rather than marked as stale.
