Trigger `cloudbuild-update-image-version.yaml` on GCP
```shell
gcloud builds submit --config cloudbuild-update-image-version.yaml \
  --substitutions _IMAGE_NAME="api_5a1fef67edf67cc0e6ed6fbdaa1e4c06c0f22b36"
```

Trigger `cloudbuild-update-image-version.yaml` locally
```shell
cloud-build-local --config cloudbuild-update-image-version.yaml \
  --dryrun=false \
  --write-workspace=/home/mue/temp \
  --substitutions _IMAGE_NAME="api_5a1fef67edf67cc0e6ed6fbdaa1e4c06c0f22b36" \
  .
```
