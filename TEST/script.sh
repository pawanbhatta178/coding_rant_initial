#!/bin/bash

#Start the first process
req_env_var_count=$(printenv|grep -c "OUTPUT_LOG\|USER_CODE\|CORRECT_ANSWERS\|TEST_RESULT\|PERFORMANCE")
if [ $req_env_var_count -ne 5 ]; then
   echo "Parameters not set correctly"
   exit
fi
node main &> $OUTPUT_LOG
time node main 2>&1 | tail -3 >$PERFORMANCE
status=$?
if [ $status -ne 0 ]; then
   echo "Failed to run NODE process: $status"
    
fi
  echo "DONE AND DUSTED"