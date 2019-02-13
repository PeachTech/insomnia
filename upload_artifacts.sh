#! /bin/bash
echo "starting upload script"
echo Using insomnia version $INSOMNIA_VERSION 
echo would upload from artifacts paths: $ARTIFACTS_PATHS
echo Artifacts working dir is: $ARTIFACTS_WORKING_DIR
echo "if the above is blank, something is wrong"
# artifacts -D upload --target-paths /release/1.5/$INSOMNIA_VERSION
echo "Upload would have been completed here"