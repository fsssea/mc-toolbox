#!/bin/sh
set -e
cd "$(dirname "$0")"
cat MC-Toolbox-Linux-1.1.0.tar.gz.part00 MC-Toolbox-Linux-1.1.0.tar.gz.part01 > MC-Toolbox-Linux-1.1.0.tar.gz
sha256sum MC-Toolbox-Linux-1.1.0.tar.gz
echo "正确值：66422abbe3907fc7d38345571c6197d8ea63116507b49fba47d1045fc72932b9"
