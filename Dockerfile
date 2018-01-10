FROM node:8.9.0

WORKDIR /probot-app-label-docs-pr

COPY package.json yarn.lock /probot-app-label-docs-pr/

RUN yarn
