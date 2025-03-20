# Check Semver action
Based on [joshuamcewen/semver-check-action](https://github.com/joshuamcewen/semver-check-action)

This is action is used to validate versions in a pull request.

The next version is valid if its greater than the prev version.
If the `singleInc` input is true then the next version is invalid if it is not on a single increment
from previous version (if prev version is 0.0.0, next version is 0.0.1/0.1.0/1.0.0)

# Inputs
## prev_version
- required version which represents past version or the version of base branch in a pr
## next_version
- required version which represnets new version or the version of the source branch in a pr
## singleInc
- defaults to true
- Enables a check where the `next_version` should be a single increment of either patch, minor or major versions from `prev_version`


# Example usage
```
uses: flycatch/check-semver-action@v1.0.0
with:
    prev_version: '0.0.1'
    next_version: '0.1.0'
```

