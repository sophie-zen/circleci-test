#!/bin/bash
set -e

PATHS_TO_SEARCH="$*"

# 2. Make sure the paths to search are not empty
if [ -z "$PATHS_TO_SEARCH" ]; then
    echo "Please provide the paths to search for."
    echo "Example usage:"
    echo "./exit-if-path-not-changed.sh path/to/dir1 path/to/dir2"
    exit 1
fi

# 3. Get the latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# 4. Get the latest commit in the searched paths
LATEST_COMMIT_IN_PATH=$(git log -1 --format=format:%H --full-diff $PATHS_TO_SEARCH)

if [ $LATEST_COMMIT != $LATEST_COMMIT_IN_PATH ]; then
    echo "Exiting this CircleCI job because code in the following paths have not changed:"
    echo $PATHS_TO_SEARCH
    # circleci step halt
    exit 1
fi
