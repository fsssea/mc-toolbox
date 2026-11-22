#!/bin/sh
set -e
cd "$(dirname "$0")"
cat MC-Toolbox-Linux-1.1.0.deb.part00 MC-Toolbox-Linux-1.1.0.deb.part01 > MC-Toolbox-Linux-1.1.0.deb
sha256sum MC-Toolbox-Linux-1.1.0.deb
echo "正确值：b3373649938920855e9b0691d7efd2b397d4895a58b9a058d1445d50f8f9d268"
