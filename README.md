# pkg-hello-world
Simple hello world for pkg, useful for smoke testing whether compiled pkg binaries run

### Running with custom binaries

1. Copy built binaries locally somewhere, with current pkg-fetch major.minor as
   last directory in the path. E.g. `C:\Temp\pkg-cache\v3.4`
2. Rename `node-*` files to `built-*` to make `pkg` think these binaries were
   built locally
3. Update the local patch file in `./patches/pkg-fetch*.patch` to enable
   the version you are testing. Rerun `yarn`, possibly removing `node_modules`
   if necessary, e.g. if the patch doesn't apply.
E.g:
```diff --git a/node_modules/pkg-fetch/patches/patches.json b/node_modules/pkg-fetch/patches/patches.json
index c3bb657..4356f83 100644
--- a/node_modules/pkg-fetch/patches/patches.json
+++ b/node_modules/pkg-fetch/patches/patches.json
@@ -1,4 +1,5 @@
{
+  "v18.15.0": ["foo.bar"],
  "v18.5.0": ["node.v18.5.0.cpp.patch"],
  "v16.16.0": ["node.v16.16.0.cpp.patch"],
  "v14.20.0": ["node.v14.20.0.cpp.patch"],
```
4. Set/export `PKG_CACHE_PATH=<parent directory of v3.4>`
> E.g. `set PKG_CACHE_PATH=C:\Temp\pkg-cache` in the example in 1. on Windows.
5. Run `yarn worker-demo --target node18.15.0 --build`
> note: This will try and "build" 18.15.0, but a built binary already exists
  in the PKG_CACHE_PATH so it will reuse it. We are tricking `pkg` into using
  the binary we want to test, and bypassing the sha256 hash check that normally
  comes when we download `fetched-*` binaries to the local cache.
