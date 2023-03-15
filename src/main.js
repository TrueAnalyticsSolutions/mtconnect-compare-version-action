const core = require('@actions/core');
const github = require('@actions/github');

try {
  const version = core.getInput('version');
  console.log('Input Version: ${version}');
  
  // Get latest release information for mtconnect/mtconnect_sysml_model
  
  // Parse input version and latest release version
  
  // Compare the major and minor values and yield 'true' if mtconnect_sysml_model.Major >= current.Major and mtconnect_sysml_model.Minor > current.Minor
} catch (error) {
 core.setFailed(error.message); 
}
