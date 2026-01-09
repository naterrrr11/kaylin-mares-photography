#!/bin/bash
echo "Building frontend..."
yarn install
yarn build
echo "✓ Frontend built successfully! Output in ./build directory"
