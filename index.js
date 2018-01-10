/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {extname} = require('path');

const docsExtensions = new Set(['.md']);

module.exports = robot => {
  robot.on('pull_request.opened', check);
  robot.on('pull_request.edited', check);
  robot.on('pull_request.synchronize', check);
  robot.on('pull_request.unlabeled', check);
  robot.on('pull_request.labeled', check);

  async function check(context) {
    const pr = context.payload.pull_request;

    // set status to pending while checks happen
    setStatus(context, {
      state: 'pending',
      description: 'Checking whether to apply or remove docs label',
    });

    async function isDocsPR() {
      const compare = await context.github.repos.compareCommits(
        context.repo({
          base: pr.base.sha,
          head: pr.head.sha,
        }),
      );

      return compare.data.files.every(file =>
        docsExtensions.has(extname(file.filename)),
      );
    }

    const needsLabel = await isDocsPR();
    if (needsLabel) {
      await context.github.issues.addLabels(
        context.issue({
          labels: ['docs'],
        }),
      );
    } else {
      try {
        await context.github.issues.removeLabel(
          context.issue({
            name: 'docs',
          }),
        );
      } catch (err) {
        if (err.code !== 404) {
          throw err;
        }
      }
    }

    // set status to success
    setStatus(context, {
      state: 'success',
      description: 'Docs label has been set (or unset)',
    });
  }
};

async function setStatus(context, {state, description}) {
  const {github} = context;
  return github.repos.createStatus(
    context.issue({
      state,
      description,
      sha: context.payload.pull_request.head.sha,
      context: 'probot/label-docs-pr',
    }),
  );
}
