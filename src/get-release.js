const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

const repository = 'mtconnect/mtconnect_sysml_model';
const token = core.getInput('token');
var owner = 'mtconnect';
var repo = 'mtconnect_sysml_model';

const octokit = (() => {
  if (token) {
    return new Octokit({ auth: token,});
  } else {
    return new Octokit();
  }
})();

async function getRelease() {
  if (repository){
    [owner, repo] = repository.split("/");
  }
  var releases  = await octokit.repos.listReleases({
    owner: owner,
    repo: repo,
    });
  releases = releases.data;
  if (releases.length) {
    return {
      'release': releases[0].tag_name,
      'id': String(releases[0].id),
      'description': String(releases[0].body)
    };
  } else {
    throw "No valid releases";
  }
}

module.exports = getRelease;
