# compare-version-action
A GitHub Action that can be used to compare the release version of the mtconnect_sysml_model against an input version.

## Pre-requisites
This Action requires that the environment variable `GITHUB_TOKEN` be set correctly.

## Inputs
 - `version`: The semantic version that the MTConnect SysML version should be compared against.

## Outputs
 - `update_available`: A boolean flag indicating whether or not there is a newer semantic version of the MTConnect SysML model compared to the provided `version`. Returns `true` if the SysML model version is newer.

## Example workflow
Check every day if the MTConnect SysML model has been updated.

```yaml
on:
  schedule:
    - cron: '0 0 * * *' # run every day at midnight UTC

jobs:
  check-latest-release:
    name: Check latest release of MTConnect SysML model
    runs-on: ubuntu-latest
    steps:
      - name: Compare MTConnect Version
        id: mtc_version
        uses: mtconnect/compare-version-action@main
        with:
          version: "v1.1" # In most cases, replace this with a reference to the latest tag from your own repo
      - name: Check Update Available
        if: ${{ steps.mtc_version.outputs.update_available == false }} # If there is no update, then force this workflow to exit
        uses: actions/github-script@v3
        with:
          script: |
            core.setFailed('No new updates to MTConnect SysML model')
  build:
    needs: check-latest-release # Expects the condition in 'Check Update Available' to have failed, therefore having skipped the set to failure.
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Do something
        run: echo "There appears to be an update, we should do something about that"
```
