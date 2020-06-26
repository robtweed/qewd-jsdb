#!/usr/bin/env bash

sudo rm -r /usr/local/lib/yottadb
sudo rm -r $HOME/.yottadb
sudo rm /usr/share/pkgconfig/yottadb.pc
unset $(compgen -v | grep "ydb")
unset $(compgen -v | grep "gtm")
