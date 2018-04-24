#! /bin/bash
VERSION=$1

getBranchName() {
  branch_name=$(git symbolic-ref -q HEAD)
  branch_name=${branch_name##refs/heads/}
  branch_name=${branch_name:-HEAD}
  echo $branch_name
}

BRANCH=$(getBranchName)
ISSUE=${BRANCH##feature/}
ISSUE=${ISSUE##bug/}

git commit --allow-empty -am "Fix #$ISSUE"
git push
hub pull-request -o -b $VERSION -m $(getBranchName)
