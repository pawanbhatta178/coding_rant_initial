#!/bin/bash

#Start the first process

node ./task/userCode.js &> ./task/error.txt
status=$?
if [ $status -ne 0 ]
 then
   echo "Syntax error in userCode: $status"
   exit $status
fi
(time node main) 2>&1 | tee >(awk -v n=3 '{if(NR>n) print a[NR%n]; a[NR%n]=$0}' >./task/console.txt) >(tail -3 >./task/performance.txt) 
status=$?
if [ $status -ne 0 ]
 then
   echo "Failed to run NODE process: $status"
   exit $status
fi
  echo "task complete"