#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install build-essential

mkdir /tmp/tmp ; wget -P /tmp/tmp https://gitlab.com/YottaDB/DB/YDB/raw/master/sr_unix/ydbinstall.sh
cd /tmp/tmp ; chmod +x ydbinstall.sh
sudo ./ydbinstall.sh --utf8 default --verbose
source /usr/local/lib/yottadb/r128/ydb_env_set
cd ~

