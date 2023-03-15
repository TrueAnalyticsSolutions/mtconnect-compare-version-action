const core = require('@actions/core');
const github = require('@actions/github');
const getRelease = require('./get-release');

if (require.main === module) {
  function parseVersion(version) {
    // Parse input version and latest release version
    if (version[0] === 'v' || version[0] === 'V') version = version.substr(1);

    // Find any pre-release suffixes
    const vPreRelease = null;
    if (version.indexOf('-') > 0) {
      vPreRelease = version.substr(version.indexOf('-') + 1);
      version = version.substr(0, version.indexOf('-'));
    }

    const versionParts = version.split('.');
    return {
      'pre_release': vPreRelease,
      'major': versionParts.length > 0 ? parseInt(versionParts[0]) : null,
      'minor': versionParts.length > 1 ? parseInt(versionParts[1]) : null,
      'patch': versionParts.length > 2 ? parseInt(versionParts[2]) : null,
      'build': versionParts.length > 3 ? parseInt(versionParts[3]) : null
    };
  }
  async function run() {
    try {
      const version = parseVersion(core.getInput('version'));
      console.log('Input Version: ', version);

      // Get latest release information for mtconnect/mtconnect_sysml_model
      const mtcRelease = await getRelease();
      const mtc_version = parseVersion(mtcRelease.tag_name);
      console.log('MTConnect Version: ', mtc_version);

      // Compare the major and minor values and yield 'true' if mtconnect_sysml_model.Major >= current.Major and mtconnect_sysml_model.Minor > current.Minor
      if (mtc_version.major > version.major || (mtc_version.major === version.major && mtc_version.minor > version.minor)) {
        console.log('MTConnect seems to have a newer version');
        core.setOutput('update_available', true);
      } else {
        consol.log('MTConnect does not appear to have a newer version');
        core.setOutput('update_available', false);
        core.setFailed('MTConnect does not appear to have a newer version');
      }
    } catch (error) {
     core.setFailed(error.message); 
    }
  }
  run();
}
