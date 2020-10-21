#!/bin/bash

ng build --prod
tar cvf dist.tar.gz dist 
scp dist.tar.gz root@appsterdb.ackermann.digital:~/greenStreamBackend/html
rm dist.tar.gz

ssh root@appsterdb.ackermann.digital 'cd greenStreamBackend/html && tar xvf dist.tar.gz --strip-components=1 && rm dist.*'