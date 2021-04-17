Trigger `cloudbuild-update-image-version.yaml` on GCP
```shell
gcloud builds submit --config cloudbuild-update-image-version.yaml \
  --substitutions _IMAGE_NAME="test"
```

Trigger `cloudbuild-update-image-version.yaml` locally
```shell
cloud-build-local --config cloudbuild-update-image-version.yaml \
  --dryrun=false \
  --write-workspace=/home/mue/temp \
  --substitutions _IMAGE_NAME="test" \
  .
```
