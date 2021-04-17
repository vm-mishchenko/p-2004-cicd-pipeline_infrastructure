## What
This repository defines how [p-2004-cicd-pipeline_api](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_api) application should
be deployed. Essentially covering CD part in CI/CD process.

## Why
It's an attempt to explore how application can be design and structured when CI/CD configuration lives in a different
repo.

## How
`services.json` in declarative manner describes what service version should be deployed.

Git branch defines an environment where the service should be deployed (although branches are not supported yet).

Workflow:
- User or some service (e.g. Jenkins, Google Cloud Build, etc.) commit a new version of application that should be
  deployed
- it's assumed that this version has been already created by CI process
- Google Cloud Build listens to any changes in Git repo and deploys a specified version to the environment based on the
  Git branch

Ideally, user should never update the app version manually. It should be handled solely by automation. Although, in
general, it will depend on deployment strategy. The goal of such repo structure to make the whole process as flexible as
possible, so it can support different strategies.

## Build configurations
Cloud build configurations can be treated as a functions that can be called directly or in response of some events, e.g.
new push to repo.

### cloudbuild-deploy-api.yaml
Takes `API` service version from `services.json` and deploys it to Cloud Run. Executed each time by Google Cloud Build
when `services.json` is updated.

### cloudbuild-update-image-version.yaml
Allows updating `API` service version in `services.json`. Can be called by any automation tool. Currenty, it's called by
CI process in [p-2004-cicd-pipeline_api](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_api) repo.

## Tech details
Trigger `cloudbuild-update-image-version.yaml` on GCP
```shell
gcloud builds submit --config cloudbuild-update-image-version.yaml \
  --substitutions _IMAGE_NAME="<IMAGE_NAME>"
```

Trigger `cloudbuild-update-image-version.yaml` locally
```shell
cloud-build-local --config cloudbuild-update-image-version.yaml \
  --dryrun=false \
  --write-workspace=/home/mue/temp \
  --substitutions _IMAGE_NAME="<IMAGE_NAME>"
  .
```
