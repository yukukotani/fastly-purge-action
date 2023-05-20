# fastly-purge-action

A GitHub Actions to purge Fastly cache.

## Usage

### Puge by surrogate key

```yaml
- name: Purge Fastly cache
  uses: yukukotani/fastly-purge-action@v1
  with:
    api-token: YOUR_TOKEN_HERE
    service-id: 4UiI4ODITcAJv2z4ezJTFC
    target: surrogate-key
    keys: landing-pages
    soft: true
```

### Purge by single url

```yaml
- name: Purge Fastly cache
  uses: yukukotani/fastly-purge-action@v1
  with:
    api-token: YOUR_TOKEN_HERE
    target: single-url
    url: "https://example.com/some/page"
    soft: true
```

## Options

### api-token

**Required**

Your API token of Fastly. See [here](https://developer.fastly.com/reference/api/#authentication) for details.

### target

**Required**

The target to purge. Currently, only `surrogate-key` and `single-url` are supported. `all` will be supported if anyone requests.

### service-id

**Required when the target is `surrogate-key`**

Your service id to purge caches. **This is not service name. This will be a random alphanumeric string.**

### keys

**Required when the target is `surrogate-key`**

Surrogate Keys to purge.

### url

**Required when the target is `single-url`**

### soft

True by default. If false, the affected object will be inaccessible rather than marked as stale.
