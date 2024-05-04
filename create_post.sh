#!/bin/bash

title=$1
title="${title// /-}"
dir="src/app/articles/${title}"

echo -n "Creating ${dir} ... "
mkdir -p ${dir}

date=$(date +'%Y-%m-%d')

cat > ${dir}/page.mdx << EOF
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  published: false,
  date: '${date}',
  title: '${title}',
  description:
    ''
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />


EOF

echo "done"
