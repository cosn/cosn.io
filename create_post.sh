#!/bin/bash

title=$1
title="${title// /-}"
dir="src/app/posts/${title}"

echo -n "Creating ${dir} ... "
mkdir -p ${dir}

date=$(date +'%Y-%m-%d')

cat > ${dir}/page.mdx << EOF
import { PostLayout } from '@/components/PostLayout'

export const post = {
  published: true,
  date: '${date}',
  title: '${title}',
  description:
    ""
}

export const metadata = {
  title: post.title,
  description: post.description,
}

export default (props) => <PostLayout post={post} {...props} />

EOF

echo "done"
