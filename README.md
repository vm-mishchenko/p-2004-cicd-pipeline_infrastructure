## What
This repository defines how [p-2004-cicd-pipeline_api](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_api) and [p-2004-cicd-pipeline_backend](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_backend) services should
be deployed. Essentially covering CD part in CI/CD process.

## Why
It's an attempt to explore how applications can be design and structured when CI/CD configuration lives in a different
repo.

## How
`services.json` in declarative manner describes what service version should be deployed.

Git branch defines an environment where the service should be deployed.

Workflow:
- User or some service (e.g. Jenkins, Google Cloud Build, etc.) commits a new version of service that should be
  deployed
- Version represents a Docker image that has been created earlier during CI process
- Google Cloud Build listens to pushes in Git repo and deploys a specified version to the environment based on the
  Git branch

Ideally, user should never update the app version manually. It should be handled solely by automation. Although, in
general, it will depend on deployment strategy. The goal of such repos structure to have enough flexibility, so it can support different deployment strategies.

## Build configurations
Cloud build configurations can be treated as a functions that can be called directly or in response of some events, e.g.
new push to repo.

### cloudbuild-deploy-api.yaml
Takes services version from `services.json` and deploys it to Cloud Run. It's executed each time by Google Cloud Build
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
