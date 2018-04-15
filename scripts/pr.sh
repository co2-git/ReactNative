#! /bin/bash
getBranchName() {
  branch_name=$(git symbolic-ref -q HEAD)
  branch_name=${branch_name##refs/heads/}
  branch_name=${branch_name:-HEAD}
  echo $branch_name
}

hub pull-request -b $1 -m $(getBranchName) | open
