FROM node:8.9.4@sha256:5afc7736a71bcf24281d9dbff878c771106e0791d56949b1a4e8d27c50424283

WORKDIR /probot-app-label-docs-pr

COPY package.json yarn.lock /probot-app-label-docs-pr/

RUN yarn
